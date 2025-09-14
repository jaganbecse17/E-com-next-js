import { Notification } from "@/types/notification";
import { NotificationService } from "@/utils/notification-service";

export const initializeSampleNotifications = () => {
  // Check if notifications already exist
  const existingNotifications = NotificationService.loadNotifications();

  // If we only have the default notifications, we can add more samples
  if (existingNotifications.length <= 3) {
    const sampleNotifications: Omit<
      Notification,
      "id" | "createdAt" | "isRead"
    >[] = [
      {
        type: "order",
        title: "Order Shipped",
        message:
          "Your order #12346 has been shipped and will arrive in 2-3 business days.",
        actionUrl: "/orders/12346",
        actionText: "Track Order",
      },
      {
        type: "promotion",
        title: "Flash Sale Alert!",
        message: "Get 50% off on electronics. Limited time offer ending soon!",
        actionUrl: "/categories/electronics",
        actionText: "Shop Electronics",
      },
      {
        type: "success",
        title: "Account Verified",
        message:
          "Your account has been successfully verified. You can now access all features.",
        actionUrl: "/profile",
        actionText: "View Profile",
      },
      {
        type: "warning",
        title: "Cart Reminder",
        message:
          "You have items in your cart. Complete your purchase before they sell out!",
        actionUrl: "/cart",
        actionText: "View Cart",
      },
      {
        type: "info",
        title: "New Features Available",
        message:
          "Check out our new wishlist feature and save your favorite products.",
        actionUrl: "/wishlist",
        actionText: "Explore Wishlist",
      },
    ];

    // Add sample notifications using the context (this will be called from the context)
    return sampleNotifications;
  }

  return [];
};
