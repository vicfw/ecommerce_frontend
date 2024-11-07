import { Order } from "@/types/globalTypes";
import axiosInstance from "./axios";
import { Response } from "./types/config";
import { CreateOrderResponse } from "./types/orderService.type";

export class OrderService {
  async getDeliveryCost(): Promise<Response<{ cost: number }>> {
    return axiosInstance().get("/deliveryCost");
  }

  async createOrder(): Promise<Response<CreateOrderResponse>> {
    return axiosInstance().post("/order");
  }

  async getOrder(orderId: number): Promise<Response<Order>> {
    return axiosInstance().get(`/order/${orderId}`);
  }
}
