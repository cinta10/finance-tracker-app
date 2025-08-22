"use client";

export default function FinanceCard({ title, amount, type }) {
  const getColor = () => {
    if (type === "income") return "text-green-600";
    if (type === "expense") return "text-red-600";
    return "text-gray-800";
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
      <h3 className="text-md font-semibold">{title}</h3>
      <p className={`text-xl font-bold mt-2 ${getColor()}`}>
        Rp {amount.toLocaleString("id-ID")}
      </p>
    </div>
  );
}
