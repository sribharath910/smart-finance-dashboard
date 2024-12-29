import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function ExpenseChart({ expenses }) {
  const labels = expenses.map((expense) => expense.category);
  const data = expenses.map((expense) => expense.amount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Expenses",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="expense-chart">
      <h2>Expense Analysis</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default ExpenseChart;
