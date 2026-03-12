"use client";

import { useEffect, useState } from "react";

interface SubCategory {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
  children?: SubCategory[];
}

export function CategorySelect() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/backend/categories/tree");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("error cargando categorias", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-lg text-sm"
    >
      <option value="">Todas las categorías</option>

      {categories.map((cat) => (
        <optgroup key={cat._id} label={cat.name}>
          <option value={cat.name}>{cat.name}</option>

          {cat.children?.map((sub) => (
            <option key={sub._id} value={sub.name}>
              └ {sub.name}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
