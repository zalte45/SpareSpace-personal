import { apiClient } from "./apiClient.js";

/**
 * Report Domain API Module
 */

/**
 * Submits a report about a listing.
 * Backend endpoint: POST /api/report
 * Payload: { listingId, reason, description }
 */
export async function submitReport({ listingId, reason, description }) {
  return apiClient.post("/report", {
    listingId,
    reason,
    description,
  });
}

const reportApi = {
  submitReport,
};

export default reportApi;
