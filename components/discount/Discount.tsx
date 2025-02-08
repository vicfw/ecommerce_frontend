import React from "react";
import UI_Typography from "../ui/typography/UI_Typography";

type DiscountProps = {
  discount: number;
};

export const Discount = (props: DiscountProps) => {
  const { discount } = props;
  return (
    <UI_Typography
      variant="Medium/Med12"
      className="bg-destructive px-2  py-1 rounded-xl text-white md:tex-base text-sm font-bold"
    >
      %{discount}
    </UI_Typography>
  );
};
