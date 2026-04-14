"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export interface BundleTier {
  id: string;
  quantity: number;
  discountPercent: number;
}

interface BundleFormData {
  productName: string;
  basePrice: string;
  quantity: string;
  discountPercent: string;
}

interface BundleAdminProps {
  tiers: BundleTier[];
  onChange: (tiers: BundleTier[]) => void;
  basePrice: number;
  productName: string;
}

export function BundleAdmin({
  tiers,
  onChange,
  basePrice,
  productName,
}: BundleAdminProps) {
  const { register, handleSubmit, reset, watch } = useForm<BundleFormData>({
    defaultValues: {
      productName: "Widget Premium",
      basePrice: "29.99",
      quantity: "5",
      discountPercent: "10",
    },
  });
  console.log(basePrice);

  const onSubmit = (data: BundleFormData) => {
    const newTier: BundleTier = {
      id: Date.now().toString(),
      quantity: parseInt(data.quantity, 10),
      discountPercent: parseFloat(data.discountPercent),
    };

    const updatedTiers = [...tiers, newTier].sort(
      (a, b) => a.quantity - b.quantity,
    );

    onChange(updatedTiers);

    reset({
      quantity: "",
      discountPercent: "",
    });
  };
  const removeTier = (id: string) => {
    const updated = tiers.filter((t) => t.id !== id);
    onChange(updated);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* Form Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Admin de Paquetes
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Crea niveles de descuento para tus paquetes de productos
          </p>
        </div>

        <Card className="p-6 border border-border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Product Info Section */}

            {/* Tier Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                Agregar Nivel de Descuento
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity" className="text-sm font-medium">
                    Cantidad
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    placeholder="5"
                    {...register("quantity")}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="discountPercent"
                    className="text-sm font-medium"
                  >
                    Descuento (%)
                  </Label>
                  <Input
                    id="discountPercent"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="10"
                    {...register("discountPercent")}
                    className="mt-2"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Nivel
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Preview Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Vista Previa del Cliente
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Cómo se verán tus paquetes para los clientes
          </p>
        </div>

        <Card className="p-6 border border-border sticky top-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Precio base: ${basePrice.toFixed(2)} por unidad
              </p>
            </div>

            {tiers.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Aún no hay niveles. Crea tu primer nivel de paquete para ver
                  la vista previa.
                </p>
              </div>
            ) : (
              <div className="grid gap-3">
                {tiers.map((tier, indx) => {
                  const savings =
                    tier.quantity * basePrice * (tier.discountPercent / 100);
                  const discountedPrice =
                    basePrice - (basePrice * tier.discountPercent) / 100;
                  const totalPrice = discountedPrice * tier.quantity;

                  return (
                    <Card
                      key={indx}
                      className="p-4 border border-border  hover:border-primary/50 transition-colors"
                    >
                      <div className="space-y-3">
                        <Button
                          onClick={() => removeTier(tier.id)}
                          className="text-xs px-2 py-1 justify-end rounded-md bg-red-500/10 text-red-600 hover:bg-red-500/20 transition"
                          type="button"
                        >
                          Eliminar
                        </Button>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-foreground">
                            {tier.quantity} unidad
                            {tier.quantity !== 1 ? "es" : ""}
                          </span>
                          {tier.discountPercent > 0 && (
                            <Badge
                              variant="default"
                              className="bg-green-600 text-white"
                            >
                              Ahorra ${savings.toFixed(2)}
                            </Badge>
                          )}
                        </div>

                        {tier.discountPercent > 0 && (
                          <div className="text-xs text-muted-foreground">
                            {tier.discountPercent}% de descuento
                          </div>
                        )}

                        <div className="space-y-1 pt-2 border-t border-border">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Precio por unidad:
                            </span>
                            <span className="font-medium">
                              ${discountedPrice.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between text-base font-semibold text-foreground">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
