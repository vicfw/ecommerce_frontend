"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { getClientSideCookie } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

const ProfileMenu = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle hydration error
  useLayoutEffect(() => {
    const jwtToken = getClientSideCookie("jwt");
    setToken(jwtToken || null);
    setIsLoaded(true);
  }, []);

  if (!isLoaded || !token) {
    return null;
  }

  return (
    <div className="md:hidden h-[32px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-neutral-50"
          >
            <User className="h-7 w-7 text-neutral-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end" forceMount>
          <DropdownMenuItem asChild>
            <Link
              href="/profile/personal-info"
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              <UI_Typography className="reg14">پروفایل</UI_Typography>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile/orders" className="flex items-center gap-2">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <UI_Typography className="reg14">سفارشات</UI_Typography>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileMenu;
