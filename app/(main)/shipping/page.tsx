import Shipping from "@/containers/shipping/Shipping";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const ShippingPage = async () => {
  const token = cookies().get("jwt");
  if (!token) redirect("/register");

  return <Shipping />;
};

export default ShippingPage;
