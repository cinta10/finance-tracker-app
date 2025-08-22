"use client";

import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default function Charts({ transactions }) {
  // Pisahkan pemasukan & pengeluaran
  const incomeData = transactions.filter((t) => t.type === "income");
  const expenseData = transactions.filter((t) => t.type === "expense");

  // Total per kategori (untuk Pie Chart)
  const incomeByCategory = incomeData.reduce((acc, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + Number(cur.amount);
    return acc;
  }, {});

  const expenseByCategory = expenseData.reduce((acc, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + Number(cur.amount);
    return acc;
  }, {});

  // Pie Chart Data
  const pieData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        label: "Pengeluaran",
        data: Object.values(expenseByCategory),
        backgroundColor: ["#f87171", "#fb923c", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa"],
      },
    ],
  };

  // Line Chart Data (tanggal vs total income & expense)
  const dates = [...new Set(transactions.map((t) => t.date))].sort();
  const lineData = {
    labels: dates,
    datasets: [
      {
        label: "Pemasukan",
        data: dates.map((d) =>
          incomeData
            .filter((t) => t.date === d)
            .reduce((sum, t) => sum + Number(t.amount), 0)
        ),
        borderColor: "#34d399",
        backgroundColor: "#34d399",
        tension: 0.3,
      },
      {
        label: "Pengeluaran",
        data: dates.map((d) =>
          expenseData
            .filter((t) => t.date === d)
            .reduce((sum, t) => sum + Number(t.amount), 0)
        ),
        borderColor: "#f87171",
        backgroundColor: "#f87171",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4">Grafik Pengeluaran per Kategori</h3>
        <Pie data={pieData} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-semibold mb-4">Tren Pemasukan & Pengeluaran</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
}
