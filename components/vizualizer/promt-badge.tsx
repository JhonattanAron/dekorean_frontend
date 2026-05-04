"use client";

import { Badge } from "@/components/ui/badge";

type PromptCategory = "panel" | "planta" | "mix";

const CATEGORY_CONFIG: Record<
  PromptCategory,
  {
    label: string;
    icon: string;
    color: string;
  }
> = {
  panel: {
    label: "Panel",
    icon: "🧱",
    color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  planta: {
    label: "Planta",
    icon: "🌿",
    color: "bg-green-500/20 text-green-300 border-green-500/30",
  },
  mix: {
    label: "Escena Completa",
    icon: "🧠",
    color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
};

interface PromptBadgeProps {
  category: PromptCategory;
  className?: string;
}

export function PromptBadge({ category, className }: PromptBadgeProps) {
  const config = CATEGORY_CONFIG[category];

  return (
    <Badge className={`${config.color} border ${className || ""}`}>
      {config.icon} {config.label}
    </Badge>
  );
}
