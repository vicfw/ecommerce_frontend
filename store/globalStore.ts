import { User } from "@/types/globalTypes";
import { create } from "zustand";

interface GlobalState {
  user: User | undefined;
  token: string | undefined;
  handleUpdateUser: (user: User) => void;
  handleUpdateToken: (token: string) => void;
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  user: undefined,
  token: undefined,
  handleUpdateUser: (user) => set(() => ({ user })),
  handleUpdateToken: (token) => set(() => ({ token })),
}));
