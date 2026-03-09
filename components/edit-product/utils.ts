/**
 * Funciones utilidad para EditProduct
 */

import type { Product, ValidationResult } from './types';
import { VALIDATION_ERRORS, VALIDATION_WARNINGS } from './types';

/**
 * Validar producto completo
 */
export function validateProduct(product: Product): ValidationResult {
  const errors: Record<string, string> = {};
  const warnings: Record<string, string> = {};

  // Validar título
  if (!product.title || product.title.trim() === '') {
    errors.title = VALIDATION_ERRORS.TITLE_REQUIRED;
  } else if (product.title.length < 3) {
    errors.title = VALIDATION_ERRORS.TITLE_TOO_SHORT;
  }

  // Validar descripción
  if (!product.description || product.description.trim() === '') {
    errors.description = VALIDATION_ERRORS.DESCRIPTION_REQUIRED;
  } else if (product.description.length < 50) {
    errors.description = VALIDATION_ERRORS.DESCRIPTION_TOO_SHORT;
  } else if (product.description.length > 5000) {
    errors.description = VALIDATION_ERRORS.DESCRIPTION_TOO_LONG;
  }

  // Advertencia si descripción es corta
  if (
    product.description &&
    product.description.length >= 50 &&
    product.description.length < 100
  ) {
    warnings.description = VALIDATION_WARNINGS.DESCRIPTION_SHORT;
  }

  // Validar precio
  if (product.currentPrice === undefined || product.currentPrice === null) {
    errors.currentPrice = VALIDATION_ERRORS.PRICE_REQUIRED;
  } else if (isNaN(product.currentPrice)) {
    errors.currentPrice = VALIDATION_ERRORS.PRICE_INVALID;
  } else if (product.currentPrice < 0) {
    errors.currentPrice = VALIDATION_ERRORS.PRICE_NEGATIVE;
  }

  // Validar imágenes
  if (!product.images || product.images.length === 0) {
    errors.images = VALIDATION_ERRORS.IMAGES_REQUIRED;
  }

  // Advertencias de stock
  if (product.stock !== undefined && product.stock !== null) {
    if (product.stock === 0) {
      warnings.stock = VALIDATION_WARNINGS.STOCK_ZERO;
    } else if (product.stock < 10) {
      warnings.stock = VALIDATION_WARNINGS.STOCK_LOW;
    }
  }

  // Advertencia si no tiene resumen
  if (!product.summary || product.summary.trim() === '') {
    warnings.summary = VALIDATION_WARNINGS.NO_SUMMARY;
  }

  // Validar SKU si existe
  if (product.sku && !/^[A-Z0-9\-_]+$/.test(product.sku)) {
    errors.sku = VALIDATION_ERRORS.SKU_INVALID;
  }

  // Validar slug si existe
  if (product.slug && !/^[a-z0-9\-]+$/.test(product.slug)) {
    errors.slug = VALIDATION_ERRORS.SLUG_INVALID;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
  };
}

/**
 * Calcular descuento entre dos precios
 */
export function calculateDiscount(
  originalPrice: number | undefined,
  currentPrice: number
): {
  discount: number | null;
  discountPercentage: number | null;
} {
  if (
    !originalPrice ||
    originalPrice <= 0 ||
    originalPrice <= currentPrice
  ) {
    return {
      discount: null,
      discountPercentage: null,
    };
  }

  const discount = originalPrice - currentPrice;
  const discountPercentage = Math.round(
    ((originalPrice - currentPrice) / originalPrice) * 100
  );

  return {
    discount: Math.round(discount * 100) / 100,
    discountPercentage,
  };
}

/**
 * Generar slug automático desde título
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
    .replace(/[\s_]+/g, '-') // Reemplazar espacios por guiones
    .replace(/^-+|-+$/g, ''); // Remover guiones al inicio/final
}

/**
 * Limpiar y validar URL de imagen
 */
export function isValidImageUrl(url: string): boolean {
  try {
    // Aceptar data URLs
    if (url.startsWith('data:')) {
      return true;
    }

    // Validar URLs
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Obtener extensión de imagen desde URL
 */
export function getImageExtension(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const ext = pathname.split('.').pop()?.toLowerCase() || 'jpg';
    return ext;
  } catch {
    return 'jpg';
  }
}

/**
 * Obtener nombre de archivo desde URL
 */
export function getImageFileName(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    return pathname.split('/').pop() || 'imagen.jpg';
  } catch {
    return 'imagen.jpg';
  }
}

/**
 * Formatear tamaño de archivo en bytes
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Crear producto con valores por defecto
 */
export function createEmptyProduct(): Product {
  return {
    id: '',
    title: '',
    description: '',
    currentPrice: 0,
    images: [],
    categories: [],
    claims: [],
    features: [],
  };
}

/**
 * Normalizar producto para envío a API
 */
export function normalizeProductForAPI(product: Product): Record<string, any> {
  return {
    title: product.title.trim(),
    brand: product.brand?.trim() || undefined,
    slug: product.slug?.trim() || undefined,
    sku: product.sku?.trim() || undefined,
    available: product.available || true,
    notes: product.notes?.trim() || undefined,
    categories: product.categories?.filter((c) => c.trim()),
    claims: product.claims?.filter((c) => c.trim()),
    features: product.features?.filter((f) => f.trim()),
    originalPrice: product.originalPrice || undefined,
    currentPrice: Number(product.currentPrice),
    currency: product.currency || 'USD',
    pricePerUnit: product.pricePerUnit || undefined,
    stock: product.stock !== undefined ? Number(product.stock) : undefined,
    description: product.description.trim(),
    summary: product.summary?.trim() || undefined,
    images: product.images.filter((img) => img.trim()),
    mainImage: product.mainImage || product.images[0] || undefined,
  };
}

/**
 * Comparar dos productos para detectar cambios
 */
export function hasProductChanged(original: Product, current: Product): boolean {
  return JSON.stringify(original) !== JSON.stringify(current);
}

/**
 * Obtener cambios realizados en el producto
 */
export function getProductChanges(
  original: Product,
  current: Product
): Partial<Product> {
  const changes: Partial<Product> = {};

  (Object.keys(current) as Array<keyof Product>).forEach((key) => {
    if (JSON.stringify(original[key]) !== JSON.stringify(current[key])) {
      changes[key] = current[key];
    }
  });

  return changes;
}

/**
 * Convertir archivo a Data URL
 */
export async function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
