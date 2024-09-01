import { useGlobalStore } from "@/store/globalStore";
import { useShallow } from "zustand/react/shallow";
import { SubmitHandler, useForm } from "react-hook-form";
import { createAddressSchema } from "@/lib/validations/index.";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type CreateAddressSchemaType = z.infer<typeof createAddressSchema>;

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
      receiverName: "",
      receiverLastName: "",
      receiverPhoneNumber: "",
      neighborhood: "",
      isDefault: false,
    },
  });

  console.log(form.formState.errors, "errors");
  console.log(form.watch("province"));

  const onSubmit: SubmitHandler<CreateAddressSchemaType> = (data) =>
    console.log(data);

  const handleToggleCreateModal = () => {
    handleOpenCreateAddressModal({ openCreateModal: !openCreateModal });
  };

  return {
    get: { openCreateModal, form },
    on: { handleToggleCreateModal, onSubmit },
  };
};
