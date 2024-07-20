"use client";

import { useGlobalStore } from "@/store/globalStore";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export const AlertModal = () => {
  const {
    alertModal: { text: body, open: openModal },
    handleUpdateAlertModal,
  } = useGlobalStore();

  const handleCloseModal = () => {
    handleUpdateAlertModal(false, "");
  };

  return (
    <Dialog open={openModal} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="flex">{body}</DialogTitle>
          <X
            className="cursor-pointer"
            style={{ margin: 0 }}
            size={20}
            onClick={handleCloseModal}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
