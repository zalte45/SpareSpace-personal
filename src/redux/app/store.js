import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/Form/formSlice";
import loginReducer from "../features/Login/loginSlice";
import userReducer from "../features/User/user"

export const store = configureStore({
  reducer: {
    form: formReducer,
    loginInfo:loginReducer,
    user:userReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.value"],
        ignoredPaths: ["form.images"],
      }
    }).concat(),
  
});