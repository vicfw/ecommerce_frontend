import { Price } from "@/components/price/Price";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Order, OrderStatus } from "@/types/globalTypes";
import { format } from "date-fns-jalali";
import {
  CarFront,
  Check,
  CircleX,
  ClipboardList,
  Dot,
  Undo2,
} from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

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

  const iconMapper = useMemo(
    () => ({
      [OrderStatus.PROCESSING]: <CarFront className="text-neutral-600" />,

      [OrderStatus.DELIVERED]: (
        <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
          <Check size="70%" className="text-white" />
        </div>
      ),
      [OrderStatus.RETURNED]: <Undo2 className="text-neutral-600" />,
      [OrderStatus.CANCELLED]: <CircleX className="text-neutral-600" />,
    }),
    []
  );

  return (
    <div className="border rounded-md w-full">
      <div className="flex justify-between">
        <div className="flex flex-col  w-full">
          <div className="py-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 px-3">
              {iconMapper[activeTab as keyof typeof iconMapper]}
              <UI_Typography
                variant="Medium/Med14"
                className="text-neutral-800"
              >
                {mapper[activeTab as keyof typeof mapper]}
              </UI_Typography>
            </div>
            {/* info */}
            <div className="flex items-center gap-1 px-3">
              <UI_Typography
                variant="Regular/Reg14"
                className="text-neutral-500"
              >
                {format(new Date(order.createdAt), "d LLLL yyyy")}
              </UI_Typography>
              <Dot className="text-[#e0e0e2]" size={30} />
              <div className="flex items-center gap-1">
                <UI_Typography className="text-neutral-400">
                  کد سفارش
                </UI_Typography>
                <UI_Typography
                  variant="Regular/Reg14"
                  className="text-neutral-700"
                >
                  {order.id}
                </UI_Typography>
              </div>
              <Dot className="text-[#e0e0e2]" size={30} />
              <div className="flex items-center gap-1">
                <UI_Typography className="text-neutral-400">مبلغ</UI_Typography>
                <Price price={order.totalAmount} variant="Regular/Reg14" />
              </div>

              {order.profitFromDiscount ? (
                <>
                  <Dot className="text-[#e0e0e2]" size={30} />
                  <div className="flex items-center gap-1">
                    <UI_Typography className="text-neutral-400">
                      تخفیف
                    </UI_Typography>
                    <Price
                      price={order.profitFromDiscount}
                      variant="Regular/Reg14"
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {/* images */}
          <div className="flex items-center gap-4 border-t border-b py-4 px-3">
            {order.orderItem.map((orderItem) => (
              <Image
                key={orderItem.product.id}
                src={orderItem.product.images[0]}
                alt="product"
                width={64}
                height={64}
              />
            ))}
          </div>
          {/* factor */}
          <div className="flex items-center gap-1 px-3 py-5 justify-end">
            <div className="flex items-center gap-2 cursor-pointer">
              <ClipboardList className="text-secondary" size={22} />
              <UI_Typography variant="Regular/Reg12" className="text-secondary">
                نمایش جزئیات
              </UI_Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
