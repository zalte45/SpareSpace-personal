import { apiClient } from "./apiClient.js";

/**
 * Authentication Domain API Module
 */

/**
 * Registers a new user.
 * Backend endpoint: POST /api/register
 * Payload: { username, email, password, role }
 * Returns verification token for OTP verification.
 */
export async function registerUser({ username, email, password, role }) {
  return apiClient.post("/register", {
    username,
    email,
    password,
    role,
  });
}

/**
 * Verifies registration OTP.
 * Backend endpoint: POST /api/verifyOtp
 * Payload: { otp, verifyToken }
 */
export async function verifyRegistrationOtp({ otp, verifyToken }) {
  return apiClient.post("/verifyOtp", {
    otp,
    verifyToken,
  });
}

/**
 * Logs in a user.
 * Backend endpoint: POST /api/login
 * Payload: { email, password }
 * Backend sets HTTP-only accessToken & refreshToken cookies.
 */
export async function loginUser({ email, password }) {
  return apiClient.post("/login", {
    email,
    password,
  });
}

/**
 * Retrieves the current authenticated user session.
 * Backend endpoint: GET /api/getMe
 * Validates session using HTTP-only cookie.
 */
export async function getCurrentUser() {
  return apiClient.get("/getMe");
}

/**
 * Explicitly triggers token refresh.
 * Backend endpoint: POST /api/refreshToken
 * (Also handled automatically by central API client on 401)
 */
export async function refreshToken() {
  return apiClient.post("/refreshToken", {});
}

/**
 * Logs out the user and revokes server session.
 * Backend endpoint: GET /api/logout
 */
export async function logoutUser() {
  return apiClient.get("/logout");
}

/**
 * Requests OTP for forgotten password.
 * Backend endpoint: POST /api/forgotOtp
 * Payload: { email }
 */
export async function requestForgotOtp({ email }) {
  return apiClient.post("/forgotOtp", {
    email,
  });
}

/**
 * Verifies OTP for password reset.
 * Backend endpoint: POST /api/forgotOtpVerify
 * Payload: { email, otp }
 * Returns resetToken.
 */
export async function verifyForgotOtp({ email, otp }) {
  return apiClient.post("/forgotOtpVerify", {
    email,
    otp,
  });
}

/**
 * Sets a new password using resetToken.
 * Backend endpoint: POST /api/newPassword
 * Payload: { password, resetToken }
 */
export async function resetPassword({ password, resetToken }) {
  return apiClient.post("/newPassword", {
    password,
    resetToken,
  });
}

const authApi = {
  registerUser,
  verifyRegistrationOtp,
  loginUser,
  getCurrentUser,
  refreshToken,
  logoutUser,
  requestForgotOtp,
  verifyForgotOtp,
  resetPassword,
};

export default authApi;
