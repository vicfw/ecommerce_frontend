"use client";

import { getClientSideCookie } from "@/lib/utils";
import { useGlobalStore } from "@/store/globalStore";
import { useEffect, useState } from "react";

export const useHeader = () => {
  const token = getClientSideCookie("jwt");
  const [tokenState, setTokenState] = useState("");
  const { cartLength } = useGlobalStore();

  // this code exist because of hydration error https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  useEffect(() => {
    setTokenState(token ?? "");
  }, [token]);

  return { get: { token: tokenState, cartLength }, on: {} };
};
