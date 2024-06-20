import { getClientSideCookie } from "@/lib/utils";
import axiosInstance from "./axios";
import { CreateCartBody, CreateCartResponse } from "./types/cartService";
import { Response } from "./types/config";

export class CartService {
  private token;
  private endpoint = "/cart";
  private length = "/length";

  constructor() {
    this.token = getClientSideCookie("jwt");
  }

  createOrUpdateCart(
    data: CreateCartBody
  ): Promise<Response<CreateCartResponse>> {
    return axiosInstance(this.token).post(this.endpoint, data);
  }

  getCartLength(): Promise<Response<number>> {
    return axiosInstance(this.token).get(this.endpoint.concat(this.length));
  }
}
