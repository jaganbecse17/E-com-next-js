import { Product } from "@/types";

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
}

export interface CartContextType {
  cart: Cart;
  isLoading: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItem: (productId: string) => CartItem | undefined;
}
