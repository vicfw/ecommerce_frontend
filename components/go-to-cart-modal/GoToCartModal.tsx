"use client";

import { useGlobalStore } from "@/store/globalStore";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import UI_Typography from "../ui/typography/UI_Typography";

export const GoToCartModal = () => {
  const {
    goToCartModal: { data: cartData, open: openModal },
    handleUpdateGoToCartModal,
  } = useGlobalStore();

  const handleCloseModal = () => {
    handleUpdateGoToCartModal(false, undefined);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleCloseModal();
    }, 5000);
    return () => clearTimeout(timeout);
  }, [openModal]);

  return (
    <Dialog open={openModal} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="flex">
            این کالا به سبد خرید شما اضافه شد
          </DialogTitle>
          <X
            className="cursor-pointer"
            style={{ margin: 0 }}
            size={20}
            onClick={handleCloseModal}
          />
        </DialogHeader>
        <hr className="bg-neutral-500" />
        <section className="mt-2 flex items-center gap-2">
          <Image
            src={cartData?.product.images[0]!}
            alt={cartData?.product.name!}
            width={120}
            height={120}
            className="rounded-full"
          />
          <UI_Typography variant="Medium/Med14">
            {cartData?.product.prName}
          </UI_Typography>
        </section>
        <Link href="/cart" className="w-full block" onClick={handleCloseModal}>
          <Button className="w-full">
            <UI_Typography variant="Medium/Med14">
              برو به سبد خرید
            </UI_Typography>
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
};
