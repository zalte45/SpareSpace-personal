import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:3000/api";

export const fetchMyBookings = createAsyncThunk(
  "booking/fetchMyBookings",
  async (status = "", { rejectWithValue }) => {
    try {
      const url = status ? `${API_BASE}/booking?status=${status}` : `${API_BASE}/booking`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to fetch bookings");  
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  "booking/fetchBookingById",
  async (bookingId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/booking/${bookingId}`, { credentials: "include" });
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to fetch booking details");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/createBooking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to create booking");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/booking/${bookingId}/cancel`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to cancel booking");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    selectedBooking: null,
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
  },
  reducers: {
    clearSelectedBooking: (state) => {
      state.selectedBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings || [];
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBooking = action.payload.booking || null;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBooking.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.createLoading = false;
        if (action.payload.booking) {
          state.bookings.unshift(action.payload.booking);
        }
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const updated = action.payload.booking;
        if (updated) {
          state.bookings = state.bookings.map((b) => (b._id === updated._id ? updated : b));
          if (state.selectedBooking && state.selectedBooking._id === updated._id) {
            state.selectedBooking = updated;
          }
        }
      });
  },
});

export const { clearSelectedBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
