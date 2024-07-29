import { useGlobalStore } from "@/store/globalStore";
import { useShallow } from "zustand/react/shallow";

export const useShipping = () => {
  const {
    address: { openModal },
    handleUpdateAddress,
  } = useGlobalStore(
    useShallow((state) => ({
      address: state.address,
      handleUpdateAddress: state.handleUpdateAddress,
    }))
  );

  const handleOpenAddressModal = () => {
    handleUpdateAddress({ openModal: true });
  };

  return { get: { openModal }, on: { handleOpenAddressModal } };
};
