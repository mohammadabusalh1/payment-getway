"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import { useGlobalStore } from "@/services/global-store";
import { useRouter } from "next/navigation";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  // Routes where sidebar should be hidden
  const excludedRoutes = ["/auth", "/", "/sentry-example-page"];
  const shouldShowSidebar = !excludedRoutes.includes(pathname);

  const isAuthenticated = useGlobalStore((state) => state.user) !== null;

  useEffect(() => {
    if (!isAuthenticated && shouldShowSidebar) {
      router.push("/auth");
    }
  }, [isAuthenticated, router, shouldShowSidebar]);

  // Handle window resize
  useEffect(() => {
    /**
     * Handles window resize events.
     * Checks if the window width is less than 768px (mobile) and sets the isMobile state accordingly.
     */
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle escape key to close mobile sidebar
  useEffect(() => {
    /**
     * Handles keydown event.
     * If the event key is "Escape", mobile layout is active and sidebar is open, it closes the sidebar.
     * @param {KeyboardEvent} event - Keydown event.
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    if (shouldShowSidebar) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isMobile, sidebarOpen, shouldShowSidebar]);

  // Handle body scroll lock when mobile sidebar is open
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, sidebarOpen]);

  // If sidebar should be hidden, render children only
  if (!shouldShowSidebar) {
    return (
      <div className="min-h-screen">
        <main role="main" className="w-full">
          {children}
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-ping" />
        </div>

        {/* Loading Content */}
        <div className="relative z-10 flex flex-col items-center space-y-8">
          {/* WorldPay Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl animate-bounce">
              <span className="text-white font-bold text-lg">WP</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              WorldPay
            </h1>
          </div>

          {/* Loading Spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-500 rounded-full animate-spin animation-delay-150"></div>
          </div>

          {/* Loading Text */}
          <div className="text-center space-y-2">
            <p className="text-white/90 text-lg font-medium animate-pulse">
              Loading your dashboard...
            </p>
            <p className="text-white/60 text-sm">
              Please wait while we prepare your experience
            </p>
          </div>

          {/* Loading Dots */}
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-100"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar */}
      <aside
        role="complementary"
        aria-label="Main navigation"
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "relative"
        }`}
      >
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Mobile header with menu button */}
        {isMobile && (
          <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between lg:hidden z-30">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Open sidebar"
              aria-expanded={sidebarOpen}
              aria-controls="sidebar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-semibold text-xs">WP</span>
              </div>
              <h1 className="text-lg font-semibold text-gray-900">WorldPay</h1>
            </div>
          </header>
        )}

        {/* Main content area */}
        <main
          role="main"
          className={`flex-1 transition-all duration-300 ease-in-out ${
            !isMobile ? "pl-0" : "pl-0"
          }`}
          style={{
            minHeight: isMobile ? "calc(100vh - 64px)" : "100vh",
          }}
        >
          <div className="h-full w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default LayoutWrapper;
