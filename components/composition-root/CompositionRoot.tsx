"use client";

import { getClientSideCookie } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import { useGlobalStore } from "@/store/globalStore";
import { useEffect } from "react";
import { useQuery } from "react-query";

export const CompositionRoot = () => {
  const token = getClientSideCookie("jwt");

  const cartService = new CartService();
  const { handleUpdateCartLength, handleUpdateToken } = useGlobalStore();

  useQuery({
    queryFn: () => cartService.getCartLength(),
    enabled: Boolean(token),
    onSuccess: ({ data }) => {
      handleUpdateCartLength(data.data ?? 0);
    },
  });
  useQuery({
    queryFn: () => cartService.getAnonCartLength(),
    enabled: !Boolean(token),
    onSuccess: ({ data }) => {
      handleUpdateCartLength(data.data ?? 0);
    },
  });

  useEffect(() => {
    handleUpdateToken(token ?? "");
  }, [token]);

  return null;
};
