"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { REGISTER_PAGE_LINK } from "@/constants";
import { useLogout } from "@/hooks/use-logout";
import { getClientSideCookie } from "@/lib/utils";
import { useGlobalStore } from "@/store/globalStore";
import { Captions, ChevronDown, LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";

export function NavigationMenu() {
  const [token, setToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);
  const { logout } = useLogout();
  const storeToken = useGlobalStore((state) => state.token);

  useEffect(() => {
    setIsClient(true);
    const jwtToken = getClientSideCookie("jwt") || storeToken || null;
    setToken(jwtToken || null);
  }, [storeToken]);

  const menuItems = useMemo(
    () => [
      {
        name: "سفارش ها",
        href: "/profile/orders?activeTab=processing",
        icon: Captions,
      },
      {
        name: "حساب کاربری",
        href: "/profile/personal-info",
        icon: User,
      },
    ],
    []
  );

  const handleOnOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleLogout = async () => {
    setOpen(false);
    await logout();
  };

  if (!isClient) {
    return (
      <div className="border rounded-lg flex items-center py-[8px] px-[16px] gap-2 max-h-[40px] justify-center">
        <div className="flex items-center gap-2">
          <User className="text-main" />
          <ChevronDown className="text-main" />
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={handleOnOpenChange}>
      <DropdownMenuTrigger
        className="border rounded-lg flex items-center py-[8px] px-[16px] gap-2  max-h-[40px] justify-center"
        asChild
      >
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer">
            <User className="text-main" />
            <ChevronDown className="text-main" />
          </div>
        ) : (
          <Link href={REGISTER_PAGE_LINK} className="flex items-center gap-2">
            <LogIn className="text-main" />
            <UI_Typography className="text-main med12">
              ورود | ثبت نام
            </UI_Typography>
          </Link>
        )}
      </DropdownMenuTrigger>
      {token && (
        <DropdownMenuContent className="w-56">
          {menuItems.map((item, index) => (
            <Fragment key={item.name}>
              <Link
                href={item.href}
                className="text-right"
                onClick={() => setOpen(false)}
              >
                <DropdownMenuLabel className="flex items-center justify-end gap-4">
                  <UI_Typography className="text-foreground med14">
                    {item.name}
                  </UI_Typography>
                  <item.icon size={20} className="text-foreground" />
                </DropdownMenuLabel>
              </Link>
              {index !== menuItems.length - 1 && <DropdownMenuSeparator />}
            </Fragment>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer justify-end gap-4 text-destructive focus:text-destructive"
            onSelect={handleLogout}
          >
            <UI_Typography className="text-destructive med14">
              خروج
            </UI_Typography>
            <LogOut size={20} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
