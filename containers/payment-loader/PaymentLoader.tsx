"use client";

import { Card } from "@/components/ui/card";
import { PaymentService } from "@/services/paymentService";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { CreditCard, LoaderPinwheel } from "lucide-react";
import UI_Typography from "@/components/ui/typography/UI_Typography";

const failPath = (
  reason: "cancelled" | "failed" | "expired" | "error",
  orderId?: string | number | null
) => {
  const params = new URLSearchParams({ reason });
  if (orderId) {
    params.set("orderId", String(orderId));
  }
  return `/payment/fail?${params.toString()}`;
};

const reasonFromMessage = (message?: string) => {
  if (!message) return "failed" as const;
  if (message.toLowerCase().includes("cancel")) return "cancelled" as const;
  if (message.toLowerCase().includes("expired")) return "expired" as const;
  return "failed" as const;
};

const PaymentLoader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trackId = searchParams.get("trackId") || "";
  const orderId = searchParams.get("orderId");
  const callbackSuccess = searchParams.get("success");
  const callbackStatus = searchParams.get("status");

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
      const resolvedOrderId = data.data?.orderId ?? orderId;

      if (data.success) {
        const successQuery = resolvedOrderId
          ? `?orderId=${resolvedOrderId}`
          : "";
        router.replace(`/payment/success${successQuery}`);
        return;
      }

      router.replace(failPath(reasonFromMessage(data.message), resolvedOrderId));
    },
    onError: () => {
      router.replace(failPath("error", orderId));
    },
  });

  useEffect(() => {
    paymentVerify();
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-sm p-6 text-center md:max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <CreditCard className="text-primary" size={48} />
            <LoaderPinwheel
              className="absolute -top-2 -right-2 animate-spin text-primary"
              size={24}
            />
          </div>
        </div>

        <div className="mb-6">
          <UI_Typography className="mb-2 font-medium text-foreground">
            در حال پردازش پرداخت
          </UI_Typography>
          <UI_Typography className="text-sm text-muted-foreground" component="p">
            لطفاً صبر کنید...
          </UI_Typography>
        </div>

        <div className="flex justify-center">
          <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
            <div className="h-full animate-pulse rounded-full bg-primary" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentLoader;
