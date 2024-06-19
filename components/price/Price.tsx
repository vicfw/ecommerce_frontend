import React from "react";
import UI_Typography, { variantClasses } from "../ui/typography/UI_Typography";

type PriceProps = {
  price: number;
  variant: keyof typeof variantClasses;
};

export const Price = (props: PriceProps) => {
  const { price, variant } = props;
  return (
    <div className="flex gap-1 items-center">
      <UI_Typography variant={variant}>{price.toLocaleString()}</UI_Typography>
      <UI_Typography variant="Regular/Reg12">تومان</UI_Typography>
    </div>
  );
};
