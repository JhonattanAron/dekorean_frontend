"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
}

interface ProductReviewsProps {
  reviews: Review[];
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <Card className="p-8 text-center border-border/50 bg-muted/30">
          <p className="text-muted-foreground">
            No reviews yet. Be the first to review!
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="p-6 border-border/50 hover:border-primary/50 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-foreground">{review.author}</p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Title */}
            <p className="font-medium text-foreground mb-2">{review.title}</p>

            {/* Content */}
            <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
              {review.content}
            </p>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-border/50">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <ThumbsUp className="w-4 h-4" />
                Helpful ({review.helpful})
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <MessageCircle className="w-4 h-4" />
                Reply
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <Button variant="outline" className="w-full mt-6">
        Load More Reviews
      </Button>
    </div>
  );
}
