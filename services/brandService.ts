import axiosInstance from "./axios";
import { GetAllBrandsResponse } from "./types/brandService.types";
import { Response } from "./types/config";

export class BrandService {
  private endpoint = "/brand";

  getBrands(): Promise<Response<GetAllBrandsResponse>> {
    return axiosInstance().get(this.endpoint);
  }
}
