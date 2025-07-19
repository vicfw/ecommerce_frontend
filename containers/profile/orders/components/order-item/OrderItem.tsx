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
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type OrderItemProps = {
  order: Order;
};

const OrderItem = ({ order }: OrderItemProps) => {
  const router = useRouter();

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
      [OrderStatus.PROCESSING]: (
        <CarFront className="text-neutral-600" size={20} />
      ),

      [OrderStatus.DELIVERED]: (
        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-600 flex items-center justify-center">
          <Check size="70%" className="text-white" />
        </div>
      ),
      [OrderStatus.RETURNED]: <Undo2 className="text-neutral-600" size={20} />,
      [OrderStatus.CANCELLED]: (
        <CircleX className="text-neutral-600" size={20} />
      ),
    }),
    []
  );

  const handleRedirectToOrderDetail = () => {
    router.push(`/profile/orders/${order.id}`);
  };

  return (
    <div className="border rounded-md w-full">
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <div className="py-3 md:py-4 flex flex-col gap-3 md:gap-4">
            <div className="flex items-center gap-2 px-3">
              {iconMapper[activeTab as keyof typeof iconMapper]}
              <UI_Typography className="text-neutral-800 reg14 md:med14">
                {mapper[activeTab as keyof typeof mapper]}
              </UI_Typography>
            </div>

            {/* Mobile Info Layout */}
            <div className="md:hidden flex flex-col gap-2 px-3">
              <div className="flex items-center gap-1">
                <UI_Typography className="text-neutral-500 reg12">
                  {format(new Date(order.createdAt), "d LLLL yyyy")}
                </UI_Typography>
                <Dot className="text-[#e0e0e2]" size={20} />
                <div className="flex items-center gap-1">
                  <UI_Typography className="text-neutral-400 reg12">
                    کد سفارش
                  </UI_Typography>
                  <UI_Typography className="text-neutral-700 reg12">
                    {order.id}
                  </UI_Typography>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <UI_Typography className="text-neutral-400 reg12">
                  مبلغ
                </UI_Typography>
                <Price price={order.totalAmount} className="reg12" />

                {order.profitFromDiscount && (
                  <>
                    <Dot className="text-[#e0e0e2]" size={20} />
                    <div className="flex items-center gap-1">
                      <UI_Typography className="text-neutral-400 reg12">
                        تخفیف
                      </UI_Typography>
                      <Price
                        price={order.profitFromDiscount}
                        className="reg12"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Desktop Info Layout */}
            <div className="hidden md:flex items-center gap-1 px-3">
              <UI_Typography className="text-neutral-500 reg14">
                {format(new Date(order.createdAt), "d LLLL yyyy")}
              </UI_Typography>
              <Dot className="text-[#e0e0e2]" size={30} />
              <div className="flex items-center gap-1">
                <UI_Typography className="text-neutral-400">
                  کد سفارش
                </UI_Typography>
                <UI_Typography className="text-neutral-700 reg14">
                  {order.id}
                </UI_Typography>
              </div>
              <Dot className="text-[#e0e0e2]" size={30} />
              <div className="flex items-center gap-1">
                <UI_Typography className="text-neutral-400">مبلغ</UI_Typography>
                <Price price={order.totalAmount} className="reg14" />
              </div>

              {order.profitFromDiscount ? (
                <>
                  <Dot className="text-[#e0e0e2]" size={30} />
                  <div className="flex items-center gap-1">
                    <UI_Typography className="text-neutral-400">
                      تخفیف
                    </UI_Typography>
                    <Price price={order.profitFromDiscount} className="reg14" />
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {/* images */}
          <div className="flex items-center gap-2 md:gap-4 border-t border-b py-3 md:py-4 px-3">
            {order.orderItem.map((orderItem) => (
              <Image
                key={orderItem.product.id}
                src={orderItem.product.images[0]}
                alt="product"
                width={48}
                height={48}
                className="md:w-16 md:h-16 rounded-md object-cover"
              />
            ))}
          </div>

          {/* factor */}
          <div className="flex items-center gap-1 px-3 py-3 md:py-5 justify-end">
            <div
              className="flex items-center gap-1 md:gap-2 cursor-pointer transition-all duration-200 hover:opacity-80"
              onClick={handleRedirectToOrderDetail}
            >
              <ClipboardList className="text-secondary" size={18} />
              <UI_Typography className="text-secondary reg12">
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
