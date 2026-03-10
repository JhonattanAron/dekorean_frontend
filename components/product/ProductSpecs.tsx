"use client";

import { Card } from "@/components/ui/card";

interface Spec {
  label: string;
  value: string | number;
}

interface ProductSpecsProps {
  specs: Spec[];
  dimensions?: {
    size?: string;
    capacity?: string;
    price_per_m2?: number;
  };
}

export function ProductSpecs({ specs, dimensions }: ProductSpecsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((spec, index) => (
            <Card
              key={index}
              className="p-4 border-border/50 bg-card hover:bg-muted/50 transition-colors"
            >
              <p className="text-sm text-muted-foreground mb-1">{spec.label}</p>
              <p className="text-lg font-semibold text-foreground">
                {spec.value || "N/A"}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Dimensions */}
      {dimensions &&
        (dimensions.size || dimensions.capacity || dimensions.price_per_m2) && (
          <div>
            <h3 className="text-xl font-bold mb-3">Dimensions & Size</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dimensions.size && (
                <Card className="p-4 border-border/50 bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-1">Size</p>
                  <p className="text-lg font-semibold">{dimensions.size}</p>
                </Card>
              )}
              {dimensions.capacity && (
                <Card className="p-4 border-border/50 bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-1">Capacity</p>
                  <p className="text-lg font-semibold">{dimensions.capacity}</p>
                </Card>
              )}
              {dimensions.price_per_m2 && dimensions.price_per_m2 > 0 && (
                <Card className="p-4 border-border/50 bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-1">
                    Price per m²
                  </p>
                  <p className="text-lg font-semibold">
                    €{dimensions.price_per_m2.toFixed(2)}
                  </p>
                </Card>
              )}
            </div>
          </div>
        )}
    </div>
  );
}
