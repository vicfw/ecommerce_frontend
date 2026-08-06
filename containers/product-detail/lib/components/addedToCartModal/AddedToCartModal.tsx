"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGlobalStore } from "@/store/globalStore";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Discount } from "@/components/discount/Discount";
import { Price } from "@/components/price/Price";
import { useIsMobile } from "@/hooks/use-mobile";
import { CartItemType } from "@/types/globalTypes";

type AddedToCartContentProps = {
  data: CartItemType;
  onClose: () => void;
  onViewCart: () => void;
};

const AddedToCartContent = ({
  data,
  onClose,
  onViewCart,
}: AddedToCartContentProps) => {
  return (
    <div className="flex min-h-[258px] flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="text-lg font-semibold">افزوده شد به سبد خرید</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-1 items-center justify-center gap-4 p-4">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
          {(data.colorImage?.images[0] ?? data.product.images[0]) && (
            <Image
              src={data.colorImage?.images[0] ?? data.product.images[0]}
              alt={data.product.name}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-medium">{data.product.name}</h4>
          {data.colorImage && (
            <p className="text-xs text-muted-foreground">
              رنگ: {data.colorImage.name}
            </p>
          )}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">تعداد:</span>
            <span className="text-sm font-medium">{data.quantity}</span>
          </div>
          <div className="flex items-center gap-2">
            <Price
              price={data.product.price}
              discount={data.product.discount}
              className="med14 md:med16"
            />
            {data.product.discount ? (
              <Discount discount={data.product.discount} />
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            ادامه خرید
          </Button>
          <Button className="flex-1" onClick={onViewCart}>
            مشاهده سبد خرید
          </Button>
        </div>
      </div>
    </div>
  );
};

const AddedToCartModal = () => {
  const { addedToCartModal, handleUpdateAddedToCartModal } = useGlobalStore();
  const router = useRouter();
  const isMobile = useIsMobile();

  if (!addedToCartModal.data) return null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleUpdateAddedToCartModal(false, undefined);
    }
  };

  const handleClose = () => handleUpdateAddedToCartModal(false, undefined);
  const handleViewCart = () => {
    handleUpdateAddedToCartModal(false, undefined);
    router.push("/cart");
  };

  const content = (
    <AddedToCartContent
      data={addedToCartModal.data}
      onClose={handleClose}
      onViewCart={handleViewCart}
    />
  );

  if (isMobile) {
    return (
      <Sheet open={addedToCartModal.open} onOpenChange={handleOpenChange}>
        <SheetContent
          side="bottom"
          className="h-auto max-h-[90vh] rounded-t-2xl p-0"
        >
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={addedToCartModal.open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0 max-w-md gap-0 [&>button]:hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>افزوده شد به سبد خرید</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default AddedToCartModal;
