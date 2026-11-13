"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import UI_Typography from "../ui/typography/UI_Typography";
import { useGlobalStore } from "@/store/globalStore";

type MobilePriceDetailProps = {
  cartPrice: number;
  discountPrice: number;
  profitFromDiscount?: number;
  couponAmount?: number;
  deliveryCost?: number;
  href?: string;
  onSubmit?: () => void;
  submitButtonText: string;
  loading?: boolean;
};

export const MobilePriceDetail = ({
  cartPrice,
  discountPrice,
  profitFromDiscount,
  couponAmount,
  deliveryCost,
  onSubmit,
  href,
  submitButtonText,
  loading,
}: MobilePriceDetailProps) => {
  const { cartLength } = useGlobalStore();
  const payable =
    Math.max(0, discountPrice - (couponAmount || 0)) + (deliveryCost || 0);

  const buttonContent = (
    <Button onClick={onSubmit} className="w-full" loading={loading}>
      <UI_Typography className="med14">{submitButtonText}</UI_Typography>
    </Button>
  );

  return (
    <>
      {/* Price Details Section */}
      <div className="bg-background p-4 space-y-3 border-t">
        <div className="flex justify-between items-center">
          <UI_Typography className="text-muted-foreground reg12">
            قیمت کالاها ({cartLength})
          </UI_Typography>
          <UI_Typography className="text-muted-foreground med14">
            {cartPrice.toLocaleString()} تومان
          </UI_Typography>
        </div>

        {deliveryCost ? (
          <div className="flex justify-between items-center">
            <UI_Typography className="text-muted-foreground reg12">
              هزینه ارسال
            </UI_Typography>
            <UI_Typography className="text-muted-foreground med14">
              {deliveryCost.toLocaleString()} تومان
            </UI_Typography>
          </div>
        ) : null}

        {couponAmount ? (
          <div className="flex justify-between items-center">
            <UI_Typography className="text-destructive reg12">
              کد تخفیف
            </UI_Typography>
            <UI_Typography className="text-destructive med14">
              {couponAmount.toLocaleString()}- تومان
            </UI_Typography>
          </div>
        ) : null}

        {profitFromDiscount ? (
          <div className="flex justify-between items-center">
            <UI_Typography className="text-destructive reg12">
              سود شما از خرید
            </UI_Typography>
            <UI_Typography className="text-destructive med14">
              {profitFromDiscount.toLocaleString()}- تومان
            </UI_Typography>
          </div>
        ) : null}

        <div className="flex justify-between items-center">
          <UI_Typography className="text-muted-foreground reg12">
            قابل پرداخت
          </UI_Typography>
          <UI_Typography className="text-muted-foreground med14">
            {payable.toLocaleString()} تومان
          </UI_Typography>
        </div>
      </div>

      {/* Sticky Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-50">
        {href ? <Link href={href}>{buttonContent}</Link> : buttonContent}
      </div>
    </>
  );
};
