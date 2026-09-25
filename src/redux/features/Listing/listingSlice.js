import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:3000/api";

// Fetch all listings with search/filter/sort/pagination
export const fetchListings = createAsyncThunk(
  "listing/fetchListings",
  async (params = {}, { rejectWithValue }) => {
    try {
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

      const res = await fetch(`${API_BASE}/listing?${query.toString()}`, {
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to fetch listings");
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// Fetch single listing by ID
export const fetchListingById = createAsyncThunk(
  "listing/fetchListingById",
  async (listingId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/listing/${listingId}`, {
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to fetch listing");
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const initialState = {
  // Browse listings
  listings: [],
  totalListings: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,

  // Filters
  filters: {
    search: "",
    city: "",
    pincode: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    amenities: [],
    availableFrom: "",
  },

  // Sort
  sort: "newest",

  // Selected listing (detail page)
  selectedListing: null,
  selectedLoading: false,
  selectedError: null,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.sort = "newest";
      state.currentPage = 1;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearSelectedListing: (state) => {
      state.selectedListing = null;
      state.selectedError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch listings
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload.listings || [];
        state.totalListings = action.payload.total || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch listings";
      })
      // Fetch single listing
      .addCase(fetchListingById.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
      })
      .addCase(fetchListingById.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selectedListing = action.payload.listing || null;
      })
      .addCase(fetchListingById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload || "Failed to fetch listing";
      });
  },
});

export const { setFilters, clearFilters, setSort, setPage, clearSelectedListing } =
  listingSlice.actions;

export default listingSlice.reducer;
