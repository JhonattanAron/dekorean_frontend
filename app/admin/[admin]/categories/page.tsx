"use client";

import { useState, useEffect } from "react";
import { CategorySidebar } from "@/components/admin/categries/category-sidebar";
import { CategoriesTable } from "@/components/admin/categries/categories-table";
import { CreateCategoryModal } from "@/components/admin/categries/create-category-modal";
import { EditCategoryModal } from "@/components/admin/categries/edit-category-modal";
import AdminLayout from "@/components/admin/admin-layout";

export interface Category {
  _id: string;
  name: string;
  icon: string;
  slug: string;
  parent?: string;
  children?: Category[]; // 👈 IMPORTANTE para tree
}

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/backend/categories/tree");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("error cargando categorias", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta categoría?"))
      return;

    try {
      const res = await fetch(`/api/backend/categories/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchCategories(); // 🔥 refresca TODO sincronizado
      }
    } catch (error) {
      console.error("error eliminando categoria", error);
    }
  };

  const handleCreated = async () => {
    await fetchCategories(); // 🔥 sync total
    setShowCreateModal(false);
  };

  const handleUpdated = async () => {
    await fetchCategories(); // 🔥 sync total
    setShowEditModal(false);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-background flex">
        {/* Main */}
        <div className="flex-1 min-h-screen flex flex-col">
          <main className="flex-1 overflow-auto">
            <div className="p-6 max-w-7xl mx-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-muted-foreground">
                    Cargando categorías...
                  </div>
                </div>
              ) : (
                <CategoriesTable
                  categories={categories}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAdd={() => setShowCreateModal(true)}
                  loading={loading}
                />
              )}
            </div>
          </main>
        </div>

        {/* Sidebar usa LA MISMA DATA */}
        <CategorySidebar categories={categories} loading={loading} />

        {/* Modales */}
        <CreateCategoryModal
          open={showCreateModal}
          setOpen={setShowCreateModal}
          onCreated={handleCreated}
        />

        <EditCategoryModal
          open={showEditModal}
          setOpen={setShowEditModal}
          category={selectedCategory}
          onUpdated={handleUpdated}
        />
      </div>
    </AdminLayout>
  );
}
