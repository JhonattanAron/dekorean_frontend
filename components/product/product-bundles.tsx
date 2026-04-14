"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BundleTier {
  quantity: number;
  discountPercent: number;
}

interface ProductBundlesProps {
  basePrice: number;
  bundles: BundleTier[];
}

export function ProductBundles({ basePrice, bundles }: ProductBundlesProps) {
  if (!bundles || bundles.length === 0) return null;

  // Ordenar por cantidad
  const sorted = [...bundles].sort((a, b) => a.quantity - b.quantity);

  // Mejor oferta (mayor descuento)
  const bestTier = [...bundles].sort(
    (a, b) => b.discountPercent - a.discountPercent,
  )[0];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Ofertas por volumen</h3>

      <div className="grid gap-3">
        {sorted.map((tier) => {
          const savings =
            tier.quantity * basePrice * (tier.discountPercent / 100);

          const discountedUnitPrice =
            basePrice - (basePrice * tier.discountPercent) / 100;

          const totalPrice = discountedUnitPrice * tier.quantity;

          return (
            <Card
              key={tier.quantity}
              className={`p-4 border transition ${
                tier.quantity === bestTier?.quantity
                  ? "border-green-500 bg-foreground/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">
                    {tier.quantity} unidades
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {tier.discountPercent}% de descuento
                  </p>

                  {tier.quantity === bestTier?.quantity && (
                    <span className="text-xs text-green-600 font-semibold">
                      🔥 Mejor oferta
                    </span>
                  )}
                </div>

                <Badge className="bg-green-600 text-white">
                  Ahorra ${savings.toFixed(2)}
                </Badge>
              </div>

              <div className="mt-3 pt-3 border-t text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Precio por unidad:
                  </span>
                  <span className="font-medium">
                    ${discountedUnitPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between font-semibold text-base">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
