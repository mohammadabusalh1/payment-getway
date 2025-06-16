"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/logo";
import AuthBackground from "@/app/auth/componants/AuthBackground";
import AuthHeader from "@/app/auth/componants/AuthHeader";
import AuthToggle from "@/app/auth/componants/AuthToggle";
import AuthForm from "@/app/auth/componants/AuthForm";
import SocialAuth from "@/app/auth/componants/SocialAuth";
import AuthFooter from "@/app/auth/componants/AuthFooter";
import { useAuthController } from "@/app/auth/auth.controller";
import Link from "next/link";

const AuthPageContent = () => {
  const {
    // State
    authState,
    formData,
    uiState,

    // Form handlers
    updateFormData,
    handleSubmit,

    // UI handlers
    toggleSignInMode,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,

    // Auth handlers
    handleGoogleSignIn,
    handleGithubSignIn,
  } = useAuthController();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background */}
      <AuthBackground />

      {/* Logo - Top Left */}
      <Link href="/">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-6 left-6 z-20"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <Logo size="lg" />
          </div>
        </motion.div>
      </Link>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Enhanced Header */}
          <AuthHeader isSignIn={uiState.isSignIn} />

          {/* Main Auth Card with 3D Effects */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            {/* Card Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-500/30 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-500 animate-pulse"></div>

            {/* Main Glass Card */}
            <motion.div
              className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl shadow-purple-500/10"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.25)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full translate-y-12 -translate-x-12 blur-2xl"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Toggle Tabs */}
                <AuthToggle
                  isSignIn={uiState.isSignIn}
                  onToggle={toggleSignInMode}
                />

                {/* Form */}
                <AuthForm
                  isSignIn={uiState.isSignIn}
                  formData={formData}
                  errors={authState.errors}
                  isLoading={authState.isLoading}
                  showPassword={uiState.showPassword}
                  showConfirmPassword={uiState.showConfirmPassword}
                  onInputChange={updateFormData}
                  onSubmit={handleSubmit}
                  onTogglePassword={togglePasswordVisibility}
                  onToggleConfirmPassword={toggleConfirmPasswordVisibility}
                />

                {/* Social Authentication */}
                <SocialAuth
                  onGoogleSignIn={handleGoogleSignIn}
                  onGithubSignIn={handleGithubSignIn}
                  isLoading={authState.isLoading}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Footer */}
          <AuthFooter
            isSignIn={uiState.isSignIn}
            onToggleMode={toggleSignInMode}
          />
        </div>
      </div>

      {/* Bottom Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center"
      >
        <div className="flex items-center justify-center space-x-6 text-white/40 text-sm">
          <span>Secure</span>
          <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          <span>Trusted</span>
          <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          <span>Worldwide</span>
        </div>
      </motion.div>
    </div>
  );
};

const AuthPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
};

export default AuthPage;
