import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/ecommerce/product-card";
import {
  getCategoryBySlug,
  getProductsByCategory,
  categories,
} from "@/data/products";
import { generateMetadata as generateSEOMetadata } from "@/lib/utils";
import type { Metadata } from "next";
import { PageProps } from "@/types";

// Generate static params for all categories (Static Site Generation)
export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  return generateSEOMetadata(
    `${category.name} Products`,
    category.description ||
      `Browse our ${category.name.toLowerCase()} collection. Find quality products at great prices.`,
    [category.name.toLowerCase(), "products", "shopping", "ecommerce"],
    category.image
  );
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const products = getProductsByCategory(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
          </li>
          <li className="text-muted-foreground">/</li>
          <li>
            <Link
              href="/categories"
              className="text-muted-foreground hover:text-primary"
            >
              Categories
            </Link>
          </li>
          <li className="text-muted-foreground">/</li>
          <li className="text-foreground font-medium">{category.name}</li>
        </ol>
      </nav>

      {/* Back button */}
      <Link
        href="/categories"
        className="inline-flex items-center mb-6 text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Categories
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-lg text-muted-foreground">
            {category.description}
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-2">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No products found in this category.
          </p>
          <Link
            href="/products"
            className="text-primary hover:underline mt-2 inline-block"
          >
            Browse all products
          </Link>
        </div>
      )}
    </div>
  );
}
