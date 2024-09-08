"use client";

import { getClientSideCookie, setClientSideCookie } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import { UserService } from "@/services/userService";
import { useGlobalStore } from "@/store/globalStore";
import { useEffect } from "react";
import { useQuery } from "react-query";

export const CompositionRoot = () => {
  const token = getClientSideCookie("jwt");
  const uuid = getClientSideCookie("uuid");

  const cartService = new CartService();
  const userService = new UserService();
  const { handleUpdateCartLength, handleUpdateToken } = useGlobalStore();

  useQuery({
    queryFn: () => cartService.getCartLength(),
    queryKey: ["cart-length"],
    enabled: Boolean(token),
    onSuccess: ({ data }) => {
      handleUpdateCartLength(data.data ?? 0);
    },
  });

  useQuery({
    queryFn: () => cartService.getAnonCartLength(),
    queryKey: ["anon-cart-length"],
    enabled: Boolean(uuid),
    onSuccess: ({ data }) => {
      handleUpdateCartLength(data.data ?? 0);
    },
  });

  useQuery({
    queryFn: () => userService.getMe(),
    queryKey: ["me"],
    enabled: Boolean(token),
    onSuccess: ({ data }) => {
      setClientSideCookie("userInfo", JSON.stringify(data.data));
    },
  });

  useEffect(() => {
    handleUpdateToken(token ?? "");
  }, [token]);

  return null;
};
