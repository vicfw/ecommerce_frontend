import { getClientSideCookie } from "@/lib/utils";
import { AddressService } from "@/services/addressService";
import { CartService } from "@/services/cartService";
import { OrderService } from "@/services/oderService";
import { useGlobalStore } from "@/store/globalStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

export const useShipping = () => {
  const token = getClientSideCookie("jwt");

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

    select: (data) => data.data.data,
  });

  const { data: cartData } = useQuery({
    queryKey: ["get-cart"],
    queryFn: () => {
      const cartService = new CartService();
      return cartService.getCart();
    },
    enabled: Boolean(token),
    select: (data) => data.data.data,
  });

  const defaultAddress = useMemo(() => {
    return addresses?.find((address) => address.isDefault);
  }, [addresses]);

  const handleOpenAddressModal = () => {
    handleUpdateAddress({ openModal: true });
  };

  const openCreateAddressModalHandler = () => {
    handleOpenCreateAddressModal({ openCreateModal: true });
  };

  useEffect(() => {
    if (addresses?.length === 0) {
      handleOpenCreateAddressModal({ openCreateModal: true });
    }
  }, [addresses]);

  return {
    get: {
      openModal,
      openCreateModal,
      addresses,
      defaultAddress,
      addressLoading,
      cartData,
    },
    on: { handleOpenAddressModal, openCreateAddressModalHandler },
  };
};
