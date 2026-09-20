import { getClientSideCookie } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { CartService } from "@/services/cartService";
import { PaymentService } from "@/services/paymentService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { addDays, parseISO } from "date-fns";
import { format } from "date-fns-jalali";
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSubmitLock } from "@/hooks/use-submit-lock";

export const usePayment = () => {
  const token = getClientSideCookie("jwt");
  const router = useRouter();
  const { isSubmitting, tryLock, unlock } = useSubmitLock();

  const { data: cartData } = useQuery({
    queryKey: ["get-cart"],
    queryFn: () => {
      const cartService = new CartService();
      return cartService.getCart();
    },
    enabled: Boolean(token),
    select: (data) => data.data.data,
  });

  // Redirect to main page if no cart data
  useEffect(() => {
    if (token && cartData === null) {
      router.replace("/");
    }
  }, [cartData, token, router]);

  const { mutateAsync: paymentRequest, isPending } = useMutation({
    mutationFn: () => {
      const paymentService = new PaymentService();
      return paymentService.paymentRequest();
    },
  });

  const handleCreateOrder = async () => {
    if (isPending || !tryLock()) return;
    let redirected = false;

    try {
      const paymentRequestResult = await paymentRequest();
      const payment = paymentRequestResult.data.data;

      if (payment.message === "success" && payment.result === 100) {
        redirected = true;
        window.location.href = `https://gateway.zibal.ir/start/${payment.trackId}`;
        return;
      }

      toast({
        title: "خطا در پرداخت",
        description: "درخواست پرداخت ناموفق بود. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toast({
            title: "در حال انتقال به درگاه",
            description: "درخواست پرداخت شما در حال پردازش است.",
          });
          return;
        }

        const cause = error.response?.data?.cause;
        if (cause === "quantity limit") {
          toast({
            title: "موجودی کافی نیست",
            description:
              "موجودی یکی از محصولات سبد خرید کافی نیست. لطفاً سبد را بررسی کنید.",
            variant: "destructive",
          });
          return;
        }
      }

      toast({
        title: "خطا در پرداخت",
        description: "لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      if (!redirected) {
        unlock();
      }
    }
  };

  const formattedDeliveryDate = useMemo(() => {
    if (!cartData) return "";
    const add2Days = addDays(new Date(), 2);
    const date = parseISO(add2Days.toISOString());
    return format(date, "eeee d MMMM");
  }, [cartData]);

  return {
    get: { cartData, formattedDeliveryDate, isPending: isPending || isSubmitting },
    on: { handleCreateOrder },
  };
};
