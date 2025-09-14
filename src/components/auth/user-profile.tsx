"use client";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Mail, Calendar, Shield, LogOut } from "lucide-react";
import Image from "next/image";

export function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="relative w-20 h-20 mx-auto mb-4">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.fullName}
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-gray-600" />
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{user.fullName}</h2>
        <p className="text-gray-600">@{user.username}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-gray-700">
          <Mail className="w-5 h-5" />
          <span>{user.email}</span>
        </div>

        <div className="flex items-center space-x-3 text-gray-700">
          <Shield className="w-5 h-5" />
          <span className="capitalize">{user.role}</span>
        </div>

        <div className="flex items-center space-x-3 text-gray-700">
          <Calendar className="w-5 h-5" />
          <span>Joined {user.createdAt.toLocaleDateString()}</span>
        </div>
      </div>

      <Button onClick={logout} variant="outline" className="w-full mt-6">
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </Card>
  );
}
