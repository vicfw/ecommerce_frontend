"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import UI_Typography from "../ui/typography/UI_Typography";
import { useGlobalStore } from "@/store/globalStore";

type MobilePriceDetailProps = {
  cartPrice: number;
  discountPrice: number;
  profitFromDiscount?: number;
  deliveryCost?: number;
  href?: string;
  onSubmit?: () => void;
  submitButtonText: string;
};

export const MobilePriceDetail = ({
  cartPrice,
  discountPrice,
  profitFromDiscount,
  deliveryCost,
  onSubmit,
  href,
  submitButtonText,
}: MobilePriceDetailProps) => {
  const { cartLength } = useGlobalStore();

  const buttonContent = (
    <Button onClick={onSubmit} className="w-full">
      <UI_Typography className="med14">{submitButtonText}</UI_Typography>
    </Button>
  );

  return (
    <>
      {/* Price Details Section */}
      <div className="bg-white p-4 space-y-3 border-t">
        <div className="flex justify-between items-center">
          <UI_Typography className="text-neutral-600 reg12">
            قیمت کالاها ({cartLength})
          </UI_Typography>
          <UI_Typography className="text-neutral-600 med14">
            {cartPrice.toLocaleString()} تومان
          </UI_Typography>
        </div>

        {deliveryCost ? (
          <div className="flex justify-between items-center">
            <UI_Typography className="text-neutral-600 reg12">
              هزینه ارسال
            </UI_Typography>
            <UI_Typography className="text-neutral-600 med14">
              {deliveryCost.toLocaleString()} تومان
            </UI_Typography>
          </div>
        ) : null}

        <div className="flex justify-between items-center">
          <UI_Typography className="text-neutral-600 reg12">
            قابل پرداخت
          </UI_Typography>
          <UI_Typography className="text-neutral-600 med14">
            {(discountPrice + (deliveryCost || 0)).toLocaleString()} تومان
          </UI_Typography>
        </div>

        {profitFromDiscount ? (
          <div className="flex justify-between items-center">
            <UI_Typography className="text-destructive reg12">
              سود شما از خرید
            </UI_Typography>
            <UI_Typography className="text-destructive med14">
              {profitFromDiscount.toLocaleString()} تومان
            </UI_Typography>
          </div>
        ) : null}

        {deliveryCost ? (
          <div className="flex justify-center items-center">
            <UI_Typography className="text-destructive med14">
              ارسال در 2 روز کاری
            </UI_Typography>
          </div>
        ) : null}
      </div>

      {/* Sticky Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        {href ? <Link href={href}>{buttonContent}</Link> : buttonContent}
      </div>
    </>
  );
};
