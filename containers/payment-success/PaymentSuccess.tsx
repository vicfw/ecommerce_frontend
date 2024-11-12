"use client";

import { Container } from "@/components/container/Container";
import { usePaymentSuccess } from "./usePaymentSuccess";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Button } from "@/components/ui/button";
import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";

const PaymentSuccess = () => {
  const { get } = usePaymentSuccess();

  return (
    <Container component={"main"}>
      <div className="flex justify-between items-start gap-5 border-b w-full pb-5">
        <div className="flex flex-col gap-3">
          <UI_Typography variant="Medium/Med20" className="text-green-600">
            سفارش شما با موفقیت انجام شد.
          </UI_Typography>
          <UI_Typography variant="Regular/Reg16" className="text-neutral-600">
            شماره سفارش شما: {get.orderId}
          </UI_Typography>
          <UI_Typography variant="Regular/Reg16" className="text-neutral-600">
            مبلغ پرداختی شما: {get.orderData?.totalAmount.toLocaleString()}{" "}
            تومان
          </UI_Typography>

          <div className="flex gap-2 items-start">
            <Link href="/profile/orders">
              <Button variant="default">
                <UI_Typography variant="Regular/Reg16">
                  پیگیری سفارش
                </UI_Typography>
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">
                <UI_Typography variant="Regular/Reg16">
                  بازگشت به صفحه اصلی
                </UI_Typography>
              </Button>
            </Link>
          </div>
        </div>
        <div className="h-full flex items-center">
          <ShoppingBasketIcon size="90px" className="text-green-600" />
        </div>
      </div>
    </Container>
  );
};

export default PaymentSuccess;
