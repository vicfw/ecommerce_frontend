import { OrderService } from "@/services/oderService";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const orderService = new OrderService();

export const usePaymentSuccess = () => {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId") || "";

  const { data: orderData } = useQuery({
    queryKey: ["payment-success", orderId],
    queryFn: () => {
      return orderService.getOrder(+orderId);
    },
    select: (res) => {
      return res.data.data;
    },
  });

  return { get: { orderData }, on: {} };
};
