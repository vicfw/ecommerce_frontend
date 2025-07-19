"use client";

import Loader from "@/components/Loader/Loader";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { cn } from "@/lib/utils";
import EmptyOrder from "./components/empty-order/EmptyOrder";
import OrderItem from "./components/order-item/OrderItem";
import TabItem from "./components/tab-item/TabItem";
import { useOrder } from "./hooks/useOrder";

const OrdersContainer = () => {
  const { get } = useOrder();

  return (
    <>
      {/* Mobile Layout - Full width without sidebar */}
      <div className="md:hidden">
        <section>
          <div className="w-full flex items-center gap-7 mt-4 px-4 border-b">
            {get.tabs.map((tab) => (
              <TabItem
                key={tab.engTitle}
                title={tab.title}
                count={
                  get.orderStatusCountData?.find(
                    (orderStatusCount) =>
                      orderStatusCount.status === tab.engTitle
                  )?.count || 0
                }
                engTitle={tab.engTitle}
              />
            ))}
          </div>
          <div
            className={cn(
              !get.orderData?.length && "min-h-[286px] justify-center ",
              "flex items-center flex-col w-full gap-5 px-3 pt-4"
            )}
          >
            {get.orderDataIsPending ? (
              <Loader />
            ) : get.orderData?.length ? (
              get.orderData.map((order) => (
                <OrderItem order={order} key={order.id} />
              ))
            ) : (
              <EmptyOrder />
            )}
          </div>
        </section>
      </div>

      {/* Desktop Layout - With sidebar */}
      <div className="hidden md:block">
        <section className="py-4">
          <div className="px-4">
            <UI_Typography className="text-neutral-900 med16">
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
                    (orderStatusCount) =>
                      orderStatusCount.status === tab.engTitle
                  )?.count || 0
                }
                engTitle={tab.engTitle}
              />
            ))}
          </div>
          <div
            className={cn(
              !get.orderData?.length && "min-h-[286px] justify-center ",
              "flex items-center flex-col w-full gap-5 px-3 pt-4"
            )}
          >
            {get.orderDataIsPending ? (
              <Loader />
            ) : get.orderData?.length ? (
              get.orderData.map((order) => (
                <OrderItem order={order} key={order.id} />
              ))
            ) : (
              <EmptyOrder />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default OrdersContainer;
