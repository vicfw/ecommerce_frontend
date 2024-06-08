import ProductDetailContainer from "@/containers/product-detail/ProductDetail";
import { ProductService } from "@/services/productService";
import React from "react";

const productService = new ProductService();

type ProductDetailPageProps = {
  params: { slug: string };
};

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { data } = await productService.getProduct(params.slug);

  return <ProductDetailContainer product={data} />;
};

export default ProductDetailPage;
