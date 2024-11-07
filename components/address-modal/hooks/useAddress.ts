import { AddressService } from "@/services/addressService";
import { Response } from "@/services/types/config";
import { Address } from "@/types/globalTypes";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

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

    // onMutate: (addressData) => {
    //   const newAddress = queryClient.getQueryData([
    //     "address",
    //   ]) as unknown as Response<Address[]>;
    //   newAddress.data.data.forEach((address: Address) => {
    //     if (address.isDefault) {
    //       address.isDefault = false;
    //     }
    //     if (!address.isDefault && address.id === addressData.addressId) {
    //       address.isDefault = true;
    //     }
    //   });

    //   queryClient.setQueryData(["address"], newAddress);
    // },
    // onError: (_, __, context) => {
    //   const previousTodo = queryClient.getQueryData([
    //     "address",
    //   ]) as unknown as Response<Address[]>;

    //   queryClient.setQueryData(["address"], previousTodo);
    // },
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

  return { get: {}, on: { handleChangeDefaultAddress } };
};
