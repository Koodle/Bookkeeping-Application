import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

//services
import AuthService from "../../services/authService";

export const login = createAsyncThunk("/login", async () => {
  return await AuthService.login({
    //FIXME: get from the login page once built
    email: "kazim@prisma.io",
    password: "password",
  });
});



const initialState = {
  user: {},
  business: {},
} as any;

// if (typeof window !== "undefined") {
//   initialState.user = localStorage.hasOwnProperty("user") ? JSON.parse(localStorage.getItem("user") || '{}') : {}
//   initialState.business = localStorage.hasOwnProperty("business") ? JSON.parse(localStorage.getItem("business") || '{}') : {}
// }

export const AuthSlice = createSlice({
  name: "login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("action.payload: ", action.payload);
      // state.transactions = action.payload.transactions;
      // state.ledgers = action.payload.ledgers;
      // console.log("state.transactions: ", state.transactions);
      state.user = action.payload.user;
      state.business = action.payload.business;
    });
  },
});

export default AuthSlice.reducer;

export const {} = AuthSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

// export default counterSlice.reducer;
