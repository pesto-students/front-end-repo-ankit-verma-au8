import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/auth";
import { default as authReducer, authSlice } from "./slices/auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // user: userReducer,
  },
});
console.log("AUTH LICE", authSlice);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
