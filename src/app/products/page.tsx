import type { Metadata } from "next";
import ProductCard from "@/components/ecommerce/product-card";
import { products } from "@/data/products";
import { generateMetadata as generateSEOMetadata } from "@/lib/utils";

export const metadata: Metadata = generateSEOMetadata(
  "All Products - ECommerce",
  "Browse our complete collection of quality products. Find electronics, clothing, home goods, and more at great prices.",
  ["products", "shopping", "ecommerce", "electronics", "clothing", "home goods"]
);

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          All Products
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover our complete collection of quality products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No products found.</p>
        </div>
      )}
    </div>
  );
}
