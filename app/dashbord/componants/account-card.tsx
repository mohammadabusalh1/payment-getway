"use client";
import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Wallet, PiggyBank, CreditCard } from "lucide-react";

const AccountCard = ({
  accountName,
  accountNumber,
  balance,
  accountType,
  limit,
}: {
  accountName: string;
  accountNumber: string;
  balance: string;
  accountType: "checking" | "savings" | "credit";
  limit?: string;
}) => {
  const getAccountIcon = () => {
    switch (accountType) {
      case "checking":
        return <Wallet className="w-5 h-5 text-blue-400" />;
      case "savings":
        return <PiggyBank className="w-5 h-5 text-green-400" />;
      case "credit":
        return <CreditCard className="w-5 h-5 text-purple-400" />;
      default:
        return <Wallet className="w-5 h-5 text-blue-400" />;
    }
  };

  const getAccountGradient = () => {
    switch (accountType) {
      case "checking":
        return "from-blue-500/20 to-cyan-500/20";
      case "savings":
        return "from-green-500/20 to-emerald-500/20";
      case "credit":
        return "from-purple-500/20 to-pink-500/20";
      default:
        return "from-blue-500/20 to-cyan-500/20";
    }
  };

  const getIconBackground = () => {
    switch (accountType) {
      case "checking":
        return "bg-gradient-to-br from-blue-500 to-cyan-500";
      case "savings":
        return "bg-gradient-to-br from-green-500 to-emerald-500";
      case "credit":
        return "bg-gradient-to-br from-purple-500 to-pink-500";
      default:
        return "bg-gradient-to-br from-blue-500 to-cyan-500";
    }
  };

  // Extract numeric value from balance string
  const getNumericValue = (balanceStr: string): number => {
    const cleanBalance = balanceStr.replace(/[$,]/g, "");
    return parseFloat(cleanBalance) || 0;
  };

  const balanceValue = getNumericValue(balance);
  const limitValue = limit ? getNumericValue(limit) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2 },
      }}
      className="relative group"
    >
      {/* Glow Effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${getAccountGradient()} rounded-xl blur opacity-20 group-hover:opacity-40 transition-all duration-300`}
      ></div>

      {/* Main Card */}
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300">
        {/* Decorative Element */}
        <div
          className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${getAccountGradient()} rounded-full -translate-y-8 translate-x-8 blur-xl opacity-50`}
        ></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Icon */}
              <motion.div
                className={`w-12 h-12 flex items-center justify-center ${getIconBackground()} rounded-xl shadow-lg`}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {getAccountIcon()}
              </motion.div>

              {/* Account Info */}
              <div>
                <h3 className="font-semibold text-white text-base mb-1">
                  {accountName}
                </h3>
                <p className="text-sm text-gray-400 font-mono">
                  {accountNumber}
                </p>
              </div>
            </div>

            {/* Balance */}
            <div className="text-right">
              <p className="font-bold text-white text-lg">
                <CountUp
                  start={0}
                  end={balanceValue}
                  duration={2}
                  decimals={2}
                  decimal="."
                  separator=","
                  prefix="$"
                  preserveValue
                />
              </p>
              {limit && accountType === "credit" && (
                <p className="text-sm text-gray-400">
                  Limit:{" "}
                  <CountUp
                    start={0}
                    end={limitValue}
                    duration={1.5}
                    decimals={0}
                    separator=","
                    prefix="$"
                    preserveValue
                  />
                </p>
              )}
            </div>
          </div>

          {/* Progress Bar for Credit Cards */}
          {accountType === "credit" && limit && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-4"
            >
              <div className="w-full bg-white/10 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(balanceValue / limitValue) * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {Math.round((balanceValue / limitValue) * 100)}% utilized
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AccountCard;
