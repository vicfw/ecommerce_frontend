import { Address } from "@/types/globalTypes";
import axiosInstance from "./axios";
import { CreateAddressBody } from "./types/addressService.types";
import { Response } from "./types/config";

export class AddressService {
  private endpoint = "/address";

  //   async getAddresses() {
  //     return fetchData<Product[]>(this.endpoint);
  //   }

  async createAddress(data: CreateAddressBody): Promise<Response<Address>> {
    return axiosInstance().post(this.endpoint, data);
  }
}
