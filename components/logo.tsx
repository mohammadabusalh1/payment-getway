import React from "react";
import { CreditCard, Globe } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = "md",
  showText = true,
  className = "",
}) => {
  const sizeClasses = {
    sm: {
      container: "h-8",
      icon: "w-4 h-4",
      text: "text-lg",
      spacing: "gap-2",
    },
    md: {
      container: "h-12",
      icon: "w-6 h-6",
      text: "text-xl",
      spacing: "gap-3",
    },
    lg: {
      container: "h-16",
      icon: "w-8 h-8",
      text: "text-2xl",
      spacing: "gap-4",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex items-center ${currentSize.spacing} ${className}`}>
      {/* Logo Icon */}
      <div className={`relative ${currentSize.container} aspect-square`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg flex items-center justify-center">
          <div className="relative">
            <Globe className={`${currentSize.icon} text-white/90`} />
            <CreditCard
              className={`${currentSize.icon} text-white absolute -bottom-1 -right-1 scale-75`}
            />
          </div>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-sm opacity-30 -z-10"></div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${currentSize.text}`}
          >
            WorldPay
          </span>
          <span className="text-xs text-muted-foreground font-medium -mt-1">
            Payment Gateway
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
