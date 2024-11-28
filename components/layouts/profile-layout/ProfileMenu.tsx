"use client";

import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Edit3 } from "lucide-react";
import Link from "next/link";
import { useProfileMenu } from "./useProfileMenu";
import { cn } from "@/lib/utils";

const Menu = () => {
  const { get } = useProfileMenu();

  return (
    <div>
      <div className="flex gap-2 justify-between items-center px-3">
        <div className="flex flex-col">
          <UI_Typography variant="Medium/Med16" className="text-neutral-800">
            {get.userInfo?.name} {get.userInfo?.lastName}
          </UI_Typography>

          <UI_Typography variant="Regular/Reg14" className="text-neutral-400">
            {get.userInfo?.phoneNumber}
          </UI_Typography>
        </div>
        <Link href="/profile/personal-info">
          <Edit3 className="text-secondary cursor-pointer" size={23} />
        </Link>
      </div>
      <ul className="flex flex-col mt-2">
        {get.menuItems.map((menuItem) => (
          <Link href={menuItem.link} key={menuItem.name}>
            <li
              className={cn(
                "relative flex gap-4 items-center border-t   py-[12px] w-full hover:bg-[#f2f2f2] px-3"
              )}
            >
              <menuItem.icon size={20} className="text-neutral-700" />
              <UI_Typography
                variant={
                  get.pathname === menuItem.link
                    ? "Medium/Med14"
                    : "Regular/Reg14"
                }
                className="text-neutral-700"
              >
                {menuItem.name}
              </UI_Typography>
              {get.pathname.split("/")[2] ===
              menuItem.link.split("/")[2].split("?")[0] ? (
                <div className="absolute right-0 w-[4px] bg-red-600 h-[36px] rounded-sm" />
              ) : null}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
