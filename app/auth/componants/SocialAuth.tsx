import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

interface SocialAuthProps {
  onGoogleSignIn: () => void;
  onGithubSignIn: () => void;
  isLoading: boolean;
}

const SocialAuth: React.FC<SocialAuthProps> = ({
  onGoogleSignIn,
  onGithubSignIn,
  isLoading,
}) => {
  return (
    <>
      {/* Enhanced Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 py-1 text-sm font-medium text-gray-500 dark:text-gray-400 rounded-full border border-gray-200/50 dark:border-gray-700/50">
            Or continue with
          </span>
        </div>
      </div>

      {/* Enhanced Social Login */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={onGithubSignIn}
          className="relative h-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 hover:scale-[1.02] group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center gap-2">
            <Github className="w-5 h-5" />
            <span className="font-semibold">GitHub</span>
          </div>
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={onGoogleSignIn}
          className="relative h-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 hover:scale-[1.02] group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <span className="font-semibold">Google</span>
          </div>
        </Button>
      </div>
    </>
  );
};

export default SocialAuth;
