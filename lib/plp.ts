import {
  GetProductsParams,
  PlpSearchParams,
  ProductFiltersResponse,
  PLP_PAGE_SIZE,
} from "@/services/types/productService.types";

export const EMPTY_PRODUCT_FILTERS: ProductFiltersResponse = {
  brands: [],
  badges: [],
  colors: [],
  categories: [],
  priceRange: { minPrice: 0, maxPrice: 0 },
};

export function parsePlpSearchParams(
  searchParams: Record<string, string | string[] | undefined> | PlpSearchParams
): PlpSearchParams {
  const get = (key: keyof PlpSearchParams) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return {
    brand: get("brand"),
    minPrice: get("minPrice"),
    maxPrice: get("maxPrice"),
    color: get("color"),
    badge: get("badge"),
    sort: get("sort"),
    q: get("q"),
    category: get("category"),
  };
}

export function toGetProductsParams(
  filters: PlpSearchParams,
  overrides?: Partial<GetProductsParams>
): GetProductsParams {
  return {
    brand: filters.brand,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    color: filters.color,
    badgeId: filters.badge,
    sort: filters.sort,
    search: filters.q,
    categorySlug: filters.category,
    page: 1,
    limit: PLP_PAGE_SIZE,
    ...overrides,
  };
}

export function buildPlpQueryString(
  filters: PlpSearchParams,
  lockedKeys: (keyof PlpSearchParams)[] = []
) {
  const params = new URLSearchParams();

  (Object.keys(filters) as (keyof PlpSearchParams)[]).forEach((key) => {
    if (lockedKeys.includes(key)) return;
    const value = filters[key];
    if (value) params.set(key, value);
  });

  return params.toString();
}

/** Build URL filters from draft, preserving route-locked keys and dropping cleared ones. */
export function mergePlpFilters(
  draft: PlpSearchParams,
  lockedKeys: (keyof PlpSearchParams)[],
  lockedValues: PlpSearchParams
): PlpSearchParams {
  const next: PlpSearchParams = {};

  (Object.keys(draft) as (keyof PlpSearchParams)[]).forEach((key) => {
    if (lockedKeys.includes(key)) return;
    const value = draft[key];
    if (value) next[key] = value;
  });

  lockedKeys.forEach((key) => {
    if (lockedValues[key]) next[key] = lockedValues[key];
  });

  return next;
}
