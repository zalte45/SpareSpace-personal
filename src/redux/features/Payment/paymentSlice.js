import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentApi from "../../../api/paymentApi";

export const fetchTransactions = createAsyncThunk(
  "payment/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      return await paymentApi.getTransactions();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch transactions");
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions || [];
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
