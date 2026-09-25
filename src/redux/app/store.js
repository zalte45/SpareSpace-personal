import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/Form/formSlice";
import loginReducer from "../features/Login/loginSlice";
import userReducer from "../features/User/user";
import listingReducer from "../features/Listing/listingSlice";
import favoriteReducer from "../features/Favorite/favoriteSlice";
import bookingReducer from "../features/Booking/bookingSlice";
import paymentReducer from "../features/Payment/paymentSlice";
import messageReducer from "../features/Message/messageSlice";
import notificationReducer from "../features/Notification/notificationSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    loginInfo: loginReducer,
    user: userReducer,
    listing: listingReducer,
    favorite: favoriteReducer,
    booking: bookingReducer,
    payment: paymentReducer,
    message: messageReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.value"],
        ignoredPaths: ["form.images"],
      }
    }).concat(),
  
});