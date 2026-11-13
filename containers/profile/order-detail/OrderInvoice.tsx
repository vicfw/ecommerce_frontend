"use client";

import { Button } from "@/components/ui/button";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Order, User } from "@/types/globalTypes";
import { format } from "date-fns-jalali";

type OrderInvoiceProps = {
  order: Order & {
    address: { address: string };
    user: User;
  };
  onClose: () => void;
};

export const OrderInvoice = ({ order, onClose }: OrderInvoiceProps) => {
  const couponAmount = Number(order.couponAmount) || 0;
  const deliveryAmount = Number(order.deliveryAmount) || 0;
  const productDiscount = Number(order.profitFromDiscount) || 0;
  const payable =
    Math.max(0, (Number(order.totalAmount) || 0) - couponAmount) +
    deliveryAmount;

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-auto p-4 md:p-8">
      <div className="no-print mb-4 flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onClose}>
          بستن
        </Button>
        <Button
          type="button"
          data-testid="order-invoice-print"
          onClick={() => window.print()}
        >
          چاپ
        </Button>
      </div>

      <div
        id="order-invoice"
        data-testid="order-invoice"
        className="mx-auto max-w-lg flex flex-col gap-4 text-foreground"
      >
        <UI_Typography className="med16">فاکتور سفارش</UI_Typography>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <UI_Typography className="text-muted-foreground reg12">
              شماره سفارش
            </UI_Typography>
            <UI_Typography className="reg12" data-testid="order-invoice-id">
              {order.id}
            </UI_Typography>
          </div>
          {order.createdAt && (
            <div className="flex justify-between gap-2">
              <UI_Typography className="text-muted-foreground reg12">
                تاریخ
              </UI_Typography>
              <UI_Typography className="reg12">
                {format(new Date(order.createdAt), "d LLLL yyyy")}
              </UI_Typography>
            </div>
          )}
          <div className="flex justify-between gap-2">
            <UI_Typography className="text-muted-foreground reg12">
              تحویل گیرنده
            </UI_Typography>
            <UI_Typography className="reg12">
              {order.user.name} {order.user.lastName}
            </UI_Typography>
          </div>
          <div className="flex flex-col gap-1">
            <UI_Typography className="text-muted-foreground reg12">
              آدرس
            </UI_Typography>
            <UI_Typography className="reg12">{order.address.address}</UI_Typography>
          </div>
        </div>

        <div className="border-t border-border pt-3 flex flex-col gap-3">
          {order.orderItem.map((item) => (
            <div key={item.id} className="flex justify-between gap-2">
              <UI_Typography className="reg12">
                {item.product.prName} × {item.quantity}
              </UI_Typography>
              <UI_Typography className="reg12">
                {Number(item.itemPrice).toLocaleString()} تومان
              </UI_Typography>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-3 flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <UI_Typography className="text-muted-foreground reg12">
              مبلغ کالاها
            </UI_Typography>
            <UI_Typography className="reg12">
              {Number(order.totalAmount).toLocaleString()} تومان
            </UI_Typography>
          </div>
          {productDiscount > 0 ? (
            <div className="flex justify-between gap-2">
              <UI_Typography className="text-muted-foreground reg12">
                تخفیف کالا
              </UI_Typography>
              <UI_Typography className="reg12">
                {productDiscount.toLocaleString()}- تومان
              </UI_Typography>
            </div>
          ) : null}
          {couponAmount > 0 ? (
            <div className="flex justify-between gap-2">
              <UI_Typography className="text-muted-foreground reg12">
                کد تخفیف{order.couponCode ? ` (${order.couponCode})` : ""}
              </UI_Typography>
              <UI_Typography className="reg12">
                {couponAmount.toLocaleString()}- تومان
              </UI_Typography>
            </div>
          ) : null}
          <div className="flex justify-between gap-2">
            <UI_Typography className="text-muted-foreground reg12">
              هزینه ارسال
            </UI_Typography>
            <UI_Typography className="reg12">
              {deliveryAmount.toLocaleString()} تومان
            </UI_Typography>
          </div>
          <div className="flex justify-between gap-2 border-t border-border pt-2">
            <UI_Typography className="med14">قابل پرداخت</UI_Typography>
            <UI_Typography
              className="med14"
              data-testid="order-invoice-total"
            >
              {payable.toLocaleString()} تومان
            </UI_Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
