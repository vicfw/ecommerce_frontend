"use client";

import { AddressModal } from "@/components/address-modal/AddressModal";
import { Button } from "@/components/ui/button";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { ChevronLeft, MapPin } from "lucide-react";
import React from "react";
import { useShipping } from "./useShipping";

const Shipping = () => {
  const { get, on } = useShipping();
  return (
    <section className="flex gap-4 w-full items-start">
      <div className="w-full flex flex-col flex-grow flex-1 border border-neutral-200 rounded-md px-[20px] py-[10px]">
        {/* Selected Address */}
        <div className="flex items-center gap-3">
          <MapPin className="text-neutral-700" />
          <div className="flex flex-col gap-2">
            <UI_Typography
              className="text-neutral-500"
              component="h2"
              variant="Regular/Reg14"
            >
              آدرس تحویل سفارش
            </UI_Typography>
            <div className="flex items-center gap-3">
              <UI_Typography
                component="h3"
                variant="Medium/Med16"
                className="text-neutral-800"
              >
                ارومیه،خیابان سعدی،خیابان بوستان،کوی ۲،پلاک ۲۲
              </UI_Typography>
            </div>

            <UI_Typography
              component="h3"
              variant="Regular/Reg16"
              className="text-neutral-600"
            >
              فرید بیغم
            </UI_Typography>
          </div>
        </div>
        {/* Change Address */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="flex items-center"
            onClick={on.handleOpenAddressModal}
          >
            <UI_Typography
              component="p"
              className="text-secondary"
              variant="Regular/Reg14"
            >
              تغییر یا ویرایش آدرس
            </UI_Typography>
            <ChevronLeft size="18px" className="text-secondary" />
          </Button>
        </div>
      </div>
      <aside className="border border-neutral-200 rounded-md w-[300px] px-[20px] py-[10px] flex flex-col gap-6">
        asd
      </aside>

      {get.openModal && <AddressModal />}
    </section>
  );
};

export default Shipping;
