import { CartItemType, User } from "@/types/globalTypes";
import { create } from "zustand";

interface GlobalState {
  openSidebar: boolean;
  user: User | undefined;
  token: string | undefined;
  cartLength: number;
  goToCartModal: {
    open: boolean;
    data: CartItemType | undefined;
  };
  alertModal: {
    text: string;
    open: boolean;
  };
  addCommentModal: {
    open: boolean;
  };
  handleOpenSidebar: () => void;
  handleUpdateUser: (user: User) => void;
  handleUpdateToken: (token: string) => void;
  handleUpdateCartLength: (cartLength: number) => void;
  handleUpdateGoToCartModal: (
    state: boolean,
    data: CartItemType | undefined
  ) => void;
  handleUpdateAlertModal: (state: boolean, text: string) => void;
  handleUpdateAddCommentModal: (state: boolean) => void;
  // Address
  address: {
    openModal: boolean;
    openCreateModal: boolean;
  };

  handleOpenAddressModal: ({ openModal }: { openModal: boolean }) => void;
  handleOpenCreateAddressModal: ({
    openCreateModal,
  }: {
    openCreateModal: boolean;
  }) => void;
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  user: undefined,
  openSidebar: false,
  token: undefined,
  cartLength: 0,
  goToCartModal: { open: false, data: undefined },
  alertModal: { open: false, text: "" },
  addCommentModal: { open: false },
  handleOpenSidebar: () =>
    set((state) => ({ openSidebar: !state.openSidebar })),
  handleUpdateUser: (user) => set(() => ({ user })),
  handleUpdateToken: (token) => set(() => ({ token })),
  handleUpdateCartLength: (cartLength) => set(() => ({ cartLength })),
  handleUpdateGoToCartModal: (state, data) =>
    set(() => ({ goToCartModal: { open: state, data } })),
  handleUpdateAlertModal: (state, text) =>
    set(() => ({ alertModal: { open: state, text } })),
  handleUpdateAddCommentModal: (state) =>
    set(() => ({ addCommentModal: { open: state } })),
  // Address
  address: {
    openModal: false,
    openCreateModal: false,
  },
  handleOpenAddressModal: ({ openModal }: { openModal: boolean }) =>
    set((state) => ({
      address: {
        ...state.address,
        openModal,
      },
    })),
  handleOpenCreateAddressModal: ({
    openCreateModal,
  }: {
    openCreateModal: boolean;
  }) =>
    set((state) => ({
      address: {
        ...state.address,
        openCreateModal,
      },
    })),
}));
