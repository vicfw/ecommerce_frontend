"use client";

import { PriceDetailAside } from "@/components/price-detail-aside/PriceDetailAside";
import { useGlobalStore } from "@/store/globalStore";
import * as Lib from "./lib";

const CartContainer = () => {
  const { cartLength } = useGlobalStore();
  const { get } = Lib.useCart();

  if (!cartLength || !get.cartData?.cartItems.length)
    return <Lib.C.EmptyCart />;

  return (
    <section className="flex gap-4 w-full items-start">
      <div className="w-full flex flex-col flex-grow flex-1">
        {get.cartData?.cartItems.map((cartItem, index) => (
          <Lib.C.CartItem
            key={cartItem.id}
            cartItem={cartItem}
            isFirstItem={!index}
          />
        ))}
      </div>
      <PriceDetailAside
        cartPrice={get.cartData.price}
        discountPrice={get.cartData.discountPrice}
        profitFromDiscount={get.cartData.profitFromDiscount}
        href={get.confirmCartHref}
      />
    </section>
  );
};
export default CartContainer;
