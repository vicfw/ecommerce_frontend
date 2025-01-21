import { OrderService } from "@/services/oderService";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

const orderService = new OrderService();

export const useOrderDetail = () => {
  const router = useRouter();
  const { id: orderId } = useParams();

  function routerBack() {
    router.back();
  }

  const { data: orderDetailData, isPending: orderDetailIsPending } = useQuery({
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

  return {
    get: { orderDetailData, deliveryCostData, router, orderDetailIsPending },
    on: { routerBack },
  };
};
