import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthResponse, SignInData, SignUpData } from "@/app/auth/auth.model";
import { User, UserRole, UserStatus, UserService } from "@/models";

class AuthService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

  async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const firebaseUser = userCredential.user;

      // Get user data from Firestore using UserService
      const userResult = await UserService.getUserById(firebaseUser.uid);
      let user: User;

      if (userResult.success && userResult.user) {
        user = userResult.user;
        user.token = await firebaseUser.getIdToken();

        // Update last login
        await UserService.updateLastLogin(firebaseUser.uid);
      } else {
        // Fallback to creating basic user if not found in Firestore
        const token = await firebaseUser.getIdToken();
        user = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email!,
          token,
          createdAt: new Date(),
          updatedAt: new Date(),
          isEmailVerified: firebaseUser.emailVerified,
          role: UserRole.USER,
          status: UserStatus.ACTIVE,
        };
      }

      return {
        success: true,
        user,
        token: user.token,
        message: "Sign in successful",
      };
    } catch (error) {
      console.error("Sign in error:", error);
      return {
        success: false,
        message: this.getErrorMessage(error),
      };
    }
  }

  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const firebaseUser = userCredential.user;

      // Update the user's display name
      await updateProfile(firebaseUser, {
        displayName: data.name,
      });

      // Create user document in Firestore using UserService
      const token = await firebaseUser.getIdToken();
      const userResult = await UserService.createUser(firebaseUser.uid, {
        name: data.name,
        email: data.email,
        token,
        isEmailVerified: false,
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
      });

      if (!userResult.success) {
        throw new Error(userResult.error || "Failed to create user profile");
      }

      const user = userResult.user!;

      return {
        success: true,
        user,
        token: user.token,
        message: "Account created successfully",
      };
    } catch (error) {
      console.error("Sign up error:", error);
      return {
        success: false,
        message: this.getErrorMessage(error),
      };
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(auth);

      // Clear any stored tokens
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
      }
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const user = auth.currentUser;
      if (user) {
        const newToken = await user.getIdToken(true); // Force refresh
        return {
          success: true,
          token: newToken,
          message: "Token refreshed successfully",
        };
      } else {
        return {
          success: false,
          message: "No authenticated user found",
        };
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      return {
        success: false,
        message: "Token refresh failed",
      };
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      // In a real implementation, you would verify the token with Firebase Admin SDK
      // For client-side, we check if current user exists and token is valid
      const user = auth.currentUser;
      if (user) {
        const currentToken = await user.getIdToken();
        return currentToken === token;
      }
      return false;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  }

  // Social authentication methods
  async signInWithGoogle(): Promise<AuthResponse> {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");

      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Get or create user data using UserService
      const userResult = await UserService.getUserById(firebaseUser.uid);
      let user: User;

      if (userResult.success && userResult.user) {
        // User exists, update last login
        user = userResult.user;
        await UserService.updateLastLogin(firebaseUser.uid);
      } else {
        // User doesn't exist, create new user
        const createResult = await UserService.createUser(firebaseUser.uid, {
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email!,
          isEmailVerified: firebaseUser.emailVerified,
          role: UserRole.USER,
          status: UserStatus.ACTIVE,
        });

        if (!createResult.success) {
          throw new Error(
            createResult.error || "Failed to create user profile"
          );
        }

        user = createResult.user!;
      }

      const token = await firebaseUser.getIdToken();
      user.token = token;

      return {
        success: true,
        user,
        token: user.token,
        message: "Google sign in successful",
      };
    } catch (error) {
      console.error("Google sign in error:", error);
      return {
        success: false,
        message: this.getErrorMessage(error),
      };
    }
  }

  async signInWithGithub(): Promise<AuthResponse> {
    try {
      const provider = new GithubAuthProvider();
      provider.addScope("user:email");

      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Get or create user data using UserService
      const userResult = await UserService.getUserById(firebaseUser.uid);
      let user: User;

      if (userResult.success && userResult.user) {
        // User exists, update last login
        user = userResult.user;
        await UserService.updateLastLogin(firebaseUser.uid);
      } else {
        // User doesn't exist, create new user
        const createResult = await UserService.createUser(firebaseUser.uid, {
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email!,
          isEmailVerified: firebaseUser.emailVerified,
          role: UserRole.USER,
          status: UserStatus.ACTIVE,
        });

        if (!createResult.success) {
          throw new Error(
            createResult.error || "Failed to create user profile"
          );
        }

        user = createResult.user!;
      }

      const token = await firebaseUser.getIdToken();
      user.token = token;

      return {
        success: true,
        user,
        token: user.token,
        message: "GitHub sign in successful",
      };
    } catch (error) {
      console.error("GitHub sign in error:", error);
      return {
        success: false,
        message: this.getErrorMessage(error),
      };
    }
  }

  // Additional Firebase-specific methods
  async sendPasswordResetEmail(email: string): Promise<AuthResponse> {
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
        message: "Password reset email sent successfully",
      };
    } catch (error) {
      console.error("Password reset error:", error);
      return {
        success: false,
        message: this.getErrorMessage(error),
      };
    }
  }

  /**
   * Get current user
   */
  getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        unsubscribe();
        if (firebaseUser) {
          const userResult = await UserService.getUserById(firebaseUser.uid);
          if (userResult.success && userResult.user) {
            const user = userResult.user;
            user.token = await firebaseUser.getIdToken();
            resolve(user);
          } else {
            // Fallback if user not found in Firestore
            const user: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || "User",
              email: firebaseUser.email!,
              token: await firebaseUser.getIdToken(),
              createdAt: new Date(),
              updatedAt: new Date(),
              isEmailVerified: firebaseUser.emailVerified,
              role: UserRole.USER,
              status: UserStatus.ACTIVE,
            };
            resolve(user);
          }
        } else {
          resolve(null);
        }
      });
    });
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userResult = await UserService.getUserById(firebaseUser.uid);
        if (userResult.success && userResult.user) {
          const user = userResult.user;
          user.token = await firebaseUser.getIdToken();
          callback(user);
        } else {
          // Fallback if user not found in Firestore
          const user: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || "User",
            email: firebaseUser.email!,
            token: await firebaseUser.getIdToken(),
            createdAt: new Date(),
            updatedAt: new Date(),
            isEmailVerified: firebaseUser.emailVerified,
            role: UserRole.USER,
            status: UserStatus.ACTIVE,
          };
          callback(user);
        }
      } else {
        callback(null);
      }
    });
  }

  /**
   * Update user profile
   */
  async updateUserProfile(
    uid: string,
    updates: {
      name?: string;
      email?: string;
      phoneNumber?: string;
      profileImage?: string;
    }
  ): Promise<AuthResponse> {
    try {
      const result = await UserService.updateUser(uid, updates);

      if (result.success && result.user) {
        return {
          success: true,
          user: result.user,
          message: "Profile updated successfully",
        };
      } else {
        return {
          success: false,
          message: result.error || "Failed to update profile",
        };
      }
    } catch (error) {
      console.error("Update profile error:", error);
      return {
        success: false,
        message: this.getErrorMessage(error),
      };
    }
  }

  /**
   * Delete user account
   */
  async deleteUserAccount(uid: string): Promise<AuthResponse> {
    try {
      const result = await UserService.deleteUser(uid);

      if (result.success) {
        // Also sign out the user
        await this.signOut();

        return {
          success: true,
          message: "Account deleted successfully",
        };
      } else {
        return {
          success: false,
          message: result.error || "Failed to delete account",
        };
      }
    } catch (error) {
      console.error("Delete account error:", error);
      return {
        success: false,
        message: this.getErrorMessage(error),
      };
    }
  }

  // Private helper methods

  private getErrorMessage(error: unknown): string {
    if (error && typeof error === "object" && "code" in error) {
      const firebaseError = error as { code: string; message?: string };
      switch (firebaseError.code) {
        case "auth/user-not-found":
          return "No account found with this email address";
        case "auth/wrong-password":
          return "Incorrect password";
        case "auth/email-already-in-use":
          return "An account with this email already exists";
        case "auth/weak-password":
          return "Password should be at least 6 characters";
        case "auth/invalid-email":
          return "Invalid email address";
        case "auth/user-disabled":
          return "This account has been disabled";
        case "auth/too-many-requests":
          return "Too many attempts. Please try again later";
        case "auth/popup-closed-by-user":
          return "Sign-in popup was closed";
        case "auth/cancelled-popup-request":
          return "Sign-in was cancelled";
        default:
          return (
            firebaseError.message || "An error occurred during authentication"
          );
      }
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "An error occurred during authentication";
  }
}

export const authService = new AuthService();
