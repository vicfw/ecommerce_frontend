import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Order, OrderStatus } from "@/types/globalTypes";
import { Ticket } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

type OrderItemProps = {
  order: Order;
};

const OrderItem = ({ order }: OrderItemProps) => {
  const activeTab =
    useSearchParams().get("activeTab") || OrderStatus.PROCESSING;

  const mapper = {
    [OrderStatus.PROCESSING]: "جاری",
    [OrderStatus.DELIVERED]: "تحویل شده",
    [OrderStatus.RETURNED]: "مرجوع شده",
    [OrderStatus.CANCELLED]: "لغو شده",
  };

  return (
    <div className="border rounded-md py-4 px-3 w-full">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Ticket />
          <UI_Typography variant="Medium/Med14" className="text-neutral-800">
            {mapper[activeTab as keyof typeof mapper]}
          </UI_Typography>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
