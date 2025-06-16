"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGlobalStore } from "@/services/global-store";
import { Bell, Settings, ChevronDown, User, Sparkles } from "lucide-react";

const Header = ({ subTitle }: { subTitle: string }) => {
  const user = useGlobalStore((state) => state.user);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      message: "Payment processed successfully",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      message: "New transaction pending",
      time: "5 min ago",
      read: false,
    },
    {
      id: 3,
      message: "Monthly report available",
      time: "1 hour ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between py-6 px-1 border-b border-white/10"
    >
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent tracking-tight">
            Welcome back,{" "}
            <span className="text-white">{user?.name || "User"}</span>
          </h1>
          <motion.div
            className="h-3 w-3 bg-green-400 rounded-full animate-pulse"
            title="Online"
            whileHover={{ scale: 1.2 }}
          />
        </div>
        <p className="text-lg text-gray-300 font-medium">{subTitle}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <motion.button
            onClick={() => setShowNotifications(!showNotifications)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group backdrop-blur-sm"
          >
            <Bell
              size={22}
              className="group-hover:scale-110 transition-transform"
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                {unreadCount}
              </span>
            )}
          </motion.button>

          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 top-14 w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50"
            >
              <div className="p-6 border-b border-white/10">
                <h3 className="font-bold text-white text-lg">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${
                      !notification.read ? "bg-blue-500/10" : ""
                    }`}
                  >
                    <p className="text-sm text-white font-medium">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-white/10">
                <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">
                  View all notifications
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Settings */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group backdrop-blur-sm"
        >
          <Settings
            size={22}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
        </motion.button>

        {/* User Profile */}
        <div className="relative">
          <motion.button
            onClick={() => setShowProfile(!showProfile)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-all duration-200 group backdrop-blur-sm"
          >
            <div className="relative">
              <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                {user?.name?.charAt(0)?.toUpperCase() || <User size={20} />}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-400 border-2 border-slate-900 rounded-full"></div>
            </div>
            <ChevronDown
              size={18}
              className="text-gray-400 group-hover:text-white transition-colors"
            />
          </motion.button>

          {showProfile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 top-14 w-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50"
            >
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                    {user?.name?.charAt(0)?.toUpperCase() || <User size={24} />}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">
                      {user?.name || "User"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {user?.email || "user@worldpay.com"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <button className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                  Profile Settings
                </button>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                  Account Security
                </button>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                  Help & Support
                </button>
                <hr className="my-2 border-white/10" />
                <button className="w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors">
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfile) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        />
      )}
    </motion.div>
  );
};

export default Header;
