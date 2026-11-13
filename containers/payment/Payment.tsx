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

  const couponSection = (suffix: "mobile" | "desktop") => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Input
          className="flex-1 text-sm"
          placeholder="کد تخفیف"
          value={get.couponInput}
          onChange={(e) => on.setCouponInput(e.target.value)}
          data-testid={`payment-coupon-input-${suffix}`}
          disabled={Boolean(get.cartData?.couponCode)}
        />
        {get.cartData?.couponCode ? (
          <Button
            size="sm"
            variant="outline"
            onClick={on.handleRemoveCoupon}
            loading={get.isCouponBusy}
            data-testid={`payment-coupon-remove-${suffix}`}
          >
            <UI_Typography className="text-xs">حذف</UI_Typography>
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={on.handleApplyCoupon}
            loading={get.isCouponBusy}
            data-testid={`payment-coupon-apply-${suffix}`}
          >
            <UI_Typography className="text-xs">ثبت</UI_Typography>
          </Button>
        )}
      </div>
      {get.couponError ? (
        <UI_Typography
          className="text-destructive text-xs"
          data-testid={`payment-coupon-error-${suffix}`}
        >
          {get.couponError}
        </UI_Typography>
      ) : null}
    </div>
  );

  return (
    <section className="flex flex-col gap-4 w-full pb-16">
      {/* Mobile Design */}
      <div className="md:hidden">
        <div className="mb-6">
          <ShopTimeline currentStep="checkout" />
        </div>

        <div className="border border-border px-4 py-4 rounded-lg mb-4">
          <UI_Typography className="text-foreground font-medium mb-4">
            انتخاب روش پرداخت
          </UI_Typography>

          <div className="flex items-start gap-4">
            <Checkbox defaultChecked className="mt-1" />
            <CreditCard className="text-muted-foreground" size={20} />
            <div className="flex flex-col gap-2">
              <UI_Typography className="text-foreground text-sm font-medium">
                پرداخت اینترنتی
              </UI_Typography>
              <UI_Typography className="text-muted-foreground text-xs">
                پرداخت آنلاین با تمامی کارت‌های بانکی
              </UI_Typography>
            </div>
          </div>
        </div>

        <div className="border border-border px-4 py-4 rounded-lg mb-4">
          <UI_Typography className="text-foreground font-medium mb-4">
            خلاصه سفارش
          </UI_Typography>

          <div className="flex items-center gap-3 mb-3">
            <Truck className="text-destructive" size={18} />
            <UI_Typography className="text-muted-foreground text-sm">
              {get.formattedDeliveryDate}
            </UI_Typography>
            <div className="bg-muted px-2 py-1 rounded-full">
              <UI_Typography className="text-xs">
                {get.cartData?.cartItems.length} کالا
              </UI_Typography>
            </div>
          </div>

          <UI_Typography className="text-muted-foreground text-xs">
            ارسال عادی - هزینه ارسال :{" "}
            {get.cartData?.deliveryCost.cost.toLocaleString()} تومان
          </UI_Typography>
        </div>

        <div className="border border-border px-4 py-4 rounded-lg mb-4">
          <UI_Typography className="text-foreground font-medium" component="p">
            کد تخفیف
          </UI_Typography>
          <UI_Typography className="text-muted-foreground text-xs mb-3">
            کد تخفیف خود را وارد کنید.
          </UI_Typography>
          {couponSection("mobile")}
        </div>

        <div className="border border-border px-4 py-4 rounded-lg mb-4">
          <div className="flex gap-3">
            <OctagonAlert className="text-muted-foreground" size={18} />
            <UI_Typography className="text-muted-foreground text-xs">
              برای دریافت فاکتور، بعد از دریافت سفارش به حساب کاربری و صفحه
              جزئیات سفارش سر بزنید
            </UI_Typography>
          </div>
        </div>

        {get.cartData && (
          <MobilePriceDetail
            cartPrice={get.cartData.price}
            discountPrice={get.cartData.discountPrice}
            profitFromDiscount={get.cartData.profitFromDiscount}
            couponAmount={get.cartData.couponAmount || 0}
            deliveryCost={get.cartData.deliveryCost.cost}
            submitButtonText="پرداخت"
            onSubmit={on.handleCreateOrder}
            loading={get.isPending}
          />
        )}
      </div>

      {/* Desktop Design */}
      <div className="hidden md:flex gap-4 w-full items-start">
        <div className="w-full flex flex-col gap-5 flex-grow flex-1">
          <ShopTimeline currentStep="checkout" />
          <div className="border border-border px-[30px] py-[18px] rounded-md">
            <div className="p-3">
              <UI_Typography className="text-foreground med16">
                انتخاب روش پرداخت
              </UI_Typography>
            </div>
            <div className="flex items-start gap-6 mt-4">
              <Checkbox defaultChecked className="mt-1" />
              <CreditCard />
              <div className="flex flex-col gap-4">
                <UI_Typography className="text-foreground med14">
                  پرداخت اینترنتی
                </UI_Typography>
                <UI_Typography className="text-muted-foreground med14">
                  پرداخت آنلاین با تمامی کارت‌های بانکی
                </UI_Typography>
              </div>
            </div>
          </div>
          <div className="border border-border px-[30px] py-[18px] rounded-md flex flex-col gap-4">
            <UI_Typography className="text-foreground med16">
              خلاصه سفارش
            </UI_Typography>
            <div className="flex items-center mt-5 gap-3">
              <Truck className="text-destructive" />
              <UI_Typography className="text-muted-foreground med14">
                {get.formattedDeliveryDate}
              </UI_Typography>
              <div className="bg-muted px-[8px] rounded-[16px]">
                <UI_Typography>
                  {get.cartData?.cartItems.length} کالا
                </UI_Typography>
              </div>
            </div>
            <UI_Typography className="text-muted-foreground reg12">
              ارسال عادی - هزینه ارسال :{" "}
              {get.cartData?.deliveryCost.cost.toLocaleString()} تومان
            </UI_Typography>
          </div>
          <div className="border border-border px-[30px] py-[18px] rounded-md flex flex-col gap-4">
            <UI_Typography className="text-foreground med16">
              کد تخفیف
            </UI_Typography>
            <UI_Typography className="text-muted-foreground med14">
              کد تخفیف خود را وارد کنید.
            </UI_Typography>
            {couponSection("desktop")}
          </div>
          <div className="border border-border px-[30px] py-[18px] rounded-md flex gap-4">
            <OctagonAlert className="text-muted-foreground" />
            <UI_Typography className="text-muted-foreground med14">
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
            couponAmount={get.cartData.couponAmount || 0}
            deliveryCost={get.cartData.deliveryCost?.cost}
            submitButtonText="پرداخت"
            onSubmit={on.handleCreateOrder}
            loading={get.isPending}
          />
        )}
      </div>
    </section>
  );
};
