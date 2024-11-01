import { getClientSideCookie } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import { CreateAnonCartBody } from "@/services/types/cartService.types";
import { useGlobalStore } from "@/store/globalStore";
import { AxiosError } from "axios";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "react-query";

export const useCartItem = (cartItemQuantity: number) => {
  const token = getClientSideCookie("jwt");
  const queryClient = useQueryClient();
  const cartService = new CartService();
  const { handleUpdateAlertModal, handleUpdateCartLength, cartLength } =
    useGlobalStore();

  const { mutate: updateAnonCartMutation, isLoading: updateAnonCartLoading } =
    useMutation({
      mutationFn: (body: CreateAnonCartBody) =>
        cartService.createOrUpdateAnonCart(body),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: "get-anon-cart" });

        handleUpdateCartLength(
          variables.increment ? cartLength + 1 : cartLength - 1
        );
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          const { cause } = error.response?.data;
          if (cause === "quantity limit") {
            handleUpdateAlertModal(
              true,
              `موجودی از این محصول ${cartItemQuantity} عدد میباشد. `
            );
          }
        }
      },
    });

  const { mutate: updateCartMutation, isLoading: updateCartLoading } =
    useMutation({
      mutationFn: (body: CreateAnonCartBody) =>
        cartService.createOrUpdateCart(body),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: "get-cart" });

        handleUpdateCartLength(
          variables.increment ? cartLength + 1 : cartLength - 1
        );
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          const { cause } = error.response?.data;
          if (cause === "quantity limit") {
            handleUpdateAlertModal(
              true,
              `موجودی از این محصول ${cartItemQuantity} عدد میباشد. `
            );
          }
        }
      },
    });

  const { mutate: deleteAnonCartItem, isLoading: deleteAnonCartItemLoading } =
    useMutation({
      mutationFn: (cartItemId: number) =>
        cartService.deleteAnonCartItem(cartItemId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: "get-anon-cart" });
        queryClient.invalidateQueries({ queryKey: "anon-cart-length" });
      },
    });

  const { mutate: deleteCartItem, isLoading: deleteCartItemLoading } =
    useMutation({
      mutationFn: (cartItemId: number) =>
        cartService.deleteCartItem(cartItemId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: "get-cart" });
        queryClient.invalidateQueries({ queryKey: "cart-length" });
      },
    });

  const handleUpdateAnonCart = (body: CreateAnonCartBody) => {
    updateAnonCartMutation(body);
  };

  const handleUpdateCart = (body: CreateAnonCartBody) => {
    updateCartMutation(body);
  };

  const handleDeleteAnonCartItem = (cartItemId: number) => {
    deleteAnonCartItem(cartItemId);
  };

  const handleDeleteCartItem = (cartItemId: number) => {
    deleteCartItem(cartItemId);
  };

  const deleteCartItemHandler = useMemo(
    () => (token ? handleDeleteCartItem : handleDeleteAnonCartItem),
    [token]
  );

  const updateOrCreateCartHandler = useMemo(
    () => (token ? handleUpdateCart : handleUpdateAnonCart),
    [token]
  );

  return {
    get: { updateAnonCartLoading },
    on: {
      updateOrCreateCartHandler,
      deleteCartItemHandler,
    },
  };
};
