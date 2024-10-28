"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import UI_Typography from "../ui/typography/UI_Typography";
import { useGlobalStore } from "@/store/globalStore";

type PriceDetailAsideProps = {
  cartPrice: number;
  discountPrice: number;
  profitFromDiscount?: number;
  deliveryCost?: number;
  href?: string;
  onSubmit?: () => void;
  submitButtonText: string;
};

export const PriceDetailAside = ({
  cartPrice,
  discountPrice,
  profitFromDiscount,
  deliveryCost,
  onSubmit,
  href,
  submitButtonText,
}: PriceDetailAsideProps) => {
  const { cartLength } = useGlobalStore();

  const buttonContent = (
    <Button onClick={onSubmit}>
      <UI_Typography variant="Medium/Med14">{submitButtonText}</UI_Typography>
    </Button>
  );

  return (
    <aside className="border border-neutral-200 rounded-md w-[300px] px-[20px] py-[10px] flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <UI_Typography className="text-neutral-600" variant="Regular/Reg12">
          قیمت کالاها ({cartLength})
        </UI_Typography>
        <UI_Typography variant="Medium/Med14" className="text-neutral-600">
          {cartPrice.toLocaleString()} تومان
        </UI_Typography>
      </div>

      {deliveryCost ? (
        <div className="flex justify-between items-center">
          <UI_Typography className="text-neutral-600" variant="Regular/Reg12">
            هزینه ارسال
          </UI_Typography>
          <UI_Typography variant="Medium/Med14" className="text-neutral-600">
            {deliveryCost.toLocaleString()} تومان
          </UI_Typography>
        </div>
      ) : null}

      <div className="flex justify-between items-center">
        <UI_Typography className="text-neutral-600" variant="Regular/Reg12">
          قابل پرداخت
        </UI_Typography>
        <UI_Typography variant="Medium/Med14" className="text-neutral-600">
          {(discountPrice + (deliveryCost || 0)).toLocaleString()} تومان
        </UI_Typography>
      </div>

      {profitFromDiscount ? (
        <div className="flex justify-between items-center">
          <UI_Typography className="text-destructive" variant="Regular/Reg12">
            سود شما از خرید
          </UI_Typography>
          <UI_Typography variant="Medium/Med14" className="text-destructive">
            {/* (28%) */} {profitFromDiscount.toLocaleString()} تومان
          </UI_Typography>
        </div>
      ) : null}

      {deliveryCost ? (
        <div className="flex justify-center items-center">
          <UI_Typography className="text-destructive" variant="Medium/Med14">
            ارسال در 2 روز کاری
          </UI_Typography>
        </div>
      ) : null}

      {href ? <Link href={href}>{buttonContent}</Link> : buttonContent}
    </aside>
  );
};
