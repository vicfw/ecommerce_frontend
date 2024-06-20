import { CartItemType, User } from "@/types/globalTypes";
import { create } from "zustand";

interface GlobalState {
  user: User | undefined;
  token: string | undefined;
  cartLength: number;
  goToCartModal: {
    open: boolean;
    data: CartItemType | undefined;
  };
  handleUpdateUser: (user: User) => void;
  handleUpdateToken: (token: string) => void;
  handleUpdateCartLength: (cartLength: number) => void;
  handleUpdateGoToCartModal: (
    state: boolean,
    data: CartItemType | undefined
  ) => void;
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  user: undefined,
  token: undefined,
  cartLength: 0,
  goToCartModal: { open: false, data: undefined },
  handleUpdateUser: (user) => set(() => ({ user })),
  handleUpdateToken: (token) => set(() => ({ token })),
  handleUpdateCartLength: (cartLength) => set(() => ({ cartLength })),
  handleUpdateGoToCartModal: (state, data) =>
    set(() => ({ goToCartModal: { open: state, data } })),
}));
