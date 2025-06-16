import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { AuthFormData } from "@/app/auth/auth.model";

interface AuthFormProps {
  isSignIn: boolean;
  formData: AuthFormData;
  errors: Record<string, string>;
  isLoading: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onInputChange: (field: keyof AuthFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isSignIn,
  formData,
  errors,
  isLoading,
  showPassword,
  showConfirmPassword,
  onInputChange,
  onSubmit,
  onTogglePassword,
  onToggleConfirmPassword,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* General error display */}
      {errors.general && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.general}
          </p>
        </div>
      )}

      {/* Name Field (Sign Up Only) */}
      {!isSignIn && (
        <div className="space-y-2 transform transition-all duration-300 ease-out">
          <Label
            htmlFor="name"
            className="text-sm font-semibold text-white dark:text-gray-300"
          >
            Full Name
          </Label>
          <div className="relative group">
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name || ""}
              onChange={(e) => onInputChange("name", e.target.value)}
              required={!isSignIn}
              className={`h-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 transition-all duration-300 focus:scale-[1.02] ${
                errors.name
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200/50 dark:border-gray-600/50 focus:border-blue-500 dark:focus:border-blue-400"
              }`}
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          {errors.name && (
            <p className="text-sm text-red-500 animate-in slide-in-from-left-2 duration-300">
              {errors.name}
            </p>
          )}
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-sm font-semibold text-white dark:text-gray-300"
        >
          Email Address
        </Label>
        <div className="relative group">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            required
            className={`h-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 transition-all duration-300 focus:scale-[1.02] ${
              errors.email
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200/50 dark:border-gray-600/50 focus:border-blue-500 dark:focus:border-blue-400"
            }`}
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        {errors.email && (
          <p className="text-sm text-red-500 animate-in slide-in-from-left-2 duration-300">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-sm font-semibold text-white dark:text-gray-300"
        >
          Password
        </Label>
        <div className="relative group">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => onInputChange("password", e.target.value)}
            required
            className={`h-12 pr-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 transition-all duration-300 focus:scale-[1.02] ${
              errors.password
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200/50 dark:border-gray-600/50 focus:border-blue-500 dark:focus:border-blue-400"
            }`}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 hover:scale-110"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 animate-in slide-in-from-left-2 duration-300">
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password Field (Sign Up Only) */}
      {!isSignIn && (
        <div className="space-y-2 transform transition-all duration-300 ease-out">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-semibold text-white dark:text-gray-300"
          >
            Confirm Password
          </Label>
          <div className="relative group">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword || ""}
              onChange={(e) => onInputChange("confirmPassword", e.target.value)}
              required={!isSignIn}
              className={`h-12 pr-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 transition-all duration-300 focus:scale-[1.02] ${
                errors.confirmPassword
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200/50 dark:border-gray-600/50 focus:border-blue-500 dark:focus:border-blue-400"
              }`}
            />
            <button
              type="button"
              onClick={onToggleConfirmPassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 hover:scale-110"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 animate-in slide-in-from-left-2 duration-300">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      )}

      {/* Remember Me & Forgot Password (Sign In Only) */}
      {isSignIn && (
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-2 transition-all duration-200"
              />
            </div>
            <span className="text-sm font-medium text-white dark:group-hover:text-gray-200 transition-colors">
              Remember me
            </span>
          </label>
          <button
            type="button"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 hover:underline"
          >
            Forgot password?
          </button>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="relative w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-indigo-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative flex items-center justify-center gap-2">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>{isSignIn ? "Sign In" : "Create Account"}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </div>
      </Button>
    </form>
  );
};

export default AuthForm;
