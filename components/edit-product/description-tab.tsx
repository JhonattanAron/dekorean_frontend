'use client';

import { Textarea } from '@/components/ui/textarea';

interface DescriptionTabProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  isLoading?: boolean;
}

export function DescriptionTab({
  formData,
  onChange,
  isLoading = false,
}: DescriptionTabProps) {
  const generalDescLength = (formData.description?.general || '').length;
  const overviewLength = (formData.description?.overview || '').length;
  const highlightsLength = formData.description?.highlights?.length || 0;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          💡 <span className="font-medium">Consejo:</span> Completa la información de
          descripción con detalles generales, puntos destacados, pasos de instalación e
          instrucciones de compra.
        </p>
      </div>

      {/* General Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">
            Descripción General *
          </label>
          <span className="text-xs text-muted-foreground">
            {generalDescLength} caracteres
          </span>
        </div>
        <Textarea
          value={formData.description?.general || ''}
          onChange={(e) =>
            onChange('description', {
              ...formData.description,
              general: e.target.value,
            })
          }
          placeholder="Escribe una descripción detallada del producto..."
          disabled={isLoading}
          rows={6}
          className="resize-none focus:ring-2 focus:ring-blue-500"
        />
        {generalDescLength < 50 && (
          <p className="text-xs text-yellow-600 font-medium">
            ⚠️ La descripción es muy corta. Intenta al menos 50 caracteres.
          </p>
        )}
      </div>

      {/* Overview */}
      <div className="border-t pt-6 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">
            Resumen (Overview)
          </label>
          <span className="text-xs text-muted-foreground">
            {overviewLength}/200 caracteres
          </span>
        </div>
        <Textarea
          value={formData.description?.overview || ''}
          onChange={(e) => {
            if (e.target.value.length <= 200) {
              onChange('description', {
                ...formData.description,
                overview: e.target.value,
              });
            }
          }}
          placeholder="Un resumen corto del producto para mostrar en listados..."
          disabled={isLoading}
          rows={3}
          maxLength={200}
          className="resize-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Highlights */}
      <div className="border-t pt-6 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">
            Puntos Destacados ({highlightsLength})
          </label>
        </div>
        <div className="space-y-2">
          {formData.description?.highlights?.map((highlight: string, idx: number) => (
            <div key={idx} className="flex items-center gap-2">
              <Textarea
                value={highlight}
                onChange={(e) => {
                  const updated = [...(formData.description?.highlights || [])];
                  updated[idx] = e.target.value;
                  onChange('description', {
                    ...formData.description,
                    highlights: updated,
                  });
                }}
                placeholder="Punto destacado..."
                disabled={isLoading}
                rows={2}
                className="resize-none"
              />
              <button
                onClick={() => {
                  const updated = formData.description?.highlights?.filter(
                    (_: string, i: number) => i !== idx
                  );
                  onChange('description', {
                    ...formData.description,
                    highlights: updated || [],
                  });
                }}
                className="text-red-600 hover:text-red-700 text-sm"
                disabled={isLoading}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              onChange('description', {
                ...formData.description,
                highlights: [...(formData.description?.highlights || []), ''],
              });
            }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            disabled={isLoading}
          >
            + Agregar punto destacado
          </button>
        </div>
      </div>

      {/* Installation */}
      <div className="border-t pt-6 space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Instrucciones de Instalación
        </label>
        <Textarea
          value={formData.description?.installation || ''}
          onChange={(e) =>
            onChange('description', {
              ...formData.description,
              installation: e.target.value,
            })
          }
          placeholder="Pasos de instalación..."
          disabled={isLoading}
          rows={4}
          className="resize-none"
        />
      </div>

      {/* Purchase Instructions */}
      <div className="border-t pt-6 space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Instrucciones de Compra
        </label>
        <Textarea
          value={formData.description?.purchaseInstructions || ''}
          onChange={(e) =>
            onChange('description', {
              ...formData.description,
              purchaseInstructions: e.target.value,
            })
          }
          placeholder="Información sobre cómo comprar..."
          disabled={isLoading}
          rows={4}
          className="resize-none"
        />
      </div>

      {/* SEO Preview */}
      <div className="border-t pt-6 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Vista previa SEO</h3>
        <div className="bg-gray-100 rounded-lg p-4 space-y-2">
          <p className="text-sm font-medium text-blue-600 truncate">
            {formData.title || 'Nombre del producto'}
          </p>
          <p className="text-xs text-gray-600 line-clamp-2">
            {formData.description?.overview ||
              'El resumen del producto aparecerá aquí...'}
          </p>
          <p className="text-xs text-green-600 truncate">
            {typeof window !== 'undefined'
              ? window.location.hostname
              : 'example.com'}/producto/{formData.slug || 'slug'}
          </p>
        </div>
      </div>
    </div>
  );
}
