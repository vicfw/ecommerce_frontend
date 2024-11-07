"use client";

import { getClientSideCookie } from "@/lib/utils";
import { useGlobalStore } from "@/store/globalStore";
import { useLayoutEffect, useState } from "react";

export const useHeader = () => {
  const token = getClientSideCookie("jwt");
  const [isLoaded, setIsLoaded] = useState(false);
  const { cartLength } = useGlobalStore();

  // this code exist because of hydration error https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  useLayoutEffect(() => {
    setIsLoaded(true);
  }, []);

  return { get: { token, isLoaded, cartLength }, on: {} };
};
