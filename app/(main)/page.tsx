import { HomeContainer } from "@/containers/home/Home";
import { ProductService } from "@/services/productService";
import React from "react";

const HomePage = async () => {
  const productService = new ProductService();
  async function getData() {
    return await productService.getProducts();
  }

  const result = await getData();

  return <HomeContainer products={result.data} />;
};

export default HomePage;
