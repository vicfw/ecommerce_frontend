import { AddressService } from "@/services/addressService";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddress = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: ({
      addressId,
      checked,
    }: {
      addressId: number;
      checked: CheckedState;
    }) => {
      const addressService = new AddressService();
      return addressService.updateAddress(addressId, {
        isDefault: checked as boolean,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });

  const { mutateAsync: deleteAddressMutation } = useMutation({
    mutationFn: (addressId: number) => {
      const addressService = new AddressService();
      return addressService.deleteAddress(addressId);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });

  const handleChangeDefaultAddress = async (
    addressId: number,
    checked: CheckedState
  ) => {
    if (!checked) return;

    await mutateAsync({ addressId, checked });
  };

  const handleDeleteAddress = async (addressId: number) => {
    try {
      await deleteAddressMutation(addressId);
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return {
    get: {},
    on: {
      handleChangeDefaultAddress,
      handleDeleteAddress,
    },
  };
};
