"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    const viewport = getCookie("viewport");
    return viewport === "mobile";
  });

  useEffect(() => {
    const checkIsMobile = () => {
      const newIsMobile = window.innerWidth < 768; // Adjust this breakpoint as needed
      setIsMobile(newIsMobile);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}
