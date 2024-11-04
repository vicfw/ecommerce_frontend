import { getClientSideCookie } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import { OrderService } from "@/services/oderService";
import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { format } from "date-fns-jalali";
import { addDays, parseISO } from "date-fns";

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

  const { mutateAsync: createOrder } = useMutation({
    mutationFn: () => {
      const orderService = new OrderService();
      return orderService.createOrder();
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleCreateOrder = async () => {
    await createOrder();
  };

  const formattedDeliveryDate = useMemo(() => {
    if (!cartData) return "";
    const add2Days = addDays(new Date(), 2);
    const date = parseISO(add2Days.toISOString());
    return format(date, "eeee d MMMM");
  }, [cartData]);

  return {
    get: { cartData, deliveryCostData, formattedDeliveryDate },
    on: { handleCreateOrder },
  };
};
