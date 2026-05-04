"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Trash2,
  ChevronDown,
  Copy,
  Package,
  DollarSign,
  Boxes,
  X,
  Image as ImageIcon,
  Edit2,
  Check,
} from "lucide-react";

interface VariantsTabProps {
  variants: any[];
  images: string[];
  basePrice: number;
  onChange: (variants: any[]) => void;
  onImagesChange: (images: string[]) => void;
}

export function VariantsTab({
  variants = [],
  images = [],
  basePrice = 0,
  onChange,
  onImagesChange,
}: VariantsTabProps) {
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [expandedVariants, setExpandedVariants] = useState<Set<number>>(
    new Set([0]),
  );
  const [previewVariantIndex, setPreviewVariantIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [editingAttributeKey, setEditingAttributeKey] = useState<{
    variantIdx: number;
    oldKey: string;
  } | null>(null);
  const [editingSpecKey, setEditingSpecKey] = useState<{
    variantIdx: number;
    oldKey: string;
  } | null>(null);
  const [newAttributeKey, setNewAttributeKey] = useState("");
  const [newSpecKey, setNewSpecKey] = useState("");

  const handleAddVariant = () => {
    const newVariant = {
      name: `Variante ${variants.length + 1}`,
      sku: `VAR-${variants.length + 1}`,
      image: "",
      specs: {},
      attributes: {
        Peso: "",
        Empaque: "",
        Stock: "",
      },
      pricing: [{ min: 1, max: 9, discount: 0 }],
    };
    onChange([...variants, newVariant]);
    setExpandedVariants(new Set([...expandedVariants, variants.length]));
  };

  const handleDeleteVariant = (index: number) => {
    const newVariants = variants.filter((_, i) => i !== index);
    onChange(newVariants);
    setDeleteIndex(null);
    if (previewVariantIndex >= newVariants.length) {
      setPreviewVariantIndex(Math.max(0, newVariants.length - 1));
    }
  };

  const handleDuplicateVariant = (index: number) => {
    const variant = JSON.parse(JSON.stringify(variants[index]));
    variant.name = `${variant.name} (Copia)`;
    onChange([...variants, variant]);
  };

  const handleVariantChange = (index: number, field: string, value: any) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleSpecChange = (
    variantIdx: number,
    specKey: string,
    newValue: string,
  ) => {
    const updated = [...variants];
    const newSpecs = { ...updated[variantIdx].specs };
    newSpecs[specKey] = newValue;
    updated[variantIdx] = { ...updated[variantIdx], specs: newSpecs };
    onChange(updated);
  };

  const handleAddSpec = (variantIdx: number, key: string, value: string) => {
    const updated = [...variants];
    const newSpecs = { ...updated[variantIdx].specs };
    newSpecs[key] = value;
    updated[variantIdx] = { ...updated[variantIdx], specs: newSpecs };
    onChange(updated);
  };

  const handleRemoveSpec = (variantIdx: number, specKey: string) => {
    const updated = [...variants];
    const newSpecs = { ...updated[variantIdx].specs };
    delete newSpecs[specKey];
    updated[variantIdx] = { ...updated[variantIdx], specs: newSpecs };
    onChange(updated);
  };

  const handleRenameSpecKey = (
    variantIdx: number,
    oldKey: string,
    newKey: string,
  ) => {
    if (!newKey || newKey === oldKey) {
      setEditingSpecKey(null);
      return;
    }
    const updated = [...variants];
    const newSpecs = { ...updated[variantIdx].specs };
    const value = newSpecs[oldKey];
    delete newSpecs[oldKey];
    newSpecs[newKey] = value;
    updated[variantIdx] = { ...updated[variantIdx], specs: newSpecs };
    onChange(updated);
    setEditingSpecKey(null);
    setNewSpecKey("");
  };

  const handleAttributeChange = (
    variantIdx: number,
    attrKey: string,
    newValue: string,
  ) => {
    const updated = [...variants];
    const newAttrs = { ...updated[variantIdx].attributes };
    newAttrs[attrKey] = newValue;
    updated[variantIdx] = { ...updated[variantIdx], attributes: newAttrs };
    onChange(updated);
  };

  const handleAddAttribute = (
    variantIdx: number,
    key: string,
    value: string,
  ) => {
    const updated = [...variants];
    const newAttrs = { ...updated[variantIdx].attributes };
    newAttrs[key] = value;
    updated[variantIdx] = { ...updated[variantIdx], attributes: newAttrs };
    onChange(updated);
  };

  const handleRemoveAttribute = (variantIdx: number, attrKey: string) => {
    const updated = [...variants];
    const newAttrs = { ...updated[variantIdx].attributes };
    delete newAttrs[attrKey];
    updated[variantIdx] = { ...updated[variantIdx], attributes: newAttrs };
    onChange(updated);
  };

  const handleRenameAttributeKey = (
    variantIdx: number,
    oldKey: string,
    newKey: string,
  ) => {
    if (!newKey || newKey === oldKey) {
      setEditingAttributeKey(null);
      return;
    }
    const updated = [...variants];
    const newAttrs = { ...updated[variantIdx].attributes };
    const value = newAttrs[oldKey];
    delete newAttrs[oldKey];
    newAttrs[newKey] = value;
    updated[variantIdx] = { ...updated[variantIdx], attributes: newAttrs };
    onChange(updated);
    setEditingAttributeKey(null);
    setNewAttributeKey("");
  };

  const handlePricingChange = (
    variantIdx: number,
    pricingIdx: number,
    field: string,
    value: any,
  ) => {
    const updated = [...variants];
    const newPricing = [...updated[variantIdx].pricing];
    newPricing[pricingIdx] = { ...newPricing[pricingIdx], [field]: value };
    updated[variantIdx] = { ...updated[variantIdx], pricing: newPricing };
    onChange(updated);
  };

  const handleAddPricingTier = (variantIdx: number) => {
    const updated = [...variants];
    const pricing = updated[variantIdx].pricing;
    const lastMin = pricing[pricing.length - 1]?.min || 1;
    const newTier = {
      min: lastMin + 1,
      max: undefined,
      discount: 0,
    };
    updated[variantIdx].pricing.push(newTier);
    onChange(updated);
  };

  const handleRemovePricingTier = (variantIdx: number, pricingIdx: number) => {
    const updated = [...variants];
    const newPricing = updated[variantIdx].pricing.filter(
      (_: any, i: number) => i !== pricingIdx,
    );
    updated[variantIdx] = { ...updated[variantIdx], pricing: newPricing };
    onChange(updated);
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      onImagesChange([...images, imageUrl]);
      setImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    // Si la imagen eliminada está enlazada a la variante preview, desenlazarla
    if (variants[previewVariantIndex]?.image === images[index]) {
      const updated = [...variants];
      updated[previewVariantIndex] = {
        ...updated[previewVariantIndex],
        image: "",
      };
      onChange(updated);
    }
  };

  const toggleVariantExpanded = (index: number) => {
    const newExpanded = new Set(expandedVariants);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedVariants(newExpanded);
  };

  const calculatePrice = (discount: number) => {
    return (basePrice * (1 - discount / 100)).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel izquierdo: Gestión de variantes */}
        <div className="lg:col-span-2 space-y-4">
          {/* Variantes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Variantes del Producto</h3>
              <Button onClick={handleAddVariant} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Agregar
              </Button>
            </div>

            {variants.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-8 text-center text-muted-foreground">
                  No hay variantes. Agrega una para comenzar.
                </CardContent>
              </Card>
            ) : (
              variants.map((variant, idx) => (
                <Collapsible
                  key={idx}
                  open={expandedVariants.has(idx)}
                  onOpenChange={() => toggleVariantExpanded(idx)}
                >
                  <Card>
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center gap-3 flex-1">
                          <ChevronDown
                            className={`h-5 w-5 transition ${
                              expandedVariants.has(idx) ? "rotate-180" : ""
                            }`}
                          />
                          <div>
                            <p className="font-semibold">{variant.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {variant.sku}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDuplicateVariant(idx);
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteIndex(idx);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="border-t">
                      <div className="p-4 space-y-4">
                        {/* Nombre y SKU */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label className="text-xs">
                              Nombre de Variante
                            </Label>
                            <Input
                              value={variant.name}
                              onChange={(e) =>
                                handleVariantChange(idx, "name", e.target.value)
                              }
                              placeholder="ej: Talla M - Rojo"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">SKU</Label>
                            <Input
                              value={variant.sku}
                              onChange={(e) =>
                                handleVariantChange(idx, "sku", e.target.value)
                              }
                              placeholder="ej: VAR-001"
                            />
                          </div>
                        </div>

                        <Separator />

                        {/* Imagen de la variante */}
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" />
                            Imagen de esta Variante
                          </Label>
                          <div className="flex gap-2 flex-wrap">
                            <button
                              onClick={() =>
                                handleVariantChange(idx, "image", "")
                              }
                              className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                                !variant.image
                                  ? "bg-foreground text-background"
                                  : "bg-muted text-foreground hover:bg-muted/80"
                              }`}
                            >
                              Sin imagen
                            </button>
                            {images.map((img, imgIdx) => (
                              <button
                                key={imgIdx}
                                onClick={() =>
                                  handleVariantChange(idx, "image", img)
                                }
                                className={`w-12 h-12 rounded overflow-hidden border-2 transition ${
                                  variant.image === img
                                    ? "border-primary"
                                    : "border-border hover:border-foreground/50"
                                }`}
                              >
                                <img
                                  src={img}
                                  alt={`Variante ${imgIdx}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* Especificaciones */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs font-semibold">
                              Especificaciones
                            </Label>
                          </div>

                          <div className="space-y-2">
                            {Object.entries(variant.specs || {}).map(
                              ([key, value]) => (
                                <div key={key} className="flex gap-2 items-end">
                                  {editingSpecKey?.variantIdx === idx &&
                                  editingSpecKey?.oldKey === key ? (
                                    <Input
                                      autoFocus
                                      className="h-8 text-xs"
                                      value={newSpecKey}
                                      onChange={(e) =>
                                        setNewSpecKey(e.target.value)
                                      }
                                      placeholder="Nueva clave"
                                    />
                                  ) : (
                                    <button
                                      onClick={() => {
                                        setEditingSpecKey({
                                          variantIdx: idx,
                                          oldKey: key,
                                        });
                                        setNewSpecKey(key);
                                      }}
                                      className="min-w-20 px-2 py-1.5 bg-muted rounded text-xs font-semibold hover:bg-muted/80 transition"
                                    >
                                      {key}
                                    </button>
                                  )}

                                  <Input
                                    className="h-8 text-xs flex-1"
                                    value={value as string}
                                    onChange={(e) =>
                                      handleSpecChange(idx, key, e.target.value)
                                    }
                                  />

                                  {editingSpecKey?.variantIdx === idx &&
                                  editingSpecKey?.oldKey === key ? (
                                    <>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                        onClick={() =>
                                          handleRenameSpecKey(
                                            idx,
                                            key,
                                            newSpecKey,
                                          )
                                        }
                                      >
                                        <Check className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                        onClick={() => {
                                          setEditingSpecKey(null);
                                          setNewSpecKey("");
                                        }}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-8 w-8 p-0"
                                      onClick={() => handleRemoveSpec(idx, key)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              ),
                            )}
                          </div>

                          {/* Agregar especificación */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => {
                              const newKey = `Especificación ${
                                Object.keys(variant.specs || {}).length + 1
                              }`;
                              handleAddSpec(idx, newKey, "");
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Agregar Especificación
                          </Button>
                        </div>

                        <Separator />

                        {/* Atributos editables (Peso, Empaque, Stock) */}
                        <div className="space-y-3">
                          <Label className="text-xs font-semibold">
                            Atributos Adicionales
                          </Label>

                          <div className="space-y-2">
                            {Object.entries(variant.attributes || {}).map(
                              ([key, value]) => (
                                <div key={key} className="flex gap-2 items-end">
                                  {editingAttributeKey?.variantIdx === idx &&
                                  editingAttributeKey?.oldKey === key ? (
                                    <Input
                                      autoFocus
                                      className="h-8 text-xs"
                                      value={newAttributeKey}
                                      onChange={(e) =>
                                        setNewAttributeKey(e.target.value)
                                      }
                                      placeholder="Nueva clave"
                                    />
                                  ) : (
                                    <button
                                      onClick={() => {
                                        setEditingAttributeKey({
                                          variantIdx: idx,
                                          oldKey: key,
                                        });
                                        setNewAttributeKey(key);
                                      }}
                                      className="min-w-20 px-2 py-1.5 bg-primary/10 border border-primary/30 rounded text-xs font-semibold hover:bg-primary/20 transition"
                                    >
                                      {key}
                                    </button>
                                  )}

                                  <Input
                                    className="h-8 text-xs flex-1"
                                    value={value as string}
                                    onChange={(e) =>
                                      handleAttributeChange(
                                        idx,
                                        key,
                                        e.target.value,
                                      )
                                    }
                                  />

                                  {editingAttributeKey?.variantIdx === idx &&
                                  editingAttributeKey?.oldKey === key ? (
                                    <>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                        onClick={() =>
                                          handleRenameAttributeKey(
                                            idx,
                                            key,
                                            newAttributeKey,
                                          )
                                        }
                                      >
                                        <Check className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                        onClick={() => {
                                          setEditingAttributeKey(null);
                                          setNewAttributeKey("");
                                        }}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-8 w-8 p-0"
                                      onClick={() =>
                                        handleRemoveAttribute(idx, key)
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              ),
                            )}
                          </div>

                          {/* Agregar atributo */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => {
                              const newKey = `Atributo ${
                                Object.keys(variant.attributes || {}).length + 1
                              }`;
                              handleAddAttribute(idx, newKey, "");
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Agregar Atributo
                          </Button>
                        </div>

                        <Separator />

                        {/* Niveles de Precio con Descuentos */}
                        <div className="space-y-3">
                          <Label className="text-xs font-semibold flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Niveles de Precio (con % descuento)
                          </Label>

                          <div className="space-y-2">
                            {variant.pricing.map(
                              (tier: any, pricingIdx: number) => {
                                const finalPrice = calculatePrice(
                                  tier.discount,
                                );
                                return (
                                  <div
                                    key={pricingIdx}
                                    className="flex gap-2 items-end bg-muted/50 p-3 rounded border border-border"
                                  >
                                    <div className="flex-1">
                                      <Label className="text-xs">De</Label>
                                      <Input
                                        type="number"
                                        className="h-8 text-xs"
                                        value={tier.min ?? ""}
                                        onChange={(e) =>
                                          handlePricingChange(
                                            idx,
                                            pricingIdx,
                                            "min",
                                            parseInt(e.target.value),
                                          )
                                        }
                                      />
                                    </div>

                                    <div className="flex-1">
                                      <Label className="text-xs">Hasta</Label>
                                      <Input
                                        type="number"
                                        className="h-8 text-xs"
                                        placeholder="Sin límite"
                                        value={tier.max ?? ""}
                                        onChange={(e) =>
                                          handlePricingChange(
                                            idx,
                                            pricingIdx,
                                            "max",
                                            e.target.value
                                              ? parseInt(e.target.value)
                                              : undefined,
                                          )
                                        }
                                      />
                                    </div>

                                    <div className="flex-1">
                                      <Label className="text-xs">
                                        Descuento %
                                      </Label>
                                      <Input
                                        type="number"
                                        className="h-8 text-xs"
                                        min="0"
                                        max="100"
                                        value={tier.discount}
                                        onChange={(e) =>
                                          handlePricingChange(
                                            idx,
                                            pricingIdx,
                                            "discount",
                                            parseInt(e.target.value),
                                          )
                                        }
                                      />
                                    </div>

                                    <div className="flex-1">
                                      <Label className="text-xs">
                                        Precio Final
                                      </Label>
                                      <div className="h-8 flex items-center px-2 bg-primary/10 border border-primary/30 rounded text-xs font-bold text-primary">
                                        ${finalPrice}
                                      </div>
                                    </div>

                                    {variant.pricing.length > 1 && (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                        onClick={() =>
                                          handleRemovePricingTier(
                                            idx,
                                            pricingIdx,
                                          )
                                        }
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                );
                              },
                            )}
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => handleAddPricingTier(idx)}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Agregar Nivel de Precio
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))
            )}
          </div>
        </div>

        {/* Panel derecho: Vista previa */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Vista Previa</h3>

          {variants.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <Package className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Agrega variantes para ver una vista previa
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Selector de variante */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">
                  Seleccionar Variante
                </Label>
                <div className="flex flex-wrap gap-2">
                  {variants.map((_, index) => (
                    <Button
                      key={index}
                      variant={
                        previewVariantIndex === index ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setPreviewVariantIndex(index)}
                      className="text-xs"
                    >
                      Var {index + 1}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Card de producto */}
              <Card className="overflow-hidden">
                {/* Imagen */}
                <div className="bg-gradient-to-br from-muted to-muted/50 h-48 flex items-center justify-center overflow-hidden">
                  {variants[previewVariantIndex]?.image ? (
                    <img
                      src={variants[previewVariantIndex].image}
                      alt="Variante"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="h-16 w-16 text-muted-foreground/40" />
                  )}
                </div>

                <CardContent className="pt-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Variante</p>
                    <p className="font-semibold">
                      {variants[previewVariantIndex]?.name}
                    </p>
                  </div>

                  {/* Especificaciones */}
                  {Object.keys(variants[previewVariantIndex]?.specs || {})
                    .length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">
                        Especificaciones
                      </p>
                      <div className="space-y-1">
                        {Object.entries(
                          variants[previewVariantIndex]?.specs || {},
                        ).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between text-xs bg-muted/50 p-2 rounded"
                          >
                            <span className="font-semibold">{key}:</span>
                            <span>{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Atributos */}
                  {Object.keys(variants[previewVariantIndex]?.attributes || {})
                    .length > 0 && (
                    <div className="space-y-2">
                      {Object.entries(
                        variants[previewVariantIndex]?.attributes || {},
                      ).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-semibold">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Separator />

                  {/* Precio base y descuentos */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Precio Base
                      </span>
                      <span className="text-sm font-bold">
                        ${basePrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Tabla de precios por volumen */}
                    {variants[previewVariantIndex]?.pricing?.length > 0 && (
                      <div className="bg-primary/5 rounded p-2 space-y-1 border border-primary/20">
                        {variants[previewVariantIndex].pricing.map(
                          (tier: any, idx: number) => {
                            const finalPrice = calculatePrice(tier.discount);
                            return (
                              <div
                                key={idx}
                                className="flex justify-between text-xs"
                              >
                                <span className="text-muted-foreground">
                                  {tier.max
                                    ? `${tier.min}-${tier.max}`
                                    : `${tier.min}+`}{" "}
                                  unidades
                                </span>
                                <span className="font-semibold">
                                  {tier.discount > 0 && (
                                    <>
                                      <span className="line-through text-destructive/60 mr-1">
                                        ${basePrice.toFixed(2)}
                                      </span>
                                      <span className="text-primary">
                                        -{tier.discount}%
                                      </span>
                                      {" → "}
                                    </>
                                  )}
                                  <span className="text-primary font-bold">
                                    ${finalPrice}
                                  </span>
                                </span>
                              </div>
                            );
                          },
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Dialog de confirmación para eliminar */}
      <AlertDialog open={deleteIndex !== null}>
        <AlertDialogContent>
          <AlertDialogTitle>Eliminar variante</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas eliminar esta variante? Esta acción no
            se puede deshacer.
          </AlertDialogDescription>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel onClick={() => setDeleteIndex(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteIndex !== null && handleDeleteVariant(deleteIndex)
              }
              className="bg-destructive hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
