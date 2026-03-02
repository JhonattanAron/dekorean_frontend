import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseProductString(input: string) {
  const regex = /\{(.+?)\}/g;
  const matches = [...input.matchAll(regex)];

  if (matches.length < 3 || matches.length > 4) {
    throw new Error(
      "Formato inválido. Se esperaban 3 o 4 valores entre llaves.",
    );
  }

  const [name, price, description] = matches.map((m) => m[1]);

  // Si hay una cuarta llave, extraer stock desde ella
  let stock = 0;
  if (matches[3]) {
    const stockMatch = matches[3][1].match(/(\d+)/);
    if (stockMatch) {
      stock = parseInt(stockMatch[1], 10);
    }
  }

  return {
    name,
    price,
    description,
    stock,
  };
}

export function formatLink(text: string): string {
  if (!text) return "";

  // 🔥 Siempre decodificar primero
  const decoded = decodeURIComponent(text);

  // Detectar si ya parece slug (minúsculas y guiones)
  const isSlug = /^[a-z0-9-]+$/.test(decoded);

  // 🔹 Si es slug → convertir a texto bonito
  if (isSlug) {
    return decoded
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  // 🔹 Si es texto normal → convertir a slug
  return decoded
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}
