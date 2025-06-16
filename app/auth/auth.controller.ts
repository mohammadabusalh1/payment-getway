import { useState, useCallback } from "react";
import { z } from "zod";
import {
  AuthFormData,
  AuthState,
  signInSchema,
  signUpSchema,
  SignInData,
  SignUpData,
} from "@/app/auth/auth.model";
import { authService } from "@/services/auth.service";
import { useGlobalStore } from "@/services/global-store";
import { logger } from "@/lib/logger";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const useAuthController = () => {
  const { setUser } = useGlobalStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Detect auth mode from URL parameters
  const getInitialAuthMode = () => {
    const mode = searchParams?.get("mode");
    return mode === "signup" ? false : true; // default to sign in
  };

  const [authState, setAuthState] = useState<AuthState>({
    isLoading: false,
    errors: {},
    user: null,
    isAuthenticated: false,
  });

  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [uiState, setUiState] = useState({
    isSignIn: getInitialAuthMode(),
    showPassword: false,
    showConfirmPassword: false,
  });

  // Update form data
  const updateFormData = useCallback(
    (field: keyof AuthFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error for the field being changed
      if (authState.errors[field]) {
        setAuthState((prev) => ({
          ...prev,
          errors: { ...prev.errors, [field]: "" },
        }));
      }
    },
    [authState.errors]
  );

  // Toggle UI states
  const toggleSignInMode = useCallback(() => {
    setUiState((prev) => ({ ...prev, isSignIn: !prev.isSignIn }));
    setAuthState((prev) => ({ ...prev, errors: {} }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setUiState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setUiState((prev) => ({
      ...prev,
      showConfirmPassword: !prev.showConfirmPassword,
    }));
  }, []);

  // Validation
  const validateForm = useCallback(
    (isSignIn: boolean): boolean => {
      try {
        if (isSignIn) {
          signInSchema.parse({
            email: formData.email,
            password: formData.password,
          });
        } else {
          signUpSchema.parse({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          });
        }
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formErrors: Record<string, string> = {};
          error.errors.forEach((err) => {
            if (err.path) {
              formErrors[err.path[0] as string] = err.message;
            }
          });
          setAuthState((prev) => ({ ...prev, errors: formErrors }));
        }
        return false;
      }
    },
    [formData]
  );

  // Authentication handlers
  const handleSignIn = useCallback(async (): Promise<boolean> => {
    if (!validateForm(true)) {
      logger.logAuth("login_validation_failed", {
        email: formData.email,
        success: false,
        reason: "form_validation_error",
        metadata: { formErrors: authState.errors },
      });
      return false;
    }

    setAuthState((prev) => ({ ...prev, isLoading: true, errors: {} }));

    logger.info("Sign in attempt started", {
      category: "AUTH",
      metadata: { email: formData.email },
    });

    try {
      const signInData: SignInData = {
        email: formData.email,
        password: formData.password,
      };

      const response = await authService.signIn(signInData);

      if (response.success && response.user) {
        logger.logAuth("login", {
          userId: response.user.id,
          email: response.user.email,
          success: true,
          metadata: {
            loginMethod: "email_password",
            userAgent:
              typeof window !== "undefined"
                ? window.navigator.userAgent
                : "unknown",
          },
        });

        setAuthState((prev) => ({
          ...prev,
          user: response.user!,
          isAuthenticated: true,
          isLoading: false,
        }));

        // Update global store
        setUser(response.user);

        // Store token in localStorage
        if (response.token && typeof window !== "undefined") {
          localStorage.setItem("auth_token", response.token);
          localStorage.setItem("user_data", JSON.stringify(response.user));
        }

        return true;
      } else {
        logger.logAuth("login", {
          email: formData.email,
          success: false,
          reason: response.message || "authentication_failed",
          metadata: { response: response.message },
        });

        setAuthState((prev) => ({
          ...prev,
          errors: { general: response.message || "Sign in failed" },
          isLoading: false,
        }));
        return false;
      }
    } catch (error) {
      logger.error("Sign in error occurred", {
        category: "AUTH",
        metadata: {
          email: formData.email,
          error: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
        },
      });

      setAuthState((prev) => ({
        ...prev,
        errors: { general: "An unexpected error occurred" },
        isLoading: false,
      }));
      return false;
    }
  }, [formData, validateForm, setUser, authState.errors]);

  const handleSignUp = useCallback(async (): Promise<boolean> => {
    if (!validateForm(false)) {
      logger.logAuth("registration_validation_failed", {
        email: formData.email,
        success: false,
        reason: "form_validation_error",
        metadata: { formErrors: authState.errors },
      });
      return false;
    }

    setAuthState((prev) => ({ ...prev, isLoading: true, errors: {} }));

    logger.info("Sign up attempt started", {
      category: "AUTH",
      metadata: { email: formData.email, name: formData.name },
    });

    try {
      const signUpData: SignUpData = {
        name: formData.name!,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword!,
      };

      const response = await authService.signUp(signUpData);

      if (response.success && response.user) {
        logger.logAuth("registration", {
          userId: response.user.id,
          email: response.user.email,
          success: true,
          metadata: {
            name: response.user.name,
            registrationMethod: "email_password",
            userAgent:
              typeof window !== "undefined"
                ? window.navigator.userAgent
                : "unknown",
          },
        });

        setAuthState((prev) => ({
          ...prev,
          user: response.user!,
          isAuthenticated: true,
          isLoading: false,
        }));

        // Update global store
        setUser(response.user);

        // Store token in localStorage
        if (response.token && typeof window !== "undefined") {
          localStorage.setItem("auth_token", response.token);
          localStorage.setItem("user_data", JSON.stringify(response.user));
        }

        return true;
      } else {
        logger.logAuth("registration", {
          email: formData.email,
          success: false,
          reason: response.message || "registration_failed",
          metadata: { response: response.message },
        });

        setAuthState((prev) => ({
          ...prev,
          errors: { general: response.message || "Sign up failed" },
          isLoading: false,
        }));
        return false;
      }
    } catch (error) {
      logger.error("Sign up error occurred", {
        category: "AUTH",
        metadata: {
          email: formData.email,
          name: formData.name,
          error: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
        },
      });

      setAuthState((prev) => ({
        ...prev,
        errors: { general: "An unexpected error occurred" },
        isLoading: false,
      }));
      return false;
    }
  }, [formData, validateForm, setUser, authState.errors]);

  // Social authentication handlers
  const handleGoogleSignIn = useCallback(async (): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    logger.info("Google sign in attempt started", {
      category: "AUTH",
      metadata: { loginMethod: "google_oauth" },
    });

    try {
      const response = await authService.signInWithGoogle();

      if (response.success && response.user) {
        logger.logAuth("login", {
          userId: response.user.id,
          email: response.user.email,
          success: true,
          metadata: {
            loginMethod: "google_oauth",
            name: response.user.name,
            userAgent:
              typeof window !== "undefined"
                ? window.navigator.userAgent
                : "unknown",
          },
        });

        setAuthState((prev) => ({
          ...prev,
          user: response.user!,
          isAuthenticated: true,
          isLoading: false,
        }));

        setUser(response.user);

        if (response.token && typeof window !== "undefined") {
          localStorage.setItem("auth_token", response.token);
          localStorage.setItem("user_data", JSON.stringify(response.user));
        }

        return true;
      }

      logger.logAuth("login", {
        success: false,
        reason: response.message || "google_oauth_failed",
        metadata: {
          loginMethod: "google_oauth",
          response: response.message,
        },
      });

      setAuthState((prev) => ({
        ...prev,
        errors: { general: response.message || "Google sign in failed" },
        isLoading: false,
      }));
      return false;
    } catch (error) {
      logger.error("Google sign in error occurred", {
        category: "AUTH",
        metadata: {
          loginMethod: "google_oauth",
          error: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
        },
      });

      setAuthState((prev) => ({
        ...prev,
        errors: { general: "Google sign in failed" },
        isLoading: false,
      }));
      return false;
    }
  }, [setUser]);

  const handleGithubSignIn = useCallback(async (): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    logger.info("GitHub sign in attempt started", {
      category: "AUTH",
      metadata: { loginMethod: "github_oauth" },
    });

    try {
      const response = await authService.signInWithGithub();

      if (response.success && response.user) {
        logger.logAuth("login", {
          userId: response.user.id,
          email: response.user.email,
          success: true,
          metadata: {
            loginMethod: "github_oauth",
            name: response.user.name,
            userAgent:
              typeof window !== "undefined"
                ? window.navigator.userAgent
                : "unknown",
          },
        });

        setAuthState((prev) => ({
          ...prev,
          user: response.user!,
          isAuthenticated: true,
          isLoading: false,
        }));

        setUser(response.user);

        if (response.token && typeof window !== "undefined") {
          localStorage.setItem("auth_token", response.token);
          localStorage.setItem("user_data", JSON.stringify(response.user));
        }

        return true;
      }

      logger.logAuth("login", {
        success: false,
        reason: response.message || "github_oauth_failed",
        metadata: {
          loginMethod: "github_oauth",
          response: response.message,
        },
      });

      setAuthState((prev) => ({
        ...prev,
        errors: { general: response.message || "GitHub sign in failed" },
        isLoading: false,
      }));
      return false;
    } catch (error) {
      logger.error("GitHub sign in error occurred", {
        category: "AUTH",
        metadata: {
          loginMethod: "github_oauth",
          error: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
        },
      });

      setAuthState((prev) => ({
        ...prev,
        errors: { general: "GitHub sign in failed" },
        isLoading: false,
      }));
      return false;
    }
  }, [setUser]);

  // Main form submission handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();

      const success = uiState.isSignIn
        ? await handleSignIn()
        : await handleSignUp();

      if (success) {
        // Redirect to dashboard or handle success
        console.log("Authentication successful");
        router.push("/dashbord");
      }
    },
    [uiState.isSignIn, handleSignIn, handleSignUp]
  );

  // Sign out handler
  const handleSignOut = useCallback(async (): Promise<void> => {
    const currentUser = authState.user;

    logger.info("Sign out attempt started", {
      category: "AUTH",
      userId: currentUser?.id,
      metadata: { email: currentUser?.email },
    });

    try {
      await authService.signOut();

      logger.logAuth("logout", {
        userId: currentUser?.id,
        email: currentUser?.email,
        success: true,
        metadata: {
          logoutMethod: "manual",
          sessionDuration: "unknown", // You could calculate this if you track login time
        },
      });

      setAuthState({
        isLoading: false,
        errors: {},
        user: null,
        isAuthenticated: false,
      });

      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
      });

      setUser(null);

      // Clear stored auth data
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
      }
    } catch (error) {
      logger.error("Sign out error occurred", {
        category: "AUTH",
        userId: currentUser?.id,
        metadata: {
          email: currentUser?.email,
          error: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
        },
      });
    }
  }, [setUser, authState.user]);

  return {
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
    handleSignIn,
    handleSignUp,
    handleSignOut,
    handleGoogleSignIn,
    handleGithubSignIn,
  };
};
