"use client";

import { PriceDetailAside } from "@/components/price-detail-aside/PriceDetailAside";
import { useGlobalStore } from "@/store/globalStore";
import * as Lib from "./lib";

const CartContainer = () => {
  const { cartLength } = useGlobalStore();
  const { get } = Lib.useCart();

  return (
    <section className="flex gap-4 w-full items-start h-[calc(100dvh-118px)] md:h-auto">
      <div className="w-full flex flex-col flex-grow flex-1">
        {cartLength || get.cartData?.cartItems.length ? (
          get.cartData?.cartItems.map((cartItem, index) => (
            <Lib.C.CartItem
              key={cartItem.id}
              cartItem={cartItem}
              isFirstItem={!index}
            />
          ))
        ) : (
          <Lib.C.EmptyCart />
        )}
      </div>
      {get.cartData ? (
        <PriceDetailAside
          cartPrice={get.cartData.price}
          discountPrice={get.cartData.discountPrice}
          profitFromDiscount={get.cartData.profitFromDiscount}
          href={get.confirmCartHref}
          submitButtonText="ثبت"
        />
      ) : null}
    </section>
  );
};
export default CartContainer;
