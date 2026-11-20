/**
 * Central API Client for SpareSpace
 * 
 * Responsibilities:
 * - Base URL configuration (from VITE_API_BASE_URL or default http://localhost:3000/api)
 * - Automatic credentials: "include" for HTTP-only cookies
 * - JSON and FormData request handling (omits Content-Type for multipart)
 * - Safe JSON / text response parsing
 * - Centralized error normalization with ApiError
 * - 401 Interception with single-flight automatic token refresh (/api/refreshToken)
 * - Automatic single retry of failed requests
 * - Excludes auth & refresh endpoints from retry loops
 * - Dispatches session expiry event / callback when refresh fails
 */

export const BASE_URL = (
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
  "http://localhost:3000/api"
).replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status = 500, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Session expired callbacks
const sessionExpiredListeners = new Set();

export function onSessionExpired(callback) {
  if (typeof callback === "function") {
    sessionExpiredListeners.add(callback);
    return () => sessionExpiredListeners.delete(callback);
  }
  return () => {};
}

let isNotifyingSessionExpired = false;

export function notifySessionExpired() {
  if (isNotifyingSessionExpired) return;
  isNotifyingSessionExpired = true;
  setTimeout(() => {
    isNotifyingSessionExpired = false;
  }, 500);

  for (const listener of sessionExpiredListeners) {
    try {
      listener();
    } catch (err) {
      console.error("Error in session expired listener:", err);
    }
  }
}

// Endpoints that should NEVER trigger automatic 401 refresh
const EXCLUDED_REFRESH_ENDPOINTS = [
  "/refreshToken",
  "/login",
  "/register",
  "/verifyOtp",
  "/forgotOtp",
  "/forgotOtpVerify",
  "/newPassword",
  "/logout",
];

function isExcludedFromRefresh(endpoint = "") {
  try {
    const rawPath = endpoint.startsWith("http://") || endpoint.startsWith("https://")
      ? new URL(endpoint).pathname
      : endpoint.split("?")[0];
    const normalized = rawPath.toLowerCase().replace(/^\/api(?=\/|$)/, "") || "/";
    return EXCLUDED_REFRESH_ENDPOINTS.some((excluded) => {
      const normExcluded = excluded.toLowerCase();
      return normalized === normExcluded || normalized === `${normExcluded}/`;
    });
  } catch {
    return EXCLUDED_REFRESH_ENDPOINTS.some((excluded) =>
      endpoint.toLowerCase().includes(excluded.toLowerCase())
    );
  }
}

// Single-flight refresh state
let refreshPromise = null;

/**
 * Executes a single-flight token refresh request.
 * If multiple requests fail with 401 simultaneously, they all share this promise.
 */
export function executeTokenRefresh() {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const res = await fetch(`${BASE_URL}/refreshToken`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        let errorData = null;
        try {
          errorData = await res.json();
        } catch {
          errorData = null;
        }
        const msg =
          errorData?.message ||
          errorData?.Message ||
          "Session expired. Please log in again.";
        throw new ApiError(msg, res.status, errorData);
      }

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      return data;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Safely parses response body as JSON or text.
 */
async function parseResponseBody(response) {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers?.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  try {
    const text = await response.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch {
    return null;
  }
}

/**
 * Central API Client function
 * 
 * @param {string} endpoint - API endpoint relative to BASE_URL or full URL
 * @param {RequestInit & { _retry?: boolean, skipRefresh?: boolean }} options - Request options
 * @returns {Promise<any>} Parsed response data
 */
export async function apiClient(endpoint, options = {}) {
  const url = endpoint.startsWith("http://") || endpoint.startsWith("https://")
    ? endpoint
    : `${BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const headers = { ...(options.headers || {}) };
  let body = options.body;

  // Default Accept header to application/json if not explicitly provided
  if (!headers["Accept"] && !headers["accept"]) {
    headers["Accept"] = "application/json";
  }

  // Handle FormData vs JSON
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  if (isFormData) {
    // For FormData, let the browser automatically set Content-Type with multipart boundary
    delete headers["Content-Type"];
    delete headers["content-type"];
  } else if (
    body !== undefined &&
    body !== null &&
    typeof body === "object" &&
    !(typeof Blob !== "undefined" && body instanceof Blob) &&
    !(typeof ArrayBuffer !== "undefined" && body instanceof ArrayBuffer)
  ) {
    if (!headers["Content-Type"] && !headers["content-type"]) {
      headers["Content-Type"] = "application/json";
    }
    body = JSON.stringify(body);
  }

  const requestConfig = {
    ...options,
    credentials: "include", // Cookie-based auth on every request
    headers,
    body,
  };

  let response;
  try {
    response = await fetch(url, requestConfig);
  } catch (networkError) {
    throw new ApiError(
      networkError.message || "Network error. Please check your connection.",
      0,
      null
    );
  }

  // Intercept 401 Unauthorized for automatic token refresh & single retry
  if (
    response.status === 401 &&
    !options._retry &&
    !options.skipRefresh &&
    !isExcludedFromRefresh(endpoint)
  ) {
    try {
      // Single-flight refresh: concurrent 401s share the same promise
      await executeTokenRefresh();

      // Retry the original request once
      return await apiClient(endpoint, {
        ...options,
        _retry: true,
      });
    } catch (refreshError) {
      // Refresh failed -> clear session and reject
      notifySessionExpired();
      throw refreshError instanceof ApiError
        ? refreshError
        : new ApiError("Session expired", 401, null);
    }
  }

  const parsedData = await parseResponseBody(response);

  if (!response.ok) {
    const errorMessage =
      (parsedData &&
        typeof parsedData === "object" &&
        (parsedData.message || parsedData.Message || parsedData.error)) ||
      (typeof parsedData === "string" && parsedData) ||
      response.statusText ||
      "Request failed";

    throw new ApiError(errorMessage, response.status, parsedData);
  }

  return parsedData;
}

// Convenience HTTP method helpers
apiClient.get = (endpoint, options = {}) =>
  apiClient(endpoint, { ...options, method: "GET" });

apiClient.post = (endpoint, body, options = {}) =>
  apiClient(endpoint, { ...options, method: "POST", body });

apiClient.put = (endpoint, body, options = {}) =>
  apiClient(endpoint, { ...options, method: "PUT", body });

apiClient.patch = (endpoint, body, options = {}) =>
  apiClient(endpoint, { ...options, method: "PATCH", body });

apiClient.delete = (endpoint, options = {}) =>
  apiClient(endpoint, { ...options, method: "DELETE" });

export default apiClient;
