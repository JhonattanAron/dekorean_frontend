"use client";

import { useEffect, useState } from "react";
import { ImageUploader } from "./image-uploader";

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
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          💡 <span className="font-medium">Consejo:</span> Carga tu imagen
          principal primero y luego agrega más imágenes para la galería.
        </p>
      </div>

      <ImageUploader
        product={product}
        setProduct={handleSetProduct}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
}
