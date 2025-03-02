import React from "react";
import UI_Typography from "../ui/typography/UI_Typography";
import { calculateDiscountedPrice } from "@/lib/utils";

type PriceProps = {
  price: number;
  discount?: number;
  className: string;
};

export const Price = (props: PriceProps) => {
  const { price, discount, className } = props;

  return (
    <div className="flex gap-1 items-center">
      <UI_Typography className={className}>
        {discount
          ? calculateDiscountedPrice(price, discount)
          : price.toLocaleString()}
      </UI_Typography>
      <UI_Typography className="text-base mdd:text-lg">تومان</UI_Typography>
    </div>
  );
};
