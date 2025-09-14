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
      | "gold"
      | "platinum"
      | "diamond"
      | "royal-outline";
    size?: "default" | "sm" | "lg" | "icon" | "xl" | "xxl";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95 relative overflow-hidden",
        {
          // Enhanced default with royal elements
          "bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold royal-shadow hover:royal-shadow-lg hover:from-purple-700 hover:to-purple-800 border-0 rounded-lg":
            variant === "default",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg":
            variant === "destructive",
          "border-2 border-purple-300 bg-transparent text-purple-700 hover:bg-purple-50 hover:border-purple-500 rounded-lg font-semibold":
            variant === "outline",
          "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300 border-0 rounded-lg":
            variant === "secondary",
          "hover:bg-purple-100 hover:text-purple-700 rounded-lg":
            variant === "ghost",
          "text-purple-700 underline-offset-4 hover:underline font-semibold":
            variant === "link",

          // Royal Premium Variants
          "bg-gradient-to-r from-purple-800 via-purple-900 to-indigo-900 text-white font-bold royal-shadow-lg hover:royal-glow hover:from-purple-900 hover:via-indigo-900 hover:to-purple-900 border-0 rounded-xl before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700":
            variant === "royal",

          "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-bold royal-shadow-lg hover:gold-glow hover:from-amber-500 hover:via-yellow-600 hover:to-amber-700 border-0 rounded-xl relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700":
            variant === "gold",

          "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-gray-900 font-bold royal-shadow-lg hover:royal-shadow-xl hover:from-gray-400 hover:via-gray-500 hover:to-gray-600 border-0 rounded-xl before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700":
            variant === "platinum",

          "bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 text-white font-bold royal-shadow-lg hover:diamond-glow hover:from-blue-500 hover:via-cyan-500 hover:to-blue-600 border-0 rounded-xl before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700":
            variant === "diamond",

          "border-2 bg-transparent font-bold rounded-xl relative overflow-hidden before:absolute before:inset-0 before:p-[2px] before:bg-gradient-to-r before:from-purple-400 before:to-amber-400 before:rounded-xl before:-z-10 after:absolute after:inset-[2px] after:bg-white after:rounded-[10px] after:-z-10 text-purple-700 hover:text-purple-900":
            variant === "royal-outline",
        },
        {
          "h-9 px-4 py-2 text-sm rounded-md": size === "sm",
          "h-10 px-4 py-2 rounded-lg": size === "default",
          "h-12 px-8 py-3 text-lg rounded-lg": size === "lg",
          "h-14 px-10 py-4 text-xl rounded-xl": size === "xl",
          "h-16 px-12 py-5 text-2xl rounded-2xl": size === "xxl",
          "h-10 w-10 rounded-lg": size === "icon",
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
