"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Cart, CartContextType } from "@/types/cart";
import { Product } from "@/types";
import { CartService } from "@/utils/cart-service";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(CartService.createEmptyCart());
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = CartService.loadCart();
    setCart(savedCart);
    setIsLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      CartService.saveCart(cart);
    }
  }, [cart, isLoading]);

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!product.inStock) {
      console.warn("Cannot add out of stock item to cart");
      return;
    }

    if (quantity > product.stockQuantity) {
      console.warn("Cannot add more items than available in stock");
      return;
    }

    const newCart = CartService.addItem(cart, product, quantity);
    setCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    const newCart = CartService.removeItem(cart, productId);
    setCart(newCart);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const newCart = CartService.updateQuantity(cart, productId, quantity);
    setCart(newCart);
  };

  const clearCart = () => {
    const emptyCart = CartService.clearCart();
    setCart(emptyCart);
  };

  const getCartItem = (productId: string) => {
    return CartService.getItemByProductId(cart, productId);
  };

  const value: CartContextType = {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
