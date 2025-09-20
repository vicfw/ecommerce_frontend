"use client";

import { useGlobalStore } from "@/store/globalStore";
import { useShallow } from "zustand/react/shallow";
import React from "react";

const CartLength = () => {
  const { cartLength } = useGlobalStore(
    useShallow((state) => ({
      cartLength: state.cartLength,
    }))
  );

  return (
    <div className="absolute bottom-[-1px] bg-destructive rounded-md md:w-[17px] md:h-[17px] w-2 h-2 flex justify-center items-center p-2">
      <span className="text-[11px] text-white">{cartLength}</span>
    </div>
  );
};

export default CartLength;
