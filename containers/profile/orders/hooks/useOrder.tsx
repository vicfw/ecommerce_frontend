import { OrderService } from "@/services/oderService";
import { OrderStatus } from "@/types/globalTypes";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const orderService = new OrderService();

export const useOrder = () => {
  const searchParams = useSearchParams();
  const activeTabParam = searchParams.get("activeTab");
  const activeTab = (
    activeTabParam ?? OrderStatus.PROCESSING
  ).toLowerCase();

  const tabs = useMemo(
    () => [
      {
        title: "جاری",
        engTitle: OrderStatus.PROCESSING,
      },
      {
        title: "تحویل شده",
        engTitle: OrderStatus.DELIVERED,
      },
      {
        title: "مرجوع شده",
        engTitle: OrderStatus.RETURNED,
      },
      {
        title: "لغو شده",
        engTitle: OrderStatus.CANCELLED,
      },
    ],
    []
  );

  const { data: orderData, isPending: orderDataIsPending } = useQuery({
    queryKey: ["orders", activeTab],
    queryFn: ({ queryKey }) => orderService.getOrders(queryKey[1] as string),
    select: (data) => data.data.data,
  });

  const { data: orderStatusCountData, isPending: orderStatusCountPending } =
    useQuery({
      queryKey: ["orderStatusCount"],
      queryFn: () => orderService.getOrderStatusCount(),
      select: (data) => data.data.data,
    });

  return {
    get: {
      tabs,
      orderData,
      orderDataIsPending,
      activeTab,
      orderStatusCountData,
    },
    on: {},
  };
};
