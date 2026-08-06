import axiosInstance from "./axios";
import { Category } from "@/types/globalTypes";
import { GetAllCategoriesResponse } from "./types/categoryService.types";
import { Response } from "./types/config";
import { fetchData } from "@/lib/fetch";

export class CategoryService {
  private endpoint = "/category";

  getCategories(): Promise<Response<GetAllCategoriesResponse>> {
    return axiosInstance().get(this.endpoint);
  }

  getAllCategoriesByLevel(
    level: number
  ): Promise<Response<GetAllCategoriesResponse>> {
    return axiosInstance().get(`${this.endpoint}/level/${level}`);
  }

  getCategoryBySlug(slug: string) {
    return fetchData<Category>(`${this.endpoint}/slug/${slug}`);
  }

  getAllCategories() {
    return fetchData<Category[]>(this.endpoint);
  }

  getCategoryPath(id: number): Promise<Response<Category & { children?: Category[] }>> {
    return axiosInstance().get(`${this.endpoint}/${id}/path`);
  }
}
