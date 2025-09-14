"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Category } from "@/types";
import { useState } from "react";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = `https://via.placeholder.com/400x400/6366f1/ffffff?text=${encodeURIComponent(
    category.name
  )}`;

  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageError ? fallbackImage : category.image || fallbackImage}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
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
