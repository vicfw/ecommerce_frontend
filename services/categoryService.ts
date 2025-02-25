import axiosInstance from "./axios";
import { GetAllCategoriesResponse } from "./types/categoryService.types";
import { Response } from "./types/config";

export class CategoryService {
  private endpoint = "/category";

  getCategories(): Promise<Response<GetAllCategoriesResponse>> {
    return axiosInstance().get(this.endpoint);
  }
}
