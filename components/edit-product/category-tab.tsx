'use client';

import { ArrayInput } from './array-input';

interface CategoryTabProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  isLoading?: boolean;
}

export function CategoryTab({
  formData,
  onChange,
  isLoading = false,
}: CategoryTabProps) {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          💡 <span className="font-medium">Consejo:</span> Organiza tu producto con
          categorías, claims y características. Estos datos ayudan en la búsqueda y
          presentación del producto.
        </p>
      </div>

      <div className="space-y-6">
        <ArrayInput
          label="Categorías *"
          value={formData.category || []}
          onChange={(value) => onChange('category', value)}
          placeholder="Ej: Electrónica, Smartphones, etc."
          description="Añade categorías relevantes para clasificar tu producto"
        />

        <div className="border-t" />

        <ArrayInput
          label="Claims (Características principales)"
          value={formData.claims || []}
          onChange={(value) => onChange('claims', value)}
          placeholder="Ej: Resistente al agua, 5G, Carga rápida, etc."
          description="Claims son características destacadas del producto"
        />

        <div className="border-t" />

        <ArrayInput
          label="Features (Especificaciones técnicas)"
          value={formData.features || []}
          onChange={(value) => onChange('features', value)}
          placeholder="Ej: Batería 5000mAh, Pantalla AMOLED, Procesador Snapdragon, etc."
          description="Especificaciones técnicas detalladas del producto"
        />
      </div>
    </div>
  );
}
