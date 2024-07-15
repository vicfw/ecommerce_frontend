import { CartService } from "@/services/cartService";
import { CreateAnonCartBody } from "@/services/types/cartService";
import { useMutation, useQueryClient } from "react-query";

export const useCartItem = () => {
  const queryClient = useQueryClient();
  const cartService = new CartService();

  const { mutate: updateAnonCartMutation, isLoading: updateAnonCartLoading } =
    useMutation({
      mutationFn: (body: CreateAnonCartBody) =>
        cartService.createOrUpdateAnonCart(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: "get-anon-cart" });
        queryClient.invalidateQueries({ queryKey: "anon-cart-length" });
      },
    });

  const handleUpdateCart = (body: CreateAnonCartBody) => {
    updateAnonCartMutation(body);
  };

  return { get: { updateAnonCartLoading }, on: { handleUpdateCart } };
};
