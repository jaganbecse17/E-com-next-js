import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | "royal"
      | "gold";
    size?: "default" | "sm" | "lg" | "icon" | "xl";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90 royal-shadow hover:royal-shadow-lg":
            variant === "default",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90":
            variant === "destructive",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground":
            variant === "outline",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80":
            variant === "secondary",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "text-primary underline-offset-4 hover:underline": variant === "link",
          "royal-gradient text-white font-semibold royal-shadow hover:royal-shadow-lg border-0":
            variant === "royal",
          "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold royal-shadow hover:royal-shadow-lg border-0 hover:from-yellow-500 hover:to-yellow-700":
            variant === "gold",
        },
        {
          "h-10 px-4 py-2": size === "default",
          "h-9 rounded-md px-3": size === "sm",
          "h-11 rounded-md px-8": size === "lg",
          "h-14 rounded-lg px-10 text-base": size === "xl",
          "h-10 w-10": size === "icon",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
