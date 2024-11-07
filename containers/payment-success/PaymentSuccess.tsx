"use client";

import { usePaymentSuccess } from "./usePaymentSuccess";

const PaymentSuccess = () => {
  const { get } = usePaymentSuccess();

  return <div>{get.orderData?.status}</div>;
};

export default PaymentSuccess;
