import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:3000/api";

export const fetchConversations = createAsyncThunk(
  "message/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/message`, { credentials: "include" });
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to fetch conversations");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (conversationId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/message/${conversationId}`, {
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to fetch messages");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async ({ conversationId, recipientId, listingId, bookingId, content }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, recipientId, listingId, bookingId, content }),
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to send message");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    conversations: [],
    activeConversation: null,
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload.conversations || [];
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload.messages || [];
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.messages.push(action.payload.message);
        }
      });
  },
});

export const { setActiveConversation } = messageSlice.actions;
export default messageSlice.reducer;
