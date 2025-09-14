"use client";

import { useNotifications } from "@/contexts/notification-context";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bell, Trash2, CheckCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { NotificationService } from "@/utils/notification-service";
import { useState } from "react";

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
  } = useNotifications();
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Bell className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Login Required
          </h1>
          <p className="text-gray-600 mb-6">
            Please log in to view your notifications.
          </p>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="inline-flex items-center text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
            <div>
              <h1 className="text-3xl font-bold flex items-center space-x-3">
                <Bell className="w-8 h-8" />
                <span>Notifications</span>
              </h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  {unreadCount} unread notification
                  {unreadCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>

          {notifications.length > 0 && (
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <Button onClick={markAllAsRead} variant="outline" size="sm">
                  <CheckCheck className="w-4 h-4 mr-2" />
                  Mark All Read
                </Button>
              )}
              <Button
                onClick={clearAllNotifications}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        {notifications.length > 0 && (
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === "unread"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
        )}

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === "unread"
                ? "No unread notifications"
                : "No notifications"}
            </h3>
            <p className="text-gray-600">
              {filter === "unread"
                ? "All caught up! Check back later for new updates."
                : "You have no notifications at the moment."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 transition-colors ${
                  !notification.isRead
                    ? "bg-blue-50 border-blue-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${NotificationService.getNotificationColor(
                      notification.type
                    )}`}
                  >
                    {NotificationService.getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500">
                            {formatDate(notification.createdAt)}
                          </span>
                          {!notification.isRead && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.isRead && (
                          <Button
                            onClick={() => markAsRead(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                          >
                            Mark Read
                          </Button>
                        )}
                        <Button
                          onClick={() => deleteNotification(notification.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Action Button */}
                    {notification.actionUrl && notification.actionText && (
                      <div className="mt-3">
                        <Link href={notification.actionUrl}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              !notification.isRead &&
                              markAsRead(notification.id)
                            }
                          >
                            {notification.actionText}
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
