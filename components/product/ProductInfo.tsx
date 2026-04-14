"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { ProductBundles } from "./product-bundles";

interface ProductInfoProps {
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  description: string;
  category?: string;
  currency?: string;
  basePrice: number;
  tiers: {
    quantity: number;
    discountPercent: number;
  }[];
}

export function ProductInfo({
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  inStock,
  description,
  category,
  currency = "EUR",
  basePrice,
  tiers,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Category Badge */}
      {category && (
        <Badge variant="secondary" className="w-fit">
          {category}
        </Badge>
      )}

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{name}</h1>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-lg ${
                i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {rating.toFixed(1)} ({reviewCount} reviews)
        </span>
      </div>

      {/* Price Section */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-4">
          <span className="text-4xl font-bold text-foreground">
            {(Number.isFinite(price) ? price : 0).toLocaleString("es-ES", {
              style: "currency",
              currency: currency,
            })}
          </span>

          {originalPrice && (
            <>
              <span className="text-xl text-muted-foreground line-through">
                {originalPrice.toLocaleString("es-ES", {
                  style: "currency",
                  currency: currency,
                })}
              </span>
              <Badge variant="destructive" className="text-lg px-3 py-1">
                -{discount}%
              </Badge>
            </>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          {inStock ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">
                In Stock
              </span>
            </>
          ) : (
            <span className="text-sm text-destructive font-medium">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <FieldGroup>
          <Field>
            <FieldLabel>Quantity</FieldLabel>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={!inStock}
              >
                −
              </Button>
              <Input
                type="number"
                min="1"
                max="999"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 text-center"
                disabled={!inStock}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                disabled={!inStock}
              >
                +
              </Button>
            </div>
          </Field>
        </FieldGroup>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            size="lg"
            className="flex-1 gap-2"
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            <ShoppingCart className="w-5 h-5" />
            {isAdded ? "Added to Cart!" : "Add to Cart"}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="px-4"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-current text-red-500" : ""
              }`}
            />
          </Button>
        </div>
      </div>
      <ProductBundles basePrice={basePrice} bundles={tiers} />

      {/* Shipping Info 
      <Card className="p-4 border-border/50 bg-muted/30">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Free Shipping</span>
            <span className="font-medium">On orders over 50€</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Time</span>
            <span className="font-medium">3-5 business days</span>
          </div>
          </div>
          </Card>
          */}
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Returns</span>
        <span className="font-medium">30-day return policy</span>
      </div>
    </div>
  );
}
