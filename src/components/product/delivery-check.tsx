"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Truck, Clock } from "lucide-react";
import { checkDeliveryByPincode } from "@/data/enhanced-products";

interface DeliveryCheckProps {
  productPrice: number;
}

export function DeliveryCheck({ productPrice }: DeliveryCheckProps) {
  const [pincode, setPincode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState<{
    available: boolean;
    estimatedDays: number;
    charges: number;
    city?: string;
    state?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    if (pincode.length !== 6) {
      setError("Please enter a valid 6-digit pincode");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await checkDeliveryByPincode(pincode);
      setDeliveryInfo(result);
    } catch {
      setError("Failed to check delivery. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getDeliveryDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <MapPin className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold">Check Delivery</h3>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter pincode"
            value={pincode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 6) {
                setPincode(value);
                setError("");
                setDeliveryInfo(null);
              }
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={6}
          />
          <Button
            onClick={handleCheck}
            disabled={loading || pincode.length !== 6}
            className="px-6"
          >
            {loading ? "Checking..." : "Check"}
          </Button>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {deliveryInfo && (
          <div className="space-y-3">
            {deliveryInfo.available ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">
                    Delivery Available
                  </span>
                </div>

                {deliveryInfo.city && deliveryInfo.state && (
                  <p className="text-sm text-gray-700 mb-2">
                    Delivering to: {deliveryInfo.city}, {deliveryInfo.state}
                  </p>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>
                      Expected delivery:{" "}
                      {getDeliveryDate(deliveryInfo.estimatedDays)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Delivery charges:</span>
                    <span
                      className={
                        deliveryInfo.charges === 0
                          ? "text-green-600 font-medium"
                          : ""
                      }
                    >
                      {deliveryInfo.charges === 0
                        ? "FREE"
                        : `$${deliveryInfo.charges}`}
                    </span>
                  </div>

                  {productPrice >= 75 && deliveryInfo.charges > 0 && (
                    <p className="text-green-600 text-xs">
                      💡 Add ${(75 - productPrice).toFixed(2)} more for free
                      delivery
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm">
                  Sorry, delivery is not available to this pincode.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Enter your pincode to check delivery options</p>
          <p>• Free delivery on orders above $75</p>
          <p>• Express delivery available in select cities</p>
        </div>
      </div>
    </Card>
  );
}
