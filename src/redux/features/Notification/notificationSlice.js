import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:3000/api";

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/notification`, { credentials: "include" });
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to fetch notifications");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const markAsRead = createAsyncThunk(
  "notification/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/notification/${notificationId}`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to mark notification as read");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
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
