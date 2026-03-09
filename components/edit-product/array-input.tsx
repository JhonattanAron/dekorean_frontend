'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';

interface ArrayInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  description?: string;
}

export function ArrayInput({
  label,
  value,
  onChange,
  placeholder = 'Ingrese un valor...',
  description,
}: ArrayInputProps) {
  const handleAdd = () => {
    onChange([...value, '']);
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, newValue: string) => {
    const updated = [...value];
    updated[index] = newValue;
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-semibold text-foreground">{label}</label>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <span className="text-xs font-medium text-muted-foreground w-6 text-center">
              {index + 1}
            </span>
            <Input
              value={item}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleRemove(index)}
              className="h-10 w-10 p-0 flex items-center justify-center border-red-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAdd}
        className="w-full gap-2"
      >
        <Plus className="w-4 h-4" />
        Agregar {label.toLowerCase()}
      </Button>
    </div>
  );
}
