import { getClientSideCookie, setClientSideCookie } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import { OrderService } from "@/services/oderService";
import {
  CreateAnonCartBody,
  CreateCartBody,
} from "@/services/types/cartService.types";
import { useGlobalStore } from "@/store/globalStore";
import { CartItemType } from "@/types/globalTypes";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useProductDetailStore } from "./store/ProductDetailStore";

const cartService = new CartService();

export const useProductDetail = (productId: number) => {
  const { setProductId } = useProductDetailStore();
  const isLoggedIn = Boolean(getClientSideCookie("jwt"));

  const queryClient = useQueryClient();

  const {
    handleUpdateCartLength,
    handleUpdateGoToCartModal,
    handleUpdateAlertModal,
  } = useGlobalStore();

  const { mutateAsync: addToCart, isPending: addToCartIsPending } = useMutation(
    {
      mutationFn: (data: CreateCartBody) =>
        cartService.createOrUpdateCart(data),
      onError: (err: unknown) => {
        if (err instanceof AxiosError) {
          const { cause } = err.response?.data;
          if (cause === "quantity limit") {
            handleUpdateAlertModal(true, "موجودی این محصول تمام شده است .");
          }
        }
      },
    }
  );

  const { mutateAsync: addToAnonCart, isPending: addToAnonCartIsPending } =
    useMutation({
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

  const { data: deliveryCostData } = useSuspenseQuery({
    queryKey: ["delivery-cost"],
    queryFn: () => {
      const orderService = new OrderService();
      return orderService.getDeliveryCost();
    },
    select: (data) => data.data.data,
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
      const { data } = await addToCart({
        increment: true,
        productId,
        deliveryCostId: deliveryCostData.id,
      });
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
    const anonCartId = getClientSideCookie("anonCartId");

    const { data } = await addToAnonCart({
      increment: true,
      productId,
      deliveryCostId: deliveryCostData.id,
    });

    queryClient.invalidateQueries({ queryKey: ["get-anon-cart"] });

    const cartItems = data.data.cartItems;
    if (!anonCartId) {
      setClientSideCookie("anonCartId", data.data.id);
    }
    const cart = findCart(cartItems, productId);
    const cartLength = sumCartItemQuantity(cartItems);

    handleUpdateCartLength(cartLength);
    handleUpdateGoToCartModal(true, cart);
  };

  const handleClickOnAddToCartButton = (productId: number) => {
    if (isLoggedIn) {
      handleAddToCart(productId);
    } else {
      handleAddToAnonCart(productId);
    }
  };

  useEffect(() => {
    if (productId) {
      setProductId(productId);
    }
  }, [productId]);

  return {
    on: { handleClickOnAddToCartButton },
    get: { addToAnonCartIsPending, addToCartIsPending },
  };
};
