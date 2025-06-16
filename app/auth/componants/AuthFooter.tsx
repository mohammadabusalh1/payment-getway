"use client";

import { motion } from "framer-motion";

interface AuthFooterProps {
  isSignIn: boolean;
  onToggleMode: () => void;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ isSignIn, onToggleMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="text-center mt-8 space-y-6"
    >
      <div className="text-lg text-gray-300">
        {isSignIn ? (
          <p>
            Don&apos;t have an account?{" "}
            <motion.button
              onClick={onToggleMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-300 transition-all duration-200"
            >
              Sign up for free
            </motion.button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <motion.button
              onClick={onToggleMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-300 transition-all duration-200"
            >
              Sign in here
            </motion.button>
          </p>
        )}
      </div>

      {/* Enhanced Terms */}
      <div className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">
        By continuing, you agree to our{" "}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200 underline underline-offset-2"
        >
          Terms of Service
        </motion.a>{" "}
        and{" "}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200 underline underline-offset-2"
        >
          Privacy Policy
        </motion.a>
        .
      </div>

      {/* Security Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex items-center justify-center space-x-4 text-xs text-gray-500"
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>SSL Protected</span>
        </div>
        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span>GDPR Compliant</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthFooter;
