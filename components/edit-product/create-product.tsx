"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicTab } from "./basic-tab";
import { CategoryTab } from "./category-tab";
import { PricingTab } from "./pricing-tab";
import { DescriptionTab } from "./description-tab";
import { ImagesTab } from "./images-tab";
import { Save } from "lucide-react";
import { ProductCreate } from "@/lib/products-store";

interface CreateProductProps {
  onCreate?: (product: ProductCreate) => Promise<any>;
  isLoading?: boolean;
}

export const EMPTY_PRODUCT: ProductCreate = {
  brand: "",
  category: [],
  claims: [],
  contentSize: "",
  deliveryTime: "",
  description: {
    general: "",
    highlights: [],
    installation: "",
    installationSteps: [],
    overview: "",
    purchaseInstructions: "",
  },
  dimensions: {},
  features: [],
  images: [],
  mainImage: "",
  inStock: true,
  stock: 0,
  price: {
    original: 0,
    current: 0,
    currency: "USD",
  },
  price_per_m2: 0,
  reviews: {
    rating: 0,
    count: 0,
  },
  slug: "",
  title: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  imagesUpdated: false,
};

export function CreateProduct({
  onCreate,
  isLoading = false,
}: CreateProductProps) {
  const [formData, setFormData] = useState<ProductCreate>(EMPTY_PRODUCT);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basico");
  const [errors, setErrors] = useState<{ field: string; message: string }[]>(
    [],
  );

  const handleFieldChange = useCallback((field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const validateForm = () => {
    const errors: { field: string; message: string }[] = [];

    if (!formData.title?.trim())
      errors.push({ field: "basico", message: "El título es obligatorio" });
    if (!formData.brand?.trim())
      errors.push({ field: "basico", message: "La marca es obligatoria" });
    if (!formData.category || formData.category.length === 0)
      errors.push({
        field: "categorias",
        message: "Debes seleccionar al menos una categoría",
      });
    if (!formData.price?.current || formData.price.current <= 0)
      errors.push({
        field: "precios",
        message: "El precio es obligatorio y mayor a 0",
      });
    if (!formData.images || formData.images.length === 0)
      errors.push({
        field: "imagenes",
        message: "Debes subir al menos una imagen",
      });

    return {
      valid: errors.length === 0,
      errors,
    };
  };

  const handleCreate = async () => {
    const validation = validateForm();

    if (!validation.valid) {
      // Guardar errores en el estado para mostrarlos en la UI
      setErrors(validation.errors);

      // Abrir el primer tab con error
      setActiveTab(validation.errors[0].field);
      return;
    }

    // Limpiar errores si todo está bien
    setErrors([]);

    try {
      setIsSaving(true);

      if (onCreate) {
        await onCreate(formData);
      }

      alert("Producto creado 🚀");

      setFormData(EMPTY_PRODUCT);
      setActiveTab("basico");
    } catch (error: any) {
      alert(error?.message || "Error al crear producto");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold">Crear Producto</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Completa la información del nuevo producto
        </p>
      </div>

      {/* ERRORES */}
      {errors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg">
          <strong className="font-bold">Errores:</strong>
          <ul className="mt-1 list-disc list-inside">
            {errors.map((e, i) => (
              <li key={i}>{e.message}</li>
            ))}
          </ul>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="basico">Básico</TabsTrigger>
          <TabsTrigger value="categorias">Categorías</TabsTrigger>
          <TabsTrigger value="precios">Precios</TabsTrigger>
          <TabsTrigger value="descripcion">Descripción</TabsTrigger>
          <TabsTrigger value="imagenes">Imágenes</TabsTrigger>
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

      <div className="flex justify-end border-t pt-6">
        <Button
          onClick={handleCreate}
          disabled={isSaving}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Creando..." : "Crear producto"}
        </Button>
      </div>
    </div>
  );
}
