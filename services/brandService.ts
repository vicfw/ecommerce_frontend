import { fetchData } from "@/lib/fetch";
import {
  GetAllBrandsResponse,
  GetBrandProductsResponse,
} from "./types/brandService.types";
import { Brand, Product } from "@/types/globalTypes";
import { FetchDataPaginatedResponse } from "./types/config";

export class BrandService {
  private endpoint = "/brand";

  getBrands(
    search?: string
  ): Promise<FetchDataPaginatedResponse<GetAllBrandsResponse[]>> {
    const queryString = search ? `?search=${search}` : "";
    return fetchData<GetAllBrandsResponse[]>(`${this.endpoint}${queryString}`);
  }

  getBrandProducts(
    slug: string,
    page?: number,
    limit?: number
  ): Promise<FetchDataPaginatedResponse<GetBrandProductsResponse>> {
    const queryParams = [];
    if (page) queryParams.push(`page=${page}`);
    if (limit) queryParams.push(`limit=${limit}`);

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    return fetchData<GetBrandProductsResponse>(
      `${this.endpoint}/${slug}/products${queryString}`
    );
  }
}
