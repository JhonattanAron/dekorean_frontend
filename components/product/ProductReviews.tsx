'use client'

import { useState } from 'react'
import { ThumbsUp, ChevronDown } from 'lucide-react'

interface Review {
  id: string
  author: string
  rating: number
  title: string
  content: string
  date: string
  helpful: number
}

interface ProductReviewsProps {
  reviews: Review[]
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  const [expanded, setExpanded] = useState(true)
  const [helpfulIds, setHelpfulIds] = useState<Set<string>>(new Set())

  const toggleHelpful = (id: string) => {
    const newSet = new Set(helpfulIds)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setHelpfulIds(newSet)
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 bg-secondary hover:bg-muted transition-colors flex items-center justify-between"
      >
        <h3 className="font-semibold text-foreground">Customer Reviews</h3>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {expanded && (
        <div className="divide-y divide-border">
          {reviews.map((review) => (
            <div key={review.id} className="px-6 py-6 hover:bg-secondary transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">{review.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < review.rating
                              ? 'text-foreground'
                              : 'text-muted'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      by {review.author}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {review.date}
                </span>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {review.content}
              </p>

              <button
                onClick={() => toggleHelpful(review.id)}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  helpfulIds.has(review.id)
                    ? 'text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                Helpful ({review.helpful + (helpfulIds.has(review.id) ? 1 : 0)})
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
