import { ProductCard } from "@/components/product-card/ProductCard";
import { Product } from "@/types/globalTypes";
import React from "react";

type ProductListProps = {
  products: Product[];
};

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
      {products.map((product) => (
        <ProductCard {...product} key={product.id} />
      ))}
    </div>
  );
};
