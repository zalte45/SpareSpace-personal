import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/Form/formSlice";
import loginReducer from "../features/Login/loginSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    loginInfo:loginReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.value"],
        ignoredPaths: ["form.images"],
      }
    }).concat(),
  
});