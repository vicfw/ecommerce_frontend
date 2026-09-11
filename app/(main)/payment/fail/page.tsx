import PaymentFailContainer from "@/containers/payment-fail/PaymentFail";
import { Suspense } from "react";

const PaymentFailPage = () => {
  return (
    <Suspense>
      <PaymentFailContainer />
    </Suspense>
  );
};

export default PaymentFailPage;
