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
      <div className="flex flex-col items-center text-center py-8 px-4 md:gap-8 md:py-8 w-full md:justify-center">
        <div className="mb-6 md:mb-0 md:flex md:items-center md:gap-4 md:text-right">
          <CheckCircle
            size={64}
            className="text-green-600 mx-auto md:mx-0 md:w-12 md:h-12"
          />
          <div className="mt-4 md:mt-0">
            <UI_Typography className="text-green-600 font-medium text-lg md:text-2xl mb-2">
              سفارش شما با موفقیت انجام شد.
            </UI_Typography>
            <UI_Typography className="text-neutral-500 text-sm md:text-base hidden md:block">
              سفارش شما ثبت شده و در حال پردازش است.
            </UI_Typography>
          </div>
        </div>

        <div className="bg-neutral-50 rounded-lg p-4 md:p-6 w-full max-w-lg mb-6 md:mb-0 md:border md:border-neutral-200">
          <UI_Typography className="text-neutral-800 font-medium text-lg mb-4 hidden md:block text-right">
            جزئیات سفارش
          </UI_Typography>

          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
            <div className="flex justify-between items-center md:flex-col md:items-start md:gap-2">
              <UI_Typography className="text-neutral-600 text-sm">
                شماره سفارش:
              </UI_Typography>
              <UI_Typography className="text-neutral-800 font-medium md:text-lg">
                {get.orderId}
              </UI_Typography>
            </div>

            <div className="flex justify-between items-center md:flex-col md:items-start md:gap-2">
              <UI_Typography className="text-neutral-600 text-sm">
                مبلغ پرداختی:
              </UI_Typography>
              <UI_Typography className="text-neutral-800 font-medium md:text-lg">
                {get.orderData?.totalAmount.toLocaleString()} تومان
              </UI_Typography>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto">
          <Link
            href="/profile/orders?activeTab=processing"
            className="w-full md:w-auto"
          >
            <Button className="w-full md:px-8" size="lg">
              <UI_Typography className="text-white text-sm md:text-base font-medium">
                پیگیری سفارش
              </UI_Typography>
            </Button>
          </Link>

          <Link href="/" className="w-full md:w-auto">
            <Button variant="outline" className="w-full md:px-8" size="lg">
              <UI_Typography className="text-neutral-700 text-sm md:text-base font-medium">
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
