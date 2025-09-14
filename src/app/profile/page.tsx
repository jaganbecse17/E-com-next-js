"use client";

import { useAuth } from "@/contexts/auth-context";
import { UserProfile } from "@/components/auth/user-profile";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect("/login");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Profile</h1>
      <UserProfile />
    </div>
  );
}
