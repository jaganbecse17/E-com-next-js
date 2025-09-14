import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  comment: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({
  name,
  comment,
  rating = 5,
  className = "",
}: TestimonialCardProps) {
  return (
    <div
      className={`bg-white p-6 rounded-xl royal-shadow hover:royal-shadow-lg transition-all duration-300 group hover:scale-105 ${className}`}
    >
      <div className="flex items-center mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-muted-foreground mb-4 italic group-hover:text-foreground transition-colors duration-300">
        &quot;{comment}&quot;
      </p>
      <p className="font-semibold text-primary">- {name}</p>
    </div>
  );
}
