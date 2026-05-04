"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { Package } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Variant {
  id?: string;
  name: string;
  image?: string;
  specs?: Record<string, any>;
  attributes?: Record<string, any>;
  pricing?: Array<{
    min: number;
    max?: number;
    discount: number;
  }>;
}

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
  variants?: Variant[];
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
  variants = [],
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedVariantQuantities, setSelectedVariantQuantities] = useState<
    Record<number, number>
  >({
    0: 1,
  });

  const hasVariants = variants.length > 0;
  const currentVariant = hasVariants ? variants[selectedVariantIndex] : null;
  const currentQuantity = selectedVariantQuantities[selectedVariantIndex] || 1;

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const calculatePrice = (discount: number, basePrice?: number) => {
    const priceToUse = basePrice || price;
    return (priceToUse * (1 - discount / 100)).toFixed(2);
  };

  const calculateCurrentPrice = () => {
    if (!hasVariants) {
      return price;
    }

    const variant = variants[selectedVariantIndex];
    if (!variant.pricing || variant.pricing.length === 0) {
      return basePrice;
    }

    // Find applicable tier based on quantity
    const applicableTier = variant.pricing.find(
      (tier) =>
        currentQuantity >= tier.min &&
        (!tier.max || currentQuantity <= tier.max),
    );

    if (applicableTier) {
      return Number(calculatePrice(applicableTier.discount, basePrice));
    }

    return basePrice;
  };

  const currentPrice = calculateCurrentPrice();
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const updateQuantity = (index: number, newQuantity: number) => {
    setSelectedVariantQuantities({
      ...selectedVariantQuantities,
      [index]: Math.max(1, newQuantity),
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        {category && (
          <Badge variant="secondary" className="w-fit px-3 py-1">
            {category}
          </Badge>
        )}
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
            {name}
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Rating Section */}
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-sm ${
                i < Math.round(rating)
                  ? "text-amber-400"
                  : "text-muted-foreground/30"
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {rating.toFixed(1)} ({reviewCount} reviews)
        </span>
        <Separator orientation="vertical" className="h-4 mx-2" />
        {inStock ? (
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">En Stock</span>
          </div>
        ) : (
          <span className="text-sm font-medium text-destructive">Agotado</span>
        )}
      </div>

      {/* Variants Section */}
      {hasVariants ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Selecciona una variante
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {variants.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedVariantIndex(index);
                    if (!selectedVariantQuantities[index]) {
                      updateQuantity(index, 1);
                    }
                  }}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedVariantIndex === index
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  {variant.image ? (
                    <img
                      src={variant.image}
                      alt={variant.name}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                  ) : (
                    <div className="w-full h-24 bg-muted rounded mb-2 flex items-center justify-center">
                      <Package className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                  )}
                  <p className="text-sm font-medium text-foreground truncate">
                    {variant.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Variant Details Card */}
          {currentVariant && (
            <Card className="overflow-hidden border shadow-sm">
              <CardContent className="p-6 space-y-4">
                {/* Specifications */}
                {Object.keys(currentVariant.specs || {}).length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                      Especificaciones
                    </p>
                    <div className="space-y-2">
                      {Object.entries(currentVariant.specs || {}).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center py-2 px-3 rounded-md bg-muted/40"
                          >
                            <span className="text-sm text-muted-foreground">
                              {key}
                            </span>
                            <span className="font-medium text-foreground">
                              {String(value)}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Attributes */}
                {Object.keys(currentVariant.attributes || {}).length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                        Características
                      </p>
                      <div className="space-y-2">
                        {Object.entries(currentVariant.attributes || {}).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-muted-foreground">
                                {key}
                              </span>
                              <span className="text-sm font-medium text-foreground">
                                {String(value)}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Pricing Tiers */}
                {currentVariant.pricing &&
                  currentVariant.pricing.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                          Precios por Volumen
                        </p>
                        <div className="space-y-2 bg-primary/5 rounded-lg p-3 border border-primary/20">
                          {currentVariant.pricing.map((tier, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center text-sm"
                            >
                              <span className="text-muted-foreground">
                                {tier.max
                                  ? `${tier.min}-${tier.max}`
                                  : `${tier.min}+`}{" "}
                                unidades
                              </span>
                              <div className="flex items-center gap-2">
                                {tier.discount > 0 && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    -{tier.discount}%
                                  </Badge>
                                )}
                                <span className="font-bold text-primary">
                                  {Number(
                                    calculatePrice(tier.discount, basePrice),
                                  ).toLocaleString("es-ES", {
                                    style: "currency",
                                    currency: currency,
                                  })}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        /* No Variants - Show Base Price */
        <div className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-foreground">
              {(Number.isFinite(currentPrice)
                ? currentPrice
                : 0
              ).toLocaleString("es-ES", {
                style: "currency",
                currency: currency,
              })}
            </span>
            {originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {originalPrice.toLocaleString("es-ES", {
                    style: "currency",
                    currency: currency,
                  })}
                </span>
                {discount > 0 && (
                  <Badge variant="destructive" className="text-sm px-3 py-1">
                    -{discount}%
                  </Badge>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">
          Cantidad
        </label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              updateQuantity(
                selectedVariantIndex,
                selectedVariantQuantities[selectedVariantIndex] - 1,
              )
            }
            disabled={!inStock || currentQuantity <= 1}
            className="h-10 w-10"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Input
            type="number"
            min="1"
            max="999"
            value={currentQuantity}
            onChange={(e) =>
              updateQuantity(
                selectedVariantIndex,
                Math.max(1, parseInt(e.target.value) || 1),
              )
            }
            className="flex-1 text-center text-lg font-semibold h-10"
            disabled={!inStock}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              updateQuantity(
                selectedVariantIndex,
                selectedVariantQuantities[selectedVariantIndex] + 1,
              )
            }
            disabled={!inStock}
            className="h-10 w-10"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Current Price for Variants */}
      {hasVariants && currentVariant && (
        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">
              Precio actual ({currentQuantity} unidad
              {currentQuantity !== 1 ? "es" : ""})
            </span>
            <span className="text-3xl font-bold text-primary">
              {currentPrice.toLocaleString("es-ES", {
                style: "currency",
                currency: currency,
              })}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          size="lg"
          className="flex-1 gap-2 h-12 text-base font-semibold"
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          <ShoppingCart className="w-5 h-5" />
          {isAdded ? "¡Agregado al carrito!" : "Agregar al carrito"}
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="px-6 h-12"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : "text-foreground"
            }`}
          />
        </Button>
      </div>

      {/* Info Footer */}
      <div className="space-y-3 pt-4 border-t">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Envío Gratis</span>
          <span className="font-medium">En pedidos mayores a 50€</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tiempo de entrega</span>
          <span className="font-medium">3-5 días hábiles</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Devoluciones</span>
          <span className="font-medium">Política de 30 días</span>
        </div>
      </div>
    </div>
  );
}
