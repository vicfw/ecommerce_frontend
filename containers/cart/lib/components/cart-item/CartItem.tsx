"use-client";

import UI_Typography from "@/components/ui/typography/UI_Typography";
import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/store/globalStore";
import { CartItemType } from "@/types/globalTypes";
import {
  GripVertical,
  Loader,
  Minus,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useCartItem } from "./useCartItem";

type TCartItem = {
  isFirstItem: boolean;
  cartItem: CartItemType;
  totalPrice: number;
};

export const CartItem = (props: TCartItem) => {
  const { isFirstItem, cartItem, totalPrice } = props;
  const { cartLength } = useGlobalStore();
  const { get, on } = useCartItem();
  return (
    <div
      className={cn(
        "border border-neutral-200  px-[18px] py-[20px] last:rounded-b-md",
        isFirstItem && "rounded-t-md",
        !isFirstItem && "border-t-0"
      )}
    >
      {isFirstItem && (
        <header className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <UI_Typography variant="Medium/Med16">سبد خرید شما</UI_Typography>
            <UI_Typography variant="Regular/Reg12" className="text-neutral-500">
              {cartLength} کالا
            </UI_Typography>
          </div>
          <div>
            <GripVertical color="#a1a3a8" />
          </div>
        </header>
      )}
      <section
        className={cn("flex gap-16 items-center", isFirstItem && "mt-7")}
      >
        <div className="flex flex-1 items-center gap-3">
          <Image
            width={120}
            height={120}
            src={cartItem.product.images[0]}
            alt={cartItem.product.prName}
          />
          <div className="flex flex-col gap-2">
            <UI_Typography variant="Regular/Reg14" className="text-neutral-800">
              {cartItem.product.prName}
            </UI_Typography>
            <div className="flex items-center gap-2">
              <ShieldCheck size="20" className="text-neutral-500" />
              <UI_Typography
                variant="Regular/Reg14"
                className="text-neutral-500"
              >
                گارانتی اصالت و سلامت فیزیکی کالا
              </UI_Typography>
            </div>
          </div>
        </div>
        <div className="flex flex-1  items-center px-2 py-2 border border-neutral-200 h-[40px] rounded-md justify-between max-w-[100px]">
          <Plus
            size={18}
            className="text-destructive cursor-pointer"
            onClick={() =>
              on.handleUpdateCart({
                productId: cartItem.productId,
                quantity: cartItem.quantity + 1,
              })
            }
          />

          {get.updateAnonCartLoading ? (
            <Loader className="text-neutral-500 animate-spin" />
          ) : (
            <UI_Typography className="text-destructive" variant="Regular/Reg14">
              {cartItem.quantity}
            </UI_Typography>
          )}
          {cartItem.quantity <= 1 ? (
            <Trash2 size={18} className="text-destructive cursor-pointer" />
          ) : (
            <Minus
              size={18}
              className="text-destructive cursor-pointer"
              onClick={() =>
                on.handleUpdateCart({
                  productId: cartItem.productId,
                  quantity: cartItem.quantity - 1,
                })
              }
            />
          )}
        </div>

        <div className="flex flex-[0.5]">
          <UI_Typography variant="Medium/Med16" className="text-neutral-800">
            {totalPrice} ریال
          </UI_Typography>
        </div>
        <div>
          <Trash2 className="text-destructive cursor-pointer" />
        </div>
      </section>
    </div>
  );
};
