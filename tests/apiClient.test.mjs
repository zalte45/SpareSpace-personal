import { test, describe, afterEach, mock } from "node:test";
import assert from "node:assert/strict";

import {
  apiClient,
  ApiError,
  onSessionExpired,
  BASE_URL,
} from "../src/api/apiClient.js";

import authApi from "../src/api/authApi.js";
import listingApi from "../src/api/listingApi.js";
import bookingApi from "../src/api/bookingApi.js";
import favoriteApi from "../src/api/favoriteApi.js";
import paymentApi from "../src/api/paymentApi.js";
import messageApi from "../src/api/messageApi.js";
import notificationApi from "../src/api/notificationApi.js";
import reportApi from "../src/api/reportApi.js";

describe("Central API Client & Refresh Architecture", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("1. Basic Request & Headers: includes credentials: 'include' and sets Accept: application/json", async () => {
    globalThis.fetch = mock.fn(async (url, options) => {
      assert.equal(options.credentials, "include");
      assert.equal(options.headers["Accept"], "application/json");
      assert.equal(options.headers["Authorization"], undefined, "Must NOT attach Authorization Bearer header");
      return new Response(JSON.stringify({ success: true, user: { id: "123", username: "alice" } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    const data = await apiClient.get("/getMe");
    assert.deepEqual(data, { success: true, user: { id: "123", username: "alice" } });
    assert.equal(globalThis.fetch.mock.callCount(), 1);
  });

  test("2. JSON Bodies: sets Content-Type: application/json automatically for object bodies", async () => {
    globalThis.fetch = mock.fn(async (url, options) => {
      assert.equal(options.credentials, "include");
      assert.equal(options.headers["Content-Type"], "application/json");
      assert.equal(options.body, JSON.stringify({ email: "test@example.com" }));
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    const data = await apiClient.post("/forgotOtp", { email: "test@example.com" });
    assert.deepEqual(data, { success: true });
    assert.equal(globalThis.fetch.mock.callCount(), 1);
  });

  test("3. FormData Handling: preserves boundary and does NOT set Content-Type header", async () => {
    const formData = new FormData();
    formData.append("title", "Cozy Garage");

    globalThis.fetch = mock.fn(async (url, options) => {
      assert.equal(options.credentials, "include");
      assert.equal(options.headers["Content-Type"], undefined, "Content-Type must be undefined so browser generates boundary");
      assert.equal(options.body, formData);
      return new Response(JSON.stringify({ success: true, listing: { id: "listing1" } }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    });

    const res = await apiClient.post("/listing", formData);
    assert.equal(res.success, true);
    assert.equal(globalThis.fetch.mock.callCount(), 1);
  });

  test("4. Error Normalization: extracts backend error messages and returns ApiError", async () => {
    globalThis.fetch = mock.fn(async () => {
      return new Response(JSON.stringify({ message: "Invalid credentials provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    });

    await assert.rejects(
      async () => {
        await apiClient.post("/login", { email: "test@example.com", password: "wrong" });
      },
      (err) => {
        assert(err instanceof ApiError);
        assert.equal(err.status, 400);
        assert.equal(err.message, "Invalid credentials provided");
        assert.deepEqual(err.data, { message: "Invalid credentials provided" });
        return true;
      }
    );
  });

  test("5. Automatic 401 Interception: refreshes token and retries original request once", async () => {
    let callIndex = 0;
    const calls = [];

    globalThis.fetch = mock.fn(async (url, options) => {
      calls.push({ url, method: options.method || "GET" });
      callIndex++;

      // 1st call: GET /getMe returns 401
      if (callIndex === 1) {
        return new Response(JSON.stringify({ message: "Access token expired" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      // 2nd call: POST /refreshToken succeeds
      if (callIndex === 2) {
        assert.equal(url, `${BASE_URL}/refreshToken`);
        assert.equal(options.credentials, "include");
        return new Response(JSON.stringify({ message: "Tokens refreshed" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      // 3rd call: retried GET /getMe succeeds
      if (callIndex === 3) {
        assert.equal(url, `${BASE_URL}/getMe`);
        return new Response(JSON.stringify({ user: { id: "user1", email: "user@test.com" } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      throw new Error("Unexpected call");
    });

    const result = await apiClient.get("/getMe");
    assert.deepEqual(result, { user: { id: "user1", email: "user@test.com" } });
    assert.equal(calls.length, 3);
    assert.equal(calls[0].url, `${BASE_URL}/getMe`);
    assert.equal(calls[1].url, `${BASE_URL}/refreshToken`);
    assert.equal(calls[2].url, `${BASE_URL}/getMe`);
  });

  test("6. High Concurrency: 5 simultaneous 401 requests trigger EXACTLY ONE refresh call, all 5 retry and succeed", async () => {
    let refreshCount = 0;
    const endpointCallCounts = {
      listing: 0,
      favorite: 0,
      notification: 0,
      booking: 0,
      payment: 0,
    };

    globalThis.fetch = mock.fn(async (url, options) => {
      if (url.includes("/refreshToken")) {
        refreshCount++;
        // Small delay to simulate async network flight
        await new Promise((r) => setTimeout(r, 25));
        return new Response(JSON.stringify({ success: true, message: "Rotated" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      const endpoints = ["listing", "favorite", "notification", "booking", "payment"];
      for (const ep of endpoints) {
        if (url.includes(`/${ep}`)) {
          endpointCallCounts[ep]++;
          if (endpointCallCounts[ep] === 1) {
            // First attempt: expired
            return new Response(JSON.stringify({ message: "Access token expired" }), {
              status: 401,
              headers: { "Content-Type": "application/json" },
            });
          }
          // Retry attempt: succeeds
          return new Response(JSON.stringify({ endpoint: ep, ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
      }

      return new Response(JSON.stringify({}), { status: 200 });
    });

    // Fire 5 simultaneous requests
    const results = await Promise.all([
      apiClient.get("/listing"),
      apiClient.get("/favorite"),
      apiClient.get("/notification"),
      apiClient.get("/booking"),
      apiClient.get("/payment"),
    ]);

    // Critical assertion: Only ONE /refreshToken request occurred across all 5 requests
    assert.equal(refreshCount, 1, "Refresh endpoint must be called exactly once during concurrent 401s");

    // All 5 endpoints made exactly 2 calls: 1 initial (401) + 1 retry (200)
    for (const [ep, count] of Object.entries(endpointCallCounts)) {
      assert.equal(count, 2, `Endpoint ${ep} should have had 1 failed attempt and 1 successful retry`);
    }

    // All 5 requests resolved successfully with their respective data
    assert.deepEqual(results[0], { endpoint: "listing", ok: true });
    assert.deepEqual(results[1], { endpoint: "favorite", ok: true });
    assert.deepEqual(results[2], { endpoint: "notification", ok: true });
    assert.deepEqual(results[3], { endpoint: "booking", ok: true });
    assert.deepEqual(results[4], { endpoint: "payment", ok: true });
  });

  test("7. High Concurrency on Refresh Failure: 5 simultaneous 401s where refresh fails reject consistently", async () => {
    let refreshCount = 0;
    let sessionExpiredCount = 0;

    const unsubscribe = onSessionExpired(() => {
      sessionExpiredCount++;
    });

    globalThis.fetch = mock.fn(async (url) => {
      if (url.includes("/refreshToken")) {
        refreshCount++;
        await new Promise((r) => setTimeout(r, 20));
        return new Response(JSON.stringify({ message: "Refresh token revoked in DB" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ message: "Access token expired" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    });

    try {
      const results = await Promise.allSettled([
        apiClient.get("/listing"),
        apiClient.get("/favorite"),
        apiClient.get("/notification"),
        apiClient.get("/booking"),
        apiClient.get("/payment"),
      ]);

      // Refresh was still only executed once
      assert.equal(refreshCount, 1);

      // All 5 requests rejected with 401 ApiError
      for (const res of results) {
        assert.equal(res.status, "rejected");
        assert(res.reason instanceof ApiError);
        assert.equal(res.reason.status, 401);
      }

      // Session expiration handler notified cleanly
      assert.equal(sessionExpiredCount, 1);
    } finally {
      unsubscribe();
    }
  });

  test("8. Excluded Auth Endpoints: /login, /register, /verifyOtp, etc. NEVER trigger token refresh on 401", async () => {
    let refreshAttempted = false;

    globalThis.fetch = mock.fn(async (url) => {
      if (url.includes("/refreshToken")) {
        refreshAttempted = true;
      }
      return new Response(JSON.stringify({ message: "Invalid credentials or OTP" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    });

    await assert.rejects(async () => {
      await authApi.loginUser({ email: "wrong@test.com", password: "wrong" });
    });
    await assert.rejects(async () => {
      await authApi.registerUser({ username: "u", email: "e", password: "p", role: "renter" });
    });
    await assert.rejects(async () => {
      await authApi.verifyRegistrationOtp({ otp: "0000", verifyToken: "bad" });
    });
    await assert.rejects(async () => {
      await authApi.verifyForgotOtp({ email: "e", otp: "0000" });
    });
    await assert.rejects(async () => {
      await authApi.resetPassword({ password: "new", resetToken: "bad" });
    });

    assert.equal(refreshAttempted, false, "Auth endpoints must never invoke refreshToken");
  });

  test("9. Query Parameters do not falsely trigger endpoint exclusion: /listing?search=login DOES refresh on 401", async () => {
    let refreshCount = 0;
    let listingCount = 0;

    globalThis.fetch = mock.fn(async (url) => {
      if (url.includes("/refreshToken")) {
        refreshCount++;
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (url.includes("/listing")) {
        listingCount++;
        if (listingCount === 1) {
          return new Response(JSON.stringify({ message: "Token expired" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({ listings: [] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({}), { status: 200 });
    });

    const res = await apiClient.get("/listing?search=login");
    assert.equal(refreshCount, 1, "A query parameter value 'login' must NOT prevent 401 token refresh");
    assert.deepEqual(res, { listings: [] });
  });

  test("10. Infinite Loop Prevention: Retried request returning 401 throws immediately", async () => {
    let fetchCount = 0;

    globalThis.fetch = mock.fn(async (url) => {
      fetchCount++;
      if (url.includes("/refreshToken")) {
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ message: "Still unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    });

    await assert.rejects(async () => {
      await apiClient.get("/protected-route");
    });

    // 1st request (401) + 1 refresh (200) + 1 retry (401) = exactly 3 calls
    assert.equal(fetchCount, 3);
  });

  test("11. Domain API modules route to exact backend endpoints with proper HTTP methods", async () => {
    const recordedCalls = [];

    globalThis.fetch = mock.fn(async (url, options) => {
      recordedCalls.push({ url, method: options.method || "GET", body: options.body });
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    // authApi
    await authApi.getCurrentUser();
    assert.equal(recordedCalls[recordedCalls.length - 1].url, `${BASE_URL}/getMe`);
    assert.equal(recordedCalls[recordedCalls.length - 1].method, "GET");

    await authApi.logoutUser();
    assert.equal(recordedCalls[recordedCalls.length - 1].url, `${BASE_URL}/logout`);
    assert.equal(recordedCalls[recordedCalls.length - 1].method, "GET");

    // listingApi
    await listingApi.getListings({ city: "Mumbai", category: "Garage" });
    assert(recordedCalls[recordedCalls.length - 1].url.includes("/listing?city=Mumbai&category=Garage"));
    assert.equal(recordedCalls[recordedCalls.length - 1].method, "GET");

    await listingApi.getMySpaces();
    assert.equal(recordedCalls[recordedCalls.length - 1].url, `${BASE_URL}/my-spaces`);
    assert.equal(recordedCalls[recordedCalls.length - 1].method, "GET");

    // bookingApi
    await bookingApi.previewBooking({ listingId: "l1", startDate: "2026-01-01", durationMonths: 2 });
    assert.equal(recordedCalls[recordedCalls.length - 1].url, `${BASE_URL}/booking/preview`);
    assert.equal(recordedCalls[recordedCalls.length - 1].method, "POST");

    // favoriteApi
    await favoriteApi.toggleFavorite("l123");
    assert.equal(recordedCalls[recordedCalls.length - 1].url, `${BASE_URL}/favorite`);
    assert.equal(recordedCalls[recordedCalls.length - 1].method, "POST");

    // paymentApi
    await paymentApi.getTransactions();
    assert.equal(recordedCalls[recordedCalls.length - 1].url, `${BASE_URL}/payment`);
    assert.equal(recordedCalls[recordedCalls.length - 1].method, "GET");

    // messageApi
    await messageApi.getConversations();
    assert.equal(recordedCalls[recordedCalls.length - 1].url, `${BASE_URL}/message`);
    assert.equal(recordedCalls[recordedCalls.length - 1].method, "GET");

    // notificationApi
    await notificationApi.markNotificationAsRead("n123");
    assert.equal(recordedCalls[recordedCalls.length - 1].url, `${BASE_URL}/notification/n123`);
    assert.equal(recordedCalls[recordedCalls.length - 1].method, "PATCH");

    // reportApi
    await reportApi.submitReport({ listingId: "l1", reason: "Fake", description: "Not real" });
    assert.equal(recordedCalls[recordedCalls.length - 1].url, `${BASE_URL}/report`);
    assert.equal(recordedCalls[recordedCalls.length - 1].method, "POST");
  });
});
