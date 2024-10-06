import { getClientSideCookie } from "@/lib/utils";
import { AddressService } from "@/services/addressService";
import { CartService } from "@/services/cartService";
import { OrderService } from "@/services/oderService";
import { useGlobalStore } from "@/store/globalStore";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useShallow } from "zustand/react/shallow";

export const useShipping = () => {
  const token = getClientSideCookie("jwt");
  console.log(token, "token");

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
    select: (data) => data,
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

  const { data: deliveryCostData } = useQuery({
    queryKey: ["delivery-cost"],
    queryFn: () => {
      const orderService = new OrderService();
      return orderService.getDeliveryCost();
    },
    enabled: Boolean(token),
    select: (data) => data.data.data,
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
      cartData,
      deliveryCostData,
    },
    on: { handleOpenAddressModal, openCreateAddressModalHandler },
  };
};
