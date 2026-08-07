import { HomeContainer } from "@/containers/home/Home";
import { CATALOG_TTL_SECONDS } from "@/lib/catalogCache";
import { HomepageService } from "@/services/homepageService";
import { ProductService } from "@/services/productService";
import {
  collectProductIdsFromLayout,
  normalizeHomepageLayout,
} from "@/services/types/homepageService.types";
import { Product } from "@/types/globalTypes";
import type { Metadata } from "next";

export const revalidate = CATALOG_TTL_SECONDS;

export const metadata: Metadata = {
  title: "فروشگاه",
  description: "صفحه اصلی فروشگاه",
};

const HomePage = async () => {
  const homepageService = new HomepageService();
  const productService = new ProductService();

  const homepageResult = await homepageService.getHomepage();
  const layout = normalizeHomepageLayout(homepageResult.data?.sections);
  const productIds = collectProductIdsFromLayout(layout);

  let productsById: Record<number, Product> = {};

  if (productIds.length > 0) {
    const productsResult = await productService.getProducts({
      ids: productIds,
    });
    productsById = Object.fromEntries(
      (productsResult.data ?? []).map((product) => [product.id, product])
    );
  }

  return <HomeContainer layout={layout} productsById={productsById} />;
};

export default HomePage;
