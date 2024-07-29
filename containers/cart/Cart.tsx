"use client";

import { useGlobalStore } from "@/store/globalStore";
import * as Lib from "./lib";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Button } from "@/components/ui/button";

const CartContainer = () => {
  const { cartLength } = useGlobalStore();
  const { get, on } = Lib.useCart();

  if (!cartLength || !get.cartData?.cartItems.length)
    return <Lib.C.EmptyCart />;

  return (
    <section className="flex gap-4 w-full items-start">
      <div className="w-full flex flex-col flex-grow flex-1">
        {get.cartData?.cartItems.map((cartItem, index) => (
          <Lib.C.CartItem cartItem={cartItem} isFirstItem={!index} />
        ))}
      </div>
      <aside className="border border-neutral-200 rounded-md w-[300px] px-[20px] py-[10px] flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <UI_Typography className="text-neutral-600" variant="Regular/Reg12">
            قیمت کالاها ({cartLength})
          </UI_Typography>
          <UI_Typography variant="Medium/Med14" className="text-neutral-600">
            {get.cartData.price.toLocaleString()} تومان
          </UI_Typography>
        </div>
        <div className="flex justify-between items-center">
          <UI_Typography className="text-neutral-600" variant="Regular/Reg12">
            جمع سبد خرید
          </UI_Typography>
          <UI_Typography variant="Medium/Med14" className="text-neutral-600">
            {get.cartData.discountPrice.toLocaleString()} تومان
          </UI_Typography>
        </div>

        <div className="flex justify-between items-center">
          <UI_Typography className="text-destructive" variant="Regular/Reg12">
            سود شما از خرید
          </UI_Typography>
          <UI_Typography variant="Medium/Med14" className="text-destructive">
            {/* (28%) */} {get.cartData.profitFromDiscount.toLocaleString()}{" "}
            تومان
          </UI_Typography>
        </div>
        <Button onClick={on.onConfirmCart}>
          <UI_Typography variant="Medium/Med14">
            تایید و تکمیل سفارش
          </UI_Typography>
        </Button>
      </aside>
    </section>
  );
};

export default CartContainer;
