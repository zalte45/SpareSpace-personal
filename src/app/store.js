import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../redux/features/Form/formSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.value"],
        ignoredPaths: ["form.images"],
      }
    }).concat(),
  
});