"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

const PREDEFINED_PROMPTS = [
  {
    id: "panel-wall",
    icon: "🧱",
    label: "Panel en pared",
    category: "panel",
    prompt: `Colocar panel decorativo en la pared manteniendo la perspectiva original de la imagen. 
Integrar únicamente la textura del panel, respetando la iluminación, sombras y profundidad existentes. 
No modificar la estructura de la pared ni el entorno. 
El panel debe verse realista y perfectamente adaptado a la superficie.`,
  },
  {
    id: "panel-shelf",
    icon: "🧱",
    label: "Panel en repisa",
    category: "panel",
    prompt: `Colocar panel decorativo sobre la repisa existente, respetando la perspectiva y escala del entorno. 
Integrar solo la textura del panel sin alterar la estructura. 
Mantener iluminación, sombras y coherencia visual con la escena original.`,
  },
  {
    id: "panel-counter",
    icon: "🧱",
    label: "Panel en encimera",
    category: "panel",
    prompt: `Colocar panel decorativo sobre la encimera manteniendo la geometría original. 
Aplicar únicamente la textura del panel sin modificar el fondo. 
Respetar iluminación, sombras y reflejos para un resultado realista.`,
  },
  {
    id: "plant-corner",
    icon: "🌿",
    label: "Planta en esquina",
    category: "planta",
    prompt: `Agregar una planta decorativa en la esquina de la escena. 
Mantener perspectiva, iluminación y sombras originales. 
Integrar la planta de forma natural sin alterar el entorno existente.`,
  },
  {
    id: "plant-sofa",
    icon: "🌿",
    label: "Planta junto a sofá",
    category: "planta",
    prompt: `Colocar una planta decorativa junto al sofá respetando la escala y perspectiva. 
Ajustar sombras e iluminación para que se integre naturalmente. 
No modificar otros elementos de la escena.`,
  },
  {
    id: "panel-plant-wall",
    icon: "🎨",
    label: "Panel + Planta en pared",
    category: "mix",
    prompt: `Integrar panel decorativo en la pared y una planta en la esquina o lateral. 
Mantener perspectiva, iluminación y sombras originales. 
Aplicar únicamente texturas y objetos sin modificar la estructura existente. 
Asegurar coherencia visual y profundidad natural.`,
  },
  {
    id: "panel-plant-complete",
    icon: "🌳",
    label: "Escena con Panel + Planta",
    category: "mix",
    prompt: `Integrar paneles decorativos en pared/encimera y plantas en esquinas/relieve. 
Mantener completamente la estructura original, perspectiva e iluminación. 
Aplicar únicamente texturas y objetos sin alterar el fondo. 
Asegurar coherencia visual, sombras naturales y profundidad realista.`,
  },
];

const DEFAULT_CUSTOM_PROMPT = `Integrar elementos decorativos en la escena (paneles y/o plantas) manteniendo la perspectiva original. 
Aplicar únicamente texturas y objetos sin modificar la estructura existente. 
Respetar iluminación, sombras y profundidad. 
Asegurar un resultado realista y coherente visualmente.`;

interface PlacementPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (prompt: string, type?: "panel" | "planta" | "mix") => void;
}

export function PlacementPromptModal({
  isOpen,
  onClose,
  onSelect,
}: PlacementPromptModalProps) {
  const [selectedTab, setSelectedTab] = useState<"scenes" | "custom">("scenes");
  const [customPrompt, setCustomPrompt] = useState(DEFAULT_CUSTOM_PROMPT);

  const handleSelectPrompt = (
    prompt: string,
    type?: "panel" | "planta" | "mix",
  ) => {
    onSelect(prompt, type);
    onClose();
  };

  const handleCustomPrompt = () => {
    onSelect(customPrompt, "mix");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Optimiza tu prompt para IA
          </DialogTitle>
        </DialogHeader>

        {/* TABS */}
        <div className="flex gap-2 mb-6 border-b border-slate-700">
          <button
            onClick={() => setSelectedTab("scenes")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedTab === "scenes"
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            Selecciona una escena
          </button>
          <button
            onClick={() => setSelectedTab("custom")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedTab === "custom"
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            Personalizado
          </button>
        </div>

        {/* SCENES TAB */}
        {selectedTab === "scenes" && (
          <div className="space-y-4">
            {/* Panel Section */}
            <div>
              <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                🧱 Paneles
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {PREDEFINED_PROMPTS.filter((p) => p.category === "panel").map(
                  (preset) => (
                    <Card
                      key={preset.id}
                      className="p-4 bg-slate-700/50 border-slate-600 cursor-pointer hover:bg-slate-700 hover:border-cyan-500 transition-all group"
                      onClick={() =>
                        handleSelectPrompt(
                          preset.prompt,
                          preset.category as "panel" | "planta" | "mix",
                        )
                      }
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{preset.icon}</span>
                        <span className="text-sm font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">
                          {preset.label}
                        </span>
                      </div>
                    </Card>
                  ),
                )}
              </div>
            </div>

            {/* Plant Section */}
            <div>
              <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                🌿 Plantas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {PREDEFINED_PROMPTS.filter((p) => p.category === "planta").map(
                  (preset) => (
                    <Card
                      key={preset.id}
                      className="p-4 bg-slate-700/50 border-slate-600 cursor-pointer hover:bg-slate-700 hover:border-cyan-500 transition-all group"
                      onClick={() =>
                        handleSelectPrompt(
                          preset.prompt,
                          preset.category as "panel" | "planta" | "mix",
                        )
                      }
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{preset.icon}</span>
                        <span className="text-sm font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">
                          {preset.label}
                        </span>
                      </div>
                    </Card>
                  ),
                )}
              </div>
            </div>

            {/* Pro Section */}
            <div>
              <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                ⭐ Panel + Planta
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {PREDEFINED_PROMPTS.filter((p) => p.category === "mix").map(
                  (preset) => (
                    <Card
                      key={preset.id}
                      className="p-4 bg-slate-700/50 border-slate-600 cursor-pointer hover:bg-slate-700 hover:border-cyan-500 transition-all group"
                      onClick={() =>
                        handleSelectPrompt(
                          preset.prompt,
                          preset.category as "panel" | "planta" | "mix",
                        )
                      }
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{preset.icon}</span>
                        <span className="text-sm font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                          {preset.label}
                        </span>
                      </div>
                    </Card>
                  ),
                )}
              </div>
            </div>
          </div>
        )}

        {/* CUSTOM TAB */}
        {selectedTab === "custom" && (
          <div className="space-y-4">
            <p className="text-sm text-slate-400">
              Personaliza tu prompt optimizado para IA. Mantén las instrucciones
              clave para mejores resultados.
            </p>
            <Textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-40 bg-slate-700 border-slate-600 text-white text-sm resize-none focus:ring-cyan-500"
              placeholder="Escribe tu prompt personalizado..."
            />
          </div>
        )}

        {/* FOOTER */}
        <div className="flex gap-2 justify-end pt-4 border-t border-slate-700">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-600 hover:bg-slate-700"
          >
            Cancelar
          </Button>
          <Button
            onClick={
              selectedTab === "scenes"
                ? () => handleSelectPrompt(DEFAULT_CUSTOM_PROMPT)
                : handleCustomPrompt
            }
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            Usar este prompt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
