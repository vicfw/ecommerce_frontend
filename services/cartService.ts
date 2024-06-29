import axiosInstance from "./axios";
import {
  CreateAnonCartBody,
  CreateAnonCartResponse,
  CreateCartBody,
  CreateCartResponse,
} from "./types/cartService";
import { Response } from "./types/config";

export class CartService {
  private endpoint = "/cart";
  private length = "/length";
  private anon = "/anon";

  createOrUpdateCart(
    data: CreateCartBody
  ): Promise<Response<CreateCartResponse>> {
    return axiosInstance().post(this.endpoint, data);
  }

  getCartLength(): Promise<Response<number>> {
    return axiosInstance().get(this.endpoint.concat(this.length));
  }

  createOrUpdateAnonCart(
    data: CreateAnonCartBody
  ): Promise<Response<CreateAnonCartResponse>> {
    return axiosInstance().post(this.endpoint.concat(this.anon), data);
  }

  getAnonCartLength(): Promise<Response<number>> {
    return axiosInstance().get(
      this.endpoint.concat(this.anon).concat(this.length)
    );
  }
}
