import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={category.image || "/placeholder-category.jpg"}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="font-bold text-xl mb-2">{category.name}</h3>
              {category.description && (
                <p className="text-sm opacity-90">{category.description}</p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
