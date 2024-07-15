"use client";

import { useGlobalStore } from "@/store/globalStore";
import * as Lib from "./lib";

const CartContainer = () => {
  const { cartLength } = useGlobalStore();
  const { get, on } = Lib.useCart();

  if (!cartLength || !get.cartData?.cartItems.length)
    return <Lib.C.EmptyCart />;

  return (
    <section className="w-full flex flex-col">
      {get.cartData?.cartItems.map((cartItem, index) => (
        <Lib.C.CartItem
          cartItem={cartItem}
          isFirstItem={!index}
          totalPrice={get.cartData?.price!}
        />
      ))}
    </section>
  );
};

export default CartContainer;
