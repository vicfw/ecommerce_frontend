"use client";

import { getCookie } from "cookies-next";

export function useIsMobile() {
  const viewport = getCookie("viewport");
  return viewport === "mobile";
}
