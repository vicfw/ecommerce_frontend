import React from "react";
import UI_Typography, { variantClasses } from "../ui/typography/UI_Typography";
import { calculateDiscountedPrice } from "@/lib/utils";

type PriceProps = {
  price: number;
  variant: keyof typeof variantClasses;
  discount?: number;
};

export const Price = (props: PriceProps) => {
  const { price, variant, discount } = props;
  return (
    <div className="flex gap-1 items-center">
      <UI_Typography variant={variant}>
        {discount
          ? calculateDiscountedPrice(price, discount)
          : price.toLocaleString()}
      </UI_Typography>
      <UI_Typography variant="Regular/Reg12">تومان</UI_Typography>
    </div>
  );
};
