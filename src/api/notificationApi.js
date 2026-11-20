import { apiClient } from "./apiClient.js";

/**
 * Notification Domain API Module
 */

/**
 * Fetches notifications for the current user.
 * Backend endpoint: GET /api/notification
 */
export async function getNotifications() {
  return apiClient.get("/notification");
}

/**
 * Marks a notification as read.
 * Backend endpoint: PATCH /api/notification/:notificationId
 */
export async function markNotificationAsRead(notificationId) {
  return apiClient.patch(`/notification/${notificationId}`, {});
}

const notificationApi = {
  getNotifications,
  markNotificationAsRead,
};

export default notificationApi;
