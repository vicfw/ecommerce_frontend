"use client";

import { AddressModal } from "@/components/address-modal/components/address-modal/AddressModal";
import { Button } from "@/components/ui/button";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { ChevronLeft, LoaderPinwheel, MapPin } from "lucide-react";
import React from "react";
import { useShipping } from "./useShipping";
import CreateEditAddressModal from "@/components/address-modal/components/create-edit-address/CreateEditAddressModal";
import { PriceDetailAside } from "@/components/price-detail-aside/PriceDetailAside";
import { CartItem } from "@/components/cart-item/CartItem";

const Shipping = () => {
  const { get, on } = useShipping();

  console.log(get.cartData, "cartData");

  return (
    <section className="flex gap-4 w-full items-start">
      <div className="w-full flex flex-col gap-5 flex-grow flex-1">
        <div className="border border-neutral-200 px-[20px] py-[10px]  rounded-md">
          {/* Selected Address */}
          {get.addressLoading ? (
            <LoaderPinwheel className="animate-spin" />
          ) : get.addresses?.length ? (
            <>
              <div className="flex items-center gap-3">
                <MapPin className="text-neutral-700" />
                <div className="flex flex-col gap-2">
                  <UI_Typography
                    className="text-neutral-500"
                    component="h2"
                    variant="Regular/Reg14"
                  >
                    آدرس تحویل سفارش
                  </UI_Typography>
                  <div className="flex items-center gap-3">
                    <UI_Typography
                      component="h3"
                      variant="Medium/Med16"
                      className="text-neutral-800"
                    >
                      {get.defaultAddress?.address}
                    </UI_Typography>
                  </div>

                  <UI_Typography
                    component="h3"
                    variant="Regular/Reg16"
                    className="text-neutral-600"
                  >
                    {get.defaultAddress?.receiverName}{" "}
                    {get.defaultAddress?.receiverLastName}
                  </UI_Typography>
                </div>
              </div>
              {/* Change Address */}
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  className="flex items-center"
                  onClick={on.handleOpenAddressModal}
                >
                  <UI_Typography
                    component="p"
                    className="text-secondary"
                    variant="Regular/Reg14"
                  >
                    تغییر یا ویرایش آدرس
                  </UI_Typography>
                  <ChevronLeft size="18px" className="text-secondary" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 ">
                <MapPin className="text-neutral-700" />
                <UI_Typography
                  className="text-neutral-500"
                  component="h2"
                  variant="Regular/Reg14"
                >
                  ادرسی برای شما ثبت نشده است.
                </UI_Typography>
              </div>

              <UI_Typography
                className="text-secondary cursor-pointer mr-8"
                component="h2"
                variant="Regular/Reg14"
                onClick={on.openCreateAddressModalHandler}
              >
                لطفا یک آدرس ایجاد کنید
              </UI_Typography>
            </div>
          )}
        </div>

        {get.cartData?.cartItems.map((cartItem, index) => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            isFirstItem={!index}
          />
        ))}
      </div>
      {get.cartData && (
        <PriceDetailAside
          cartPrice={get.cartData.price}
          discountPrice={get.cartData.discountPrice}
          profitFromDiscount={get.cartData.profitFromDiscount}
          deliveryCost={get.deliveryCostData?.cost}
          href="/payment"
          submitButtonText="تایید و تکمیل سفارش"
        />
      )}

      {get.openModal && get.addresses?.length && (
        <AddressModal addresses={get.addresses} />
      )}
      {get.openCreateModal && <CreateEditAddressModal />}
    </section>
  );
};

export default Shipping;
