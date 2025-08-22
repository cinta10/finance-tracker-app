"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Trigger refresh list setelah tambah transaksi
  const handleTransactionAdded = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <TransactionForm onSuccess={handleTransactionAdded} />
        <TransactionList refreshFlag={refreshFlag} />
      </div>
    </div>
  );
}
