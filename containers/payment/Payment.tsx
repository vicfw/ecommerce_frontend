"use client";

import { PriceDetailAside } from "@/components/price-detail-aside/PriceDetailAside";
import React from "react";
import { usePayment } from "./usePayment";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, OctagonAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const PaymentContainer = () => {
  const { get, on } = usePayment();

  return (
    <section className="flex gap-4 w-full items-start">
      <div className="w-full flex flex-col gap-5 flex-grow flex-1">
        <div className="border border-neutral-200 px-[30px] py-[18px]  rounded-md">
          <div className="p-3">
            <UI_Typography variant="Medium/Med16" className="text-neutral-900">
              انتخاب روش پرداخت
            </UI_Typography>
          </div>
          {/* payment methods */}
          <div className="flex items-start gap-6 mt-4">
            <Checkbox defaultChecked className="mt-1" />

            <CreditCard />
            <div className="flex flex-col gap-4">
              <UI_Typography
                variant="Medium/Med14"
                className="text-neutral-700"
              >
                پرداخت اینترنتی
              </UI_Typography>
              <UI_Typography
                variant="Medium/Med14"
                className="text-neutral-500"
              >
                پرداخت آنلاین با تمامی کارت‌های بانکی
              </UI_Typography>
            </div>
          </div>
        </div>
        <div className="border border-neutral-200 px-[30px] py-[18px]  rounded-md flex flex-col gap-4">
          <UI_Typography variant="Medium/Med16" className="text-neutral-900">
            کد تخفیف
          </UI_Typography>
          <UI_Typography variant="Medium/Med14" className="text-neutral-500">
            می‌توانید در صورت امکان از کدهای ذخیره‌شده انتخاب کنید، یا خودتان یک
            کد وارد کنید.
          </UI_Typography>
          <div className="flex items-center gap-3">
            <Input
              className="w-[20%] placeholder:text-lg text-lg"
              placeholder="اینجا بنویسید"
            />
            <Button>
              <UI_Typography variant="Regular/Reg14"> ثبت</UI_Typography>
            </Button>
          </div>
        </div>
        <div className="border border-neutral-200 px-[30px] py-[18px]  rounded-md flex flex gap-4">
          <OctagonAlert />
          <UI_Typography variant="Medium/Med14" className="text-neutral-500">
            برای دریافت فاکتور، بعد از دریافت سفارش به حساب کاربری و صفحه جزئیات
            سفارش سر بزنید
          </UI_Typography>
        </div>
      </div>

      {get.cartData && (
        <PriceDetailAside
          cartPrice={get.cartData.price}
          discountPrice={get.cartData.discountPrice}
          profitFromDiscount={get.cartData.profitFromDiscount}
          deliveryCost={get.deliveryCostData?.cost}
          submitButtonText="پرداخت"
          // href="/payment"
        />
      )}
    </section>
  );
};
