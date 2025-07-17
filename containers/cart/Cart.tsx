"use client";

import { PriceDetailAside } from "@/components/price-detail-aside/PriceDetailAside";
import { CartItem, EmptyCart } from "./lib/components";
import { MobileCartItem } from "./lib/components/cart-item/MobileCartItem";
import { ShopTimeline } from "@/components/shop-timeline/ShopTimeline";
import { useCart } from "./lib/useCart";
import { MobilePriceDetail } from "@/components/price-detail-aside/MobilePriceDetail";

const CartContainer = () => {
  const { get } = useCart();

  return (
    <>
      {/* Desktop */}
      <section className="md:flex gap-4 w-full items-start h-[calc(100dvh-118px)] md:h-auto hidden">
        <div className="w-full flex flex-col flex-grow flex-1">
          {get.cartData && get.cartData?.cartItems.length ? (
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
      <div className="h-[calc(100dvh-118px)] w-full overflow-scroll pb-20">
        <ShopTimeline currentStep="cart" />
        <div className="flex flex-col gap-2 mt-2">
          {get.cartData && get.cartData.cartItems.length ? (
            get.cartData?.cartItems.map((cartItem, index) => (
              <MobileCartItem cartItem={cartItem} />
            ))
          ) : (
            <EmptyCart />
          )}
        </div>

        {/* Mobile Price Detail */}
        {get.cartData && get.cartData.cartItems.length ? (
          <MobilePriceDetail
            cartPrice={get.cartData.price}
            discountPrice={get.cartData.discountPrice}
            profitFromDiscount={get.cartData.profitFromDiscount}
            href={get.confirmCartHref}
            submitButtonText="ثبت"
          />
        ) : null}
      </div>
    </>
  );
};
export default CartContainer;
