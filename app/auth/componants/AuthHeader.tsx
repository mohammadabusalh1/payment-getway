"use client";

import { motion } from "framer-motion";
import { Sparkles, CreditCard } from "lucide-react";

interface AuthHeaderProps {
  isSignIn: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isSignIn }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8 space-y-6"
    >
      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center justify-center mb-6"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg mr-3">
          <CreditCard className="w-7 h-7 text-white" />
        </div>
        <span className="text-2xl font-bold text-white">WorldPay</span>
      </motion.div>

      {/* Main Header */}
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isSignIn ? "Welcome Back" : "Join WorldPay"}
          </motion.h1>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-blue-400" />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg text-gray-300 font-medium max-w-md mx-auto leading-relaxed"
        >
          {isSignIn
            ? "Sign in to access your payment gateway dashboard"
            : "Create your account and start processing payments"}
        </motion.p>
      </div>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
      >
        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
        <span className="text-sm text-white/80 font-medium">
          {isSignIn ? "Secure Login" : "Free Forever • No Setup Fees"}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default AuthHeader;
