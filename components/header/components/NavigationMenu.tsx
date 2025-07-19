"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { REGISTER_PAGE_LINK } from "@/constants";
import { getClientSideCookie } from "@/lib/utils";
import { Captions, ChevronDown, LogIn, User } from "lucide-react";
import Link from "next/link";
import { Fragment, useMemo, useState } from "react";

export function NavigationMenu() {
  const token = getClientSideCookie("jwt");
  const [open, setOpen] = useState(false);

  const menuItems = useMemo(() => {
    return [
      {
        name: "سفارش ها",
        href: "/profile/orders?activeTab=PROCESSING",
        icon: Captions,
      },
    ];
  }, []);

  const handleOnOpenChange = (open: boolean) => {
    setOpen(open);
  };

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
                key={item.name}
                className="text-right"
                onClick={() => setOpen(false)}
              >
                <DropdownMenuLabel className="flex items-center justify-end gap-4">
                  <UI_Typography className="text-neutral-700 med14">
                    {item.name}
                  </UI_Typography>
                  <item.icon size={20} className="text-neutral-700" />
                </DropdownMenuLabel>
              </Link>
              {index !== menuItems.length - 1 && <DropdownMenuSeparator />}
            </Fragment>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
