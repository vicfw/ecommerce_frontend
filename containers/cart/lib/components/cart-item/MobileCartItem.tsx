import { CartItemType } from "@/types/globalTypes";
import Image from "next/image";
import { Plus, Minus, Trash2, Loader } from "lucide-react";
import { useCartItem } from "./useCartItem";
import { cn } from "@/lib/utils";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { WarrantyText } from "@/components/warranty-text/WarrantyText";
import { Suspense } from "react";

type Props = {
  cartItem: CartItemType;
};

export const MobileCartItem = ({ cartItem }: Props) => {
  const { get, on } = useCartItem(cartItem.quantity);

  return (
    <Suspense>
      <div className="border w-full flex-col gap-2 rounded shadow-sm py-3 px-3 md:hidden">
        <div className="flex gap-3">
          <Image
            src={cartItem.product.images[0]}
            alt={cartItem.id.toString()}
            width={88}
            height={88}
          />
          <div className="flex w-full flex-col gap-1">
            <div className="flex w-full flex-col-reverse gap-1">
              <span className="reg10 text-gray-600">
                {cartItem.product.prName}
              </span>
            </div>
            <h3 className="line-clamp-2 text-black">
              <span className="reg12">{cartItem.product.prName}</span>
            </h3>
            <WarrantyText />
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2 px-2 py-1 border border-neutral-200 rounded-md">
                <Plus
                  size={16}
                  className={cn(
                    "text-destructive cursor-pointer",
                    (get.updateCartLoading || get.updateAnonCartLoading) &&
                      "opacity-[0.5]"
                  )}
                  onClick={() =>
                    on.handleIncrementOrDecrementCartItem(
                      cartItem.productId,
                      true
                    )
                  }
                />
                {get.updateAnonCartLoading || get.updateCartLoading ? (
                  <Loader className="text-neutral-500 animate-spin" size={16} />
                ) : (
                  <UI_Typography className="text-destructive text-sm">
                    {cartItem.quantity}
                  </UI_Typography>
                )}
                {cartItem.quantity <= 1 ? (
                  <Trash2
                    size={16}
                    className="text-destructive cursor-pointer"
                    onClick={() => on.deleteCartItemHandler(cartItem.id)}
                  />
                ) : (
                  <Minus
                    size={16}
                    className={cn(
                      "text-destructive cursor-pointer",
                      (get.updateCartLoading || get.updateAnonCartLoading) &&
                        "opacity-[0.5]"
                    )}
                    onClick={() =>
                      on.handleIncrementOrDecrementCartItem(
                        cartItem.productId,
                        false
                      )
                    }
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <UI_Typography className="text-neutral-800 text-sm">
                  {cartItem.itemPrice.toLocaleString()} تومان
                </UI_Typography>
                <Trash2
                  size={16}
                  className="text-destructive cursor-pointer"
                  onClick={() => on.deleteCartItemHandler(cartItem.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
