import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../../api/authApi";

// Async thunks for auth workflows
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      return await authApi.registerUser(userData);
    } catch (error) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

export const verifyRegistrationOtp = createAsyncThunk(
  "auth/verifyRegistrationOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      return await authApi.verifyRegistrationOtp(otpData);
    } catch (error) {
      return rejectWithValue(error.message || "Verification failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      return await authApi.loginUser(credentials);
    } catch (error) {
      return rejectWithValue(error.message || "Invalid email or password");
    }
  }
);

export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.getCurrentUser();
    } catch (error) {
      return rejectWithValue(error.message || "Session not found");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    try {
      await authApi.logoutUser();
    } catch (error) {
      console.warn("Logout request failed, clearing frontend session:", error);
    } finally {
      dispatch(clearLogin());
    }
  }
);

export const requestForgotOtp = createAsyncThunk(
  "auth/requestForgotOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.requestForgotOtp(payload);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to send OTP");
    }
  }
);

export const verifyForgotOtp = createAsyncThunk(
  "auth/verifyForgotOtp",
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.verifyForgotOtp(payload);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to verify OTP");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.resetPassword(payload);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to reset password");
    }
  }
);

const initialState = {
  id: "",
  username: "",
  email: "",
  verified: false,
  role: "",
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "loginInfo",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      if (!action.payload) return;
      state.id = action.payload.id || action.payload._id || "";
      state.username = action.payload.username || "";
      state.email = action.payload.email || "";
      state.verified = Boolean(action.payload.verified);
      state.role = action.payload.role || action.payload.Role || "";
      state.loading = false;
      state.error = null;
    },
    clearLogin: () => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload?.user || action.payload;
        if (user) {
          state.id = user.id || user._id || "";
          state.username = user.username || "";
          state.email = user.email || "";
          state.verified = Boolean(user.verified);
          state.role = user.role || user.Role || "";
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Session restoration
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload?.user || action.payload;
        if (user) {
          state.id = user.id || user._id || "";
          state.username = user.username || "";
          state.email = user.email || "";
          state.verified = Boolean(user.verified);
          state.role = user.role || user.Role || "";
        }
      })
      .addCase(restoreSession.rejected, () => {
        return { ...initialState };
      })

      // Logout
      .addCase(logoutUser.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(logoutUser.rejected, () => {
        return { ...initialState };
      });
  },
});

export const { setLogin, clearLogin } = loginSlice.actions;
export default loginSlice.reducer;
