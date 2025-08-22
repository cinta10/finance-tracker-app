"use client";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import transactionReducer from "../features/transactions/transactionSlice";

const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
