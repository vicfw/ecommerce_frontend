import { Address, Order, OrderStatus, User } from "@/types/globalTypes";

export type CreateOrderResponse = Order;

export type getOrderStatusCountResponse = {
  _count: {
    status: number;
  };
  status: OrderStatus;
}[];

export type getOrderDetailResponse = Order & {
  address: Pick<Address, "address">;
} & { user: User };
