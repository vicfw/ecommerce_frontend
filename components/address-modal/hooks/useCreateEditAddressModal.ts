import { useToast } from "@/hooks/use-toast";
import { getUserInfoFromCookies } from "@/lib/utils";
import { createAddressSchema } from "@/lib/validations/index.";
import { AddressService } from "@/services/addressService";
import { CreateAddressBody } from "@/services/types/addressService.types";
import { useGlobalStore } from "@/store/globalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

type CreateAddressSchemaType = z.infer<typeof createAddressSchema>;

export const useCreateEditAddressModal = () => {
  const userInfo = getUserInfoFromCookies();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    address: { openCreateModal },
    handleOpenCreateAddressModal,
  } = useGlobalStore(
    useShallow((state) => ({
      address: state.address,
      handleOpenCreateAddressModal: state.handleOpenCreateAddressModal,
    }))
  );

  const [isForHimSelf, setIsForHimSelf] = useState<CheckedState>(true);

  const form = useForm<CreateAddressSchemaType>({
    resolver: zodResolver(createAddressSchema),
    defaultValues: {
      address: "",
      street: "",
      city: "تهران",
      zipCode: "",
      province: "تهران",
      plate: "",
      floor: "",
      receiverName: userInfo?.name,
      receiverLastName: userInfo?.lastName,
      receiverPhoneNumber: userInfo?.phoneNumber,
      isDefault: false,
    },
  });

  const { mutateAsync: createAddress } = useMutation({
    mutationFn: (data: CreateAddressBody) => {
      const addressService = new AddressService();
      return addressService.createAddress(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });

  const onSubmit: SubmitHandler<CreateAddressSchemaType> = async (data) => {
    try {
      await createAddress(data);
      handleOpenCreateAddressModal({ openCreateModal: false });
      toast({
        title: "آدرس جدید با موفقیت ایجاد شد",
        variant: "success",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleCreateModal = () => {
    handleOpenCreateAddressModal({ openCreateModal: !openCreateModal });
  };

  /**
   * Updates the receiver's information in the form based on whether the order is for the user themselves.
   *
   * @param {CheckedState} isForSelf - Indicates if the order is for the user themselves.
   *   true if the order is for the user, false if it's for someone else.
   *
   * @description
   * This function performs the following actions:
   * 1. If isForSelf is false (order is not for the user):
   *    - Clears the receiver's name, last name, and phone number in the form.
   * 2. If isForSelf is true (order is for the user):
   *    - Sets the receiver's name, last name, and phone number in the form
   *      to match the current user's information.
   *
   * @note
   * - This function assumes the existence of a `form` object with a `setValue` method.
   * - It also assumes the existence of a `userInfo` object containing the user's details.
   * - The function uses non-null assertion (`!`) when accessing `userInfo` properties,
   *   which assumes these properties are always defined when isForSelf is true.
   *
   * @example
   *  Usage within another function
   * const handleOrderRecipientChange = (isForSelf: CheckedState) => {
   *   updateReceiverInfo(isForSelf);
   *   // Other logic...
   * };
   */
  const updateReceiverInfo = (checked: CheckedState) => {
    if (!checked) {
      form.setValue("receiverName", "");
      form.setValue("receiverLastName", "");
      form.setValue("receiverPhoneNumber", "");
    } else {
      form.setValue("receiverName", userInfo?.name!);
      form.setValue("receiverLastName", userInfo?.lastName!);
      form.setValue("receiverPhoneNumber", userInfo?.phoneNumber!);
    }
  };

  /**
   * Handles the change event when the user toggles whether the order is for themselves or not.
   *
   * @param {CheckedState} checked - The new checked state of the toggle.
   *   true if the order is for the user themselves, false otherwise.
   *
   * @description
   * This function performs two actions:
   * 1. Updates the receiver status based on the checked state.
   * 2. Updates the local state to reflect whether the order is for the user or not.
   *
   * @note
   * - This function assumes the existence of two setter functions:
   *   `setReceiverStatus` and `setIsForHimSelf`.
   * - Both setters are called with the same `checked` value, implying that
   *   the receiver status and whether the order is for the user are directly related.
   *
   * @example
   *  Usage with a toggle component
   * <Toggle onCheckedChange={handleChangeIsForHimSelf} />
   */
  const handleChangeIsForHimSelf = (checked: CheckedState) => {
    updateReceiverInfo(checked);
    setIsForHimSelf(checked);
  };

  return {
    get: { openCreateModal, form, isForHimSelf },
    on: { handleToggleCreateModal, onSubmit, handleChangeIsForHimSelf },
  };
};
