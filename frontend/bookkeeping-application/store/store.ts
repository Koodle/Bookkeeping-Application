import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./slices/transactionsSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    // reference reducers here
    transactions: transactionsReducer,
    authentication: authReducer,
    // user: userReducer,
  },
});

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
