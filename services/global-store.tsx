import { create } from "zustand";
import { User } from "@/models";
import { useEffect } from "react";

interface GlobalStore {
  user: User | null;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  initializeUser: () => void;
}

// Function to get user from localStorage
const getUserFromStorage = (): User | null => {
  if (typeof window === "undefined") return null;

  try {
    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null;
  }
};

export const useGlobalStore = create<GlobalStore>((set) => ({
  user: null, // Always start with null to avoid hydration mismatch
  isHydrated: false,
  setUser: (user: User | null) => set({ user }),
  initializeUser: () => {
    const user = getUserFromStorage();
    set({ user, isHydrated: true });
  },
}));

// Custom hook to handle hydration
export const useHydrateStore = () => {
  const { initializeUser, isHydrated } = useGlobalStore();

  useEffect(() => {
    if (!isHydrated) {
      initializeUser();
    }
  }, [initializeUser, isHydrated]);

  return isHydrated;
};
