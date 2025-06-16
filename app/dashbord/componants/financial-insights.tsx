"use client";
import React from "react";
import CountUp from "react-countup";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const FinancialInsights = () => {
  const insights = [
    {
      title: "Monthly Spending",
      value: "$2,840",
      change: "-12%",
      changeType: "positive",
      description: "vs last month",
    },
    {
      title: "Top Category",
      value: "Food & Dining",
      change: "$485",
      changeType: "neutral",
      description: "this month",
    },
    {
      title: "Savings Rate",
      value: "28%",
      change: "+5%",
      changeType: "positive",
      description: "of income",
    },
  ];

  const spendingCategories = [
    { name: "Food & Dining", amount: 485, percentage: 35, color: "#3B82F6" },
    { name: "Shopping", amount: 320, percentage: 25, color: "#10B981" },
    { name: "Transportation", amount: 195, percentage: 15, color: "#8B5CF6" },
    {
      name: "Bills & Utilities",
      amount: 280,
      percentage: 20,
      color: "#F59E0B",
    },
    { name: "Other", amount: 65, percentage: 5, color: "#6B7280" },
  ];

  // Calculate total spending
  const totalSpending = spendingCategories.reduce(
    (sum, category) => sum + category.amount,
    0
  );

  // Extract numeric value from string (for insights)
  const getNumericValue = (valueStr: string): number => {
    const cleanValue = valueStr.replace(/[$,%]/g, "");
    return parseFloat(cleanValue) || 0;
  };

  // Doughnut chart data for spending categories
  const doughnutData = {
    labels: spendingCategories.map((cat) => cat.name),
    datasets: [
      {
        data: spendingCategories.map((cat) => cat.amount),
        backgroundColor: spendingCategories.map((cat) => cat.color),
        borderColor: spendingCategories.map((cat) => cat.color),
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: {
            label: string;
            parsed: number;
            dataset: { data: number[] };
          }) => {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "70%",
  };

  // Monthly spending trend data
  const monthlySpending = [2100, 2350, 2800, 2650, 2840, 2500];
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Spending",
        data: monthlySpending,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "#3B82F6",
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: { parsed: { y: number } }) => {
            return `$${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: (value: number | string) => `$${Number(value) / 1000}k`,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200/60">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          Financial Insights
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Spending analysis and trends
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Key Insights - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50/50 rounded-lg border border-gray-100"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium text-gray-600 leading-tight">
                  {insight.title}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-md font-medium border ${
                    insight.changeType === "positive"
                      ? "bg-green-50 text-green-600 border-green-200"
                      : "bg-gray-50 text-gray-600 border-gray-200"
                  }`}
                >
                  {insight.change}
                </span>
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">
                {insight.title === "Monthly Spending" ? (
                  <CountUp
                    start={0}
                    end={getNumericValue(insight.value)}
                    duration={2}
                    decimals={0}
                    separator=","
                    prefix="$"
                    preserveValue
                  />
                ) : insight.title === "Savings Rate" ? (
                  <CountUp
                    start={0}
                    end={getNumericValue(insight.value)}
                    duration={2}
                    decimals={0}
                    suffix="%"
                    preserveValue
                  />
                ) : (
                  insight.value
                )}
              </p>
              <p className="text-xs text-gray-500">{insight.description}</p>
            </div>
          ))}
        </div>

        {/* Spending Categories Chart - Responsive Layout */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Spending by Category
          </h3>

          {/* Mobile: Stack vertically, Desktop: Side by side */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
            {/* Chart Container - Responsive sizing */}
            <div className="flex justify-center md:justify-start">
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 relative">
                <Doughnut data={doughnutData} options={doughnutOptions} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                      <CountUp
                        start={0}
                        end={totalSpending}
                        duration={2.5}
                        decimals={0}
                        separator=","
                        prefix="$"
                        preserveValue
                      />
                    </p>
                    <p className="text-xs text-gray-500">Total</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories List - Responsive spacing */}
            <div className="flex-1 min-w-0">
              <div className="space-y-2 sm:space-y-3">
                {spendingCategories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm text-gray-700 truncate">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 ml-2">
                      <CountUp
                        start={0}
                        end={category.amount}
                        duration={1.5 + index * 0.2}
                        decimals={0}
                        separator=","
                        prefix="$"
                        preserveValue
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Spending Trend - Responsive Chart */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Monthly Spending Trend
          </h3>
          {/* Responsive chart height */}
          <div className="h-32 sm:h-36 md:h-40">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialInsights;
