import { Product, Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    description: "Latest electronic devices and gadgets",
    image: "/images/categories/electronics.jpg",
    order: 1,
    isActive: true,
  },
  {
    id: "2",
    name: "Clothing",
    slug: "clothing",
    description: "Fashion and apparel for all ages",
    image: "/images/categories/clothing.jpg",
    order: 2,
    isActive: true,
  },
  {
    id: "3",
    name: "Home & Garden",
    slug: "home-garden",
    description: "Everything for your home and garden",
    image: "/images/categories/home-garden.jpg",
    order: 3,
    isActive: true,
  },
  {
    id: "4",
    name: "Books",
    slug: "books",
    description: "Books for learning and entertainment",
    image: "/images/categories/books.jpg",
    order: 4,
    isActive: true,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",
    description:
      "High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.",
    shortDescription: "Premium wireless headphones with noise cancellation",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    categorySlug: "electronics",
    images: [
      "/images/products/headphones-1.jpg",
      "/images/products/headphones-2.jpg",
    ],
    inStock: true,
    stockQuantity: 50,
    tags: ["wireless", "bluetooth", "noise-cancellation", "headphones"],
    rating: 4.5,
    reviewCount: 128,
    featured: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    slug: "organic-cotton-t-shirt",
    description:
      "Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes.",
    shortDescription: "Sustainable organic cotton t-shirt",
    price: 29.99,
    category: "Clothing",
    categorySlug: "clothing",
    images: ["/images/products/tshirt-1.jpg", "/images/products/tshirt-2.jpg"],
    inStock: true,
    stockQuantity: 100,
    tags: ["organic", "cotton", "sustainable", "t-shirt"],
    rating: 4.2,
    reviewCount: 85,
    featured: false,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "3",
    name: "Smart Home Security Camera",
    slug: "smart-home-security-camera",
    description:
      "AI-powered security camera with night vision, motion detection, and mobile app integration.",
    shortDescription: "AI-powered security camera with mobile app",
    price: 149.99,
    originalPrice: 199.99,
    category: "Electronics",
    categorySlug: "electronics",
    images: ["/images/products/camera-1.jpg", "/images/products/camera-2.jpg"],
    inStock: true,
    stockQuantity: 25,
    tags: ["smart-home", "security", "camera", "ai"],
    rating: 4.7,
    reviewCount: 92,
    featured: true,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "4",
    name: "Indoor Plant Collection",
    slug: "indoor-plant-collection",
    description:
      "A beautiful collection of low-maintenance indoor plants perfect for beginners. Includes care instructions.",
    shortDescription: "Low-maintenance indoor plant collection",
    price: 79.99,
    category: "Home & Garden",
    categorySlug: "home-garden",
    images: ["/images/products/plants-1.jpg", "/images/products/plants-2.jpg"],
    inStock: true,
    stockQuantity: 30,
    tags: ["plants", "indoor", "home-decor", "low-maintenance"],
    rating: 4.4,
    reviewCount: 67,
    featured: false,
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
  {
    id: "5",
    name: "JavaScript: The Complete Guide",
    slug: "javascript-complete-guide",
    description:
      "Comprehensive guide to modern JavaScript development. Covers ES6+, async programming, and best practices.",
    shortDescription: "Complete guide to modern JavaScript",
    price: 49.99,
    category: "Books",
    categorySlug: "books",
    images: [
      "/images/products/js-book-1.jpg",
      "/images/products/js-book-2.jpg",
    ],
    inStock: true,
    stockQuantity: 75,
    tags: ["javascript", "programming", "web-development", "education"],
    rating: 4.8,
    reviewCount: 156,
    featured: true,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter((product) => product.categorySlug === categorySlug);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((category) => category.slug === slug);
};
