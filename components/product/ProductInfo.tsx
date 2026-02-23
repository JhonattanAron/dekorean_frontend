'use client'

import { useState } from 'react'
import { Heart, Share2, Check } from 'lucide-react'

interface ProductInfoProps {
  name: string
  price: number
  rating: number
  reviewCount: number
  inStock: boolean
  description: string
}

export function ProductInfo({
  name,
  price,
  rating,
  reviewCount,
  inStock,
  description,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-3 text-foreground">{name}</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < Math.floor(rating) ? 'text-foreground' : 'text-muted'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              {rating} • {reviewCount.toLocaleString()} reviews
            </span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="border-b border-border pb-6">
        <p className="text-3xl font-bold text-foreground">${price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {inStock ? (
            <span className="text-green-600 flex items-center gap-1">
              <Check className="w-4 h-4" /> In Stock
            </span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>
      </div>

      {/* Description */}
      <div>
        <h3 className="font-semibold text-foreground mb-2">About this item</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground">Quantity:</span>
        <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 hover:bg-background rounded transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-4 font-medium text-foreground">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 hover:bg-background rounded transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleAddToCart}
          disabled={!inStock || addedToCart}
          className={`flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            addedToCart
              ? 'bg-green-600 text-white'
              : 'bg-foreground text-background hover:opacity-90'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {addedToCart ? (
            <>
              <Check className="w-5 h-5" />
              Added to Cart
            </>
          ) : (
            'Add to Cart'
          )}
        </button>
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="px-4 py-3 rounded-lg border border-border hover:bg-secondary transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted
                ? 'fill-destructive text-destructive'
                : 'text-foreground'
            }`}
          />
        </button>
        <button
          className="px-4 py-3 rounded-lg border border-border hover:bg-secondary transition-colors"
          aria-label="Share product"
        >
          <Share2 className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Additional Info */}
      <div className="bg-secondary rounded-lg p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">FREE Delivery</span>
          <span className="font-medium">Wed, Feb 26</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Returns</span>
          <span className="font-medium">30-day returns</span>
        </div>
      </div>
    </div>
  )
}
