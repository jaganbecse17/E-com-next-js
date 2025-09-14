"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface SubCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
}

const subCategories: SubCategory[] = [
  {
    id: "1",
    name: "Smartphones",
    slug: "smartphones",
    icon: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "2",
    name: "Laptops",
    slug: "laptops",
    icon: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=80&h=80&fit=crop",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "3",
    name: "Headphones",
    slug: "headphones",
    icon: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "4",
    name: "Smart Watch",
    slug: "smart-watch",
    icon: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop",
    color: "bg-red-100 text-red-700",
  },
  {
    id: "5",
    name: "Cameras",
    slug: "cameras",
    icon: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=80&h=80&fit=crop",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "6",
    name: "Gaming",
    slug: "gaming",
    icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=80&h=80&fit=crop",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "7",
    name: "Fashion",
    slug: "fashion",
    icon: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=80&h=80&fit=crop",
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: "8",
    name: "Home Decor",
    slug: "home-decor",
    icon: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&h=80&fit=crop",
    color: "bg-teal-100 text-teal-700",
  },
  {
    id: "9",
    name: "Kitchen",
    slug: "kitchen",
    icon: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: "10",
    name: "Sports",
    slug: "sports",
    icon: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop",
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    id: "11",
    name: "Books",
    slug: "books",
    icon: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=80&fit=crop",
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "12",
    name: "Beauty",
    slug: "beauty",
    icon: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=80&h=80&fit=crop",
    color: "bg-rose-100 text-rose-700",
  },
];

export function SubCategoriesMenu() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center">
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-3 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {subCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex-shrink-0 flex flex-col items-center space-y-1 group"
              >
                <div
                  className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200 overflow-hidden`}
                >
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-gray-700 group-hover:text-primary transition-colors text-center max-w-[64px] truncate">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
