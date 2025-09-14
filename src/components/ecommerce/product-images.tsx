"use client";

import Image from "next/image";
import { useState } from "react";
import { getDiscountPercentage } from "@/lib/utils";

interface ProductImagesProps {
  product: {
    name: string;
    images: string[];
    originalPrice?: number;
    price: number;
    inStock: boolean;
  };
}

export default function ProductImages({ product }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});

  const fallbackImage = `https://via.placeholder.com/800x800/f3f4f6/9ca3af?text=${encodeURIComponent(
    product.name
  )}`;

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  const getImageSrc = (index: number) => {
    if (imageError[index]) {
      return fallbackImage;
    }
    return product.images[index] || fallbackImage;
  };

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="space-y-4">
      <div className="aspect-square relative overflow-hidden rounded-lg border">
        <Image
          src={getImageSrc(selectedImage)}
          alt={product.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={() => handleImageError(selectedImage)}
        />
        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
            -{getDiscountPercentage(product.originalPrice!, product.price)}% OFF
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
          {product.images.map((image: string, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square relative overflow-hidden rounded border-2 transition-all ${
                selectedImage === index
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={getImageSrc(index)}
                alt={`${product.name} ${index + 1}`}
                fill
                className="object-cover"
                sizes="25vw"
                onError={() => handleImageError(index)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
