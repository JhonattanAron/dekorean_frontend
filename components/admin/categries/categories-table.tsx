"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, Plus } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  icon: string;
  slug: string;
  parent?: string;
  children?: Category[]; // 🔥 importante
}

interface Props {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  loading?: boolean;
}

export function CategoriesTable({
  categories,
  onEdit,
  onDelete,
  onAdd,
  loading,
}: Props) {
  // 🔥 función recursiva
  const renderRows = (cats: Category[], level = 0): React.ReactNode[] => {
    return cats.flatMap((category) => [
      <TableRow key={category._id}>
        <TableCell>
          <span className="text-2xl">{category.icon}</span>
        </TableCell>

        <TableCell>
          <div
            className="flex items-center gap-2"
            style={{ paddingLeft: `${level * 20}px` }}
          >
            {level > 0 && <span className="text-muted-foreground">└─</span>}
            <span className="font-medium">{category.name}</span>
          </div>
        </TableCell>

        <TableCell className="text-muted-foreground text-sm">
          {category.slug}
        </TableCell>

        <TableCell className="text-right space-x-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(category)}>
            <Edit2 className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(category._id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </TableCell>
      </TableRow>,

      // 🔥 hijos (recursivo)
      ...(category.children ? renderRows(category.children, level + 1) : []),
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Categorías</h2>
        <Button onClick={onAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Agregar categoría
        </Button>
      </div>

      {/* Tabla */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icono</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  No hay categorías
                </TableCell>
              </TableRow>
            ) : (
              renderRows(categories) // 🔥 tree completo
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
