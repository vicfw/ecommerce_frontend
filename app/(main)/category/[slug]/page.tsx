import { ProductListing } from "@/containers/product-listing/ProductListing";
import { CATALOG_TTL_SECONDS } from "@/lib/catalogCache";
import {
  EMPTY_PRODUCT_FILTERS,
  parsePlpSearchParams,
  toGetProductsParams,
} from "@/lib/plp";
import { CategoryService } from "@/services/categoryService";
import { ProductService } from "@/services/productService";
import { PLP_PAGE_SIZE } from "@/services/types/productService.types";
import { notFound } from "next/navigation";

export const revalidate = CATALOG_TTL_SECONDS;

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateStaticParams() {
  const categoryService = new CategoryService();
  try {
    const categories = await categoryService.getAllCategories();
    return (categories.data ?? []).map((category) => ({
      slug: category.slug,
    }));
  } catch {
    return [];
  }
}

export default async function CategoryPlpPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const rawSearchParams = await searchParams;
  const filters = {
    ...parsePlpSearchParams(rawSearchParams),
    category: slug,
  };

  const productService = new ProductService();
  const categoryService = new CategoryService();

  const [categoryResult, productsResult, filterOptionsResult] =
    await Promise.all([
      categoryService.getCategoryBySlug(slug),
      productService.getProducts(
        toGetProductsParams(filters, {
          page: 1,
          limit: PLP_PAGE_SIZE,
        })
      ),
      productService.getProductFilters({ categorySlug: slug }),
    ]);

  if (!categoryResult.data) {
    notFound();
  }

  return (
    <ProductListing
      key={`${slug}-${JSON.stringify(filters)}`}
      title={categoryResult.data.name}
      initialData={productsResult}
      filterOptions={filterOptionsResult.data ?? EMPTY_PRODUCT_FILTERS}
      filters={filters}
      lockedFilterKeys={["category"]}
    />
  );
}
