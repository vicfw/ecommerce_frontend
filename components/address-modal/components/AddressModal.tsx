"use client";

import { Separator } from "@/components/ui/separator";
import { ChevronLeft, MapPin, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import Address from "./Address";
import { useAddressModal } from "../hooks/useAddressModal";
import UI_Typography from "../../ui/typography/UI_Typography";

export const AddressModal = () => {
  const { get, on } = useAddressModal();

  return (
    <Dialog open={get.openModal} onOpenChange={on.handleToggleModal}>
      <DialogContent>
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="flex">انتخاب آدرس</DialogTitle>
          <X
            className="cursor-pointer"
            style={{ margin: 0 }}
            size={20}
            onClick={on.handleToggleModal}
          />
        </DialogHeader>
        <Separator className="bg-neutral-200 mt-3" />
        <section>
          <div
            className="flex items-center py-5 cursor-pointer"
            onClick={on.handleToggleCreateModal}
          >
            <div className="flex shrink-0 ml-2">
              <MapPin className="text-neutral-500" />
            </div>
            <UI_Typography
              component="p"
              className="grow text-neutral-900"
              variant="Medium/Med16"
            >
              افزودن آدرس جدید
            </UI_Typography>
            <div className="flex mr-2 shrink-0">
              <ChevronLeft className="text-neutral-400" />
            </div>
          </div>
          {/* address loop */}
          <div className="overflow-y-auto h-[36dvh]">
            <Address />
            <Address />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};
