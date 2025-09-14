import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  description,
  className = "",
  centered = true,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 animate-fadeInUp",
        centered ? "text-center" : "",
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
