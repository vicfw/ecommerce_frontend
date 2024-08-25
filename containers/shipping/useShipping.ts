import { useGlobalStore } from "@/store/globalStore";
import { useShallow } from "zustand/react/shallow";

export const useShipping = () => {
  const {
    address: { openModal, openCreateModal },
    handleUpdateAddress,
  } = useGlobalStore(
    useShallow((state) => ({
      address: state.address,
      handleUpdateAddress: state.handleOpenAddressModal,
    }))
  );

  const handleOpenAddressModal = () => {
    handleUpdateAddress({ openModal: true });
  };

  return {
    get: { openModal, openCreateModal },
    on: { handleOpenAddressModal },
  };
};
