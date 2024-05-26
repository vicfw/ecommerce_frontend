import { useGlobalStore } from "@/store/globalStore";

export const useHeader = () => {
  const { token } = useGlobalStore();
  return { get: { token }, on: {} };
};
