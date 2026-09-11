"use client";

import UI_Typography from "@/components/ui/typography/UI_Typography";
import { HomeIcon, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileBottomMenu = () => {
  const pathname = usePathname();

  // Define an array of paths that should return null
  const hiddenPaths = [
    "/products/",
    "/checkout",
    "/order-summary",
    "/cart",
    "/shipping",
    "/payment",
  ];

  // Check if pathname starts with any of the hidden paths
  if (hiddenPaths.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-background border-t border-border shadow-lg z-50">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Home */}
        <Link
          href="/"
          className="flex flex-col justify-center items-center min-w-[60px] group"
        >
          <div className="flex justify-center items-center">
            <HomeIcon
              size={20}
              className={`transition-colors duration-200 ${
                pathname === "/"
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-foreground"
              }`}
            />
          </div>
          <UI_Typography
            className={`text-xs transition-colors duration-200 ${
              pathname === "/"
                ? "text-primary font-medium"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          >
            خانه
          </UI_Typography>
        </Link>

        {/* Shopping Cart */}
        <Link
          href="/cart"
          className="flex flex-col justify-center items-center min-w-[60px] group"
        >
          <div className="flex justify-center items-center relative">
            <ShoppingCart
              size={20}
              className={`transition-colors duration-200 ${
                pathname === "/cart"
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-foreground"
              }`}
            />
          </div>
          <UI_Typography
            className={`text-xs transition-colors duration-200 ${
              pathname === "/cart"
                ? "text-primary font-medium"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          >
            سبد خرید
          </UI_Typography>
        </Link>

        {/* User Profile */}
        <Link
          href="/profile/personal-info"
          className="flex flex-col justify-center items-center min-w-[60px] group"
        >
          <div className="flex justify-center items-center">
            <User
              size={20}
              className={`transition-colors duration-200 ${
                pathname.startsWith("/profile")
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-foreground"
              }`}
            />
          </div>
          <UI_Typography
            className={`text-xs transition-colors duration-200 ${
              pathname.startsWith("/profile")
                ? "text-primary font-medium"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          >
            پروفایل
          </UI_Typography>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomMenu;
