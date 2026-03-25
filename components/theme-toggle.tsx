"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-lg bg-muted" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-background hover:bg-muted dark:hover:bg-muted-foreground transition-colors duration-200 group"
      aria-label="Toggle theme"
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          size={20}
          className="absolute text-foreground dark:text-foreground transition-opacity duration-300 rotate-0 scale-100 opacity-100 dark:opacity-0"
        />
        <Moon
          size={20}
          className="absolute text-foreground dark:text-foreground transition-opacity duration-300 rotate-180 scale-0 opacity-0 dark:opacity-100 dark:scale-100"
        />
      </div>
    </button>
  );
}
