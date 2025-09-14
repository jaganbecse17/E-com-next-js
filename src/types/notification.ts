export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error" | "order" | "promotion";
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
  actionText?: string;
  userId?: string;
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (
    notification: Omit<Notification, "id" | "createdAt" | "isRead">
  ) => void;
}
