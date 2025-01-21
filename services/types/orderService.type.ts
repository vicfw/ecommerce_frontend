import { Address, Order, OrderStatus, User } from "@/types/globalTypes";

export type CreateOrderResponse = Order;

export type getOrderStatusCountResponse = {
  count: number;
  status: OrderStatus;
}[];

export type getOrderDetailResponse = Order & {
  address: Pick<Address, "address">;
} & { user: User };
