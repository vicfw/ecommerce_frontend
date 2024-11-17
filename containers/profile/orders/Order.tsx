"use client";

import UI_Typography from "@/components/ui/typography/UI_Typography";
import React from "react";
import { useOrder } from "./hooks/useOrder";
import TabItem from "./components/tab-item/TabItem";
import { Loader2 } from "lucide-react";
import EmptyOrder from "./components/empty-order/EmptyOrder";
import OrderItem from "./components/order-item/OrderItem";
import { cn } from "@/lib/utils";

const OrdersContainer = () => {
  const { get } = useOrder();
  return (
    <section>
      <div className="px-4">
        <UI_Typography variant="Medium/Med16" className="text-neutral-900">
          تاریخچه سفارشات
        </UI_Typography>
      </div>

      <div className="w-full flex items-center gap-7 mt-8 px-4 border-b">
        {get.tabs.map((tab) => (
          <TabItem
            key={tab.engTitle}
            title={tab.title}
            count={
              get.orderStatusCountData?.find(
                (orderStatusCount) => orderStatusCount.status === tab.engTitle
              )?._count.status || 0
            }
            engTitle={tab.engTitle}
          />
        ))}
      </div>
      <div
        className={cn(
          !get.orderData?.length && "min-h-[286px] justify-center ",
          "flex items-center  flex-col w-full gap-5 px-3 pt-4"
        )}
      >
        {get.orderDataIsPending ? (
          <Loader2 className="animate-spin text-neutral-300" />
        ) : get.orderData?.length ? (
          get.orderData.map((order) => (
            <OrderItem order={order} key={order.id} />
          ))
        ) : (
          <EmptyOrder />
        )}
      </div>
    </section>
  );
};

export default OrdersContainer;
