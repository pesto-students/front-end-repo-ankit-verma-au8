import { configureStore } from "@reduxjs/toolkit";
import { default as userReducer } from "./slices/user";
import { default as authReducer } from "./slices/auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./slices/user";

export default store;
