import { Product } from "@/types/globalTypes";
import { ProductListContainer } from "./ProductList";

type HomeContainerProps = {
  products: Product[];
};

export const HomeContainer = async ({ products }: HomeContainerProps) => {
  return <ProductListContainer products={products} />;
};
