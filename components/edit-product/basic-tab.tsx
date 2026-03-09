'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface BasicTabProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  isLoading?: boolean;
}

export function BasicTab({ formData, onChange, isLoading = false }: BasicTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Título *
          </label>
          <Input
            value={formData.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="Nombre del producto"
            disabled={isLoading}
            className="focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Marca *
          </label>
          <Input
            value={formData.brand || ''}
            onChange={(e) => onChange('brand', e.target.value)}
            placeholder="Marca"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Slug *
          </label>
          <Input
            value={formData.slug || ''}
            onChange={(e) => onChange('slug', e.target.value)}
            placeholder="url-amigable"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Tamaño de Contenido *
          </label>
          <Input
            value={formData.contentSize || ''}
            onChange={(e) => onChange('contentSize', e.target.value)}
            placeholder="Ej: 500ml, 1L, 1kg"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Tiempo de Entrega *
          </label>
          <Input
            value={formData.deliveryTime || ''}
            onChange={(e) => onChange('deliveryTime', e.target.value)}
            placeholder="Ej: 2-3 días, 1 semana"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Precio por m²
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-muted-foreground">$</span>
            <Input
              type="number"
              value={formData.price_per_m2 || ''}
              onChange={(e) => onChange('price_per_m2', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              disabled={isLoading}
              className="pl-7"
              step="0.01"
            />
          </div>
        </div>
      </div>

      {/* Stock Toggle */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Estado</h3>
        
        <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
          <div className="space-y-1">
            <p className="font-medium text-foreground">En Stock</p>
            <p className="text-xs text-muted-foreground">
              Producto disponible para compra
            </p>
          </div>
          <Switch
            checked={formData.inStock !== false}
            onCheckedChange={(checked) => onChange('inStock', checked)}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
