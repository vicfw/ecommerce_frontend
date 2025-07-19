"use client";

import { Container } from "@/components/container/Container";
import { Button } from "@/components/ui/button";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { usePaymentSuccess } from "./usePaymentSuccess";

const PaymentSuccess = () => {
  const { get } = usePaymentSuccess();

  return (
    <Container component={"main"}>
      {/* Mobile Design */}
      <div className="md:hidden w-full">
        <div className="flex flex-col items-center text-center py-8 px-4">
          {/* Success Icon */}
          <div className="mb-6">
            <CheckCircle size={64} className="text-green-600" />
          </div>

          {/* Success Message */}
          <UI_Typography className="text-green-600 font-medium text-lg mb-4">
            سفارش شما با موفقیت انجام شد.
          </UI_Typography>

          {/* Order Details */}
          <div className="bg-neutral-50 rounded-lg p-4 w-full mb-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <UI_Typography className="text-neutral-600 text-sm">
                  شماره سفارش:
                </UI_Typography>
                <UI_Typography className="text-neutral-800 font-medium">
                  {get.orderId}
                </UI_Typography>
              </div>

              <div className="flex justify-between items-center">
                <UI_Typography className="text-neutral-600 text-sm">
                  مبلغ پرداختی:
                </UI_Typography>
                <UI_Typography className="text-neutral-800 font-medium">
                  {get.orderData?.totalAmount.toLocaleString()} تومان
                </UI_Typography>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full">
            <Link
              href="/profile/orders?activeTab=PROCESSING"
              className="w-full"
            >
              <Button className="w-full">
                <UI_Typography className="text-white text-sm">
                  پیگیری سفارش
                </UI_Typography>
              </Button>
            </Link>

            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                <UI_Typography className="text-neutral-700 text-sm">
                  بازگشت به صفحه اصلی
                </UI_Typography>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Design */}
      <div className="hidden md:flex flex-col gap-8 py-8 w-full justify-center items-center">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <CheckCircle size={48} className="text-green-600" />
          <div>
            <UI_Typography className="text-green-600 font-medium text-2xl mb-2">
              سفارش شما با موفقیت انجام شد.
            </UI_Typography>
            <UI_Typography className="text-neutral-500 text-base">
              سفارش شما ثبت شده و در حال پردازش است.
            </UI_Typography>
          </div>
        </div>

        {/* Order Details Section */}
        <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
          <UI_Typography className="text-neutral-800 font-medium text-lg mb-4">
            جزئیات سفارش
          </UI_Typography>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <UI_Typography className="text-neutral-600 text-sm">
                شماره سفارش
              </UI_Typography>
              <UI_Typography className="text-neutral-800 font-medium text-lg">
                {get.orderId}
              </UI_Typography>
            </div>

            <div className="flex flex-col gap-2">
              <UI_Typography className="text-neutral-600 text-sm">
                مبلغ پرداختی
              </UI_Typography>
              <UI_Typography className="text-neutral-800 font-medium text-lg">
                {get.orderData?.totalAmount.toLocaleString()} تومان
              </UI_Typography>
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex gap-4">
          <Link href="/profile/orders?activeTab=PROCESSING">
            <Button size="lg" className="px-8">
              <UI_Typography className="text-white text-base font-medium">
                پیگیری سفارش
              </UI_Typography>
            </Button>
          </Link>

          <Link href="/">
            <Button variant="outline" size="lg" className="px-8">
              <UI_Typography className="text-neutral-700 text-base font-medium">
                بازگشت به صفحه اصلی
              </UI_Typography>
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default PaymentSuccess;
