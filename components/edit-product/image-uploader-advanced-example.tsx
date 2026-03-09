"use client";

/**
 * EJEMPLO AVANZADO: ImageUploader con funcionalidades de descarga y reemplazo
 *
 * Este ejemplo muestra cómo integrar el componente ImageUploader con:
 * - Descarga de imágenes desde URL (con endpoint backend)
 * - Reemplazo de imagen principal
 * - Subida de nuevas imágenes
 *
 * Asume que tienes estos endpoints disponibles:
 * - POST /api/storage/upload - Subir imagen
 * - POST /api/storage/replace - Reemplazar imagen existente
 * - GET /api/storage/download - Descargar imagen (opcional, para descargas desde servidor)
 */

import { useState } from "react";
import { ImageUploader } from "./image-uploader";
import { Button } from "@/components/ui/button";

export function ImageUploaderAdvanced() {
  const [images, setImages] = useState<string[]>([
    "https://via.placeholder.com/300x300?text=Imagen+1",
  ]);
  const [primaryImage, setPrimaryImage] = useState<string | null>(
    images[0] || null,
  );
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Subir nueva imagen al servidor
   */
  const handleUploadImage = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/storage/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir imagen");
      }

      const data = await response.json();
      return data.url; // Devuelve la URL de la imagen subida
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  /**
   * Reemplazar imagen existente con una nueva
   * - Borra la imagen anterior del servidor
   * - Sube la nueva imagen
   * - Retorna la URL de la nueva imagen
   */
  const handleReplaceImage = async (
    oldUrl: string,
    newFile: File,
  ): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", newFile);
      formData.append("oldUrl", oldUrl); // El servidor puede usar esto para borrar la anterior

      const response = await fetch("/api/storage/replace", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al reemplazar imagen");
      }

      const data = await response.json();
      return data.url; // Devuelve la URL de la nueva imagen
    } catch (error) {
      console.error("Error replacing image:", error);
      throw error;
    }
  };

  /**
   * Guardar cambios de imágenes en la base de datos
   */
  const handleSaveChanges = async () => {
    setIsProcessing(true);
    try {
      // Aquí llamas a tu endpoint para guardar los cambios del producto
      const response = await fetch("/api/products/123", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images: images,
          mainImage: primaryImage,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar");
      }

      alert("Cambios guardados exitosamente");
    } catch (error) {
      console.error("Error saving:", error);
      alert("Error al guardar cambios");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Gestor de Imágenes Avanzado</h2>
        <p className="text-muted-foreground mb-6">
          Ejemplo completo con descarga, reemplazo y subida de imágenes
        </p>
      </div>

      <ImageUploader
        images={images}
        onImagesChange={setImages}
        onMainImageChange={setPrimaryImage}
        onUploadImage={handleUploadImage}
        onReplaceImage={handleReplaceImage}
        isLoading={isProcessing}
        mainImage={null}
      />

      <div className="flex gap-2">
        <Button
          onClick={handleSaveChanges}
          disabled={isProcessing}
          className="flex-1"
        >
          {isProcessing ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>

      {/* Debug info */}
      <div className="bg-muted p-4 rounded text-sm">
        <h3 className="font-semibold mb-2">Estado actual:</h3>
        <p>Imagen principal: {primaryImage?.substring(0, 50)}...</p>
        <p>Total de imágenes: {images.length}</p>
      </div>
    </div>
  );
}

/**
 * ENDPOINTS DE EJEMPLO QUE NECESITAS EN TU BACKEND:
 *
 * 1. POST /api/storage/upload
 *    Request: FormData con "file"
 *    Response: { url: "https://..." }
 *
 * 2. POST /api/storage/replace
 *    Request: FormData con "file" y "oldUrl"
 *    Response: { url: "https://..." }
 *
 * 3. POST /api/storage/delete (si quieres borrar imágenes)
 *    Request: { url: "https://..." }
 *    Response: { success: true }
 *
 * Ejemplo con Node.js/Express:
 *
 * router.post('/api/storage/upload', async (req, res) => {
 *   const file = req.files.file;
 *   const uploadedFile = await uploadToStorage(file);
 *   res.json({ url: uploadedFile.url });
 * });
 *
 * router.post('/api/storage/replace', async (req, res) => {
 *   const file = req.files.file;
 *   const oldUrl = req.body.oldUrl;
 *
 *   // Borrar archivo anterior
 *   await deleteFromStorage(oldUrl);
 *
 *   // Subir nuevo archivo
 *   const uploadedFile = await uploadToStorage(file);
 *   res.json({ url: uploadedFile.url });
 * });
 */
