import PaymentSuccessContainer from "@/containers/payment-success/PaymentSuccess";
import { Suspense } from "react";

const PaymentSuccessPage = () => {
  return (
    <Suspense>
      <PaymentSuccessContainer />
    </Suspense>
  );
};

export default PaymentSuccessPage;
