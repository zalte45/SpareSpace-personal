import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import listingApi from "../../../api/listingApi";

// Fetch all listings with search/filter/sort/pagination
export const fetchListings = createAsyncThunk(
  "listing/fetchListings",
  async (params = {}, { rejectWithValue }) => {
    try {
      return await listingApi.getListings(params);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch listings");
    }
  }
);

// Fetch single listing by ID
export const fetchListingById = createAsyncThunk(
  "listing/fetchListingById",
  async (listingId, { rejectWithValue }) => {
    try {
      return await listingApi.getListingById(listingId);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch listing");
    }
  }
);

// Create a new listing (FormData or JSON)
export const createListing = createAsyncThunk(
  "listing/createListing",
  async (listingData, { rejectWithValue }) => {
    try {
      return await listingApi.createListing(listingData);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create listing");
    }
  }
);

// Fetch host's own spaces
export const fetchMySpaces = createAsyncThunk(
  "listing/fetchMySpaces",
  async (_, { rejectWithValue }) => {
    try {
      return await listingApi.getMySpaces();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch spaces");
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

  // Host spaces
  mySpaces: [],
  mySpacesLoading: false,
  mySpacesError: null,

  // Create listing
  createLoading: false,
  createError: null,
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
      })

      // Create listing
      .addCase(createListing.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createListing.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createListing.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload || "Failed to create listing";
      })

      // Fetch my spaces
      .addCase(fetchMySpaces.pending, (state) => {
        state.mySpacesLoading = true;
        state.mySpacesError = null;
      })
      .addCase(fetchMySpaces.fulfilled, (state, action) => {
        state.mySpacesLoading = false;
        state.mySpaces = action.payload.listings || [];
      })
      .addCase(fetchMySpaces.rejected, (state, action) => {
        state.mySpacesLoading = false;
        state.mySpacesError = action.payload || "Failed to fetch spaces";
      });
  },
});

export const { setFilters, clearFilters, setSort, setPage, clearSelectedListing } =
  listingSlice.actions;

export default listingSlice.reducer;
