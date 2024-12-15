"use client";

import { getClientSideCookie, setClientSideCookie } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import { UserService } from "@/services/userService";
import { useGlobalStore } from "@/store/globalStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const CompositionRoot = () => {
  const token = getClientSideCookie("jwt");
  const anonCartId = getClientSideCookie("anonCartId");

  const cartService = new CartService();
  const userService = new UserService();
  const { handleUpdateCartLength, handleUpdateToken } = useGlobalStore();

  const { data: cartLengthData } = useQuery({
    queryFn: () => cartService.getCartLength(),
    queryKey: ["cart-length"],
    enabled: Boolean(token),
    select: (res) => res.data.data,
  });

  const { data: anonCartLengthData } = useQuery({
    queryFn: () => cartService.getAnonCartLength(),
    queryKey: ["anon-cart-length"],
    enabled: Boolean(anonCartId),
    select: (res) => res.data.data,
  });

  const { data: meData } = useQuery({
    queryFn: () => userService.getMe(),
    queryKey: ["me"],
    enabled: Boolean(token),
    select: (res) => res.data.data,
  });

  useEffect(() => {
    handleUpdateCartLength(cartLengthData ?? 0);
  }, [cartLengthData, ,]);

  useEffect(() => {
    handleUpdateCartLength(anonCartLengthData ?? 0);
  }, [anonCartLengthData]);

  useEffect(() => {
    if (meData) {
      setClientSideCookie("userInfo", JSON.stringify(meData));
    }
  }, [meData]);

  useEffect(() => {
    handleUpdateToken(token ?? "");
  }, [token]);

  return null;
};
