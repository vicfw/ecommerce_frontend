"use client";

import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Separator } from "../../ui/separator";
import { useCreateAddressModal } from "../hooks/useCreateAddressModal";

const CreateAddressModal = () => {
  const { get, on } = useCreateAddressModal();

  return (
    <Dialog
      open={get.openCreateModal}
      onOpenChange={on.handleToggleCreateModal}
    >
      <DialogContent>
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="flex">انتخاب آدرس</DialogTitle>
          <X
            className="cursor-pointer"
            style={{ margin: 0 }}
            size={20}
            onClick={on.handleToggleCreateModal}
          />
        </DialogHeader>
        <Separator className="bg-neutral-200 mt-3" />
      </DialogContent>
    </Dialog>
  );
};

export default CreateAddressModal;
