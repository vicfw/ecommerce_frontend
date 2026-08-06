import { Product } from "@/types/globalTypes";
import { catalogTags } from "@/lib/catalogCache";
import { fetchData } from "@/lib/fetch";
import {
  GetProductsParams,
  ProductFiltersResponse,
} from "./types/productService.types";

export class ProductService {
  private endpoint = "/product";

  async getProducts(params?: GetProductsParams) {
    const searchParams = new URLSearchParams();

    if (params?.search) searchParams.set("search", params.search);
    if (params?.limit != null) searchParams.set("limit", String(params.limit));
    if (params?.page != null) searchParams.set("page", String(params.page));
    if (params?.categoryId != null) {
      searchParams.set("categoryId", String(params.categoryId));
    }
    if (params?.categorySlug) {
      searchParams.set("categorySlug", params.categorySlug);
    }
    if (params?.brand) searchParams.set("brand", params.brand);
    if (params?.brandId != null) {
      searchParams.set("brandId", String(params.brandId));
    }
    if (params?.minPrice != null && params.minPrice !== "") {
      searchParams.set("minPrice", String(params.minPrice));
    }
    if (params?.maxPrice != null && params.maxPrice !== "") {
      searchParams.set("maxPrice", String(params.maxPrice));
    }
    if (params?.color) searchParams.set("color", params.color);
    if (params?.badgeId != null && params.badgeId !== "") {
      searchParams.set("badgeId", String(params.badgeId));
    }
    if (params?.sort && params.sort !== "default") {
      searchParams.set("sort", params.sort);
    }

    const queryString = searchParams.toString();
    const url = queryString
      ? `${this.endpoint}?${queryString}`
      : this.endpoint;

    return fetchData<Product[]>(url, { tags: [catalogTags.products] });
  }

  async getProductFilters(params?: {
    categoryId?: number;
    categorySlug?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.categoryId != null) {
      searchParams.set("categoryId", String(params.categoryId));
    }
    if (params?.categorySlug) {
      searchParams.set("categorySlug", params.categorySlug);
    }

    const queryString = searchParams.toString();
    const url = queryString
      ? `${this.endpoint}/filters?${queryString}`
      : `${this.endpoint}/filters`;

    return fetchData<ProductFiltersResponse>(url, {
      tags: [catalogTags.products],
    });
  }

  async getProduct(slug: string) {
    return fetchData<Product>(`${this.endpoint}/${slug}`, {
      tags: [catalogTags.products, catalogTags.product(slug)],
    });
  }
}
