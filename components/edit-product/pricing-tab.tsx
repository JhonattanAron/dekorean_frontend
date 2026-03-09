'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PricingTabProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  isLoading?: boolean;
}

export function PricingTab({
  formData,
  onChange,
  isLoading = false,
}: PricingTabProps) {
  const originalPrice = parseFloat(formData.price?.original || 0) || 0;
  const currentPrice = parseFloat(formData.price?.current || 0) || 0;
  const discount =
    originalPrice > 0
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Precio Original
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-muted-foreground">$</span>
            <Input
              type="number"
              value={formData.price?.original || ''}
              onChange={(e) =>
                onChange('price', {
                  ...formData.price,
                  original: parseFloat(e.target.value) || 0,
                })
              }
              placeholder="0.00"
              disabled={isLoading}
              className="pl-7"
              step="0.01"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Precio Actual *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-muted-foreground">$</span>
            <Input
              type="number"
              value={formData.price?.current || ''}
              onChange={(e) =>
                onChange('price', {
                  ...formData.price,
                  current: parseFloat(e.target.value) || 0,
                })
              }
              placeholder="0.00"
              disabled={isLoading}
              className="pl-7"
              step="0.01"
            />
          </div>
        </div>
      </div>

      {/* Discount Info */}
      {discount > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-green-900">
            Descuento: {discount}%
          </p>
          <p className="text-xs text-green-700 mt-1">
            Ahorras ${(originalPrice - currentPrice).toFixed(2)}
          </p>
        </div>
      )}

      <div className="border-t pt-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Información de precios</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Moneda *
            </label>
            <Select
              value={formData.price?.currency || 'USD'}
              onValueChange={(value) =>
                onChange('price', {
                  ...formData.price,
                  currency: value,
                })
              }
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD - Dólar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="ARS">ARS - Peso Argentino</SelectItem>
                <SelectItem value="MXN">MXN - Peso Mexicano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Stock
        </label>
        <Input
          type="number"
          value={formData.stock || ''}
          onChange={(e) => onChange('stock', parseInt(e.target.value) || 0)}
          placeholder="Cantidad disponible"
          disabled={isLoading}
          min="0"
        />
        {formData.stock === 0 && (
          <p className="text-xs text-red-600 font-medium">⚠️ Producto sin stock</p>
        )}
      </div>
    </div>
  );
}
