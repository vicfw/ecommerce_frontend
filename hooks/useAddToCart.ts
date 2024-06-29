"use client";

import { getClientSideCookie, setClientSideCookie } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import {
  CreateAnonCartBody,
  CreateCartBody,
} from "@/services/types/cartService";
import { useGlobalStore } from "@/store/globalStore";
import { useMutation } from "react-query";

export const useAddToCart = () => {
  const cartService = new CartService();

  const { handleUpdateCartLength, handleUpdateGoToCartModal } =
    useGlobalStore();
  const { mutateAsync: addToCart } = useMutation((data: CreateCartBody) =>
    cartService.createOrUpdateCart(data)
  );

  const { mutateAsync: addToAnonCart } = useMutation(
    (data: CreateAnonCartBody) => cartService.createOrUpdateAnonCart(data)
  );

  const handleAddToCart = async (productId: number) => {
    try {
      const { data } = await addToCart({ quantity: 1, productId });
      const product = data.data.cartItems.find(
        (cartItem) => cartItem.product.id === productId
      );
      handleUpdateCartLength(data.data.cartItems.length);
      handleUpdateGoToCartModal(true, product);
    } catch (e) {}
  };

  const handleAddToAnonCart = async (productId: number) => {
    const uuid = getClientSideCookie("uuid");

    const { data } = await addToAnonCart({
      quantity: 1,
      productId,
      uuid,
    });
    if (!uuid) {
      setClientSideCookie("uuid", data.data.id);
    }
    const product = data.data.cartItems.find(
      (cartItem) => cartItem.product.id === productId
    );
    handleUpdateCartLength(data.data.cartItems.length);
    handleUpdateGoToCartModal(true, product);
  };

  return { handleAddToCart, handleAddToAnonCart };
};
