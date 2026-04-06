"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicTab } from "./basic-tab";
import { CategoryTab } from "./category-tab";
import { PricingTab } from "./pricing-tab";
import { DescriptionTab } from "./description-tab";
import { ImagesTab } from "./images-tab";
import { AlertCircle, CheckCircle, Save } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { Product } from "@/lib/products-store";

interface EditProductProps {
  product: Product;
  onSave?: (product: Product) => Promise<any>;
  isLoading?: boolean;
}

export function EditProduct({
  product,
  onSave,
  isLoading = false,
}: EditProductProps) {
  const { toast } = useToast();

  const [formData, setFormData] = useState<Product>(product);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState("basico");

  /* ---------------- FIELD CHANGE ---------------- */

  const handleFieldChange = useCallback((field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setHasChanges(true);
  }, []);
  /* ---------------- VALIDATION ---------------- */

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.title?.trim()) {
      errors.push("El título del producto es requerido");
    }

    if (!formData.price?.current) {
      errors.push("El precio actual es requerido");
    }

    if (!formData.images || formData.images.length === 0) {
      errors.push("Debes cargar al menos una imagen");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  };

  /* ---------------- SAVE ---------------- */

  const handleSave = async () => {
    const validation = validateForm();

    if (!validation.valid) {
      validation.errors.forEach((error) =>
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        }),
      );
      return;
    }

    try {
      setIsSaving(true);

      if (onSave) {
        await onSave(formData);
      }

      setHasChanges(false);

      toast({
        title: "Guardado",
        description: "Producto actualizado correctamente",
      });
    } catch (error: any) {
      console.error(error);

      toast({
        title: "Error",
        description: error?.message || "Error al guardar",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  /* ---------------- RESET ---------------- */

  const handleReset = () => {
    setFormData(product);
    setHasChanges(false);

    toast({
      title: "Cambios descartados",
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}

      <div className="border-b pb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {formData.title || "Editar Producto"}
            </h1>

            <p className="text-sm text-muted-foreground mt-1">
              ID: {formData._id}
            </p>
          </div>

          {hasChanges ? (
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700">
                Cambios sin guardar
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                Todo actualizado
              </span>
            </div>
          )}
        </div>
      </div>

      {/* TABS */}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="basico">Básico</TabsTrigger>
          <TabsTrigger value="categorias">Categorías</TabsTrigger>
          <TabsTrigger value="precios">Precios</TabsTrigger>
          <TabsTrigger value="descripcion">Descripción</TabsTrigger>
          <TabsTrigger value="imagenes">Imágenes</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>

        <div className="bg-card border rounded-lg p-6 mt-6">
          <TabsContent value="basico">
            <BasicTab
              formData={formData}
              onChange={handleFieldChange}
              isLoading={isSaving || isLoading}
            />
          </TabsContent>

          <TabsContent value="categorias">
            <CategoryTab
              formData={formData}
              onChange={handleFieldChange}
              isLoading={isSaving || isLoading}
            />
          </TabsContent>

          <TabsContent value="precios">
            <PricingTab
              formData={formData}
              onChange={handleFieldChange}
              isLoading={isSaving || isLoading}
            />
          </TabsContent>

          <TabsContent value="descripcion">
            <DescriptionTab
              formData={formData}
              onChange={handleFieldChange}
              isLoading={isSaving || isLoading}
            />
          </TabsContent>

          <TabsContent value="imagenes">
            <ImagesTab
              formData={formData}
              onChange={handleFieldChange}
              isLoading={isSaving || isLoading}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* ACTIONS */}

      <div className="flex items-center justify-between gap-4 border-t pt-6">
        <div className="text-sm text-muted-foreground">
          {hasChanges ? "Tienes cambios sin guardar" : "Sin cambios pendientes"}
        </div>

        <div className="flex gap-3">
          {hasChanges && (
            <Button variant="outline" onClick={handleReset} disabled={isSaving}>
              Descartar
            </Button>
          )}

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </div>
    </div>
  );
}
