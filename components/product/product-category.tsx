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

  const closeSidebar = () => {
    setIsOpen(false);
  };

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
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden z-40 p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all shadow-lg"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-screen lg:h-auto
          w-64 lg:w-56 
          bg-gradient-to-b from-white/5 to-white/[0.02]
          border-r border-white/10
          backdrop-blur-xl
          transition-transform duration-300 ease-out
          lg:translate-x-0 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          overflow-y-auto lg:overflow-visible
          flex flex-col
        `}
      >
        {/* Close Button */}
        <button
          onClick={closeSidebar}
          className="lg:hidden p-4 hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Header */}
        <div className="px-6 py-4 lg:py-6">
          <h2 className="text-lg font-bold text-white mb-1">Categorías</h2>
          <p className="text-xs text-white/60">Explora por categoría</p>
        </div>

        {/* Categories */}
        <div className="flex-1 px-4 lg:px-0">
          {loading && <p className="text-white/50 text-sm px-4">Cargando...</p>}

          {!loading &&
            categories.map((category) => (
              <div key={category._id} className="mb-2">
                <button
                  onClick={() => toggleCategory(category._id)}
                  className="w-full px-4 py-3 rounded-lg group hover:bg-white/10 transition-colors duration-200 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{category.icon}</span>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          {category.name}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-white/50 transition-transform duration-300 ${
                        expandedCategory === category._id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Subcategories */}
                {expandedCategory === category._id &&
                  category.children &&
                  category.children.length > 0 && (
                    <div className="ml-6 mt-2 space-y-1 pb-2 border-l border-white/10">
                      {category.children.map((sub) => (
                        <Link
                          key={sub._id}
                          href={`/productos/categories/${sub.slug}`}
                          className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors duration-200"
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
