import { getUserInfoFromCookies } from "@/lib/utils";
import { ShoppingBag, User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useProfileMenu = () => {
  const userInfo = getUserInfoFromCookies();
  const pathname = usePathname();

  const menuItems = useMemo(
    () => [
      {
        name: "سفارش ها",
        icon: ShoppingBag,
        link: "/profile/orders?activeTab=PROCESSING",
      },
      {
        name: "اطلاعات حساب کاربری",
        icon: User2,
        link: "/profile/personal-info",
      },
    ],
    []
  );

  return { get: { userInfo, menuItems, pathname }, on: {} };
};
