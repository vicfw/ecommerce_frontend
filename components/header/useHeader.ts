"use client";

import { getClientSideCookie } from "@/lib/utils";
import { useGlobalStore } from "@/store/globalStore";
import { useLayoutEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export const useHeader = () => {
  const { handleOpenSidebar, cartLength } = useGlobalStore(
    useShallow((state) => ({
      openSidebar: state.openSidebar,
      handleOpenSidebar: state.handleOpenSidebar,
      cartLength: state.cartLength,
    }))
  );

  const token = getClientSideCookie("jwt");
  const [isLoaded, setIsLoaded] = useState(false);

  // this code exist because of hydration error https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  useLayoutEffect(() => {
    setIsLoaded(true);
  }, []);

  return { get: { token, isLoaded, cartLength }, on: { handleOpenSidebar } };
};
