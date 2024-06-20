import { useAddToCart } from "@/hooks/useAddToCart";

export const useProductCard = () => {
  const handleAddToCart = useAddToCart();

  return { get: {}, on: { handleAddToCart } };
};
