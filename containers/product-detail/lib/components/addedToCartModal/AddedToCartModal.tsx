import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useGlobalStore } from "@/store/globalStore";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Discount } from "@/components/discount/Discount";
import { Price } from "@/components/price/Price";
import { cn } from "@/lib/utils";

const AddedToCartModal = () => {
  const { addedToCartModal, handleUpdateAddedToCartModal } = useGlobalStore();
  const router = useRouter();

  if (!addedToCartModal.data) return null;
  console.log(addedToCartModal.data, "addedToCartModal.data");

  return (
    <Sheet
      open={addedToCartModal.open}
      onOpenChange={() => handleUpdateAddedToCartModal(false, undefined)}
    >
      <SheetContent
        side="bottom"
        className="h-auto max-h-[90vh] rounded-t-2xl p-0 md:hidden"
      >
        <div className="flex min-h-[258px] flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="text-lg font-semibold">افزوده شد به سبد خرید</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleUpdateAddedToCartModal(false, undefined)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex flex-1 items-center justify-center gap-4 p-4">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
              {addedToCartModal.data.product.images[0] && (
                <Image
                  src={addedToCartModal.data.colorImage.images[0]}
                  alt={addedToCartModal.data.product.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex  flex-col gap-1">
              <h4 className="text-sm font-medium">
                {addedToCartModal.data.product.name}
              </h4>
              {addedToCartModal.data.colorImage && (
                <p className="text-xs text-muted-foreground">
                  رنگ: {addedToCartModal.data.colorImage.name}
                </p>
              )}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">تعداد:</span>
                <span className="text-sm font-medium">
                  {addedToCartModal.data.quantity}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Price
                  price={addedToCartModal.data.product.price}
                  discount={addedToCartModal.data.product.discount}
                  className="med14 md:med16"
                />
                {addedToCartModal.data.product.discount ? (
                  <Discount discount={addedToCartModal.data.product.discount} />
                ) : null}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleUpdateAddedToCartModal(false, undefined)}
              >
                ادامه خرید
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  handleUpdateAddedToCartModal(false, undefined);
                  router.push("/cart");
                }}
              >
                مشاهده سبد خرید
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddedToCartModal;
