"use client";

import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link
          href="/products"
          className="inline-flex items-center text-muted-foreground hover:text-primary mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"} in your
              cart
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700"
            >
              Clear Cart
            </Button>
          </div>

          {cart.items.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="text-lg font-semibold text-gray-900 hover:text-primary"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-gray-600 mt-1">
                        {item.product.shortDescription}
                      </p>
                      <p className="text-lg font-semibold mt-2">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium">Quantity:</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.product.stockQuantity}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-lg font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>

                  {item.quantity >= item.product.stockQuantity && (
                    <p className="text-sm text-orange-600 mt-2">
                      Maximum quantity reached
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-4">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal ({cart.itemCount} items):</span>
                <span>{formatPrice(cart.subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className={cart.shipping === 0 ? "text-green-600" : ""}>
                  {cart.shipping === 0 ? "FREE" : formatPrice(cart.shipping)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax:</span>
                <span>{formatPrice(cart.tax)}</span>
              </div>

              {cart.shipping > 0 && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-800 text-xs">
                    💡 Add {formatPrice(75 - cart.subtotal)} more for free
                    shipping
                  </p>
                </div>
              )}

              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>

              <Button variant="outline" className="w-full">
                Save for Later
              </Button>
            </div>

            <div className="mt-4 text-xs text-gray-500 space-y-1">
              <p>• Free shipping on orders over $75</p>
              <p>• 30-day return policy</p>
              <p>• Secure checkout with SSL encryption</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
