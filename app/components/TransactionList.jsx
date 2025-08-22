"use client";

import { useEffect, useState } from "react";
import {
  getTransactions,
  deleteTransaction,
} from "../features/transactions/transactionAPI";

export default function TransactionList({ refreshFlag }) {
  const [transactions, setTransactions] = useState([]);

  // Ambil data saat pertama render atau saat refreshFlag berubah
  useEffect(() => {
    loadTransactions();
  }, [refreshFlag]);

  const loadTransactions = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data);
    } catch (err) {
      console.error("Gagal mengambil data transaksi:", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Hapus transaksi ini?")) {
      await deleteTransaction(id);
      loadTransactions();
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-4">Daftar Transaksi</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Tanggal</th>
            <th className="p-2 border">Kategori</th>
            <th className="p-2 border">Tipe</th>
            <th className="p-2 border">Jumlah</th>
            <th className="p-2 border">Catatan</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((t) => (
              <tr key={t.id}>
                <td className="p-2 border">{t.date}</td>
                <td className="p-2 border">{t.category}</td>
                <td className="p-2 border capitalize">{t.type}</td>
                <td className="p-2 border">Rp {t.amount}</td>
                <td className="p-2 border">{t.note}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
