import { useGlobalStore } from "@/store/globalStore";
import { useShallow } from "zustand/react/shallow";

export const useCreateAddressModal = () => {
  const {
    address: { openCreateModal },
    handleOpenCreateAddressModal,
  } = useGlobalStore(
    useShallow((state) => ({
      address: state.address,
      handleOpenCreateAddressModal: state.handleOpenCreateAddressModal,
    }))
  );

  const handleToggleCreateModal = () => {
    handleOpenCreateAddressModal({ openCreateModal: !openCreateModal });
  };

  return { get: { openCreateModal }, on: { handleToggleCreateModal } };
};
