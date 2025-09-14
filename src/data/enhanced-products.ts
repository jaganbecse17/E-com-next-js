import {
  EnhancedProduct,
  ProductReview,
  ProductSpecification,
  ProductOwner,
  ProductOffer,
} from "@/types/enhanced-product";
import { products } from "./products";

// Mock reviews data
const mockReviews: ProductReview[] = [
  {
    id: "rev-1",
    userId: "user-1",
    userName: "Sarah Johnson",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    title: "Excellent quality and fast delivery!",
    comment:
      "I am extremely happy with this purchase. The quality is outstanding and it arrived much faster than expected. Highly recommend!",
    date: new Date("2024-08-15"),
    helpful: 24,
    verified: true,
  },
  {
    id: "rev-2",
    userId: "user-2",
    userName: "Mike Chen",
    userAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4,
    title: "Good value for money",
    comment:
      "Great product overall. Works exactly as described. Only minor issue is the packaging could be better.",
    date: new Date("2024-08-10"),
    helpful: 12,
    verified: true,
  },
  {
    id: "rev-3",
    userId: "user-3",
    userName: "Emma Wilson",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    title: "Perfect!",
    comment:
      "Exactly what I needed. Works perfectly and looks great. Will definitely buy from this seller again.",
    date: new Date("2024-08-05"),
    helpful: 18,
    verified: true,
  },
];

// Mock owners data
const mockOwners: ProductOwner[] = [
  {
    id: "owner-1",
    name: "TechnoMart Store",
    avatar:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=150&h=150&fit=crop",
    rating: 4.8,
    reviewCount: 1247,
    joinedDate: new Date("2020-03-15"),
    description:
      "Premium electronics and gadgets store with 5+ years of experience",
    location: "San Francisco, CA",
  },
  {
    id: "owner-2",
    name: "Fashion Hub",
    avatar:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=150&fit=crop",
    rating: 4.6,
    reviewCount: 892,
    joinedDate: new Date("2019-07-22"),
    description: "Trendy and sustainable fashion for modern lifestyle",
    location: "New York, NY",
  },
];

// Mock offers data
const mockOffers: ProductOffer[] = [
  {
    id: "offer-1",
    title: "First Purchase Discount",
    description: "Get 10% off on your first purchase",
    discount: 10,
    validUntil: new Date("2024-12-31"),
    code: "FIRST10",
    minPurchase: 50,
  },
  {
    id: "offer-2",
    title: "Free Shipping",
    description: "Free shipping on orders above $75",
    discount: 0,
    validUntil: new Date("2024-11-30"),
    minPurchase: 75,
  },
];

// Product specifications by category
const electronicsSpecs: ProductSpecification[] = [
  { key: "Brand", value: "TechBrand", category: "General" },
  { key: "Model", value: "TB-2024", category: "General" },
  { key: "Warranty", value: "2 Years", category: "General" },
  { key: "Connectivity", value: "Bluetooth 5.0, USB-C", category: "Technical" },
  { key: "Battery Life", value: "Up to 30 hours", category: "Technical" },
  { key: "Weight", value: "250g", category: "Physical" },
  { key: "Dimensions", value: "15 x 8 x 3 cm", category: "Physical" },
];

const clothingSpecs: ProductSpecification[] = [
  { key: "Material", value: "100% Organic Cotton", category: "Fabric" },
  { key: "Fit", value: "Regular Fit", category: "Sizing" },
  { key: "Care Instructions", value: "Machine wash cold", category: "Care" },
  { key: "Country of Origin", value: "Made in USA", category: "General" },
  { key: "Certification", value: "GOTS Certified", category: "General" },
];

const homeSpecs: ProductSpecification[] = [
  { key: "Resolution", value: "1080p HD", category: "Technical" },
  { key: "Night Vision", value: "Yes", category: "Features" },
  { key: "Storage", value: "Cloud & Local", category: "Technical" },
  { key: "Power", value: "AC Adapter", category: "Technical" },
  { key: "Compatibility", value: "iOS & Android", category: "Compatibility" },
];

// Enhanced products with all additional data
export const enhancedProducts: EnhancedProduct[] = products.map((product) => {
  let specifications: ProductSpecification[];
  let owner: ProductOwner;

  // Assign specs and owner based on category
  if (product.categorySlug === "electronics") {
    specifications = electronicsSpecs;
    owner = mockOwners[0];
  } else if (product.categorySlug === "clothing") {
    specifications = clothingSpecs;
    owner = mockOwners[1];
  } else {
    specifications = homeSpecs;
    owner = mockOwners[0];
  }

  return {
    ...product,
    reviews: mockReviews,
    specifications,
    owner,
    offers: mockOffers,
    averageRating: 4.5,
    totalReviews: mockReviews.length,
    gallery: [
      ...product.images,
      // Add additional gallery images
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=600&fit=crop",
    ],
  };
});

export function getEnhancedProductBySlug(
  slug: string
): EnhancedProduct | undefined {
  return enhancedProducts.find((product) => product.slug === slug);
}

export function getEnhancedProductsByCategory(
  categorySlug: string
): EnhancedProduct[] {
  return enhancedProducts.filter(
    (product) => product.categorySlug === categorySlug
  );
}

// Utility function to check delivery availability by pincode
export function checkDeliveryByPincode(pincode: string): Promise<{
  available: boolean;
  estimatedDays: number;
  charges: number;
  city?: string;
  state?: string;
}> {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      const pincodeData = {
        "110001": { city: "New Delhi", state: "Delhi", days: 1, charges: 0 },
        "400001": { city: "Mumbai", state: "Maharashtra", days: 2, charges: 5 },
        "560001": {
          city: "Bangalore",
          state: "Karnataka",
          days: 2,
          charges: 5,
        },
        "600001": {
          city: "Chennai",
          state: "Tamil Nadu",
          days: 3,
          charges: 10,
        },
        "700001": {
          city: "Kolkata",
          state: "West Bengal",
          days: 3,
          charges: 10,
        },
      };

      const data = pincodeData[pincode as keyof typeof pincodeData];

      if (data) {
        resolve({
          available: true,
          estimatedDays: data.days,
          charges: data.charges,
          city: data.city,
          state: data.state,
        });
      } else {
        resolve({
          available: false,
          estimatedDays: 0,
          charges: 0,
        });
      }
    }, 500);
  });
}
