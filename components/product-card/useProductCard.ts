"use client";

import { getClientSideCookie, setClientSideCookie } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import {
  CreateAnonCartBody,
  CreateCartBody,
} from "@/services/types/cartService";
import { useGlobalStore } from "@/store/globalStore";
import { CartItemType } from "@/types/globalTypes";
import { MouseEvent } from "react";
import { useMutation } from "react-query";

export const useProductCard = () => {
  const isLoggedIn = Boolean(getClientSideCookie("jwt"));
  const cartService = new CartService();

  const { handleUpdateCartLength, handleUpdateGoToCartModal } =
    useGlobalStore();
  const { mutateAsync: addToCart } = useMutation((data: CreateCartBody) =>
    cartService.createOrUpdateCart(data)
  );

  const { mutateAsync: addToAnonCart } = useMutation(
    (data: CreateAnonCartBody) => cartService.createOrUpdateAnonCart(data)
  );

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
