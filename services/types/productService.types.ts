import { Badge, Brand, Category, Product } from "@/types/globalTypes";

export const PLP_PAGE_SIZE = 20;

export type ProductSort = "price_asc" | "price_desc" | "newest" | "default";

export type GetProductsParams = {
  search?: string;
  limit?: number;
  page?: number;
  categoryId?: number;
  categorySlug?: string;
  brand?: string;
  brandId?: number;
  minPrice?: number | string;
  maxPrice?: number | string;
  color?: string;
  badgeId?: number | string;
  sort?: ProductSort | string;
  ids?: number[];
};

export type ProductFiltersResponse = {
  brands: Brand[];
  badges: Pick<Badge, "id" | "title" | "icon">[];
  colors: { name: string; colorImage: string }[];
  categories: Pick<
    Category,
    "id" | "name" | "slug" | "level" | "parentId"
  >[];
  priceRange: {
    minPrice: number;
    maxPrice: number;
  };
};

export type PlpSearchParams = {
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  color?: string;
  badge?: string;
  sort?: string;
  q?: string;
  category?: string;
};
