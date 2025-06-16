"use client";

import { motion } from "framer-motion";

interface AuthToggleProps {
  isSignIn: boolean;
  onToggle: () => void;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ isSignIn, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-1.5 mb-8 border border-white/10"
    >
      {/* Active Tab Background */}
      <motion.div
        className="absolute top-1.5 w-[calc(50%-6px)] h-[calc(100%-12px)] bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg"
        animate={{
          x: isSignIn ? 0 : "calc(100% + 12px)",
        }}
        transition={{
          type: "tween",
          duration: 0.3,
          ease: "easeInOut",
        }}
      />

      <div className="relative flex">
        <motion.button
          onClick={() => !isSignIn && onToggle()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-300 relative z-10 ${
            isSignIn ? "text-white" : "text-white/60 hover:text-white/80"
          }`}
        >
          Sign In
        </motion.button>

        <motion.button
          onClick={() => isSignIn && onToggle()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-300 relative z-10 ${
            !isSignIn ? "text-white" : "text-white/60 hover:text-white/80"
          }`}
        >
          Sign Up
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AuthToggle;
