import { getClientSideCookie } from "@/lib/utils";
import { CartService } from "@/services/cartService";
import { OrderService } from "@/services/oderService";
import { PaymentService } from "@/services/paymentService";
import { Order } from "@/types/globalTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addDays, parseISO } from "date-fns";
import { format } from "date-fns-jalali";
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";

export const usePayment = () => {
  const token = getClientSideCookie("jwt");
  const router = useRouter();

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

  const { mutateAsync: createOrder } = useMutation({
    mutationFn: () => {
      const orderService = new OrderService();
      return orderService.createOrder();
    },
  });

  const { mutateAsync: paymentRequest } = useMutation({
    mutationFn: ({ amount, orderId }: { orderId: number; amount: number }) => {
      const paymentService = new PaymentService();
      return paymentService.paymentRequest(amount, orderId);
    },
  });

  const handleCreateOrder = async () => {
    const orderResponse = await createOrder();
    const order = orderResponse.data.data;

    if (order.id && order.totalAmount) {
      handlePayment(order);
    }
  };

  const handlePayment = async (order: Order) => {
    const paymentRequestResult = await paymentRequest({
      amount: order.totalAmount,
      orderId: order.id,
    });

    const payment = paymentRequestResult.data.data;

    if (payment.message === "success" && payment.result === 100) {
      window.location.href = `https://gateway.zibal.ir/start/${payment.trackId}`;
    }
  };

  const formattedDeliveryDate = useMemo(() => {
    if (!cartData) return "";
    const add2Days = addDays(new Date(), 2);
    const date = parseISO(add2Days.toISOString());
    return format(date, "eeee d MMMM");
  }, [cartData]);

  return {
    get: { cartData, formattedDeliveryDate },
    on: { handleCreateOrder },
  };
};
