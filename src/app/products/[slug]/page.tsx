import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProductBySlug, products } from "@/data/products";
import {
  formatPrice,
  getDiscountPercentage,
  generateMetadata as generateSEOMetadata,
} from "@/lib/utils";
import type { Metadata } from "next";
import { PageProps } from "@/types";

// Generate static params for all products (Static Site Generation)
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return generateSEOMetadata(
    product.name,
    product.description,
    product.tags,
    product.images[0]
  );
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? getDiscountPercentage(product.originalPrice!, product.price)
    : 0;

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
              href="/products"
              className="text-muted-foreground hover:text-primary"
            >
              Products
            </Link>
          </li>
          <li className="text-muted-foreground">/</li>
          <li className="text-foreground font-medium">{product.name}</li>
        </ol>
      </nav>

      {/* Back button */}
      <Link
        href="/products"
        className="inline-flex items-center mb-6 text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg border">
            <Image
              src={product.images[0] || "/placeholder-product.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {hasDiscount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                -{discountPercentage}% OFF
              </div>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Additional Images */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square relative overflow-hidden rounded border"
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 2}`}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground">{product.shortDescription}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
            </div>
            {hasDiscount && (
              <p className="text-sm text-green-600 font-medium">
                You save {formatPrice(product.originalPrice! - product.price)}
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div
              className={`h-3 w-3 rounded-full ${
                product.inStock ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span
              className={`text-sm ${
                product.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.inStock
                ? `In Stock (${product.stockQuantity} available)`
                : "Out of Stock"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button size="lg" className="flex-1" disabled={!product.inStock}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Category and Tags */}
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium">Category: </span>
              <Link
                href={`/categories/${product.categorySlug}`}
                className="text-sm text-primary hover:underline"
              >
                {product.category}
              </Link>
            </div>
            <div>
              <span className="text-sm font-medium">Tags: </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <Card className="mt-12">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Product Description</h2>
          <div className="prose max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
