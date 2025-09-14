"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
}

const bannerSlides: BannerSlide[] = [
  {
    id: "1",
    title: "Electronics Sale",
    subtitle: "Up to 50% Off",
    description:
      "Premium headphones, smart devices, and more at unbeatable prices",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=400&fit=crop",
    ctaText: "Shop Electronics",
    ctaLink: "/categories/electronics",
    backgroundColor: "bg-gradient-to-r from-blue-600 to-purple-600",
    textColor: "text-white",
  },
  {
    id: "2",
    title: "Fashion Forward",
    subtitle: "New Arrivals",
    description:
      "Discover the latest trends in sustainable fashion and eco-friendly clothing",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop",
    ctaText: "Shop Fashion",
    ctaLink: "/categories/clothing",
    backgroundColor: "bg-gradient-to-r from-pink-500 to-rose-500",
    textColor: "text-white",
  },
  {
    id: "3",
    title: "Smart Home",
    subtitle: "Future is Here",
    description:
      "Transform your living space with intelligent home automation solutions",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop",
    ctaText: "Explore Smart Home",
    ctaLink: "/categories/home-garden",
    backgroundColor: "bg-gradient-to-r from-green-500 to-teal-500",
    textColor: "text-white",
  },
  {
    id: "4",
    title: "Free Shipping",
    subtitle: "Limited Time Offer",
    description:
      "Free shipping on all orders above $75. Shop now and save on delivery!",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=400&fit=crop",
    ctaText: "Shop Now",
    ctaLink: "/products",
    backgroundColor: "bg-gradient-to-r from-orange-500 to-red-500",
    textColor: "text-white",
  },
];

export function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const currentBanner = bannerSlides[currentSlide];

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg mb-8">
      {/* Banner Content */}
      <div className={`absolute inset-0 ${currentBanner.backgroundColor}`}>
        <div className="absolute inset-0 bg-black bg-opacity-30" />

        {/* Background Image */}
        <Image
          src={currentBanner.image}
          alt={currentBanner.title}
          fill
          className="object-cover mix-blend-overlay"
          priority={currentSlide === 0}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h2
                className={`text-sm md:text-base font-semibold mb-2 ${currentBanner.textColor} opacity-90`}
              >
                {currentBanner.subtitle}
              </h2>
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${currentBanner.textColor}`}
              >
                {currentBanner.title}
              </h1>
              <p
                className={`text-base md:text-lg mb-6 ${currentBanner.textColor} opacity-90`}
              >
                {currentBanner.description}
              </p>
              <Link href={currentBanner.ctaLink}>
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  {currentBanner.ctaText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white"
                : "bg-white bg-opacity-50 hover:bg-opacity-70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-30 z-20">
        <div
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{
            width: `${((currentSlide + 1) / bannerSlides.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
