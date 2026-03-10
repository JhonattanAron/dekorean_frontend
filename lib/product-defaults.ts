// Datos por defecto cuando un producto no tiene información
export const DEFAULT_PRODUCT_DATA = {
  general:
    "En Dekorans seleccionamos cuidadosamente productos de alta calidad diseñados para mejorar tus espacios con estilo, funcionalidad y durabilidad. Cada producto de nuestro catálogo está pensado para ofrecer una solución práctica y estética, adaptándose a diferentes necesidades de decoración y renovación.",
  specifications:
    "Las especificaciones pueden variar según el modelo o versión del producto. Todos nuestros artículos cumplen con estándares de calidad que garantizan resistencia, buen acabado y un rendimiento confiable para su uso en interiores o exteriores según corresponda.",
  highlights:
    "• Materiales de alta calidad\n• Diseño moderno y funcional\n• Fácil mantenimiento\n• Producto duradero y confiable\n• Ideal para renovar y mejorar cualquier espacio",
  overview:
    "Nuestros productos combinan diseño contemporáneo con funcionalidad, permitiendo transformar cualquier ambiente de forma sencilla. Son una excelente opción tanto para proyectos de renovación como para nuevas instalaciones, ofreciendo una solución estética y práctica para hogares o espacios comerciales.",
  installation:
    "La instalación es sencilla y puede realizarse siguiendo las recomendaciones básicas del producto. Se recomienda preparar adecuadamente la superficie y utilizar las herramientas apropiadas para garantizar un resultado óptimo y duradero.",
  installationSteps:
    "1. Preparar y limpiar la superficie donde se instalará el producto.\n2. Medir y ajustar el material según las dimensiones necesarias.\n3. Colocar o fijar el producto siguiendo las indicaciones de instalación.\n4. Verificar que todos los elementos estén correctamente ajustados.\n5. Disfrutar del nuevo aspecto de tu espacio.",
  purchaseInstructions:
    "Antes de realizar tu compra, revisa cuidadosamente las especificaciones y medidas del producto para asegurarte de que se adapta a tu proyecto. Si tienes dudas sobre compatibilidad, instalación o cantidades necesarias, nuestro equipo estará encantado de ayudarte.",
};

// Función auxiliar para obtener valor con fallback a datos por defecto
export function getProductDataWithFallback(
  value: any,
  fallbackKey: keyof typeof DEFAULT_PRODUCT_DATA,
): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  return DEFAULT_PRODUCT_DATA[fallbackKey];
}

// Función auxiliar para obtener descripción completa con fallbacks
export function getProductDescription(
  description: any,
): Record<string, string> {
  return {
    general: getProductDataWithFallback(description?.general, "general"),
    overview: getProductDataWithFallback(description?.overview, "overview"),
    highlights: getProductDataWithFallback(
      description?.highlights,
      "highlights",
    ),
    installation: getProductDataWithFallback(
      description?.installation,
      "installation",
    ),
    installationSteps: getProductDataWithFallback(
      description?.installationSteps,
      "installationSteps",
    ),
    purchaseInstructions: getProductDataWithFallback(
      description?.purchaseInstructions,
      "purchaseInstructions",
    ),
    specifications: getProductDataWithFallback(
      description?.specifications,
      "specifications",
    ),
  };
}
