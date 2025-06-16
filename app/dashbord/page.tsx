"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "../../components/header";
import DataBox from "./componants/data-box";
import AccountCard from "./componants/account-card";
import QuickActions from "./componants/quick-actions";
import FinancialOverview from "./componants/financial-overview";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full mx-auto px-6 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Header subTitle="Your financial overview at a glance" />
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <DataBox
            title="Total Balance"
            subtitle="Across all accounts"
            amount="$24,150.85"
            trend="+2.5%"
            trendColor="success"
          />
          <DataBox
            title="Available"
            subtitle="Ready to use"
            amount="$18,750.32"
            trend="+1.8%"
            trendColor="success"
          />
          <DataBox
            title="Savings"
            subtitle="This month"
            amount="$5,400.53"
            trend="+5.2%"
            trendColor="success"
          />
          <DataBox
            title="Credit"
            subtitle="Available limit"
            amount="$7,500.00"
            trend="0%"
            trendColor="neutral"
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <QuickActions />
        </motion.div>

        <div className="my-8" />

        {/* Accounts Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-purple-500/10 overflow-hidden"
        >
          <div className="p-8 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white mb-2">
              Your Accounts
            </h2>
            <p className="text-gray-300">
              Manage your connected accounts and view balances
            </p>
          </div>
          <div className="p-8 space-y-4">
            <AccountCard
              accountName="Checking Account"
              accountNumber="****1234"
              balance="$12,450.85"
              accountType="checking"
            />
            <AccountCard
              accountName="Savings Account"
              accountNumber="****5678"
              balance="$5,400.53"
              accountType="savings"
            />
            <AccountCard
              accountName="Credit Card"
              accountNumber="****9012"
              balance="$2,500.00"
              accountType="credit"
              limit="$10,000.00"
            />
          </div>
        </motion.div>

        <div className="my-8" />

        {/* Financial Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-purple-500/10 overflow-hidden"
        >
          <div className="p-8 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white mb-2">
              Financial Overview
            </h2>
            <p className="text-gray-300">
              Track your spending patterns and income trends
            </p>
          </div>
          <div className="p-8">
            <FinancialOverview />
          </div>
        </motion.div>

        <div className="my-8" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
