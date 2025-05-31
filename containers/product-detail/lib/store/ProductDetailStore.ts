import { create } from "zustand";

interface ProductDetailState {
  productId: number | null;
  setProductId: (id: number) => void;
  resetProductId: () => void;
}

export const useProductDetailStore = create<ProductDetailState>((set) => ({
  productId: null,
  setProductId: (id: number) => set({ productId: id }),
  resetProductId: () => set({ productId: null }),
}));
