"use client";

import { useState, useEffect } from "react";
import { ChevronDown, X, Menu } from "lucide-react";
import Link from "next/link";

interface SubCategory {
  _id: string;
  name: string;
  icon: string;
  slug: string;
}

interface Category {
  _id: string;
  name: string;
  icon: string;
  slug: string;
  children?: SubCategory[];
}

export function CategorySidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/backend/categories/tree");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("error cargando categorias", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden z-40 p-3 rounded-full bg-card border border-border shadow-lg hover:bg-accent transition-all"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-30"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-screen lg:h-auto
          w-64 lg:w-56
          bg-card
          border-r border-border
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          overflow-y-auto flex flex-col z-40
        `}
      >
        {/* Close */}
        <button
          onClick={closeSidebar}
          className="lg:hidden p-4 hover:bg-accent transition"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Header */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-bold text-foreground">Categorías</h2>
          <p className="text-xs text-muted-foreground">Explora por categoría</p>
        </div>

        {/* Categories */}
        <div className="flex-1 px-4">
          {loading && (
            <p className="text-muted-foreground text-sm px-2">Cargando...</p>
          )}

          {!loading &&
            categories.map((category) => (
              <div key={category._id} className="mb-2">
                <div className="w-full px-3 py-2 rounded-lg hover:bg-accent transition">
                  <div className="flex items-center justify-between gap-2">
                    {/* Link */}
                    <Link
                      href={`/productos/categories/${category.slug}`}
                      className="flex items-center gap-3 flex-1 min-w-0"
                    >
                      <span className="text-lg">{category.icon}</span>

                      <p className="text-sm font-medium text-foreground truncate">
                        {category.name}
                      </p>
                    </Link>

                    {/* Toggle */}
                    {(category.children || []).length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(category._id);
                        }}
                        className={`
                          flex items-center justify-center
                          w-8 h-8 rounded-full
                          bg-muted hover:bg-primary/20
                          transition-all
                        `}
                      >
                        <ChevronDown
                          className={`w-4 h-4 text-foreground transition-transform ${
                            expandedCategory === category._id
                              ? "rotate-180 text-primary"
                              : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {/* Subcategories */}
                {expandedCategory === category._id &&
                  category.children &&
                  category.children.length > 0 && (
                    <div className="ml-4 mt-2 space-y-1 border-l border-border pl-3">
                      {category.children.map((sub) => (
                        <Link
                          key={sub._id}
                          href={`/productos/categories/${sub.slug}`}
                          className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition"
                        >
                          <span className="text-sm">{sub.icon}</span>
                          <span>{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
        </div>
      </aside>
    </>
  );
}
