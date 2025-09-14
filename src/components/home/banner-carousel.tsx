"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Zap,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor: string;
  textColor: string;
  badge?: string;
  discount?: string;
  originalPrice?: string;
  salePrice?: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: "1",
    title: "Premium Electronics",
    subtitle: "MEGA SALE",
    description: "Latest smartphones, headphones & smartwatches",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=500&fit=crop",
    ctaText: "Shop Now",
    ctaLink: "/categories/electronics",
    backgroundColor:
      "bg-gradient-to-br from-purple-900 via-purple-700 to-blue-800",
    textColor: "text-white",
    badge: "LIMITED TIME",
    discount: "Up to 60% OFF",
    originalPrice: "$299",
    salePrice: "$119",
  },
  {
    id: "2",
    title: "Fashion Collection",
    subtitle: "NEW ARRIVALS",
    description: "Trendy clothing for every season & occasion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=500&fit=crop",
    ctaText: "Explore Fashion",
    ctaLink: "/categories/clothing",
    backgroundColor:
      "bg-gradient-to-br from-pink-800 via-rose-700 to-purple-800",
    textColor: "text-white",
    badge: "TRENDING",
    discount: "Buy 2 Get 1 Free",
    originalPrice: "$89",
    salePrice: "$59",
  },
  {
    id: "3",
    title: "Smart Home Hub",
    subtitle: "TECH UPGRADE",
    description: "Transform your home with AI-powered devices",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=500&fit=crop",
    ctaText: "Discover Tech",
    ctaLink: "/categories/home-garden",
    backgroundColor:
      "bg-gradient-to-br from-emerald-800 via-teal-700 to-cyan-800",
    textColor: "text-white",
    badge: "EXCLUSIVE",
    discount: "Save 40%",
    originalPrice: "$199",
    salePrice: "$119",
  },
  {
    id: "4",
    title: "Free Shipping Deals",
    subtitle: "NO DELIVERY CHARGES",
    description: "Free shipping on orders above $50 + extra discounts",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=500&fit=crop",
    ctaText: "Shop Free Shipping",
    ctaLink: "/products",
    backgroundColor:
      "bg-gradient-to-br from-orange-800 via-red-700 to-pink-800",
    textColor: "text-white",
    badge: "FREE DELIVERY",
    discount: "Extra 10% OFF",
    originalPrice: "$75",
    salePrice: "$50",
  },
];

export function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered]);

  const goToPrevious = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const currentBanner = bannerSlides[currentSlide];

  return (
    <div
      className="relative w-full h-72 md:h-96 lg:h-[500px] overflow-hidden rounded-2xl mb-8 royal-shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Banner Content */}
      <div className={`absolute inset-0 ${currentBanner.backgroundColor}`}>
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src={currentBanner.image}
            alt={currentBanner.title}
            fill
            className="object-cover opacity-30"
            priority={currentSlide === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-2xl">
              {/* Badge */}
              {currentBanner.badge && (
                <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold mb-4 animate-fadeInUp">
                  <Zap className="w-4 h-4" />
                  {currentBanner.badge}
                </div>
              )}

              {/* Subtitle */}
              <h2
                className={`text-lg md:text-xl font-bold mb-3 ${currentBanner.textColor} opacity-90 tracking-wide animate-fadeInUp`}
              >
                {currentBanner.subtitle}
              </h2>

              {/* Main Title */}
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-black mb-4 ${currentBanner.textColor} leading-tight animate-fadeInUp`}
              >
                {currentBanner.title}
              </h1>

              {/* Description */}
              <p
                className={`text-lg md:text-xl mb-6 ${currentBanner.textColor} opacity-90 animate-fadeInUp`}
              >
                {currentBanner.description}
              </p>

              {/* Price Section */}
              {currentBanner.discount && (
                <div className="flex items-center gap-4 mb-6 animate-fadeInUp">
                  <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-lg">
                    {currentBanner.discount}
                  </div>
                  {currentBanner.salePrice && currentBanner.originalPrice && (
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-yellow-400">
                        {currentBanner.salePrice}
                      </span>
                      <span className="text-lg text-gray-300 line-through">
                        {currentBanner.originalPrice}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp">
                <Link href={currentBanner.ctaLink}>
                  <Button
                    variant="royal"
                    size="xl"
                    className="w-full sm:w-auto font-bold text-lg shadow-2xl"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {currentBanner.ctaText}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full sm:w-auto bg-white/90 backdrop-blur-sm border-white/50 text-black hover:bg-white font-semibold"
                >
                  <Gift className="mr-2 h-5 w-5" />
                  View Offers
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 lg:left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-20 hover:scale-110 focus-royal"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 lg:right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-20 hover:scale-110 focus-royal"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentSlide
                ? "bg-white shadow-lg"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-100 ease-linear"
          style={{
            width: `${((currentSlide + 1) / bannerSlides.length) * 100}%`,
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-6 right-6 text-white/30 hidden lg:block">
        <div className="text-6xl font-black opacity-20">
          {String(currentSlide + 1).padStart(2, "0")}
        </div>
        <div className="text-sm opacity-60">
          / {String(bannerSlides.length).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}
