"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  AuthState,
  LoginCredentials,
  AuthContextType,
} from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for developer login
const DEVELOPER_USER: User = {
  id: "dev-001",
  username: "developer",
  email: "developer@ecommerce.com",
  fullName: "Developer User",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  role: "developer",
  createdAt: new Date("2024-01-01"),
  lastLogin: new Date(),
};

const DEVELOPER_CREDENTIALS = {
  username: "developer",
  password: "password",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for stored auth on mount
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const { user } = JSON.parse(stored);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem("auth");
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      credentials.username === DEVELOPER_CREDENTIALS.username &&
      credentials.password === DEVELOPER_CREDENTIALS.password
    ) {
      const user = { ...DEVELOPER_USER, lastLogin: new Date() };

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      // Store in localStorage
      localStorage.setItem("auth", JSON.stringify({ user }));
      return true;
    }

    setAuthState((prev) => ({ ...prev, isLoading: false }));
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    localStorage.removeItem("auth");
  };

  const updateUser = (userData: Partial<User>) => {
    setAuthState((prev) => {
      if (!prev.user) return prev;

      const updatedUser = { ...prev.user, ...userData };
      localStorage.setItem("auth", JSON.stringify({ user: updatedUser }));

      return {
        ...prev,
        user: updatedUser,
      };
    });
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
