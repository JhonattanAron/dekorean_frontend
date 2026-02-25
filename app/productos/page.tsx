import CategoryCarousel from "@/components/product/category-carrusel";
import { ProductsPage } from "@/components/products-page";

export const metadata = {
  title: "Productos - DEKORANS Interior Design",
  description:
    "Descubre nuestra colección premium de paneles acústicos para tu estudio profesional",
};

export default function ProductsRoute() {
  return (
    <div>
      <CategoryCarousel />

      <ProductsPage />
    </div>
  );
}
