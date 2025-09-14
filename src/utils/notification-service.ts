import { Notification } from "@/types/notification";

const NOTIFICATIONS_STORAGE_KEY = "ecommerce_notifications";

export class NotificationService {
  static saveNotifications(notifications: Notification[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        NOTIFICATIONS_STORAGE_KEY,
        JSON.stringify(notifications)
      );
    }
  }

  static loadNotifications(): Notification[] {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (stored) {
        try {
          const notifications = JSON.parse(stored);
          return notifications.map(
            (n: Notification & { createdAt: string }) => ({
              ...n,
              createdAt: new Date(n.createdAt),
            })
          );
        } catch (error) {
          console.error(
            "Error parsing notifications from localStorage:",
            error
          );
        }
      }
    }
    return this.getDefaultNotifications();
  }

  static getDefaultNotifications(): Notification[] {
    return [
      {
        id: "notif-1",
        title: "Welcome to ECommerce!",
        message:
          "Thank you for joining us. Explore our amazing collection of products.",
        type: "info",
        isRead: false,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        actionUrl: "/products",
        actionText: "Browse Products",
      },
      {
        id: "notif-2",
        title: "Special Offer!",
        message:
          "Get 20% off on your first order. Use code WELCOME20 at checkout.",
        type: "promotion",
        isRead: false,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        actionUrl: "/products",
        actionText: "Shop Now",
      },
      {
        id: "notif-3",
        title: "Order Confirmed",
        message: "Your order #12345 has been confirmed and is being processed.",
        type: "order",
        isRead: true,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        actionUrl: "/orders/12345",
        actionText: "Track Order",
      },
    ];
  }

  static addNotification(
    notifications: Notification[],
    newNotification: Omit<Notification, "id" | "createdAt" | "isRead">
  ): Notification[] {
    const notification: Notification = {
      ...newNotification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      isRead: false,
    };

    const updatedNotifications = [notification, ...notifications];
    this.saveNotifications(updatedNotifications);
    return updatedNotifications;
  }

  static markAsRead(notifications: Notification[], id: string): Notification[] {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, isRead: true } : notification
    );
    this.saveNotifications(updatedNotifications);
    return updatedNotifications;
  }

  static markAllAsRead(notifications: Notification[]): Notification[] {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));
    this.saveNotifications(updatedNotifications);
    return updatedNotifications;
  }

  static deleteNotification(
    notifications: Notification[],
    id: string
  ): Notification[] {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    this.saveNotifications(updatedNotifications);
    return updatedNotifications;
  }

  static clearAllNotifications(): Notification[] {
    this.saveNotifications([]);
    return [];
  }

  static getUnreadCount(notifications: Notification[]): number {
    return notifications.filter((n) => !n.isRead).length;
  }

  static sortByDate(notifications: Notification[]): Notification[] {
    return [...notifications].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  static filterByType(
    notifications: Notification[],
    type: Notification["type"]
  ): Notification[] {
    return notifications.filter((n) => n.type === type);
  }

  static getNotificationIcon(type: Notification["type"]): string {
    switch (type) {
      case "info":
        return "💡";
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      case "order":
        return "📦";
      case "promotion":
        return "🎉";
      default:
        return "🔔";
    }
  }

  static getNotificationColor(type: Notification["type"]): string {
    switch (type) {
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "order":
        return "bg-purple-50 border-purple-200 text-purple-800";
      case "promotion":
        return "bg-pink-50 border-pink-200 text-pink-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  }
}
