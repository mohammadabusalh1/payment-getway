"use client";
import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const DataBox = ({
  title,
  subtitle,
  amount,
  trend,
  trendColor = "neutral",
}: {
  title: string;
  subtitle: string;
  amount: string;
  trend?: string;
  trendColor?: "success" | "danger" | "neutral";
}) => {
  const getTrendColor = () => {
    switch (trendColor) {
      case "success":
        return "text-green-400 bg-green-500/20 border-green-400/30";
      case "danger":
        return "text-red-400 bg-red-500/20 border-red-400/30";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-400/30";
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;

    switch (trendColor) {
      case "success":
        return <TrendingUp className="w-3 h-3" />;
      case "danger":
        return <TrendingDown className="w-3 h-3" />;
      default:
        return <Minus className="w-3 h-3" />;
    }
  };

  // Extract numeric value from amount string
  const getNumericValue = (amountStr: string): number => {
    const cleanAmount = amountStr.replace(/[$,]/g, "");
    return parseFloat(cleanAmount) || 0;
  };

  const numericValue = getNumericValue(amount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="relative group"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-all duration-300"></div>

      {/* Main Card */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full -translate-y-10 translate-x-10 blur-xl"></div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-1">{title}</p>
              <p className="text-xs text-gray-400">{subtitle}</p>
            </div>
            {trend && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className={`text-xs px-2 py-1 rounded-lg font-medium border backdrop-blur-sm flex items-center gap-1 ${getTrendColor()}`}
              >
                {getTrendIcon()}
                {trend}
              </motion.span>
            )}
          </div>

          <div className="text-3xl font-bold text-white tracking-tight">
            <CountUp
              start={0}
              end={numericValue}
              duration={2.5}
              decimals={numericValue % 1 !== 0 ? 2 : 0}
              decimal="."
              separator=","
              prefix="$"
              preserveValue
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DataBox;
