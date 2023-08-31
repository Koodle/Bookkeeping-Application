import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

//services
import TransactionsService from "../../services/transactionsService";

export const getTransactions = createAsyncThunk(
  "transactions",
  async () => {
    return await TransactionsService.getAll();
  }
);

export const createTransactions = createAsyncThunk(
  "transactions/create",
  async () => {
    return await TransactionsService.create();
  }
);

export const editTransactions = createAsyncThunk(
  "transactions/edit",
  async (transactions) => {
    return await TransactionsService.edit(transactions);
  }
);

export const deleteTransactions = createAsyncThunk(
  "transactions/delete",
  async () => {
    return await TransactionsService.delete();
  }
);

interface TransactionState {
  transactions: [],
  ledgers: [],
}

const initialState: TransactionState = {
  transactions: [],
  ledgers: [],
}

export const TransactionSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      // console.log("action.payload: ", action.payload);
      state.transactions = action.payload.transactions;
      state.ledgers = action.payload.ledgers;
      // console.log("state.transactions: ", state.transactions);
    });
    builder.addCase(createTransactions.fulfilled, (state, action) => {
      // console.log("action.payload: ", action.payload);
      state.transactions = action.payload.transactions;
      state.ledgers = action.payload.ledgers;
      // console.log("state.transactions: ", state.transactions);
    });
    builder.addCase(editTransactions.fulfilled, (state, action) => {
      // console.log("action.payload: ", action.payload);
      state.transactions = action.payload.transactions;
      state.ledgers = action.payload.ledgers;
      // console.log("state.transactions: ", state.transactions);
    });
    builder.addCase(deleteTransactions.fulfilled, (state, action) => {
      // console.log("action.payload: ", action.payload);
      state.transactions = action.payload.transactions;
      state.ledgers = action.payload.ledgers;
      // console.log("state.transactions: ", state.transactions);
    });
  },
});

export default TransactionSlice.reducer;

export const {} = TransactionSlice.actions;