import { Product, Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    description: "Latest electronic devices and gadgets",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop",
    order: 1,
    isActive: true,
  },
  {
    id: "2",
    name: "Clothing",
    slug: "clothing",
    description: "Fashion and apparel for all ages",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop",
    order: 2,
    isActive: true,
  },
  {
    id: "3",
    name: "Home & Garden",
    slug: "home-garden",
    description: "Everything for your home and garden",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
    order: 3,
    isActive: true,
  },
  {
    id: "4",
    name: "Books",
    slug: "books",
    description: "Books for learning and entertainment",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
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
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=800&h=800&fit=crop",
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
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=800&h=800&fit=crop",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1593359863503-b5bf2a162468?w=800&h=800&fit=crop",
    ],
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
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800&h=800&fit=crop",
    ],
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
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop",
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
  {
    id: "6",
    name: "Professional Chef Knife Set",
    slug: "professional-chef-knife-set",
    description:
      "High-quality stainless steel knife set perfect for home cooks and professional chefs. Includes 8 essential knives with wooden block.",
    shortDescription: "Professional 8-piece stainless steel knife set",
    price: 129.99,
    originalPrice: 179.99,
    category: "Home & Garden",
    categorySlug: "home-garden",
    images: [
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1616736734007-6dc8a4d0b823?w=800&h=800&fit=crop",
    ],
    inStock: true,
    stockQuantity: 15,
    tags: ["kitchen", "knives", "cooking", "professional", "stainless-steel"],
    rating: 4.6,
    reviewCount: 203,
    featured: true,
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
  },
  {
    id: "7",
    name: "Vintage Denim Jacket",
    slug: "vintage-denim-jacket",
    description:
      "Classic vintage-style denim jacket made from premium cotton denim. Perfect for layering and available in multiple washes.",
    shortDescription: "Classic vintage-style denim jacket",
    price: 89.99,
    category: "Clothing",
    categorySlug: "clothing",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&h=800&fit=crop",
    ],
    inStock: true,
    stockQuantity: 40,
    tags: ["denim", "jacket", "vintage", "cotton", "casual"],
    rating: 4.3,
    reviewCount: 97,
    featured: false,
    createdAt: "2024-01-18T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
  },
  {
    id: "8",
    name: "Wireless Gaming Mouse",
    slug: "wireless-gaming-mouse",
    description:
      "High-precision wireless gaming mouse with RGB lighting, customizable buttons, and ultra-fast response time. Perfect for competitive gaming.",
    shortDescription: "High-precision wireless gaming mouse with RGB",
    price: 79.99,
    originalPrice: 99.99,
    category: "Electronics",
    categorySlug: "electronics",
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1563297007-0686b8eb71cd?w=800&h=800&fit=crop",
    ],
    inStock: true,
    stockQuantity: 35,
    tags: ["gaming", "mouse", "wireless", "rgb", "precision"],
    rating: 4.4,
    reviewCount: 174,
    featured: false,
    createdAt: "2024-01-22T00:00:00Z",
    updatedAt: "2024-01-22T00:00:00Z",
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
