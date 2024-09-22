"use client";

import { getClientSideCookie, getUserInfoFromCookies } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import { useQuery } from "react-query";

export const useCart = () => {
  const token = getClientSideCookie("jwt");
  const userInfo = getUserInfoFromCookies();

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

  const confirmCartHref =
    token && userInfo?.name && userInfo.lastName
      ? "/shipping"
      : !userInfo?.name && !userInfo?.lastName && token
      ? "/profile/personal-info?identificationForm=true&redirectUrl=/shipping"
      : "register";

  return {
    get: {
      cartData: cartData?.data.data ?? anonCartData?.data.data,
      confirmCartHref,
    },
    on: {},
  };
};
