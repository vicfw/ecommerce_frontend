import { ProductListing } from "@/containers/product-listing/ProductListing";
import { CATALOG_TTL_SECONDS } from "@/lib/catalogCache";
import {
  EMPTY_PRODUCT_FILTERS,
  parsePlpSearchParams,
  toGetProductsParams,
} from "@/lib/plp";
import { ProductService } from "@/services/productService";
import { PLP_PAGE_SIZE } from "@/services/types/productService.types";

export const revalidate = CATALOG_TTL_SECONDS;

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductsPlpPage({ searchParams }: PageProps) {
  const rawSearchParams = await searchParams;
  const filters = parsePlpSearchParams(rawSearchParams);

  const productService = new ProductService();

  const [productsResult, filterOptionsResult] = await Promise.all([
    productService.getProducts(
      toGetProductsParams(filters, {
        page: 1,
        limit: PLP_PAGE_SIZE,
      })
    ),
    productService.getProductFilters(
      filters.category ? { categorySlug: filters.category } : undefined
    ),
  ]);

  return (
    <ProductListing
      key={JSON.stringify(filters)}
      title="همه محصولات"
      initialData={productsResult}
      filterOptions={filterOptionsResult.data ?? EMPTY_PRODUCT_FILTERS}
      filters={filters}
    />
  );
}
