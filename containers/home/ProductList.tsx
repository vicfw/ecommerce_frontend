import { GoToCartModal } from "@/components/go-to-cart-modal/GoToCartModal";
import { ProductCard } from "@/components/product-card/ProductCard";
import { Product } from "@/types/globalTypes";

type ProductListProps = {
  products: Product[];
};

export const ProductListContainer = ({ products }: ProductListProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 w-full mt-12">
      {products.map((product) => (
        <ProductCard {...product} key={product.id} />
      ))}

      <GoToCartModal />
    </div>
  );
};
