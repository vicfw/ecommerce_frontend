"use client";

import Loader from "@/components/Loader/Loader";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { OrderService } from "@/services/oderService";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type TabItemProps = {
  title: string;
  count: number;
  engTitle: string;
};

const orderService = new OrderService();

const TabItem = ({ title, count, engTitle }: TabItemProps) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("activeTab");
  const router = useRouter();
  const pathname = usePathname();

  const isActive = useMemo(() => activeTab === engTitle, [activeTab]);

  const handleRedirect = () => {
    router.push(`${pathname}?activeTab=${engTitle}`);
  };

  const { isPending: orderStatusCountPending } = useQuery({
    queryKey: ["orderStatusCount"],
    queryFn: () => orderService.getOrderStatusCount(),
    enabled: false,
  });

  return (
    <div
      className="flex items-center gap-1 md:gap-2 relative pb-3 cursor-pointer transition-all duration-200 hover:opacity-80"
      onClick={handleRedirect}
    >
      <UI_Typography className="text-neutral-500 reg12 md:reg14 whitespace-nowrap">
        {title}
      </UI_Typography>

      <div className="w-4 h-4 md:w-5 md:h-5 bg-neutral-500 flex justify-center items-center rounded-md flex-shrink-0">
        {Boolean(orderStatusCountPending) ? (
          <Loader className="text-white" size={10} />
        ) : (
          <UI_Typography className="text-white reg10 md:reg14">
            {count}
          </UI_Typography>
        )}
      </div>

      {isActive && (
        <div className="absolute h-[3px] md:h-[4px] rounded-sm w-full bg-secondary bottom-0" />
      )}
    </div>
  );
};

export default TabItem;
