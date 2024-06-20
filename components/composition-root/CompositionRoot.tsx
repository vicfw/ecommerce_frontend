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

  const { data } = useQuery({ queryFn: () => cartService.getCartLength() });

  useEffect(() => {
    handleUpdateCartLength(data?.data.data ?? 0);
    handleUpdateToken(token ?? "");
  }, [data]);

  return null;
};
