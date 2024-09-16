import { AddressService } from "@/services/addressService";
import { useGlobalStore } from "@/store/globalStore";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useShallow } from "zustand/react/shallow";

export const useShipping = () => {
  const {
    address: { openModal, openCreateModal },
    handleUpdateAddress,
    handleOpenCreateAddressModal,
  } = useGlobalStore(
    useShallow((state) => ({
      address: state.address,
      handleUpdateAddress: state.handleOpenAddressModal,
      handleOpenCreateAddressModal: state.handleOpenCreateAddressModal,
    }))
  );

  const { data: addresses, isLoading: addressLoading } = useQuery({
    queryKey: ["address"],
    queryFn: () => {
      const addressService = new AddressService();
      return addressService.getAddresses();
    },
    onSuccess: (data) => {
      if (data.data.data.length === 0) {
        handleOpenCreateAddressModal({ openCreateModal: true });
      }
    },
  });

  const defaultAddress = useMemo(() => {
    return addresses?.data.data.find((address) => address.isDefault);
  }, [addresses]);

  const handleOpenAddressModal = () => {
    handleUpdateAddress({ openModal: true });
  };

  const openCreateAddressModalHandler = () => {
    handleOpenCreateAddressModal({ openCreateModal: true });
  };

  return {
    get: {
      openModal,
      openCreateModal,
      addresses: addresses?.data.data,
      defaultAddress,
      addressLoading,
    },
    on: { handleOpenAddressModal, openCreateAddressModalHandler },
  };
};
