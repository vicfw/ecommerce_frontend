import axiosInstance from "./axios";
import {
  CreateAnonCartBody,
  CreateAnonCartResponse,
  CreateCartBody,
  CreateCartResponse,
  GetAnonCartResponse,
  GetCartResponse,
} from "./types/cartService.types";
import { Response } from "./types/config";

export class CartService {
  private endpoint = "/cart";
  private length = "/length";
  private anon = "/anon";

  getCart(): Promise<Response<GetCartResponse>> {
    return axiosInstance().get(this.endpoint);
  }

  getAnonCart(): Promise<Response<GetAnonCartResponse>> {
    return axiosInstance().get(this.endpoint.concat(this.anon));
  }

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

  deleteCartItem(cartItemId: number): Promise<Response> {
    return axiosInstance().delete(
      this.endpoint.concat("/cartItem").concat("/" + cartItemId.toString())
    );
  }

  deleteAnonCartItem(cartItemId: number): Promise<Response> {
    return axiosInstance().delete(
      this.endpoint
        .concat(this.anon)
        .concat("/cartItem")
        .concat("/" + cartItemId.toString())
    );
  }

  matchAnonCart(userId: number): Promise<Response<GetCartResponse>> {
    return axiosInstance().post(
      this.endpoint.concat(this.anon).concat("/" + "match"),
      { userId }
    );
  }
}
