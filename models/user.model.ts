import { z } from "zod";
import { Timestamp } from "firebase/firestore";

// Core User interface
export interface User {
  id?: string;
  name: string;
  email: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
  profileImage?: string;
  phoneNumber?: string;
  isEmailVerified?: boolean;
  role?: UserRole;
  status?: UserStatus;
}

// User role enum
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator",
}

// User status enum
export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
  PENDING = "pending",
}

// User data for Firestore (with Firebase Timestamps)
export interface UserFirestoreData {
  name: string;
  email: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  profileImage?: string;
  phoneNumber?: string;
  isEmailVerified?: boolean;
  role?: UserRole;
  status?: UserStatus;
}

// User creation data
export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role?: UserRole;
}

// User update data
export interface UpdateUserData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  profileImage?: string;
  isEmailVerified?: boolean;
  role?: UserRole;
  status?: UserStatus;
}

// User profile data (public information)
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  createdAt: Date;
  role: UserRole;
  status: UserStatus;
}

// Validation schemas using Zod
export const userSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  token: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  profileImage: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  phoneNumber: z
    .string()
    .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  isEmailVerified: z.boolean().optional(),
  role: z.nativeEnum(UserRole).optional(),
  status: z.nativeEnum(UserStatus).optional(),
});

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters"),
  phoneNumber: z
    .string()
    .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  role: z.nativeEnum(UserRole).optional().default(UserRole.USER),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .optional(),
  email: z.string().email("Please enter a valid email address").optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  profileImage: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  isEmailVerified: z.boolean().optional(),
  role: z.nativeEnum(UserRole).optional(),
  status: z.nativeEnum(UserStatus).optional(),
});

// Type exports for schema validation
export type UserSchemaType = z.infer<typeof userSchema>;
export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;

// User utility functions
export class UserUtils {
  /**
   * Check if user is admin
   */
  static isAdmin(user: User): boolean {
    return user.role === UserRole.ADMIN;
  }

  /**
   * Check if user is moderator or higher
   */
  static isModerator(user: User): boolean {
    return user.role === UserRole.ADMIN || user.role === UserRole.MODERATOR;
  }

  /**
   * Check if user is active
   */
  static isActive(user: User): boolean {
    return user.status === UserStatus.ACTIVE || user.status === undefined;
  }

  /**
   * Get user display name
   */
  static getDisplayName(user: User): string {
    return user.name || user.email.split("@")[0];
  }

  /**
   * Get user initials
   */
  static getInitials(user: User): string {
    const name = UserUtils.getDisplayName(user);
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  }

  /**
   * Convert Firebase user data to User interface
   */
  static fromFirestore(id: string, data: UserFirestoreData): User {
    return {
      id,
      name: data.name,
      email: data.email,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      profileImage: data.profileImage,
      phoneNumber: data.phoneNumber,
      isEmailVerified: data.isEmailVerified ?? false,
      role: data.role ?? UserRole.USER,
      status: data.status ?? UserStatus.ACTIVE,
    };
  }

  /**
   * Convert User interface to Firestore data
   */
  static toFirestore(user: Partial<User>): Partial<UserFirestoreData> {
    const firestoreData: Partial<UserFirestoreData> = {};

    if (user.name !== undefined) firestoreData.name = user.name;
    if (user.email !== undefined) firestoreData.email = user.email;
    if (user.profileImage !== undefined)
      firestoreData.profileImage = user.profileImage;
    if (user.phoneNumber !== undefined)
      firestoreData.phoneNumber = user.phoneNumber;
    if (user.isEmailVerified !== undefined)
      firestoreData.isEmailVerified = user.isEmailVerified;
    if (user.role !== undefined) firestoreData.role = user.role;
    if (user.status !== undefined) firestoreData.status = user.status;

    return firestoreData;
  }

  /**
   * Sanitize user data for public display
   */
  static toProfile(user: User): UserProfile {
    return {
      id: user.id!,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      createdAt: user.createdAt!,
      role: user.role ?? UserRole.USER,
      status: user.status ?? UserStatus.ACTIVE,
    };
  }
}

// User database operations class
export class UserService {
  /**
   * Create a new user in Firestore
   */
  static async createUser(
    uid: string,
    userData: Partial<User>
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const { doc, setDoc, serverTimestamp } = await import(
        "firebase/firestore"
      );
      const { db } = await import("@/lib/firebase");

      const firestoreData = {
        name: userData.name || "User",
        email: userData.email || "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isEmailVerified: userData.isEmailVerified ?? false,
        role: userData.role ?? UserRole.USER,
        status: userData.status ?? UserStatus.ACTIVE,
        profileImage: userData.profileImage || "",
        phoneNumber: userData.phoneNumber || "",
      };

      await setDoc(doc(db, "users", uid), firestoreData);

      const user: User = {
        id: uid,
        name: firestoreData.name,
        email: firestoreData.email,
        createdAt: new Date(),
        updatedAt: new Date(),
        isEmailVerified: firestoreData.isEmailVerified,
        role: firestoreData.role,
        status: firestoreData.status,
        profileImage: firestoreData.profileImage || undefined,
        phoneNumber: firestoreData.phoneNumber || undefined,
        token: userData.token,
      };

      return { success: true, user };
    } catch (error) {
      console.error("Error creating user:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create user",
      };
    }
  }

  /**
   * Get user by ID from Firestore
   */
  static async getUserById(
    uid: string
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const { doc, getDoc } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase");

      const userDoc = await getDoc(doc(db, "users", uid));

      if (!userDoc.exists()) {
        return { success: false, error: "User not found" };
      }

      const userData = userDoc.data() as UserFirestoreData;
      const user = UserUtils.fromFirestore(uid, userData);

      return { success: true, user };
    } catch (error) {
      console.error("Error getting user:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get user",
      };
    }
  }

  /**
   * Update user in Firestore
   */
  static async updateUser(
    uid: string,
    updates: UpdateUserData
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const { doc, updateDoc, getDoc, serverTimestamp } = await import(
        "firebase/firestore"
      );
      const { db } = await import("@/lib/firebase");

      const updateData = UserUtils.toFirestore(updates);

      await updateDoc(doc(db, "users", uid), {
        ...updateData,
        updatedAt: serverTimestamp(),
      });

      // Get the updated user
      const updatedUserDoc = await getDoc(doc(db, "users", uid));
      if (updatedUserDoc.exists()) {
        const userData = updatedUserDoc.data() as UserFirestoreData;
        const user = UserUtils.fromFirestore(uid, userData);
        return { success: true, user };
      }

      return { success: false, error: "Failed to retrieve updated user" };
    } catch (error) {
      console.error("Error updating user:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update user",
      };
    }
  }

  /**
   * Delete user from Firestore (soft delete by setting status to inactive)
   */
  static async deleteUser(
    uid: string,
    hardDelete: boolean = false
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { doc, deleteDoc, updateDoc, serverTimestamp } = await import(
        "firebase/firestore"
      );
      const { db } = await import("@/lib/firebase");

      if (hardDelete) {
        await deleteDoc(doc(db, "users", uid));
      } else {
        // Soft delete - set status to inactive
        await updateDoc(doc(db, "users", uid), {
          status: UserStatus.INACTIVE,
          updatedAt: serverTimestamp(),
        });
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting user:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete user",
      };
    }
  }

  /**
   * Check if user exists in Firestore
   */
  static async userExists(uid: string): Promise<boolean> {
    try {
      const { doc, getDoc } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase");

      const userDoc = await getDoc(doc(db, "users", uid));
      return userDoc.exists();
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(
    email: string
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const { collection, query, where, getDocs } = await import(
        "firebase/firestore"
      );
      const { db } = await import("@/lib/firebase");

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return { success: false, error: "User not found" };
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data() as UserFirestoreData;
      const user = UserUtils.fromFirestore(userDoc.id, userData);

      return { success: true, user };
    } catch (error) {
      console.error("Error getting user by email:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get user",
      };
    }
  }

  /**
   * Update user's last login timestamp
   */
  static async updateLastLogin(uid: string): Promise<void> {
    try {
      const { doc, updateDoc, serverTimestamp } = await import(
        "firebase/firestore"
      );
      const { db } = await import("@/lib/firebase");

      await updateDoc(doc(db, "users", uid), {
        lastLoginAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating last login:", error);
    }
  }

  /**
   * Get users with pagination
   */
  static async getUsers(
    limit: number = 10,
    offset: number = 0
  ): Promise<{ success: boolean; users?: User[]; error?: string }> {
    try {
      const {
        collection,
        query,
        orderBy,
        limit: firebaseLimit,
        startAfter,
        getDocs,
      } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase");

      const usersRef = collection(db, "users");
      let q = query(
        usersRef,
        orderBy("createdAt", "desc"),
        firebaseLimit(limit)
      );

      // Add pagination if offset is provided
      if (offset > 0) {
        const offsetQuery = query(
          usersRef,
          orderBy("createdAt", "desc"),
          firebaseLimit(offset)
        );
        const offsetSnapshot = await getDocs(offsetQuery);
        const lastDoc = offsetSnapshot.docs[offsetSnapshot.docs.length - 1];
        if (lastDoc) {
          q = query(
            usersRef,
            orderBy("createdAt", "desc"),
            startAfter(lastDoc),
            firebaseLimit(limit)
          );
        }
      }

      const querySnapshot = await getDocs(q);
      const users: User[] = [];

      querySnapshot.forEach((doc) => {
        const userData = doc.data() as UserFirestoreData;
        const user = UserUtils.fromFirestore(doc.id, userData);
        users.push(user);
      });

      return { success: true, users };
    } catch (error) {
      console.error("Error getting users:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get users",
      };
    }
  }
}
