"use client";

import { useAddToCart } from "@/hooks/useAddToCart";
import { getClientSideCookie } from "@/lib/utils";
import { MouseEvent } from "react";

export const useProductCard = () => {
  const { handleAddToAnonCart, handleAddToCart } = useAddToCart();
  const isLoggedIn = Boolean(getClientSideCookie("jwt"));

  const handleClickOnAddToCartButton = (
    e: MouseEvent<HTMLButtonElement>,
    productId: number
  ) => {
    if (isLoggedIn) {
      handleAddToCart(productId);
    } else {
      handleAddToAnonCart(productId);
    }
  };

  return { get: {}, on: { handleClickOnAddToCartButton } };
};
