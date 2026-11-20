import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationApi from "../../../api/notificationApi";

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      return await notificationApi.getNotifications();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch notifications");
    }
  }
);

export const markAsRead = createAsyncThunk(
  "notification/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      return await notificationApi.markNotificationAsRead(notificationId);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to mark notification as read");
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications || [];
        state.unreadCount = (action.payload.notifications || []).filter((n) => !n.read).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.notifications = state.notifications.map((n) =>
          n._id === id ? { ...n, read: true } : n
        );
        state.unreadCount = state.notifications.filter((n) => !n.read).length;
      });
  },
});

export default notificationSlice.reducer;
