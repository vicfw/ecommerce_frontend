"use client";

import { getClientSideCookie } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

export const useCart = () => {
  const token = getClientSideCookie("jwt");
  const router = useRouter();

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

  const handleConfirmCart = () => {
    router.push("/shipping");
  };

  const handleConfirmAnonCart = () => {
    router.push("/register");
  };

  const onConfirmCart = () => {
    token ? handleConfirmCart() : handleConfirmAnonCart();
  };

  return {
    get: { cartData: cartData?.data.data ?? anonCartData?.data.data },
    on: { onConfirmCart },
  };
};
