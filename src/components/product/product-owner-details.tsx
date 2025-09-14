"use client";

import { ProductOwner } from "@/types/enhanced-product";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, MessageCircle } from "lucide-react";
import Image from "next/image";

interface ProductOwnerDetailsProps {
  owner: ProductOwner;
}

export function ProductOwnerDetails({ owner }: ProductOwnerDetailsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Seller Information</h3>

      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {owner.avatar ? (
            <Image
              src={owner.avatar}
              alt={owner.name}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 text-xl font-medium">
                {owner.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-lg">{owner.name}</h4>

          <div className="flex items-center space-x-1 mt-1">
            {renderStars(Math.round(owner.rating))}
            <span className="text-sm text-gray-600 ml-2">
              {owner.rating.toFixed(1)} ({owner.reviewCount} reviews)
            </span>
          </div>

          <p className="text-gray-700 mt-2">{owner.description}</p>

          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{owner.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Joined {owner.joinedDate.toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex space-x-3 mt-4">
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Seller
            </Button>
            <Button variant="outline" size="sm">
              View Store
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
