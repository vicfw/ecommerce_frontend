import axiosInstance from "./axios";
import { Response } from "./types/config";

export class OrderService {
  async getDeliveryCost(): Promise<Response<{ cost: number }>> {
    return axiosInstance().get("/deliveryCost");
  }

  async createOrder(): Promise<Response<{ orderId: string }>> {
    return axiosInstance().post("/order");
  }
}
