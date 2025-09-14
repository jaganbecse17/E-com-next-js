"use client";

import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import { ProductReview } from "@/types/enhanced-product";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface ProductReviewsProps {
  reviews: ProductReview[];
  averageRating: number;
  totalReviews: number;
}

export function ProductReviews({
  reviews,
  averageRating,
  totalReviews,
}: ProductReviewsProps) {
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "helpful">(
    "newest"
  );

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "helpful":
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const displayedReviews = showAll ? sortedReviews : sortedReviews.slice(0, 3);

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Customer Reviews</h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-sm text-gray-600">
              {averageRating.toFixed(1)} out of 5 ({totalReviews} reviews)
            </span>
          </div>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <Card key={review.id} className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {review.userAvatar ? (
                  <Image
                    src={review.userAvatar}
                    alt={review.userName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-medium">
                      {review.userName.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm">{review.userName}</span>
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Verified Purchase
                    </span>
                  )}
                  <span className="text-gray-500 text-xs">
                    {review.date.toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(review.rating)}
                </div>

                <h4 className="font-medium text-sm mb-1">{review.title}</h4>
                <p className="text-gray-700 text-sm mb-2">{review.comment}</p>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {!showAll && reviews.length > 3 && (
        <Button
          variant="outline"
          onClick={() => setShowAll(true)}
          className="w-full"
        >
          Show All {reviews.length} Reviews
        </Button>
      )}
    </div>
  );
}
