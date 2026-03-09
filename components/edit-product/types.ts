/**
 * Tipos y interfaces para el formulario EditProduct
 * Basados en la estructura del useProductsStore
 */

/**
 * Estructura de precios del producto
 */
export interface Price {
  original: number;
  current: number;
  currency: string;
}

/**
 * Estructura de descripción detallada
 */
export interface Description {
  general: string;
  highlights: string[];
  installation: string;
  installationSteps: string[];
  overview: string;
  purchaseInstructions: string;
}

/**
 * Estructura de reseñas
 */
export interface Reviews {
  rating: number;
  count: number;
}

/**
 * Interfaz principal del producto
 * Coincide con la estructura del store useProductsStore
 */
export interface Product {
  _id: string;
  
  brand: string;
  category: string[];
  claims: string[];
  
  contentSize: string;
  deliveryTime: string;
  
  description?: Description;
  
  dimensions?: Record<string, any>;
  
  features: string[];
  images: string[];
  mainImage: string;
  
  inStock: boolean;
  stock?: number;
  
  price?: Price;
  price_per_m2: number;
  
  reviews?: Reviews;
  
  slug: string;
  title: string;
  
  createdAt: string;
  updatedAt: string;
}

/**
 * Props para el componente EditProduct
 */
export interface EditProductProps {
  product: Product;
  onSave?: (product: Product) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Props para ArrayInput
 */
export interface ArrayInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
}

/**
 * Props para ImageUploader
 */
export interface ImageUploaderProps {
  images: string[];
  mainImage: string | null;
  onImagesChange: (images: string[]) => void;
  onMainImageChange: (image: string) => void;
  isLoading?: boolean;
  onUploadImage?: (file: File) => Promise<string>;
  onReplaceImage?: (oldUrl: string, file: File) => Promise<string>;
}

/**
 * Resultado de validación
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

/**
 * Estados del formulario
 */
export enum FormStatus {
  IDLE = 'idle',
  SAVING = 'saving',
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Respuesta de API para upload de imágenes
 */
export interface ImageUploadResponse {
  url: string;
  size?: number;
  width?: number;
  height?: number;
  mimeType?: string;
}

/**
 * Errores de validación por campo
 */
export const VALIDATION_ERRORS = {
  TITLE_REQUIRED: 'El título es requerido',
  TITLE_TOO_SHORT: 'El título debe tener al menos 3 caracteres',
  BRAND_REQUIRED: 'La marca es requerida',
  CATEGORY_REQUIRED: 'Se requiere al menos una categoría',
  SLUG_REQUIRED: 'El slug es requerido',
  SLUG_INVALID: 'El slug contiene caracteres inválidos',
  DESCRIPTION_REQUIRED: 'La descripción general es requerida',
  DESCRIPTION_TOO_SHORT: 'La descripción debe tener al menos 50 caracteres',
  DESCRIPTION_TOO_LONG: 'La descripción no puede exceder 2000 caracteres',
  PRICE_REQUIRED: 'El precio actual es requerido',
  PRICE_INVALID: 'El precio debe ser un número válido',
  PRICE_NEGATIVE: 'El precio no puede ser negativo',
  CURRENCY_REQUIRED: 'Se requiere una moneda',
  IMAGES_REQUIRED: 'Se requiere al menos una imagen',
  MAIN_IMAGE_REQUIRED: 'Se requiere una imagen principal',
  DELIVERY_TIME_REQUIRED: 'Se requiere un tiempo de entrega',
  CONTENT_SIZE_REQUIRED: 'Se requiere un tamaño de contenido',
} as const;

/**
 * Advertencias de validación
 */
export const VALIDATION_WARNINGS = {
  DESCRIPTION_SHORT: 'La descripción es muy corta (menos de 100 caracteres)',
  NO_HIGHLIGHTS: 'Se recomienda agregar puntos destacados',
  NO_INSTALLATION_STEPS: 'Se recomienda agregar pasos de instalación',
  STOCK_LOW: 'Stock bajo - considera reordenar',
  STOCK_ZERO: 'Stock en cero - el producto no se venderá',
  NO_REVIEWS: 'Sin reseñas aún',
  PRICE_MISMATCH: 'El precio actual es mayor al precio original',
} as const;
