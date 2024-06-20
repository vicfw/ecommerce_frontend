"use client";

import { useGlobalStore } from "@/store/globalStore";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

type GoToCartModalProps = {};

export const GoToCartModal = (props: GoToCartModalProps) => {
  const {} = props;
  const { goToCartModal, handleUpdateGoToCartModal } = useGlobalStore();

  useEffect(() => {
    // const timeout = setTimeout(() => {
    //   handleUpdateGoToCartModal(false, undefined);
    // }, 5000);
    // return () => clearTimeout(timeout);
  }, [goToCartModal.open]);

  return (
    <Dialog
      open={goToCartModal.open}
      onOpenChange={() => handleUpdateGoToCartModal(false, undefined)}
    >
      <DialogContent>
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="flex">
            این کالا به سبد خرید شما اضافه شد
          </DialogTitle>
          <X style={{ margin: 0 }} size={20} />
        </DialogHeader>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 24 24"
        >
          <path d="M12 2A10 10 0 1 0 12 22A10 10 0 1 0 12 2Z"></path>
        </svg>
      </DialogContent>
    </Dialog>
  );
};
