import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className = "",
}: FeatureCardProps) {
  return (
    <div className={`text-center group ${className}`}>
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 royal-shadow group-hover:royal-shadow-lg">
        <Icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        {description}
      </p>
    </div>
  );
}
