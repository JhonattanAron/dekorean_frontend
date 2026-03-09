'use client';

import { ImageUploader } from './image-uploader';

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
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          💡 <span className="font-medium">Consejo:</span> Las imágenes de calidad son
          importantes. Carga tu imagen principal primero y luego agrega más imágenes
          para la galería.
        </p>
      </div>

      <ImageUploader
        images={formData.images || []}
        mainImage={formData.mainImage || null}
        onImagesChange={(images) => onChange('images', images)}
        onMainImageChange={(image) => onChange('mainImage', image)}
        isLoading={isLoading}
      />
    </div>
  );
}
