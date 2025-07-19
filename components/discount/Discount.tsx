import React from "react";
import UI_Typography from "../ui/typography/UI_Typography";

type DiscountProps = {
  discount: number;
};

export const Discount = (props: DiscountProps) => {
  const { discount } = props;
  return (
    <UI_Typography className="bg-destructive px-2 rounded-xl text-white  med12">
      %{discount}
    </UI_Typography>
  );
};
