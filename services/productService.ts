import { Product } from "@/types/globalTypes";
import { fetchData } from "@/lib/fetch";
export class ProductService {
  private endpoint = "/product";

  async getProducts() {
    return fetchData<Product[]>(this.endpoint);
  }

  async getProduct(slug: string) {
    return fetchData<Product>(`${this.endpoint}/${slug}`);
  }
}
