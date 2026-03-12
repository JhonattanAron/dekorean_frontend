"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import { CreateCategoryModal } from "./create-category-modal";

interface Category {
  _id: string;
  name: string;
}

interface CategoryInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}

export function CategoryInput({
  label,
  value = [],
  onChange,
}: CategoryInputProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/backend/categories");
      const data = await res.json();

      setCategories(data);
    } catch (error) {
      console.error("error cargando categorias", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSelect = (valueSelected: string) => {
    if (valueSelected === "create") {
      setModalOpen(true);
      return;
    }

    setSelected(valueSelected);

    if (!value.includes(valueSelected)) {
      onChange([...value, valueSelected]);
    }
  };

  const removeCategory = (cat: string) => {
    onChange(value.filter((c) => c !== cat));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-semibold">{label}</label>

        <p className="text-xs text-muted-foreground">
          Selecciona o crea nuevas categorías
        </p>
      </div>

      {/* SELECT */}

      <select
        className="w-full h-10 border rounded-md px-3 text-sm"
        value=""
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="">Seleccionar categoría</option>

        {categories.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}

        <option value="create">➕ Crear nueva categoría</option>
      </select>

      {/* categorias agregadas */}

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((cat) => (
            <div
              key={cat}
              className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md text-sm"
            >
              {cat}

              <X
                className="w-4 h-4 cursor-pointer hover:text-red-500"
                onClick={() => removeCategory(cat)}
              />
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}

      <CreateCategoryModal
        open={modalOpen}
        setOpen={setModalOpen}
        onCreated={(newCategory: Category) => {
          fetchCategories();

          if (!value.includes(newCategory.name)) {
            onChange([...value, newCategory.name]);
          }
        }}
      />
    </div>
  );
}
