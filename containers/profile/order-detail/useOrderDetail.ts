import { OrderService } from "@/services/oderService";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const orderService = new OrderService();

export const useOrderDetail = () => {
  const { id: orderId } = useParams();

  const { data: orderDetailData } = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: ({ queryKey }) => orderService.getOrder(+queryKey[1]),
    select: (data) => data.data.data,
  });

  const { data: deliveryCostData } = useQuery({
    queryKey: ["delivery-cost"],
    queryFn: () => {
      const orderService = new OrderService();
      return orderService.getDeliveryCost();
    },
    select: (data) => data.data.data,
  });

  return { get: { orderDetailData, deliveryCostData }, on: {} };
};
