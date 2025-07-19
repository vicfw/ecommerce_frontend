import { Address } from "@/types/globalTypes";
import axiosInstance from "./axios";
import { CreateAddressBody } from "./types/addressService.types";
import { Response } from "./types/config";

export class AddressService {
  private endpoint = "/address";

  async getAddresses(): Promise<Response<Address[]>> {
    return axiosInstance().get(this.endpoint);
  }

  async createAddress(data: CreateAddressBody): Promise<Response<Address>> {
    return axiosInstance().post(this.endpoint, data);
  }

  async updateAddress(
    addressId: number,
    data: Partial<CreateAddressBody>
  ): Promise<Response<Address>> {
    return axiosInstance().patch(
      this.endpoint.concat("/" + addressId.toString()),
      data
    );
  }

  async deleteAddress(addressId: number): Promise<Response<Address>> {
    return axiosInstance().delete(
      this.endpoint.concat("/" + addressId.toString())
    );
  }
}
