import { configureStore } from "@reduxjs/toolkit";
import { default as userReducer } from "./slices/user";
import { default as authReducer } from "./slices/auth";
import { default as expenseReducer } from "./slices/expense";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    expense: expenseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;

export * from "./slices/user";
export * from "./slices/auth";
export * from "./slices/expense";

export default store;
