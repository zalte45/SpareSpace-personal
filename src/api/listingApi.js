import { apiClient } from "./apiClient.js";

/**
 * Listing Domain API Module
 */

/**
 * Fetches listings with search, filter, sort, and pagination.
 * Backend endpoint: GET /api/listing?...
 */
export async function getListings(params = {}) {
  const query = new URLSearchParams();

  if (params.search) query.append("search", params.search);
  if (params.city) query.append("city", params.city);
  if (params.pincode) query.append("pincode", params.pincode);
  if (params.category) query.append("category", params.category);
  if (params.minPrice) query.append("minPrice", params.minPrice);
  if (params.maxPrice) query.append("maxPrice", params.maxPrice);
  if (params.minArea) query.append("minArea", params.minArea);
  if (params.maxArea) query.append("maxArea", params.maxArea);
  if (params.amenities) query.append("amenities", params.amenities);
  if (params.sort) query.append("sort", params.sort);
  if (params.page) query.append("page", params.page);
  if (params.limit) query.append("limit", params.limit);
  if (params.availableFrom) query.append("availableFrom", params.availableFrom);

  const queryString = query.toString();
  const endpoint = queryString ? `/listing?${queryString}` : "/listing";
  return apiClient.get(endpoint);
}

/**
 * Fetches a single listing by its ID.
 * Backend endpoint: GET /api/listing/:listingId
 */
export async function getListingById(listingId) {
  return apiClient.get(`/listing/${listingId}`);
}

/**
 * Creates a new space listing.
 * Backend endpoint: POST /api/listing
 * Accepts FormData (with files/fields) or plain JSON.
 */
export async function createListing(data) {
  return apiClient.post("/listing", data);
}

/**
 * Updates an existing space listing.
 * Backend endpoint: PATCH /api/listing/:listingId
 * Accepts FormData or JSON.
 */
export async function updateListing(listingId, data) {
  return apiClient.patch(`/listing/${listingId}`, data);
}

/**
 * Deletes a space listing by ID.
 * Backend endpoint: DELETE /api/listing/:listingId
 */
export async function deleteListing(listingId) {
  return apiClient.delete(`/listing/${listingId}`);
}

/**
 * Fetches spaces created by the host.
 * Backend endpoint: GET /api/my-spaces
 */
export async function getMySpaces() {
  return apiClient.get("/my-spaces");
}

const listingApi = {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getMySpaces,
};

export default listingApi;
