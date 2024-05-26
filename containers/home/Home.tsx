import { ProductCard } from "@/components/product-card/ProductCard";
import { ProductService } from "@/services/productService";
import React from "react";
import { ProductList } from "./ProductList";
import { Container } from "@/components/container/Container";

export const HomeContainer = async () => {
  const productService = new ProductService();
  async function getData() {
    return await productService.getProducts();
  }

  const data = await getData();

  console.log(data, "data");

  return (
    <Container component="section">
      <ProductList products={data.products} />
    </Container>
  );
};
