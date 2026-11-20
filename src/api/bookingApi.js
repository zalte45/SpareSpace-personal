import { apiClient } from "./apiClient.js";

/**
 * Booking Domain API Module
 */

/**
 * Previews booking calculation and availability.
 * Backend endpoint: POST /api/booking/preview
 */
export async function previewBooking({ listingId, startDate, endDate, durationMonths }) {
  return apiClient.post("/booking/preview", {
    listingId,
    startDate,
    endDate,
    durationMonths,
  });
}

/**
 * Fetches bookings for the current renter.
 * Backend endpoint: GET /api/booking
 */
export async function getMyBookings(status = "") {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  return apiClient.get(`/booking${query}`);
}

/**
 * Fetches bookings received by the current host.
 * Backend endpoint: GET /api/booking/host
 */
export async function getHostBookings(status = "") {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  return apiClient.get(`/booking/host${query}`);
}

/**
 * Fetches single booking details for renter.
 * Backend endpoint: GET /api/booking/:bookingId
 */
export async function getBookingById(bookingId) {
  return apiClient.get(`/booking/${bookingId}`);
}

/**
 * Fetches single booking details for host.
 * Backend endpoint: GET /api/booking/host/:bookingId
 */
export async function getHostBookingById(bookingId) {
  return apiClient.get(`/booking/host/${bookingId}`);
}

/**
 * Creates a new booking.
 * Backend endpoint: POST /api/booking
 */
export async function createBooking(bookingData) {
  return apiClient.post("/booking", bookingData);
}

/**
 * Cancels an existing booking.
 * Backend endpoint: PATCH /api/booking/:bookingId/cancel
 */
export async function cancelBooking(bookingId) {
  return apiClient.patch(`/booking/${bookingId}/cancel`, {});
}

/**
 * Marks a booking as complete.
 * Backend endpoint: PATCH /api/booking/:bookingId/complete
 */
export async function completeBooking(bookingId) {
  return apiClient.patch(`/booking/${bookingId}/complete`, {});
}

const bookingApi = {
  previewBooking,
  getMyBookings,
  getHostBookings,
  getBookingById,
  getHostBookingById,
  createBooking,
  cancelBooking,
  completeBooking,
};

export default bookingApi;
