import PaymentLoadingContainer from "@/containers/payment-loader/PaymentLoader";
import { Suspense } from "react";

const PaymentLoadingPage = () => {
  return (
    <Suspense>
      <PaymentLoadingContainer />
    </Suspense>
  );
};

export default PaymentLoadingPage;
