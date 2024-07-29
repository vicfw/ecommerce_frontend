import { useGlobalStore } from "@/store/globalStore";
import { useShallow } from "zustand/react/shallow";

export const useAddressModal = () => {
  const {
    address: { openModal },
    handleUpdateAddress,
  } = useGlobalStore(
    useShallow((state) => ({
      address: state.address,
      handleUpdateAddress: state.handleUpdateAddress,
    }))
  );

  const handleToggleModal = () => {
    handleUpdateAddress({ openModal: !openModal });
  };

  return { get: { openModal }, on: { handleToggleModal } };
};
