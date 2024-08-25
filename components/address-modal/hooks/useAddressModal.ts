import { useGlobalStore } from "@/store/globalStore";
import { useShallow } from "zustand/react/shallow";

export const useAddressModal = () => {
  const {
    address: { openModal, openCreateModal },
    handleOpenAddressModal,
    handleOpenCreateAddressModal,
  } = useGlobalStore(
    useShallow((state) => ({
      address: state.address,
      handleOpenAddressModal: state.handleOpenAddressModal,
      handleOpenCreateAddressModal: state.handleOpenCreateAddressModal,
    }))
  );

  const handleToggleModal = () => {
    handleOpenAddressModal({ openModal: !openModal });
  };

  const handleToggleCreateModal = () => {
    handleOpenCreateAddressModal({ openCreateModal: !openCreateModal });
    if (openModal) {
      handleToggleModal();
    }
  };

  return {
    get: { openModal },
    on: { handleToggleModal, handleToggleCreateModal },
  };
};
