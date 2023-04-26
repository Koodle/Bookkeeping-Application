import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

//services
import TransactionsService from "../../services/transactionsService";

// Define a type for the slice state
// interface CounterState {
//   value: number;
//  transactions: [] any
// }

// Define the initial state using that type
// const initialState: CounterState = {
//   value: 0,
// };

// // Workaround: cast state instead of declaring variable type
// const initialState = {
//   value: 0
// } as CounterState

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

const initialState = {
  transactions: [], //TODO: get from local storage if exists
  ledgers: [],
} as any;

export const TransactionSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
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

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

// export default counterSlice.reducer;
