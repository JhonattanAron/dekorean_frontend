"use client";

import { Button } from "@/components/ui/button";
import { X, Upload, ImageIcon, Download, RefreshCw } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface ImageUploaderProps {
  images: string[];
  mainImage: string | null;
  onImagesChange: (images: string[]) => void;
  onMainImageChange: (image: string) => void;
  isLoading?: boolean;
  onUploadImage?: (file: File) => Promise<string>;
  onReplaceImage?: (oldUrl: string, file: File) => Promise<string>;
}

export function ImageUploader({
  images,
  mainImage,
  onImagesChange,
  onMainImageChange,
  isLoading = false,
  onUploadImage,
  onReplaceImage,
}: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = [...e.dataTransfer.files];
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (result && !images.includes(result)) {
            onImagesChange([...images, result]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const result = event.target?.result as string;
            if (result && !images.includes(result)) {
              onImagesChange([...images, result]);
              if (!mainImage) {
                onMainImageChange(result);
              }
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleRemoveImage = (image: string) => {
    const updated = images.filter((img) => img !== image);
    onImagesChange(updated);
    if (mainImage === image && updated.length > 0) {
      onMainImageChange(updated[0]);
    } else if (updated.length === 0) {
      onMainImageChange("");
    }
  };

  const handleDownloadImage = async (imageUrl: string) => {
    try {
      const encodedUrl = encodeURIComponent(imageUrl);
      const response = await fetch(`/api/storage/download?url=${encodedUrl}`);

      if (!response.ok) {
        alert("Error al descargar la imagen");
        return;
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = imageUrl.split("/").pop() || "imagen.jpg";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error descargando imagen:", error);
      alert("Error al descargar la imagen");
    }
  };

  const handleReplaceImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !mainImage || !onReplaceImage) return;

    const file = e.target.files[0];
    setUploading(true);

    try {
      const newUrl = await onReplaceImage(mainImage, file);
      const updated = images.map((img) => (img === mainImage ? newUrl : img));
      onImagesChange(updated);
      onMainImageChange(newUrl);
      if (replaceInputRef.current) {
        replaceInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error reemplazando imagen:", error);
      alert("Error al reemplazar la imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleUploadNewImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files || !onUploadImage) {
      // Fallback: use local DataURL
      const files = e.currentTarget.files;
      if (files) {
        Array.from(files).forEach((file) => {
          if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const result = event.target?.result as string;
              if (result && !images.includes(result)) {
                onImagesChange([...images, result]);
                if (!mainImage) {
                  onMainImageChange(result);
                }
              }
            };
            reader.readAsDataURL(file);
          }
        });
      }
      return;
    }

    const files = e.currentTarget.files;
    if (files) {
      setUploading(true);
      try {
        for (const file of Array.from(files)) {
          if (file.type.startsWith("image/")) {
            const newUrl = await onUploadImage(file);
            const updated = [...images, newUrl];
            onImagesChange(updated);
            if (!mainImage) {
              onMainImageChange(newUrl);
            }
          }
        }
      } catch (error) {
        console.error("Error subiendo imagen:", error);
        alert("Error al subir la imagen");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        } ${isLoading || uploading ? "opacity-50 pointer-events-none" : ""}`}
      >
        <input
          type="file"
          id="image-upload"
          multiple
          accept="image/*"
          onChange={handleUploadNewImage}
          className="hidden"
          disabled={isLoading || uploading}
        />
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <Upload className="w-8 h-8 text-muted-foreground" />
          <div>
            <p className="font-semibold text-foreground">
              Arrastra imágenes aquí o haz clic para seleccionar
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, GIF - Máximo 5MB
            </p>
          </div>
        </label>
      </div>

      {/* Main Preview */}
      {mainImage && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Imagen Principal
          </h3>
          <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-video">
            <img
              src={mainImage}
              alt="Imagen principal"
              className="object-cover"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDownloadImage(mainImage)}
              disabled={uploading}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Descargar
            </Button>
            <label className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploading}
                className="flex items-center gap-2 cursor-pointer"
                asChild
              >
                <span>
                  <RefreshCw className="w-4 h-4" />
                  {uploading ? "Reemplazando..." : "Reemplazar"}
                </span>
              </Button>
              <input
                ref={replaceInputRef}
                type="file"
                accept="image/*"
                onChange={handleReplaceImage}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      )}

      {/* Gallery */}
      {images.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Galería ({images.length})
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square cursor-pointer">
                  <img
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="object-cover group-hover:opacity-75 transition-opacity"
                    onClick={() => onMainImageChange(image)}
                  />
                  {mainImage === image && (
                    <div className="absolute inset-0 border-2 border-blue-500 rounded-lg" />
                  )}
                </div>

                {/* Delete button */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveImage(image)}
                  className="absolute -top-2 -right-2 h-8 w-8 p-0 flex items-center justify-center bg-red-500 hover:bg-red-600 border-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </Button>

                {/* Badge */}
                {mainImage === image && (
                  <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-xs font-semibold py-1 text-center">
                    Principal
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Haz clic en una imagen para establecerla como principal
          </p>
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-8">
          <ImageIcon className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground">No hay imágenes cargadas aún</p>
        </div>
      )}
    </div>
  );
}
