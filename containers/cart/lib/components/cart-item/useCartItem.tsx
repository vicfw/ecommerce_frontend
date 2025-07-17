import { getClientSideCookie, removeClientSideCookie } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import { OrderService } from "@/services/oderService";
import {
  CreateAnonCartBody,
  CreateCartBody,
} from "@/services/types/cartService.types";
import { useGlobalStore } from "@/store/globalStore";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useMemo } from "react";

export const useCartItem = (cartItemQuantity: number) => {
  const token = getClientSideCookie("jwt");
  const queryClient = useQueryClient();
  const cartService = new CartService();
  const { handleUpdateAlertModal, handleUpdateCartLength, cartLength } =
    useGlobalStore();

  const { mutate: updateAnonCartMutation, isPending: updateAnonCartLoading } =
    useMutation({
      mutationFn: (body: CreateAnonCartBody) =>
        cartService.createOrUpdateAnonCart(body),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["get-anon-cart"] });

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

  const { mutate: updateCartMutation, isPending: updateCartLoading } =
    useMutation({
      mutationFn: (body: CreateCartBody) =>
        cartService.createOrUpdateCart(body),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["get-cart"] });

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

  const { mutate: deleteAnonCartItem, isPending: deleteAnonCartItemLoading } =
    useMutation({
      mutationFn: (cartItemId: number) =>
        cartService.deleteAnonCartItem(cartItemId),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["get-anon-cart"] });
        queryClient.invalidateQueries({ queryKey: ["anon-cart-length"] });
        // we need to remove anonCartId from cookies if it is the last item in cart
        // with this message cart 'deleted successfully' we know cart is deleted completely
        if (data.data.message === "cart deleted successfully") {
          removeClientSideCookie("anonCartId");
        }
      },
    });

  const { mutate: deleteCartItem, isPending: deleteCartItemLoading } =
    useMutation({
      mutationFn: (cartItemId: number) =>
        cartService.deleteCartItem(cartItemId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-cart"] });
        queryClient.invalidateQueries({ queryKey: ["cart-length"] });
      },
    });

  const { data: deliveryCostData } = useSuspenseQuery({
    queryKey: ["delivery-cost"],
    queryFn: () => {
      const orderService = new OrderService();
      return orderService.getDeliveryCost();
    },
    select: (data) => data.data.data,
  });

  const handleUpdateAnonCart = (body: CreateAnonCartBody) => {
    updateAnonCartMutation(body);
  };

  const handleUpdateCart = (body: CreateCartBody) => {
    updateCartMutation(body);
  };

  const handleDeleteAnonCartItem = (cartItemId: number) => {
    deleteAnonCartItem(cartItemId);
  };

  const handleDeleteCartItem = (cartItemId: number) => {
    deleteCartItem(cartItemId);
  };

  const handleIncrementOrDecrementCartItem = (
    productId: number,
    increment: boolean,
    colorImageId?: number | null
  ) => {
    if (updateCartLoading || updateAnonCartLoading) return;
    updateOrCreateCartHandler({
      productId: productId,
      increment,
      deliveryCostId: deliveryCostData.id,
      colorImageId: colorImageId ?? undefined,
    });
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
    get: { updateAnonCartLoading, deliveryCostData, updateCartLoading },
    on: {
      updateOrCreateCartHandler,
      deleteCartItemHandler,
      handleIncrementOrDecrementCartItem,
    },
  };
};
