"use client";

import { CartService } from "@/services/cartService";
import { CreateCartBody } from "@/services/types/cartService";
import { useGlobalStore } from "@/store/globalStore";
import { useMutation } from "react-query";

export const useAddToCart = () => {
  const cartService = new CartService();
  const { handleUpdateCartLength, handleUpdateGoToCartModal } =
    useGlobalStore();
  const { mutateAsync: addToCart } = useMutation((data: CreateCartBody) =>
    cartService.createOrUpdateCart(data)
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

  return handleAddToCart;
};
