import { ProductCard } from "@/components/product-card/ProductCard";
import { Product } from "@/types/globalTypes";
import Link from "next/link";
import React from "react";

type ProductListProps = {
  products: Product[];
};

export const ProductListContainer = ({ products }: ProductListProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full mt-12">
      {products.map((product) => (
        <Link href={`/products/${product.slug}`}>
          <ProductCard {...product} key={product.id} />
        </Link>
      ))}
    </div>
  );
};
