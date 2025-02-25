"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import React from "react";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { HomeIcon, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { MOBILE_BOTTOM_MENU_HEIGHT } from "@/constants";

const MobileBottomMenu = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 w-full flex px-4 bg-white border-t pt-1 justify-between items-center h-[${MOBILE_BOTTOM_MENU_HEIGHT}px]`}
    >
      {/* Home */}
      <Link
        href="/"
        className="flex flex-col justify-center items-center min-w-[60px]"
      >
        <HomeIcon color="#a1a3a8" />
        <UI_Typography className="text-neutral-500">خانه</UI_Typography>
      </Link>
      {/* Shopping Cart */}
      <Link
        href="/cart"
        className="flex flex-col justify-center items-center min-w-[60px]"
      >
        <ShoppingCart color="#a1a3a8" />
        <UI_Typography className="text-neutral-500">سبد خرید</UI_Typography>
      </Link>
      {/* User Profile */}
      <Link
        href="/"
        className="flex flex-col justify-center items-center min-w-[60px]"
      >
        <User color="#a1a3a8" />
        <UI_Typography className="text-neutral-500">گل سرخ من</UI_Typography>
      </Link>
    </div>
  );
};

export default MobileBottomMenu;
