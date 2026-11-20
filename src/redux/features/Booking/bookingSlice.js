import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingApi from "../../../api/bookingApi";

export const previewBooking = createAsyncThunk(
  "booking/previewBooking",
  async ({ listingId, startDate, endDate, durationMonths }, { rejectWithValue }) => {
    try {
      return await bookingApi.previewBooking({ listingId, startDate, endDate, durationMonths });
    } catch (error) {
      const msg = (error.message || "Space is not available for selected dates").replace(
        /^Message from available check:\s*/i,
        ""
      );
      return rejectWithValue(msg);
    }
  }
);

export const fetchMyBookings = createAsyncThunk(
  "booking/fetchMyBookings",
  async (status = "", { rejectWithValue }) => {
    try {
      return await bookingApi.getMyBookings(status);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch bookings");
    }
  }
);

export const fetchHostBookings = createAsyncThunk(
  "booking/fetchHostBookings",
  async (status = "", { rejectWithValue }) => {
    try {
      return await bookingApi.getHostBookings(status);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch host bookings");
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  "booking/fetchBookingById",
  async (bookingId, { rejectWithValue }) => {
    try {
      return await bookingApi.getBookingById(bookingId);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch booking details");
    }
  }
);

export const fetchHostBookingById = createAsyncThunk(
  "booking/fetchHostBookingById",
  async (bookingId, { rejectWithValue }) => {
    try {
      return await bookingApi.getHostBookingById(bookingId);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch host booking details");
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      return await bookingApi.createBooking(bookingData);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create booking");
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      return await bookingApi.cancelBooking(bookingId);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to cancel booking");
    }
  }
);

export const completeBooking = createAsyncThunk(
  "booking/completeBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      return await bookingApi.completeBooking(bookingId);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to complete booking");
    }
  }
);

const syncUpdatedBooking = (state, updated) => {
  if (!updated) return;
  state.bookings = state.bookings.map((b) => (b._id === updated._id ? updated : b));
  state.hostBookings = state.hostBookings.map((b) =>
    b._id === updated._id ? updated : b
  );
  if (state.selectedBooking && state.selectedBooking._id === updated._id) {
    state.selectedBooking = updated;
  }
  if (state.selectedHostBooking && state.selectedHostBooking._id === updated._id) {
    state.selectedHostBooking = updated;
  }
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    selectedBooking: null,
    loading: false,
    error: null,

    hostBookings: [],
    selectedHostBooking: null,
    hostLoading: false,
    hostError: null,
    hostDetailLoading: false,
    hostDetailError: null,

    preview: null,
    previewLoading: false,
    previewError: null,

    createLoading: false,
    createError: null,

    actionLoading: false,
    actionError: null,
  },
  reducers: {
    clearSelectedBooking: (state) => {
      state.selectedBooking = null;
      state.error = null;
    },
    clearSelectedHostBooking: (state) => {
      state.selectedHostBooking = null;
      state.hostDetailError = null;
    },
    clearBookingPreview: (state) => {
      state.preview = null;
      state.previewError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Preview booking
      .addCase(previewBooking.pending, (state) => {
        state.previewLoading = true;
        state.previewError = null;
      })
      .addCase(previewBooking.fulfilled, (state, action) => {
        state.previewLoading = false;
        state.preview = action.payload.preview || null;
        state.previewError = null;
      })
      .addCase(previewBooking.rejected, (state, action) => {
        state.previewLoading = false;
        state.preview = null;
        state.previewError = action.payload;
      })

      // Renter: Fetch my bookings
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

      // Renter/Host: Fetch single booking
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

      // Host: Fetch host bookings
      .addCase(fetchHostBookings.pending, (state) => {
        state.hostLoading = true;
        state.hostError = null;
      })
      .addCase(fetchHostBookings.fulfilled, (state, action) => {
        state.hostLoading = false;
        state.hostBookings = action.payload.bookings || [];
      })
      .addCase(fetchHostBookings.rejected, (state, action) => {
        state.hostLoading = false;
        state.hostError = action.payload;
      })

      // Host: Fetch host booking by ID
      .addCase(fetchHostBookingById.pending, (state) => {
        state.hostDetailLoading = true;
        state.hostDetailError = null;
      })
      .addCase(fetchHostBookingById.fulfilled, (state, action) => {
        state.hostDetailLoading = false;
        state.selectedHostBooking = action.payload.booking || null;
      })
      .addCase(fetchHostBookingById.rejected, (state, action) => {
        state.hostDetailLoading = false;
        state.hostDetailError = action.payload;
      })

      // Create booking
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

      // Cancel booking
      .addCase(cancelBooking.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.actionLoading = false;
        syncUpdatedBooking(state, action.payload.booking);
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // Complete booking
      .addCase(completeBooking.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(completeBooking.fulfilled, (state, action) => {
        state.actionLoading = false;
        syncUpdatedBooking(state, action.payload.booking);
      })
      .addCase(completeBooking.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });
  },
});

export const {
  clearSelectedBooking,
  clearSelectedHostBooking,
  clearBookingPreview,
} = bookingSlice.actions;
export default bookingSlice.reducer;
