"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageModal } from "./image-modal";
import { useImageSelectionStore } from "@/lib/use-image-selector-store";
import { Trash2, CheckCircle2 } from "lucide-react";
import { CreditCounter } from "./credit-counter";

export interface SelectedImageType {
  imageUrl: string;
  productTitle: string;
  price?: number;
  [key: string]: any;
}

export interface SelectionPayload {
  images: (SelectedImageType & { role: string })[];
  placement: string;
}

const CATEGORIES = [
  {
    id: "paneles",
    label: "Paneles",
    icon: "📋",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "plantas",
    label: "Plantas Artificiales",
    icon: "🌿",
    color: "from-green-500 to-emerald-500",
  },
];

interface ProductSidebarInputsProps {
  onSelectionChange?: (data: SelectionPayload) => void;
}

export function ProductSidebarInputs({
  onSelectionChange,
}: ProductSidebarInputsProps) {
  const [openModals, setOpenModals] = useState<Record<string, boolean>>({});
  const [placementText, setPlacementText] = useState("");
  const [roles, setRoles] = useState<Record<string, string>>({});

  const selectedImages = useImageSelectionStore(
    (state) => state.selectedImages,
  );

  const selectedCount = Object.keys(selectedImages).length;

  // 🔥 Enviar data al padre
  useEffect(() => {
    if (onSelectionChange) {
      const selectedArray = Object.entries(selectedImages)
        .slice(0, 3)
        .map(([categoryId, img]) => ({
          ...img,
          role:
            roles[categoryId] ||
            (categoryId === "paneles" ? "panel pared" : "planta decorativa"),
        }));

      onSelectionChange({
        images: selectedArray,
        placement: placementText,
      });
    }
  }, [selectedImages, placementText, roles]);

  const toggleModal = (categoryId: string) => {
    setOpenModals((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };
  const DEFAULT_ROLES: Record<string, string> = {
    paneles: "panel decorativo de pared",
    plantas: "planta decorativa interior",
  };

  return (
    <div className="w-full max-w-md h-[90vh] flex flex-col p-6 bg-gradient-to-b from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 backdrop-blur-xl shadow-2xl">
      {/* HEADER */}
      <div className="border-b border-slate-700/50 pb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Selector de Componentes
        </h2>
        <p className="text-sm text-slate-300">
          Selecciona elementos ({selectedCount}/3)
        </p>
      </div>

      <CreditCounter />

      {/* 🔥 INPUT DE UBICACIÓN */}
      <div className="mt-4 space-y-2">
        <label className="text-sm text-slate-300 font-semibold">
          ¿Dónde quieres colocar los elementos?
        </label>
        <textarea
          value={placementText}
          onChange={(e) => setPlacementText(e.target.value)}
          placeholder="Ej: Paneles en la pared izquierda, planta en la esquina derecha..."
          className="w-full h-20 p-3 rounded-lg bg-slate-800 border border-slate-600 text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* SCROLL */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 mt-4">
        {CATEGORIES.map((category) => {
          const selectedImage = selectedImages[category.id];
          const isSelected = !!selectedImage;

          return (
            <div key={category.id} className="space-y-2">
              {/* HEADER */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200">
                  {category.icon} {category.label}
                </span>
                {isSelected && (
                  <Badge
                    className={`bg-gradient-to-r ${category.color} text-white border-0 flex items-center gap-1`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Listo
                  </Badge>
                )}
              </div>

              {/* PREVIEW */}
              {isSelected && selectedImage ? (
                <>
                  <Card className="p-3 bg-slate-700/50 border border-slate-600/50">
                    <img
                      src={selectedImage.imageUrl}
                      className="w-full h-28 object-cover rounded-lg"
                    />
                    <p className="text-xs text-slate-200 mt-2 truncate">
                      {selectedImage.productTitle}
                    </p>
                  </Card>

                  {/* 🔥 INPUT ROLE */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Role</label>
                    <textarea
                      value={
                        roles[category.id] ?? DEFAULT_ROLES[category.id] ?? ""
                      }
                      onChange={(e) =>
                        setRoles((prev) => ({
                          ...prev,
                          [category.id]: e.target.value,
                        }))
                      }
                      placeholder="Ej: panel lateral moderno, planta decorativa..."
                      className="w-full h-16 p-2 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </>
              ) : (
                <div className="w-full h-28 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-xs text-slate-400">
                  Sin seleccionar
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => toggleModal(category.id)}
                >
                  {isSelected ? "Cambiar" : "Seleccionar"}
                </Button>

                {isSelected && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newImages = { ...selectedImages };
                      delete newImages[category.id];
                      useImageSelectionStore.setState({
                        selectedImages: newImages,
                      });
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                )}
              </div>

              <ImageModal
                categoryId={category.id}
                categoryLabel={category.label}
                isOpen={openModals[category.id] || false}
                onClose={() => toggleModal(category.id)}
              />
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="pt-4 border-t border-slate-700/50">
        <Button
          disabled={selectedCount === 0}
          className="w-full bg-red-500/20 text-red-300"
          onClick={() =>
            useImageSelectionStore.setState({ selectedImages: {} })
          }
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Limpiar Todo
        </Button>
      </div>
    </div>
  );
}
