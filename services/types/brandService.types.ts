import { Brand, Product } from "@/types/globalTypes";

export type GetAllBrandsResponse = Brand;

export type GetBrandProductsResponse = {
  products: Product[];
  brand: Brand;
};
