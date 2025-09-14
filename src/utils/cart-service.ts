import { Cart, CartItem } from "@/types/cart";
import { Product } from "@/types";

const CART_STORAGE_KEY = "ecommerce_cart";

// Cart calculation constants
const TAX_RATE = 0.08; // 8% tax
const FREE_SHIPPING_THRESHOLD = 75;
const STANDARD_SHIPPING = 10;

export class CartService {
  static saveCart(cart: Cart): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }

  static loadCart(): Cart {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        try {
          const parsedCart = JSON.parse(stored);
          return this.calculateTotals(parsedCart);
        } catch (error) {
          console.error("Error parsing cart from localStorage:", error);
        }
      }
    }
    return this.createEmptyCart();
  }

  static createEmptyCart(): Cart {
    return {
      items: [],
      total: 0,
      itemCount: 0,
      subtotal: 0,
      tax: 0,
      shipping: 0,
    };
  }

  static addItem(cart: Cart, product: Product, quantity: number = 1): Cart {
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === product.id
    );

    let newItems: CartItem[];

    if (existingItemIndex > -1) {
      // Update existing item
      newItems = cart.items.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `cart_${product.id}_${Date.now()}`,
        productId: product.id,
        quantity,
        price: product.price,
        product,
      };
      newItems = [...cart.items, newItem];
    }

    const newCart = { ...cart, items: newItems };
    return this.calculateTotals(newCart);
  }

  static removeItem(cart: Cart, productId: string): Cart {
    const newItems = cart.items.filter((item) => item.productId !== productId);
    const newCart = { ...cart, items: newItems };
    return this.calculateTotals(newCart);
  }

  static updateQuantity(cart: Cart, productId: string, quantity: number): Cart {
    if (quantity <= 0) {
      return this.removeItem(cart, productId);
    }

    const newItems = cart.items.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );

    const newCart = { ...cart, items: newItems };
    return this.calculateTotals(newCart);
  }

  static calculateTotals(cart: Cart): Cart {
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    const shipping =
      subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + shipping;

    return {
      ...cart,
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      shipping: Math.round(shipping * 100) / 100,
      total: Math.round(total * 100) / 100,
      itemCount,
    };
  }

  static clearCart(): Cart {
    const emptyCart = this.createEmptyCart();
    this.saveCart(emptyCart);
    return emptyCart;
  }

  static getItemByProductId(
    cart: Cart,
    productId: string
  ): CartItem | undefined {
    return cart.items.find((item) => item.productId === productId);
  }

  // Utility functions for future API integration
  static async syncWithAPI(cart: Cart): Promise<Cart> {
    // This is a placeholder for future API integration
    // In a real app, this would sync the cart with a backend service
    console.log("Syncing cart with API:", cart);
    return cart;
  }

  static validateCartItems(cart: Cart): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    cart.items.forEach((item) => {
      // Check stock availability
      if (!item.product.inStock) {
        errors.push(`${item.product.name} is out of stock`);
      }

      // Check quantity limits
      if (item.quantity > item.product.stockQuantity) {
        errors.push(
          `Only ${item.product.stockQuantity} ${item.product.name} available`
        );
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static async processCheckout(
    cart: Cart
  ): Promise<{ success: boolean; orderId?: string; error?: string }> {
    // Validate cart
    const validation = this.validateCartItems(cart);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors.join(", "),
      };
    }

    // Simulate API call
    try {
      // In a real app, this would process payment and create order
      const orderId = `order_${Date.now()}`;

      // Clear cart after successful checkout
      this.clearCart();

      return {
        success: true,
        orderId,
      };
    } catch {
      return {
        success: false,
        error: "Failed to process checkout. Please try again.",
      };
    }
  }
}
