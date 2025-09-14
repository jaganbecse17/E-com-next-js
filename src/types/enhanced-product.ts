import { Product } from "./index";

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: Date;
  helpful: number;
  verified: boolean;
}

export interface ProductSpecification {
  key: string;
  value: string;
  category: string;
}

export interface ProductOwner {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  joinedDate: Date;
  description: string;
  location: string;
}

export interface ProductOffer {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: Date;
  code?: string;
  minPurchase?: number;
}

export interface DeliveryInfo {
  pincode: string;
  city: string;
  state: string;
  estimatedDays: number;
  charges: number;
  available: boolean;
}

export interface EnhancedProduct extends Product {
  reviews: ProductReview[];
  specifications: ProductSpecification[];
  owner: ProductOwner;
  offers: ProductOffer[];
  averageRating: number;
  totalReviews: number;
  gallery: string[];
}
