"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageModal } from "./image-modal";
import { useImageSelectionStore } from "@/lib/use-image-selector-store";
import { Trash2, CheckCircle2, Loader2, Wand2 } from "lucide-react";
import { AIDesignModal } from "./ai-desing-modal";
import { CreditCounter } from "./credit-counter";

const CATEGORIES = [
  {
    id: "cocinas",
    label: "Cocinas",
    icon: "🍳",
    color: "from-orange-500 to-red-500",
  },
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

export function ProductSidebarInputs() {
  const [openModals, setOpenModals] = useState<Record<string, boolean>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  const selectedImages = useImageSelectionStore(
    (state) => state.selectedImages,
  );

  const selectedCount = Object.keys(selectedImages).length;

  const toggleModal = (categoryId: string) => {
    setOpenModals((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleGenerateDesign = async (prompt: string) => {
    setIsGenerating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("Design generated with AI:", prompt);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-md h-[90vh] flex flex-col p-6 bg-gradient-to-b from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 backdrop-blur-xl shadow-2xl">
      {/* HEADER */}
      <div className="border-b border-slate-700/50 pb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Selector de Componentes
        </h2>
        <p className="text-sm text-slate-300">
          Selecciona elementos para personalizar tu diseño ({selectedCount}/3)
        </p>
      </div>
      <CreditCounter />
      {/* 🔥 SCROLL SOLO AQUÍ */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 mt-4">
        {CATEGORIES.map((category) => {
          const selectedImage = selectedImages[category.id];
          const isSelected = !!selectedImage;

          return (
            <div key={category.id} className="space-y-2">
              {/* Category Header */}
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

              {/* Preview */}
              {isSelected && selectedImage ? (
                <Card className="p-3 bg-gradient-to-br from-slate-700/50 to-slate-800/50 overflow-hidden border border-slate-600/50">
                  <div className="space-y-2">
                    <div
                      className={`relative w-full h-28 bg-gradient-to-br ${category.color} rounded-lg overflow-hidden`}
                    >
                      <img
                        src={selectedImage.imageUrl}
                        alt={selectedImage.productTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs space-y-1">
                      <p className="font-semibold text-slate-100 truncate">
                        {selectedImage.productTitle}
                      </p>
                      {selectedImage.price && (
                        <p className="text-slate-400">
                          ${selectedImage.price.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ) : (
                <div
                  className={`w-full h-28 bg-gradient-to-br ${category.color} bg-opacity-10 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600/50`}
                >
                  <span className="text-xs text-slate-400 text-center px-2">
                    Sin seleccionar elemento
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-slate-700/50 border-slate-600/50 text-slate-100"
                  onClick={() => toggleModal(category.id)}
                >
                  {isSelected ? "Cambiar" : "Seleccionar"}
                </Button>

                {isSelected && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-3 text-red-400"
                    onClick={() => {
                      const newImages = { ...selectedImages };
                      delete newImages[category.id];
                      useImageSelectionStore.setState({
                        selectedImages: newImages,
                      });
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
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

      {/* 🔥 FOOTER FIJO */}
      <div className="pt-4 border-t border-slate-700/50 space-y-2">
        <Button
          onClick={() => setShowAIModal(true)}
          disabled={isGenerating}
          className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Generar Diseño con IA
            </>
          )}
        </Button>

        {selectedCount > 0 && (
          <Button
            variant="secondary"
            size="sm"
            className="w-full bg-red-500/20 border border-red-500/50 text-red-300"
            onClick={() =>
              useImageSelectionStore.setState({ selectedImages: {} })
            }
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Limpiar Todo
          </Button>
        )}
      </div>

      <AIDesignModal
        open={showAIModal}
        onOpenChange={setShowAIModal}
        onGenerate={handleGenerateDesign}
      />
    </div>
  );
}
