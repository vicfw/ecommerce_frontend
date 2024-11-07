"use client";

import { Card } from "@/components/ui/card";
import { PaymentService } from "@/services/paymentService";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PaymentLoader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trackId = searchParams.get("trackId") || "";

  const { mutate: paymentVerify } = useMutation({
    mutationFn: () => {
      const paymentService = new PaymentService();

      return paymentService.paymentVerify(trackId);
    },
    onSuccess: (res) => {
      const data = res.data;

      if (data.success) {
        router.replace(`/payment/success?orderId=${data.data.orderId}`);
      } else {
        router.replace(`/payment/fail`);
      }
    },
  });

  useEffect(() => {
    paymentVerify();
  }, []);

  return <Card className="py-2 px-4">در حال انتقال به صفحه مورد نظر</Card>;
};

export default PaymentLoader;
