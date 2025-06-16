"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalStore, useHydrateStore } from "@/services/global-store";
import { authService } from "@/services/auth.service";
import {
  Home,
  CreditCard,
  BarChart3,
  ArrowUpDown,
  TrendingUp,
  Receipt,
  Target,
  Wallet,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Shield,
} from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const isHydrated = useHydrateStore();

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await authService.signOut();
      setUser(null);
      router.push("/auth");
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashbord",
      icon: Home,
      description: "Overview & Analytics",
    },
    {
      name: "Accounts",
      href: "/accounts",
      icon: CreditCard,
      description: "Manage your accounts",
    },
    {
      name: "Transactions",
      href: "/transactions",
      icon: BarChart3,
      description: "Transaction history",
    },
    {
      name: "Transfer",
      href: "/transfer",
      icon: ArrowUpDown,
      description: "Send & receive money",
    },
    {
      name: "Investments",
      href: "/investments",
      icon: TrendingUp,
      description: "Portfolio management",
    },
    {
      name: "Bills & Payments",
      href: "/payments",
      icon: Receipt,
      description: "Pay your bills",
    },
    {
      name: "Goals",
      href: "/goals",
      icon: Target,
      description: "Financial goals",
    },
    {
      name: "Cards",
      href: "/cards",
      icon: Wallet,
      description: "Manage your cards",
    },
    {
      name: "Support",
      href: "/support",
      icon: HelpCircle,
      description: "Help & support",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      description: "Account settings",
    },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl border-r border-gray-200/60 flex flex-col z-40 dark:bg-gray-950/80 dark:border-gray-800/60">
        <div
          className={`${
            isCollapsed ? "w-16" : "w-64"
          } transition-all duration-300`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800/50">
            <div className="flex items-center space-x-2">
              {!isCollapsed && (
                <>
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white font-semibold text-xs">WP</span>
                  </div>
                  <div>
                    <h1 className="text-sm font-semibold text-gray-900 dark:text-white">
                      WorldPay
                    </h1>
                  </div>
                </>
              )}
              {isCollapsed && (
                <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm mx-auto">
                  <span className="text-white font-semibold text-xs">WP</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200" />
              )}
            </button>
          </div>

          {/* User Profile */}
          {!isCollapsed && user && isHydrated && (
            <div className="p-4 border-b border-gray-100 dark:border-gray-800/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.href);

              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={` flex ${
                      isCollapsed ? "justify-center" : "justify-start"
                    } items-center space-x-0 px-3 py-2.5 rounded-lg transition-all duration-200 relative ${
                      active
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
                    }`}
                  >
                    <IconComponent
                      className={`w-5 h-5 flex-shrink-0 ${
                        active
                          ? "text-gray-700 dark:text-gray-200"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0 pl-2">
                        <p className="text-sm font-medium truncate">
                          {item.name}
                        </p>
                      </div>
                    )}
                    {active && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600 rounded-r-full" />
                    )}
                  </Link>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-3 px-2 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 top-1/2 -translate-y-1/2">
                      {item.name}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700" />
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-gray-100 dark:border-gray-800/50">
            {!isCollapsed && (
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Shield className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Secure Connection
                  </span>
                </div>
              </div>
            )}

            <div className="relative group">
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className={`flex ${
                  isCollapsed ? "justify-center" : "justify-start"
                } items-center space-x-3 px-0 py-2.5 rounded-lg transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200 w-full disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="text-sm font-medium">
                    {isSigningOut ? "Signing Out..." : "Sign Out"}
                  </span>
                )}
              </button>

              {/* Sign out tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-2 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 top-1/2 -translate-y-1/2">
                  Sign Out
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
