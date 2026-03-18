"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";

interface AIDesignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (prompt: string) => Promise<void>;
}

export function AIDesignModal({
  open,
  onOpenChange,
  onGenerate,
}: AIDesignModalProps) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [style, setStyle] = useState("moderno");

  const styles = [
    { id: "moderno", label: "Moderno", emoji: "✨" },
    { id: "minimalista", label: "Minimalista", emoji: "⚪" },
    { id: "rustico", label: "Rústico", emoji: "🪵" },
    { id: "clasico", label: "Clásico", emoji: "👑" },
    { id: "industrial", label: "Industrial", emoji: "⚙️" },
    { id: "nordico", label: "Nórdico", emoji: "❄️" },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      await onGenerate(`${style}: ${prompt}`);
      setPrompt("");
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/50 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            Crear Diseño con IA
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Describe tu visión para el diseño interior y la IA generará opciones
            personalizadas
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Style Selection */}
          <div>
            <label className="text-sm font-semibold text-slate-200 mb-3 block">
              Estilo de Diseño
            </label>
            <div className="grid grid-cols-3 gap-2">
              {styles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`p-3 rounded-lg font-medium transition-all text-center ${
                    style === s.id
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50"
                      : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50"
                  }`}
                >
                  <div className="text-lg mb-1">{s.emoji}</div>
                  <div className="text-xs">{s.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div>
            <label className="text-sm font-semibold text-slate-200 mb-2 block">
              Descripción de tu Proyecto
            </label>
            <Textarea
              placeholder="Ej: Quiero una cocina moderna con tonos grises y azules, con mucho espacio de almacenamiento..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-24 bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>

          {/* Suggested Prompts */}
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-2 block">
              Sugerencias:
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                "Cocina abierta con isla central y tecnología moderna",
                "Espacio pequeño optimizado con soluciones inteligentes",
                "Diseño ecológico con materiales sostenibles",
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(suggestion)}
                  className="p-2 text-left text-sm bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/30 rounded text-slate-300 hover:text-slate-200 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-slate-100"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold shadow-lg hover:shadow-cyan-500/50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generar Diseño
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
