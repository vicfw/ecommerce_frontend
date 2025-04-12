"use client";

import { PriceDetailAside } from "@/components/price-detail-aside/PriceDetailAside";
import { useGlobalStore } from "@/store/globalStore";
import { MobileCartItem } from "./lib/components/cart-item/MobileCartItem";
import { useCart } from "./lib/useCart";
import { CartItem, EmptyCart } from "./lib/components";

const CartContainer = () => {
  const { cartLength } = useGlobalStore();
  const { get } = useCart();

  return (
    <>
      {/* Desktop */}
      <section className="md:flex gap-4 w-full items-start h-[calc(100dvh-118px)] md:h-auto hidden">
        <div className="w-full flex flex-col flex-grow flex-1">
          {cartLength || get.cartData?.cartItems.length ? (
            get.cartData?.cartItems.map((cartItem, index) => (
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                isFirstItem={!index}
              />
            ))
          ) : (
            <EmptyCart />
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

      {/* Mobile */}
      <div className="h-[calc(100dvh-118px)] w-full">
        <div className="flex flex=col gap-2 mt-4">
          {get.cartData?.cartItems.map((cartItem, index) => (
            <MobileCartItem cartItem={cartItem} />
          ))}
        </div>
      </div>
    </>
  );
};
export default CartContainer;
