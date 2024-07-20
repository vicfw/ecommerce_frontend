"use client";

import { getClientSideCookie } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import { useQuery } from "react-query";

export const useCart = () => {
  const token = getClientSideCookie("jwt");

  const cartService = new CartService();

  const { data: anonCartData } = useQuery({
    queryKey: ["get-anon-cart"],
    queryFn: () => cartService.getAnonCart(),
    enabled: !Boolean(token),
  });

  const { data: cartData } = useQuery({
    queryKey: ["get-cart"],
    queryFn: () => cartService.getCart(),
    enabled: Boolean(token),
  });

  return {
    get: { cartData: cartData?.data.data ?? anonCartData?.data.data },
    on: {},
  };
};
