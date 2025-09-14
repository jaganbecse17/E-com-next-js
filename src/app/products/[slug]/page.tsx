"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, ShoppingCart, ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getEnhancedProductBySlug } from "@/data/enhanced-products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/contexts/cart-context";
import ProductImages from "@/components/ecommerce/product-images";
import { ProductReviews } from "@/components/product/product-reviews";
import { ProductSpecifications } from "@/components/product/product-specifications";
import { ProductOwnerDetails } from "@/components/product/product-owner-details";
import { ProductOffers } from "@/components/product/product-offers";
import { DeliveryCheck } from "@/components/product/delivery-check";

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [activeTab, setActiveTab] = useState<
    "description" | "specifications" | "reviews"
  >("description");
  const [quantity, setQuantity] = useState(1);
  const product = getEnhancedProductBySlug(params.slug);
  const { addToCart, getCartItem } = useCart();

  if (!product) {
    notFound();
  }

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  const cartItem = getCartItem(product.id);
  const totalInCart = cartItem ? cartItem.quantity : 0;
  const maxQuantity = product.stockQuantity - totalInCart;
  const canAddToCart = product.inStock && maxQuantity > 0;

  const handleAddToCart = () => {
    if (canAddToCart) {
      addToCart(product, quantity);
      setQuantity(1); // Reset quantity after adding
    }
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: `Reviews (${product.totalReviews})` },
  ] as const;

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Images */}
        <div className="lg:col-span-1">
          <ProductImages product={product} />
        </div>

        {/* Product Details */}
        <div className="lg:col-span-1 space-y-6">
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
                    i < Math.floor(product.averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.averageRating.toFixed(1)} ({product.totalReviews}{" "}
              reviews)
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
            {totalInCart > 0 && (
              <span className="text-sm text-blue-600">
                ({totalInCart} in cart)
              </span>
            )}
          </div>

          {/* Offers */}
          <ProductOffers offers={product.offers} />

          {/* Quantity Selector */}
          {canAddToCart && (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() =>
                    setQuantity(Math.min(maxQuantity, quantity + 1))
                  }
                  disabled={quantity >= maxQuantity}
                >
                  +
                </Button>
              </div>
              <span className="text-sm text-gray-500">
                (Max: {maxQuantity})
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-4">
            <Button
              size="lg"
              className="flex-1"
              disabled={!canAddToCart}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {!product.inStock
                ? "Out of Stock"
                : maxQuantity === 0
                ? "Max Quantity in Cart"
                : "Add to Cart"}
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

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <DeliveryCheck productPrice={product.price} />
          <ProductOwnerDetails owner={product.owner} />
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === "description" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "specifications" && (
            <ProductSpecifications specifications={product.specifications} />
          )}

          {activeTab === "reviews" && (
            <ProductReviews
              reviews={product.reviews}
              averageRating={product.averageRating}
              totalReviews={product.totalReviews}
            />
          )}
        </div>
      </div>
    </div>
  );
}
