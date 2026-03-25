"use client";

import { useEffect, useState } from "react";

const THEMES = [
  { name: "Verde", class: "theme-green", color: "#22c55e" },
  { name: "Azul", class: "theme-blue", color: "#3b82f6" },
  { name: "Morado", class: "theme-purple", color: "#a855f7" },
  { name: "Rojo", class: "theme-red", color: "#ef4444" },
  { name: "Naranja", class: "theme-orange", color: "#f97316" },
];

export default function ThemeAdminPage() {
  const [activeTheme, setActiveTheme] = useState("theme-green");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setActiveTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (themeClass: string) => {
    const root = document.documentElement;

    // limpiar anteriores
    THEMES.forEach((t) => root.classList.remove(t.class));

    // aplicar nuevo
    root.classList.add(themeClass);

    localStorage.setItem("theme", themeClass);
    setActiveTheme(themeClass);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-10">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold">🎨 Temas del Sistema</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {THEMES.map((theme) => (
            <button
              key={theme.class}
              onClick={() => applyTheme(theme.class)}
              className={`
                p-6 rounded-2xl border transition-all
                ${
                  activeTheme === theme.class
                    ? "border-primary scale-105"
                    : "border-border hover:border-primary/50"
                }
              `}
            >
              <div
                className="w-full h-16 rounded-xl mb-4"
                style={{ backgroundColor: theme.color }}
              />

              <p className="font-semibold">{theme.name}</p>
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className="p-8 rounded-2xl bg-card border border-border space-y-4">
          <h2 className="text-xl font-semibold">Preview</h2>

          <button className="btn-primary">Botón principal</button>

          <button className="btn-secondary">Botón secundario</button>
        </div>
      </div>
    </div>
  );
}
