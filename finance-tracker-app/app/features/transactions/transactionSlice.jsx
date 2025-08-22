import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "./transactionAPI";

// Thunks
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async () => {
    const res = await getTransactions();
    return res.data;
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (data) => {
    const res = await createTransaction(data);
    return res.data;
  }
);

export const editTransaction = createAsyncThunk(
  "transactions/edit",
  async ({ id, data }) => {
    const res = await updateTransaction(id, data);
    return res.data;
  }
);

export const removeTransaction = createAsyncThunk(
  "transactions/remove",
  async (id) => {
    await deleteTransaction(id);
    return id;
  }
);

// Slice
const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export default transactionSlice.reducer;
