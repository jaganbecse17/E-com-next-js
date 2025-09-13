import type { Metadata } from "next";
import CategoryCard from "@/components/ecommerce/category-card";
import { categories } from "@/data/products";
import { generateMetadata as generateSEOMetadata } from "@/lib/utils";

export const metadata: Metadata = generateSEOMetadata(
  "Product Categories",
  "Browse our product categories. Find electronics, clothing, home goods, books, and more organized for easy shopping.",
  [
    "categories",
    "shopping",
    "ecommerce",
    "electronics",
    "clothing",
    "home goods",
    "books",
  ]
);

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Product Categories</h1>
        <p className="text-lg text-muted-foreground">
          Browse our carefully curated product categories
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No categories found.</p>
        </div>
      )}
    </div>
  );
}
