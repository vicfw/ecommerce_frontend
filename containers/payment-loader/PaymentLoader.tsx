"use client";

import { Card } from "@/components/ui/card";
import { PaymentService } from "@/services/paymentService";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoaderPinwheel, CreditCard, AlertCircle } from "lucide-react";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Button } from "@/components/ui/button";

const PaymentLoader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trackId = searchParams.get("trackId") || "";
  const orderId = searchParams.get("orderId");
  const callbackSuccess = searchParams.get("success");
  const callbackStatus = searchParams.get("status");
  const [hasError, setHasError] = useState(false);

  const { mutate: paymentVerify } = useMutation({
    mutationFn: () => {
      const paymentService = new PaymentService();
      return paymentService.paymentVerify({
        trackId,
        orderId,
        callbackSuccess,
        callbackStatus,
      });
    },
    onSuccess: (res) => {
      const data = res.data;

      if (data.success) {
        router.replace(`/payment/success?orderId=${data.data.orderId}`);
      } else {
        router.replace(`/payment/fail`);
      }
    },
    onError: () => {
      setHasError(true);
    },
  });

  useEffect(() => {
    paymentVerify();
  }, []);

  const handleRetry = () => {
    router.replace("/payment");
  };

  const handleGoHome = () => {
    router.replace("/");
  };

  if (hasError) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <Card className="p-6 text-center w-full max-w-sm md:max-w-md">
          <div className="flex justify-center mb-6">
            <AlertCircle className="text-destructive" size={48} />
          </div>

          <div className="mb-6">
            <UI_Typography className="text-neutral-800 font-medium mb-2">
              مشکلی در پرداخت پیش آمد
            </UI_Typography>
            <UI_Typography className="text-neutral-500 text-sm" component="p">
              پرداخت شما ناتمام ماند. لطفاً دوباره تلاش کنید.
            </UI_Typography>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <Button onClick={handleRetry} className="w-full md:flex-1">
              <UI_Typography className="text-white text-sm">
                تلاش مجدد
              </UI_Typography>
            </Button>
            <Button
              variant="outline"
              onClick={handleGoHome}
              className="w-full md:flex-1"
            >
              <UI_Typography className="text-neutral-700 text-sm">
                بازگشت به صفحه اصلی
              </UI_Typography>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <Card className="p-6 text-center w-full max-w-sm md:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <CreditCard className="text-primary" size={48} />
            <LoaderPinwheel
              className="absolute -top-2 -right-2 text-primary animate-spin"
              size={24}
            />
          </div>
        </div>

        <div className="mb-6">
          <UI_Typography className="text-neutral-800 font-medium mb-2">
            در حال پردازش پرداخت
          </UI_Typography>
          <UI_Typography className="text-neutral-500 text-sm" component="p">
            لطفاً صبر کنید...
          </UI_Typography>
        </div>

        <div className="flex justify-center">
          <div className="w-16 h-1 bg-neutral-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-pulse rounded-full" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentLoader;
