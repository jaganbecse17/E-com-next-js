"use client";

import { useState } from "react";
import { ProductOffer } from "@/types/enhanced-product";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Copy, Clock } from "lucide-react";

interface ProductOffersProps {
  offers: ProductOffer[];
}

export function ProductOffers({ offers }: ProductOffersProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isOfferValid = (validUntil: Date) => {
    return new Date() < validUntil;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Gift className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold">Available Offers</h3>
      </div>

      <div className="space-y-3">
        {offers.map((offer) => (
          <Card key={offer.id} className="p-4 border-l-4 border-l-green-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-green-700">{offer.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {offer.description}
                </p>

                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>
                      Valid until {offer.validUntil.toLocaleDateString()}
                    </span>
                  </div>
                  {offer.minPurchase && (
                    <span>Min. purchase: ${offer.minPurchase}</span>
                  )}
                </div>

                {offer.discount > 0 && (
                  <div className="mt-2">
                    <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                      {offer.discount}% OFF
                    </span>
                  </div>
                )}
              </div>

              {offer.code && isOfferValid(offer.validUntil) && (
                <div className="ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(offer.code!)}
                    className="text-xs"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    {copiedCode === offer.code ? "Copied!" : offer.code}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
