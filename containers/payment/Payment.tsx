"use client";

import { PriceDetailAside } from "@/components/price-detail-aside/PriceDetailAside";
import { MobilePriceDetail } from "@/components/price-detail-aside/MobilePriceDetail";
import { ShopTimeline } from "@/components/shop-timeline/ShopTimeline";
import React from "react";
import { usePayment } from "./usePayment";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, OctagonAlert, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const PaymentContainer = () => {
  const { get, on } = usePayment();

  return (
    <section className="flex flex-col gap-4 w-full">
      {/* Mobile Design */}
      <div className="md:hidden">
        {/* Shop Timeline */}
        <div className="mb-6">
          <ShopTimeline currentStep="checkout" />
        </div>

        {/* Payment Method Section */}
        <div className="border border-neutral-200 px-4 py-4 rounded-lg mb-4">
          <UI_Typography className="text-neutral-900 font-medium mb-4">
            انتخاب روش پرداخت
          </UI_Typography>

          <div className="flex items-start gap-4">
            <Checkbox defaultChecked className="mt-1" />
            <CreditCard className="text-neutral-700" size={20} />
            <div className="flex flex-col gap-2">
              <UI_Typography className="text-neutral-700 text-sm font-medium">
                پرداخت اینترنتی
              </UI_Typography>
              <UI_Typography className="text-neutral-500 text-xs">
                پرداخت آنلاین با تمامی کارت‌های بانکی
              </UI_Typography>
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="border border-neutral-200 px-4 py-4 rounded-lg mb-4">
          <UI_Typography className="text-neutral-900 font-medium mb-4">
            خلاصه سفارش
          </UI_Typography>

          <div className="flex items-center gap-3 mb-3">
            <Truck className="text-red-600" size={18} />
            <UI_Typography className="text-neutral-500 text-sm">
              {get.formattedDeliveryDate}
            </UI_Typography>
            <div className="bg-neutral-100 px-2 py-1 rounded-full">
              <UI_Typography className="text-xs">
                {get.cartData?.cartItems.length} کالا
              </UI_Typography>
            </div>
          </div>

          <UI_Typography className="text-neutral-600 text-xs">
            ارسال عادی - هزینه ارسال :{" "}
            {get.cartData?.deliveryCost.cost.toLocaleString()} تومان
          </UI_Typography>
        </div>

        {/* Discount Code Section */}
        <div className="border border-neutral-200 px-4 py-4 rounded-lg mb-4">
          <UI_Typography className="text-neutral-900 font-medium mb-3">
            کد تخفیف
          </UI_Typography>

          <UI_Typography className="text-neutral-500 text-xs mb-3">
            می‌توانید در صورت امکان از کدهای ذخیره‌شده انتخاب کنید، یا خودتان یک
            کد وارد کنید.
          </UI_Typography>

          <div className="flex items-center gap-2">
            <Input className="flex-1 text-sm" placeholder="اینجا بنویسید" />
            <Button size="sm">
              <UI_Typography className="text-xs">ثبت</UI_Typography>
            </Button>
          </div>
        </div>

        {/* Information Section */}
        <div className="border border-neutral-200 px-4 py-4 rounded-lg mb-4">
          <div className="flex gap-3">
            <OctagonAlert className="text-neutral-500" size={18} />
            <UI_Typography className="text-neutral-500 text-xs">
              برای دریافت فاکتور، بعد از دریافت سفارش به حساب کاربری و صفحه
              جزئیات سفارش سر بزنید
            </UI_Typography>
          </div>
        </div>

        {/* Mobile Price Detail */}
        {get.cartData && (
          <MobilePriceDetail
            cartPrice={get.cartData.price}
            discountPrice={get.cartData.discountPrice}
            profitFromDiscount={get.cartData.profitFromDiscount}
            deliveryCost={get.cartData.deliveryCost.cost}
            submitButtonText="پرداخت"
            onSubmit={on.handleCreateOrder}
          />
        )}
      </div>

      {/* Desktop Design */}
      <div className="hidden md:flex gap-4 w-full items-start">
        <div className="w-full flex flex-col gap-5 flex-grow flex-1">
          <div className="border border-neutral-200 px-[30px] py-[18px]  rounded-md">
            <div className="p-3">
              <UI_Typography className="text-neutral-900 med16">
                انتخاب روش پرداخت
              </UI_Typography>
            </div>
            {/* payment methods */}
            <div className="flex items-start gap-6 mt-4">
              <Checkbox defaultChecked className="mt-1" />

              <CreditCard />
              <div className="flex flex-col gap-4">
                <UI_Typography className="text-neutral-700 med14">
                  پرداخت اینترنتی
                </UI_Typography>
                <UI_Typography className="text-neutral-500 med14">
                  پرداخت آنلاین با تمامی کارت‌های بانکی
                </UI_Typography>
              </div>
            </div>
          </div>
          {/* summary */}
          <div className="border border-neutral-200 px-[30px] py-[18px]  rounded-md flex flex-col gap-4">
            <UI_Typography className="text-neutral-900 med16">
              خلاصه سفارش
            </UI_Typography>
            <div className="flex items-center mt-5 gap-3">
              <Truck className="text-red-600" />
              <UI_Typography className="text-neutral-500 med14">
                {get.formattedDeliveryDate}
              </UI_Typography>

              <div className="bg-neutral-100 px-[8px] rounded-[16px]">
                <UI_Typography>
                  {get.cartData?.cartItems.length} کالا
                </UI_Typography>
              </div>
            </div>
            <UI_Typography className="text-neutral-600 reg12">
              ارسال عادی - هزینه ارسال :{" "}
              {get.cartData?.deliveryCost.cost.toLocaleString()} تومان
            </UI_Typography>
          </div>
          {/* discount code */}
          <div className="border border-neutral-200 px-[30px] py-[18px]  rounded-md flex flex-col gap-4">
            <UI_Typography className="text-neutral-900 med16">
              کد تخفیف
            </UI_Typography>
            <UI_Typography className="text-neutral-500 med14">
              می‌توانید در صورت امکان از کدهای ذخیره‌شده انتخاب کنید، یا خودتان
              یک کد وارد کنید.
            </UI_Typography>
            <div className="flex items-center gap-3">
              <Input
                className="w-[20%] placeholder:text-lg text-lg"
                placeholder="اینجا بنویسید"
              />
              <Button>
                <UI_Typography className="reg14">ثبت</UI_Typography>
              </Button>
            </div>
          </div>
          {/* information */}
          <div className="border border-neutral-200 px-[30px] py-[18px]  rounded-md flex gap-4">
            <OctagonAlert className="text-neutral-500" />
            <UI_Typography className="text-neutral-500 med14">
              برای دریافت فاکتور، بعد از دریافت سفارش به حساب کاربری و صفحه
              جزئیات سفارش سر بزنید
            </UI_Typography>
          </div>
        </div>

        {get.cartData && (
          <PriceDetailAside
            cartPrice={get.cartData.price}
            discountPrice={get.cartData.discountPrice}
            profitFromDiscount={get.cartData.profitFromDiscount}
            deliveryCost={get.cartData.deliveryCost?.cost}
            submitButtonText="پرداخت"
            onSubmit={on.handleCreateOrder}
          />
        )}
      </div>
    </section>
  );
};
