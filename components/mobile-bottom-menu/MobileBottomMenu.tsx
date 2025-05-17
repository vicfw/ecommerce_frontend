"use client";

import UI_Typography from "@/components/ui/typography/UI_Typography";
import { HomeIcon, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileBottomMenu = () => {
  const pathname = usePathname();

  // Define an array of paths that should return null
  const hiddenPaths = ["/products/", "/checkout", "/order-summary"];

  // Check if pathname starts with any of the hidden paths
  if (hiddenPaths.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 w-full flex px-4 bg-white border-t pt-1 pb-2 justify-between items-center z-50`}
    >
      {/* Home */}
      <Link
        href="/"
        className="flex flex-col justify-center items-center min-w-[60px]"
      >
        <HomeIcon color="#a1a3a8" />
        <UI_Typography className="text-neutral-500 text-xs">خانه</UI_Typography>
      </Link>
      {/* Shopping Cart */}
      <Link
        href="/cart"
        className="flex flex-col justify-center items-center min-w-[60px]"
      >
        <ShoppingCart color="#a1a3a8" />
        <UI_Typography className="text-neutral-500 text-xs">
          سبد خرید
        </UI_Typography>
      </Link>
      {/* User Profile */}
      <Link
        href="/"
        className="flex flex-col justify-center items-center min-w-[60px]"
      >
        <User color="#a1a3a8" />
        <UI_Typography className="text-neutral-500 text-xs">
          گل سرخ من
        </UI_Typography>
      </Link>
    </div>
  );
};

export default MobileBottomMenu;
