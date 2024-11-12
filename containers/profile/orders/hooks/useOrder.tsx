import { OrderService } from "@/services/oderService";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const orderService = new OrderService();

export const useOrder = () => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("activeTab");

  const tabs = useMemo(
    () => [
      {
        title: "جاری",
        engTitle: "PROCESSING",
      },
      {
        title: "تحویل شده",
        engTitle: "DELIVERED",
      },
      {
        title: "مرجوع شده",
        engTitle: "RETURNED",
      },
      {
        title: "لغو شده",
        engTitle: "CANCELLED",
      },
    ],
    []
  );

  const { data: orderData, isPending: orderDataIsPending } = useQuery({
    queryKey: ["orders", activeTab],
    queryFn: ({ queryKey }) => orderService.getOrders(queryKey[1] as string),
    select: (data) => data.data.data,
  });

  return { get: { tabs, orderData, orderDataIsPending, activeTab }, on: {} };
};
