import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageApi from "../../../api/messageApi";

export const fetchConversations = createAsyncThunk(
  "message/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      return await messageApi.getConversations();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch conversations");
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (conversationId, { rejectWithValue }) => {
    try {
      return await messageApi.getMessages(conversationId);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch messages");
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async ({ conversationId, recipientId, listingId, bookingId, content }, { rejectWithValue }) => {
    try {
      return await messageApi.sendMessage({ conversationId, recipientId, listingId, bookingId, content });
    } catch (error) {
      return rejectWithValue(error.message || "Failed to send message");
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
