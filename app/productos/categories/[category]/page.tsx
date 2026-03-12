import LayoutPage from "@/components/layoutPage";
import CategoryHeader from "@/components/product/category-page/category-header";
import { ProductsGrid } from "@/components/product/products-grid";

export default function Home() {
  return (
    <LayoutPage>
      <CategoryHeader />
      <div className="m-24">
        <ProductsGrid />
      </div>
    </LayoutPage>
  );
}
