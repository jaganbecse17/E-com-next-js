"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Notification, NotificationContextType } from "@/types/notification";
import { NotificationService } from "@/utils/notification-service";
import { initializeSampleNotifications } from "@/utils/sample-data";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = NotificationService.loadNotifications();
    setNotifications(savedNotifications);

    // Add sample notifications if needed (only if we have the default 3 or fewer)
    if (savedNotifications.length <= 3) {
      const sampleNotifications = initializeSampleNotifications();
      if (sampleNotifications.length > 0) {
        let updatedNotifications = savedNotifications;
        sampleNotifications.forEach(
          (notification: Omit<Notification, "id" | "createdAt" | "isRead">) => {
            updatedNotifications = NotificationService.addNotification(
              updatedNotifications,
              notification
            );
          }
        );
        setNotifications(updatedNotifications);
      }
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    NotificationService.saveNotifications(notifications);
  }, [notifications]);

  const unreadCount = NotificationService.getUnreadCount(notifications);

  const markAsRead = (id: string) => {
    const updatedNotifications = NotificationService.markAsRead(
      notifications,
      id
    );
    setNotifications(updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications =
      NotificationService.markAllAsRead(notifications);
    setNotifications(updatedNotifications);
  };

  const deleteNotification = (id: string) => {
    const updatedNotifications = NotificationService.deleteNotification(
      notifications,
      id
    );
    setNotifications(updatedNotifications);
  };

  const clearAllNotifications = () => {
    const updatedNotifications = NotificationService.clearAllNotifications();
    setNotifications(updatedNotifications);
  };

  const addNotification = (
    newNotification: Omit<Notification, "id" | "createdAt" | "isRead">
  ) => {
    const updatedNotifications = NotificationService.addNotification(
      notifications,
      newNotification
    );
    setNotifications(updatedNotifications);
  };

  const value: NotificationContextType = {
    notifications: NotificationService.sortByDate(notifications),
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    addNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
}
