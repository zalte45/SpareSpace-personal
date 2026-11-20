import { createSlice } from "@reduxjs/toolkit";
import { loginUser, restoreSession, logoutUser } from "../Login/loginSlice";

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = Boolean(action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    setIsInitialized: (state, action) => {
      state.isInitialized = Boolean(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(restoreSession.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.isInitialized = true;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.isLoggedIn = false;
        state.isInitialized = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export const { setIsLoggedIn, logout, setIsInitialized } = userSlice.actions;
export default userSlice.reducer;
