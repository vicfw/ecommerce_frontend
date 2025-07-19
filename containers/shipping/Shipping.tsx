"use client";

import { AddressModal } from "@/components/address-modal/components/address-modal/AddressModal";
import { Button } from "@/components/ui/button";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { ChevronLeft, LoaderPinwheel, MapPin } from "lucide-react";
import React from "react";
import { useShipping } from "./useShipping";
import CreateEditAddressModal from "@/components/address-modal/components/create-edit-address/CreateEditAddressModal";
import { PriceDetailAside } from "@/components/price-detail-aside/PriceDetailAside";
import { CartItem } from "@/containers/cart/lib/components/cart-item/CartItem";
import { ShopTimeline } from "@/components/shop-timeline/ShopTimeline";
import { MobilePriceDetail } from "@/components/price-detail-aside/MobilePriceDetail";

const Shipping = () => {
  const { get, on } = useShipping();

  return (
    <section className="flex flex-col gap-4 w-full">
      {/* Mobile Design */}
      <div className="md:hidden">
        {/* Shop Timeline */}
        <div className="mb-6">
          <ShopTimeline currentStep="shipping" />
        </div>

        {/* Address Section */}
        <div className="border border-neutral-200 px-4 py-4 rounded-lg mb-4">
          {get.addressLoading ? (
            <div className="flex items-center justify-center py-8">
              <LoaderPinwheel className="animate-spin text-primary" />
            </div>
          ) : get.addresses?.length ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-neutral-700 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <UI_Typography
                    className="text-neutral-500 text-sm mb-2"
                    component="h2"
                  >
                    آدرس تحویل سفارش
                  </UI_Typography>
                  <UI_Typography
                    component="h3"
                    className="text-neutral-800 text-base font-medium mb-1"
                  >
                    {get.defaultAddress?.address}
                  </UI_Typography>
                  <UI_Typography
                    component="h3"
                    className="text-neutral-600 text-sm"
                  >
                    {get.defaultAddress?.receiverName}{" "}
                    {get.defaultAddress?.receiverLastName}
                  </UI_Typography>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={on.handleOpenAddressModal}
              >
                <UI_Typography component="p" className="text-secondary text-sm">
                  تغییر یا ویرایش آدرس
                </UI_Typography>
                <ChevronLeft size="16" className="text-secondary" />
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="text-neutral-700" />
                <UI_Typography
                  className="text-neutral-500 text-sm"
                  component="h2"
                >
                  ادرسی برای شما ثبت نشده است.
                </UI_Typography>
              </div>

              <Button
                variant="default"
                className="w-full"
                onClick={on.openCreateAddressModalHandler}
              >
                <UI_Typography className="text-white text-sm" component="span">
                  ایجاد آدرس جدید
                </UI_Typography>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Price Detail */}
        {get.cartData && (
          <MobilePriceDetail
            cartPrice={get.cartData.price}
            discountPrice={get.cartData.discountPrice}
            profitFromDiscount={get.cartData.profitFromDiscount}
            deliveryCost={get.cartData.deliveryCost.cost}
            href="/payment"
            submitButtonText="تایید و تکمیل سفارش"
          />
        )}
      </div>

      {/* Desktop Design */}
      <div className="hidden md:flex gap-4 w-full items-start">
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
                    <UI_Typography className="text-neutral-500" component="h2">
                      آدرس تحویل سفارش
                    </UI_Typography>
                    <div className="flex items-center gap-3">
                      <UI_Typography
                        component="h3"
                        className="text-neutral-800"
                      >
                        {get.defaultAddress?.address}
                      </UI_Typography>
                    </div>

                    <UI_Typography component="h3" className="text-neutral-600">
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
                    <UI_Typography component="p" className="text-secondary">
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
                  <UI_Typography className="text-neutral-500" component="h2">
                    ادرسی برای شما ثبت نشده است.
                  </UI_Typography>
                </div>

                <UI_Typography
                  className="text-secondary cursor-pointer mr-8"
                  component="h2"
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
            deliveryCost={get.cartData.deliveryCost.cost}
            href="/payment"
            submitButtonText="تایید و تکمیل سفارش"
          />
        )}
      </div>

      {get.openModal && get.addresses?.length && (
        <AddressModal addresses={get.addresses} />
      )}
      {get.openCreateModal && <CreateEditAddressModal />}
    </section>
  );
};

export default Shipping;
