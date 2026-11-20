import { apiClient } from "./apiClient.js";

/**
 * Favorite Domain API Module
 */

/**
 * Fetches user's saved favorite listings.
 * Backend endpoint: GET /api/favorite
 */
export async function getFavorites() {
  return apiClient.get("/favorite");
}

/**
 * Toggles a listing in the user's favorites list.
 * Backend endpoint: POST /api/favorite
 * Payload: { listingId }
 */
export async function toggleFavorite(listingId) {
  return apiClient.post("/favorite", { listingId });
}

const favoriteApi = {
  getFavorites,
  toggleFavorite,
};

export default favoriteApi;
