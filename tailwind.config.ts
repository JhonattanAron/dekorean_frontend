import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // activamos modo oscuro mediante la clase 'dark'
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales
        primary: "#1754cf", // azul para botones y enlaces
        secondary: "#facc15", // amarillo/acento
        accent: "#f97316", // naranja/acento extra

        // Fondos
        "background-light": "#f6f6f8", // fondo en modo claro
        "background-dark": "#111621", // fondo en modo oscuro

        // Texto
        "text-light": "#111111", // texto principal modo claro
        "text-dark": "#f9f9f9", // texto principal modo oscuro

        // Bordes, dividers
        "border-light": "#e5e7eb", // gris claro para bordes
        "border-dark": "#1f2937", // gris oscuro para bordes en dark
      },

      fontFamily: {
        display: ["Inter", "sans-serif"],
      },

      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
