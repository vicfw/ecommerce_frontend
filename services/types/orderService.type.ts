import { Order, OrderStatus } from "@/types/globalTypes";

export type CreateOrderResponse = Order;

export type getOrderStatusCountResponse = {
  _count: {
    status: number;
  };
  status: OrderStatus;
}[];
