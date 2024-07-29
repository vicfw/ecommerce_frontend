"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useAddressModal } from "./useAddressModal";
import { X } from "lucide-react";

export const AddressModal = () => {
  const { get, on } = useAddressModal();

  console.log(get.openModal, "openModal");

  return (
    <Dialog open={get.openModal} onOpenChange={on.handleToggleModal}>
      <DialogContent>
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="flex">
            این کالا به سبد خرید شما اضافه شد
          </DialogTitle>
          <X
            className="cursor-pointer"
            style={{ margin: 0 }}
            size={20}
            onClick={on.handleToggleModal}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
