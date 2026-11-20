import { apiClient } from "./apiClient.js";

/**
 * Payment Domain API Module
 */

/**
 * Fetches user payment transactions.
 * Backend endpoint: GET /api/payment
 */
export async function getTransactions() {
  return apiClient.get("/payment");
}

const paymentApi = {
  getTransactions,
};

export default paymentApi;
