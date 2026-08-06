import { Product } from "@/types/globalTypes";
import { fetchData } from "@/lib/fetch";

type GetProductsParams = {
  search?: string;
  limit?: number;
  page?: number;
  categoryId?: number;
};

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

    const queryString = searchParams.toString();
    const url = queryString
      ? `${this.endpoint}?${queryString}`
      : this.endpoint;

    return fetchData<Product[]>(url);
  }

  async getProduct(slug: string) {
    return fetchData<Product>(`${this.endpoint}/${slug}`);
  }
}
