import { getClientSideCookie, setClientSideCookie } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import { OrderService } from "@/services/oderService";
import {
  CreateAnonCartBody,
  CreateCartBody,
} from "@/services/types/cartService.types";
import { useGlobalStore } from "@/store/globalStore";
import { CartItemType, ColorImage, Product } from "@/types/globalTypes";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useProductDetailStore } from "./store/ProductDetailStore";
import { useSearchParams, useRouter } from "next/navigation";

const cartService = new CartService();

export const useProductDetail = (product: Product) => {
  const { setProductId } = useProductDetailStore();
  const isLoggedIn = Boolean(getClientSideCookie("jwt"));
  const searchParams = useSearchParams();
  const router = useRouter();
  const [productImages, setProductImages] = useState<string[]>(() => {
    const colorImageId = searchParams.get("ci");
    if (colorImageId && product.colorImages) {
      const selectedColorImage = product.colorImages.find(
        (ci) => ci.id === parseInt(colorImageId)
      );
      return selectedColorImage?.images || product.images;
    }
    return product.images;
  });

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
      const colorImageId = searchParams.get("ci");
      const { data } = await addToCart({
        increment: true,
        productId,
        deliveryCostId: deliveryCostData.id,
        colorImageId: colorImageId ? parseInt(colorImageId) : undefined,
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
    const colorImageId = searchParams.get("ci");

    const { data } = await addToAnonCart({
      increment: true,
      productId,
      deliveryCostId: deliveryCostData.id,
      colorImageId: colorImageId ? parseInt(colorImageId) : undefined,
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

  const handleClickOnColorImage = (
    colorImages: string[],
    colorImageId: number
  ) => {
    setProductImages(colorImages);
    const params = new URLSearchParams(searchParams.toString());
    params.set("ci", colorImageId.toString());
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    if (product.id) {
      setProductId(product.id);
    }
  }, [product.id]);

  return {
    on: { handleClickOnAddToCartButton, handleClickOnColorImage },
    get: { addToAnonCartIsPending, addToCartIsPending, productImages },
  };
};
