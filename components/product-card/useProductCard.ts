"use client";

import { getClientSideCookie, setClientSideCookie } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import {
  CreateAnonCartBody,
  CreateCartBody,
} from "@/services/types/cartService.types";
import { useGlobalStore } from "@/store/globalStore";
import { CartItemType } from "@/types/globalTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MouseEvent } from "react";

const cartService = new CartService();

export const useProductCard = () => {
  const isLoggedIn = Boolean(getClientSideCookie("jwt"));

  const queryClient = useQueryClient();

  const {
    handleUpdateCartLength,
    handleUpdateGoToCartModal,
    handleUpdateAlertModal,
  } = useGlobalStore();

  const { mutateAsync: addToCart } = useMutation({
    mutationFn: (data: CreateCartBody) => cartService.createOrUpdateCart(data),
    onError: (err: unknown) => {
      if (err instanceof AxiosError) {
        const { cause } = err.response?.data;
        if (cause === "quantity limit") {
          handleUpdateAlertModal(true, "موجودی این محصول تمام شده است .");
        }
      }
    },
  });

  const { mutateAsync: addToAnonCart } = useMutation({
    mutationFn: (data: CreateAnonCartBody) =>
      cartService.createOrUpdateAnonCart(data),
    onError: (err: unknown) => {
      if (err instanceof AxiosError) {
        const { cause } = err.response?.data;
        if (cause === "quantity limit") {
          handleUpdateAlertModal(true, "موجودی این محصول تمام شده است .");
        }
      }
    },
  });

  // util functions
  const findCart = (
    cartItems: CartItemType[],
    productId: number
  ): CartItemType | undefined => {
    return cartItems.find((cartItem) => cartItem.product.id === productId);
  };

  const sumCartItemQuantity = (cartItems: CartItemType[]): number => {
    return cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0) ?? 0;
  };

  // http handlers
  const handleAddToCart = async (productId: number) => {
    try {
      const { data } = await addToCart({ increment: true, productId });
      // invalidate cart

      queryClient.invalidateQueries({ queryKey: ["get-cart"] });

      const cartItems = data.data.cartItems;
      const cart = findCart(cartItems, productId);
      const cartLength = sumCartItemQuantity(cartItems);

      // store
      handleUpdateCartLength(cartLength);
      handleUpdateGoToCartModal(true, cart);
    } catch (e) {}
  };

  const handleAddToAnonCart = async (productId: number) => {
    const uuid = getClientSideCookie("uuid");

    const { data } = await addToAnonCart({
      increment: true,
      productId,
    });

    queryClient.invalidateQueries({ queryKey: ["get-anon-cart"] });

    const cartItems = data.data.cartItems;
    if (!uuid) {
      setClientSideCookie("uuid", data.data.id);
    }
    const cart = findCart(cartItems, productId);
    const cartLength = sumCartItemQuantity(cartItems);

    handleUpdateCartLength(cartLength);
    handleUpdateGoToCartModal(true, cart);
  };

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
