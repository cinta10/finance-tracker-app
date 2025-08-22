"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FinanceCard from "../components/FinanceCard";
import Charts from "../components/Charts";
import TransactionList from "../components/TransactionList";
import { getTransactions } from "../features/transactions/transactionAPI";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, [refreshFlag]);

  const loadTransactions = async () => {
    const res = await getTransactions();
    setTransactions(res.data);
  };

  // Hitung total income, expense, dan saldo
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        {/* Ringkasan Keuangan */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <FinanceCard title="Pemasukan" amount={totalIncome} type="income" />
          <FinanceCard title="Pengeluaran" amount={totalExpense} type="expense" />
          <FinanceCard title="Saldo" amount={balance} type="balance" />
        </div>

        {/* Grafik */}
        <Charts transactions={transactions} />

        {/* Daftar Transaksi Terbaru */}
        <TransactionList refreshFlag={refreshFlag} />
      </div>
    </div>
  );
}
