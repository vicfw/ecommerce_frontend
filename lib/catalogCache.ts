/**
 * Catalog cache contract — keep values identical to
 * ecommerce_backend/src/constants/catalogCache.ts
 */
export const CATALOG_TTL_SECONDS = 60;

export const catalogTags = {
  products: "products",
  categories: "categories",
  brands: "brands",
  homepage: "homepage",
  siteSettings: "site-settings",
  product: (slug: string) => `product:${slug}`,
} as const;

/** Shared with backend + cache-handler.js — bump on catalog writes. */
export const nextTagVersionKey = (tag: string) => `next:tagver:${tag}`;
