import { Order } from "@/types/globalTypes";
import axiosInstance from "./axios";
import { Response } from "./types/config";
import {
  CreateOrderResponse,
  getOrderDetailResponse,
  getOrderStatusCountResponse,
} from "./types/orderService.type";

export class OrderService {
  async getDeliveryCost(): Promise<Response<{ cost: number; id: number }>> {
    return axiosInstance().get("/deliveryCost");
  }

  async createOrder(): Promise<Response<CreateOrderResponse>> {
    return axiosInstance().post("/order");
  }

  async getOrder(orderId: number): Promise<Response<getOrderDetailResponse>> {
    return axiosInstance().get(`/order/${orderId}`);
  }

  async getOrders(activeTab: string): Promise<Response<Order[]>> {
    const searchParam = new URLSearchParams({ status: activeTab });
    return axiosInstance().get(`/order?${searchParam.toString()}`);
  }

  async getOrderStatusCount(): Promise<Response<getOrderStatusCountResponse>> {
    return axiosInstance().get("/order/statusCount");
  }

  async getReturnRequest(orderId: number): Promise<
    Response<{
      id: number;
      orderId: number;
      reason: string;
      status: "pending" | "approved" | "rejected";
    } | null>
  > {
    return axiosInstance().get(`/return-request/order/${orderId}`);
  }

  async createReturnRequest(
    orderId: number,
    reason: string
  ): Promise<
    Response<{
      id: number;
      orderId: number;
      reason: string;
      status: string;
    }>
  > {
    return axiosInstance().post("/return-request", { orderId, reason });
  }
}
