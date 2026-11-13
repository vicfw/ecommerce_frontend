"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import UI_Typography from "../ui/typography/UI_Typography";
import { useGlobalStore } from "@/store/globalStore";

type PriceDetailAsideProps = {
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

export const PriceDetailAside = ({
  cartPrice,
  discountPrice,
  profitFromDiscount,
  couponAmount,
  deliveryCost,
  onSubmit,
  href,
  submitButtonText,
  loading,
}: PriceDetailAsideProps) => {
  const { cartLength } = useGlobalStore();
  const payable =
    Math.max(0, discountPrice - (couponAmount || 0)) + (deliveryCost || 0);

  const buttonContent = (
    <Button onClick={onSubmit} loading={loading}>
      <UI_Typography variant="Medium/Med14">{submitButtonText}</UI_Typography>
    </Button>
  );

  return (
    <aside className="border border-border rounded-md w-[300px] px-[20px] py-[10px] flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <UI_Typography className="text-muted-foreground" variant="Regular/Reg12">
          قیمت کالاها ({cartLength})
        </UI_Typography>
        <UI_Typography variant="Medium/Med14" className="text-muted-foreground">
          {cartPrice.toLocaleString()} تومان
        </UI_Typography>
      </div>

      {deliveryCost ? (
        <div className="flex justify-between items-center">
          <UI_Typography className="text-muted-foreground" variant="Regular/Reg12">
            هزینه ارسال
          </UI_Typography>
          <UI_Typography variant="Medium/Med14" className="text-muted-foreground">
            {deliveryCost.toLocaleString()} تومان
          </UI_Typography>
        </div>
      ) : null}

      {couponAmount ? (
        <div className="flex justify-between items-center">
          <UI_Typography className="text-destructive" variant="Regular/Reg12">
            کد تخفیف
          </UI_Typography>
          <UI_Typography variant="Medium/Med14" className="text-destructive">
            {couponAmount.toLocaleString()}- تومان
          </UI_Typography>
        </div>
      ) : null}

      {profitFromDiscount ? (
        <div className="flex justify-between items-center">
          <UI_Typography className="text-destructive" variant="Regular/Reg12">
            سود شما از خرید
          </UI_Typography>
          <UI_Typography variant="Medium/Med14" className="text-destructive">
            {profitFromDiscount.toLocaleString()}- تومان
          </UI_Typography>
        </div>
      ) : null}

      <div className="flex justify-between items-center">
        <UI_Typography className="text-muted-foreground" variant="Regular/Reg12">
          قابل پرداخت
        </UI_Typography>
        <UI_Typography variant="Medium/Med14" className="text-muted-foreground">
          {payable.toLocaleString()} تومان
        </UI_Typography>
      </div>

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
