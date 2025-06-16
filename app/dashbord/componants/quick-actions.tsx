import React from "react";
import {
  Send,
  ArrowDownLeft,
  CreditCard,
  MapPin,
  Smartphone,
  ArrowRight,
} from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      icon: Send,
      label: "Send Money",
      description: "Transfer funds instantly",
      color: "from-blue-500/10 to-blue-600/10",
      hoverColor: "hover:from-blue-500/20 hover:to-blue-600/20",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200/50 hover:border-blue-300/70",
    },
    {
      icon: ArrowDownLeft,
      label: "Request Money",
      description: "Request payment easily",
      color: "from-emerald-500/10 to-emerald-600/10",
      hoverColor: "hover:from-emerald-500/20 hover:to-emerald-600/20",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-200/50 hover:border-emerald-300/70",
    },
    {
      icon: CreditCard,
      label: "Pay Bills",
      description: "Manage your payments",
      color: "from-purple-500/10 to-purple-600/10",
      hoverColor: "hover:from-purple-500/20 hover:to-purple-600/20",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200/50 hover:border-purple-300/70",
    },
    {
      icon: MapPin,
      label: "ATM Locator",
      description: "Find nearby ATMs",
      color: "from-teal-500/10 to-teal-600/10",
      hoverColor: "hover:from-teal-500/20 hover:to-teal-600/20",
      iconColor: "text-teal-600",
      borderColor: "border-teal-200/50 hover:border-teal-300/70",
    },
    {
      icon: Smartphone,
      label: "Mobile Deposit",
      description: "Deposit checks remotely",
      color: "from-rose-500/10 to-rose-600/10",
      hoverColor: "hover:from-rose-500/20 hover:to-rose-600/20",
      iconColor: "text-rose-600",
      borderColor: "border-rose-200/50 hover:border-rose-300/70",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage your banking tasks efficiently
            </p>
          </div>
          <div className="flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <span className="text-sm">View all</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                className={`group relative overflow-hidden rounded-xl border ${action.borderColor} bg-gradient-to-br ${action.color} ${action.hoverColor} p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/20`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div
                    className={`p-2 rounded-lg bg-white/50 ${action.iconColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900 text-sm">
                      {action.label}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-600 transition-colors">
                      {action.description}
                    </p>
                  </div>
                </div>

                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
