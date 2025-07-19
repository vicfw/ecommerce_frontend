"use client";

import { Separator } from "@/components/ui/separator";
import { ChevronLeft, MapPin, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import Address from "./Address";
import { useAddressModal } from "../../hooks/useAddressModal";
import UI_Typography from "../../../ui/typography/UI_Typography";
import { Address as AddressType } from "@/types/globalTypes";

type AddressModalProps = {
  addresses: AddressType[];
};

export const AddressModal = ({ addresses }: AddressModalProps) => {
  const { get, on } = useAddressModal();

  return (
    <Dialog open={get.openModal} onOpenChange={on.handleToggleModal}>
      <DialogContent className="w-[95vw] max-w-md mx-auto p-0 rounded-lg">
        <DialogHeader className="flex flex-row justify-between items-center p-4 pb-3">
          <DialogTitle className="flex text-base font-medium">
            انتخاب آدرس
          </DialogTitle>
          <X
            className="cursor-pointer p-1 rounded-full hover:bg-neutral-100 transition-colors"
            size={20}
            onClick={on.handleToggleModal}
          />
        </DialogHeader>
        <Separator className="bg-neutral-200" />
        <section className="p-4 pt-0">
          <div
            className="flex items-center py-4 cursor-pointer rounded-lg hover:bg-neutral-50 transition-colors"
            onClick={on.handleToggleCreateModal}
          >
            <div className="flex shrink-0 ml-3">
              <MapPin className="text-neutral-500" size={18} />
            </div>
            <UI_Typography
              component="p"
              className="grow text-neutral-900 text-sm font-medium"
            >
              افزودن آدرس جدید
            </UI_Typography>
            <div className="flex mr-3 shrink-0">
              <ChevronLeft className="text-neutral-400" size={16} />
            </div>
          </div>

          {/* Address list with mobile-optimized height */}
          <div className="overflow-y-auto max-h-[50vh] md:max-h-[36dvh] space-y-2">
            {addresses.map((address) => (
              <Address key={address.id} address={address} />
            ))}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};
