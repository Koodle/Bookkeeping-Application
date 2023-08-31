//Redux
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

//services
import AuthService from "../../services/authService";

interface AuthState {
  user: {},
  business: {},
}

const initialState: AuthState = {
  user: {},
  business: {},
}

export const login = createAsyncThunk("/login", async () => {
  return await AuthService.login({
    email: "kazim@prisma.io",
    password: "password",
  });
});

export const AuthSlice = createSlice({
  name: "login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("action.payload: ", action.payload);
      state.user = action.payload.user;
      state.business = action.payload.business;
    });
  },
});

export default AuthSlice.reducer;

export const {} = AuthSlice.actions;