import OrdersContainer from "@/containers/profile/orders/Order";
import { Suspense } from "react";

const OrdersPage = () => {
  return (
    <Suspense>
      <OrdersContainer />
    </Suspense>
  );
};

export default OrdersPage;
