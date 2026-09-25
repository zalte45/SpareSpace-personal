import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:3000/api";

export const fetchFavorites = createAsyncThunk(
  "favorite/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/favorite`, {
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to fetch favorites");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  "favorite/toggleFavorite",
  async (listingId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/favorite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to toggle favorite");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorites: [], // list of listing objects or IDs
    favoriteIds: [], // quick lookup array of listing IDs
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload.favorites || [];
        state.favoriteIds = (action.payload.favorites || []).map(
          (fav) => fav._id || fav.listing?._id || fav.listing
        );
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { listingId, isFavorite } = action.payload;
        if (isFavorite) {
          if (!state.favoriteIds.includes(listingId)) {
            state.favoriteIds.push(listingId);
          }
        } else {
          state.favoriteIds = state.favoriteIds.filter((id) => id !== listingId);
          state.favorites = state.favorites.filter(
            (fav) => (fav._id || fav.listing?._id || fav.listing) !== listingId
          );
        }
      });
  },
});

export default favoriteSlice.reducer;
