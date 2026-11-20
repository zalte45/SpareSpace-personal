import { apiClient } from "./apiClient.js";

/**
 * Message Domain API Module
 */

/**
 * Fetches all conversations for current user.
 * Backend endpoint: GET /api/message
 */
export async function getConversations() {
  return apiClient.get("/message");
}

/**
 * Fetches message history for a specific conversation.
 * Backend endpoint: GET /api/message/:conversationId
 */
export async function getMessages(conversationId) {
  return apiClient.get(`/message/${conversationId}`);
}

/**
 * Sends a message within a conversation.
 * Backend endpoint: POST /api/message
 */
export async function sendMessage({ conversationId, recipientId, listingId, bookingId, content }) {
  return apiClient.post("/message", {
    conversationId,
    recipientId,
    listingId,
    bookingId,
    content,
  });
}

const messageApi = {
  getConversations,
  getMessages,
  sendMessage,
};

export default messageApi;
