"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageModal } from "./image-modal";
import { useImageSelectionStore } from "@/lib/use-image-selector-store";
import { Trash2, CheckCircle2, Sparkles } from "lucide-react";
import { CreditCounter } from "./credit-counter";
import { PlacementPromptModal } from "./placement-prompt-modal";

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
  const [promptType, setPromptType] = useState<
    "panel" | "planta" | "mix" | null
  >(null);
  const [showPanel, setShowPanel] = useState(false);
  const [showPlanta, setShowPlanta] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [roles, setRoles] = useState<Record<string, string>>({});

  const selectedImages = useImageSelectionStore(
    (state) => state.selectedImages,
  );

  const selectedCount = Object.keys(selectedImages).length;

  // 🔥 Enviar data al padre
  useEffect(() => {
    if (onSelectionChange) {
      const selectedArray = Object.entries(selectedImages)
        .filter(([categoryId]) => {
          if (promptType === "panel") return categoryId === "paneles";
          if (promptType === "planta") return categoryId === "plantas";
          return true; // mix → deja todo
        })
        .slice(0, 3)
        .map(([categoryId, img]) => ({
          ...img,
          role:
            roles[categoryId] ||
            (categoryId === "paneles"
              ? "panel decorativo de pared"
              : "planta decorativa interior"),
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

      {/* 🔥 PLACEMENT PROMPT SECTION */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-slate-300 font-semibold">
            Prompt de ubicación
          </label>
          {placementText && (
            <span className="text-xs text-cyan-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Optimizado
            </span>
          )}
        </div>
        <Button
          onClick={() => setIsPromptModalOpen(true)}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {placementText ? "Editar prompt" : "Seleccionar prompt"}
        </Button>
        {placementText && (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-slate-700/50 border border-slate-600/50">
              <p className="text-xs text-slate-300 leading-relaxed">
                {placementText}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-slate-400">Elementos a agregar:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPanel(!showPanel)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    showPanel
                      ? "bg-blue-500/20 text-blue-300 border-blue-500/50"
                      : "bg-slate-700/30 text-slate-400 border-slate-600/30 hover:bg-slate-700/50"
                  }`}
                >
                  🧱 Panel
                </button>
                <button
                  onClick={() => setShowPlanta(!showPlanta)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    showPlanta
                      ? "bg-green-500/20 text-green-300 border-green-500/50"
                      : "bg-slate-700/30 text-slate-400 border-slate-600/30 hover:bg-slate-700/50"
                  }`}
                >
                  🌿 Planta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PLACEMENT PROMPT MODAL */}
      <PlacementPromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        onSelect={(prompt, type) => {
          setPlacementText(prompt);
          setPromptType(type || "mix");
          // Automáticamente marcar los badges según el tipo
          if (type === "panel") {
            setShowPanel(true);
            setShowPlanta(false);
          } else if (type === "planta") {
            setShowPanel(false);
            setShowPlanta(true);
          } else {
            setShowPanel(true);
            setShowPlanta(true);
          }
        }}
      />

      {/* SCROLL */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 mt-4">
        {!placementText && (
          <div className="p-4 rounded-lg bg-slate-700/30 border-2 border-dashed border-slate-600/50 text-center">
            <p className="text-sm text-slate-400">
              Selecciona un prompt para ver los elementos disponibles
            </p>
          </div>
        )}
        {placementText && !showPanel && !showPlanta && (
          <div className="p-4 rounded-lg bg-slate-700/30 border-2 border-dashed border-slate-600/50 text-center">
            <p className="text-sm text-slate-400">
              Selecciona Panel o Planta (o ambos) para agregar elementos
            </p>
          </div>
        )}
        {CATEGORIES.filter((category) => {
          if (!placementText) return false;
          if (category.id === "paneles") return showPanel;
          if (category.id === "plantas") return showPlanta;
          return false;
        }).map((category) => {
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
