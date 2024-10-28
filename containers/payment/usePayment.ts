import { getClientSideCookie } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import { OrderService } from "@/services/oderService";
import { useQuery } from "react-query";

export const usePayment = () => {
  const token = getClientSideCookie("jwt");

  const { data: cartData } = useQuery({
    queryKey: ["get-cart"],
    queryFn: () => {
      const cartService = new CartService();
      return cartService.getCart();
    },
    enabled: Boolean(token),
    select: (data) => data.data.data,
  });

  const { data: deliveryCostData } = useQuery({
    queryKey: ["delivery-cost"],
    queryFn: () => {
      const orderService = new OrderService();
      return orderService.getDeliveryCost();
    },
    enabled: Boolean(token),
    select: (data) => data.data.data,
  });

  return { get: { cartData, deliveryCostData }, on: {} };
};
