"use client";
import React from "react";
import CountUp from "react-countup";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const FinancialOverview = () => {
  // Account balance trend data (last 12 months)
  const balanceData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Balance",
        data: [
          18500, 19200, 20100, 21500, 22300, 21800, 22900, 23400, 23100, 23800,
          24200, 24150,
        ],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
      {
        label: "Savings",
        data: [
          3200, 3400, 3800, 4100, 4300, 4200, 4600, 4900, 5100, 5200, 5300,
          5400,
        ],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
    ],
  };

  const balanceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            return `${
              context.dataset.label
            }: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: (value: any) => `$${(value / 1000).toFixed(0)}k`,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  // Investment portfolio performance
  const portfolioData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Portfolio Value",
        data: [
          15000, 15800, 14900, 16200, 17100, 16800, 18200, 17900, 18800, 19400,
          19100, 19650,
        ],
        borderColor: "#8B5CF6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#8B5CF6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
    ],
  };

  const portfolioOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            return `Portfolio: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: (value: any) => `$${(value / 1000).toFixed(0)}k`,
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
    <div className="space-y-6">
      {/* Account Balance Trend */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Account Balance Trend
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Last 12 months
            </span>
          </div>
        </div>
        <div className="h-64">
          <Line data={balanceData} options={balanceOptions} />
        </div>
      </div>

      {/* Investment Portfolio Performance */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Investment Portfolio
            </h2>
            <p className="text-sm text-muted-foreground">
              Current value:{" "}
              <CountUp
                start={0}
                end={19650}
                duration={2.5}
                decimals={0}
                separator=","
                prefix="$"
                preserveValue
              />
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-semibold text-green-600">
                +
                <CountUp
                  start={0}
                  end={4650}
                  duration={2}
                  decimals={0}
                  separator=","
                  prefix="$"
                  preserveValue
                />
              </span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                +
                <CountUp
                  start={0}
                  end={31.0}
                  duration={2.2}
                  decimals={1}
                  suffix="%"
                  preserveValue
                />
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Since January</p>
          </div>
        </div>
        <div className="h-48">
          <Line data={portfolioData} options={portfolioOptions} />
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Best Month
            </span>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              📈
            </span>
          </div>
          <p className="text-lg font-bold text-foreground">August</p>
          <p className="text-xs text-muted-foreground">
            +
            <CountUp
              start={0}
              end={1300}
              duration={1.8}
              decimals={0}
              separator=","
              prefix="$"
              preserveValue
            />{" "}
            increase
          </p>
        </div>

        <div className="bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Avg. Monthly Growth
            </span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
              ⬆️
            </span>
          </div>
          <p className="text-lg font-bold text-foreground">
            <CountUp
              start={0}
              end={2.8}
              duration={2}
              decimals={1}
              suffix="%"
              preserveValue
            />
          </p>
          <p className="text-xs text-muted-foreground">Consistent growth</p>
        </div>

        <div className="bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Risk Score
            </span>
            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
              ⚡
            </span>
          </div>
          <p className="text-lg font-bold text-foreground">Moderate</p>
          <p className="text-xs text-muted-foreground">Balanced portfolio</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;
