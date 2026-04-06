"use client";

import { useEffect, useState } from "react";
import { ImageSelector } from "./image-uploader";

interface ImagesTabProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  isLoading?: boolean;
}

export function ImagesTab({
  formData,
  onChange,
  isLoading = false,
}: ImagesTabProps) {
  const [product, setProduct] = useState(formData);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [replacedImages, setReplacedImages] = useState(formData.imagesUpdated);

  /* sincronizar cuando cambia el formData */

  useEffect(() => {
    setProduct(formData);
  }, [formData]);

  /* cuando ImageUploader cambia el producto */

  function handleSetProduct(updated: any) {
    setProduct(updated);

    onChange("images", updated.images);
    onChange("mainImage", updated.mainImage);
  }

  /* imagen seleccionada inicial */

  useEffect(() => {
    setSelectedImage(formData.mainImage || formData.images?.[0] || null);
  }, [formData]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-foreground">
            Producto con imágenes reemplazadas
          </span>

          <button
            onClick={() => {
              const value = !replacedImages;
              setReplacedImages(value);
              onChange("imagesUpdated", value);
            }}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 
        ${replacedImages ? "bg-green-500" : "bg-gray-300"}`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300
          ${replacedImages ? "translate-x-7" : "translate-x-1"}`}
            />
          </button>

          <span
            className={`text-sm font-bold ${
              replacedImages ? "text-green-600" : "text-gray-500"
            }`}
          >
            {replacedImages ? "TRUE" : "FALSE"}
          </span>
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          💡 <span className="font-medium">Consejo:</span> Carga tu imagen
          principal primero y luego agrega más imágenes para la galería.
        </p>
      </div>

      <ImageSelector product={product} setProduct={handleSetProduct} />
    </div>
  );
}
