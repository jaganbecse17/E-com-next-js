import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  background?: "default" | "muted" | "gradient";
}

export function Section({
  children,
  className = "",
  containerClassName = "",
  id,
  background = "default",
}: SectionProps) {
  const backgroundClasses = {
    default: "",
    muted: "bg-gray-50/50",
    gradient: "bg-gradient-to-br from-primary/5 to-accent/5",
  };

  return (
    <section
      id={id}
      className={cn("py-16", backgroundClasses[background], className)}
    >
      <div className={cn("container mx-auto px-4", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
