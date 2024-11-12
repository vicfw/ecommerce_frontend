"use client";

import UI_Typography from "@/components/ui/typography/UI_Typography";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type TabItemProps = {
  title: string;
  count: number;
  engTitle: string;
};

const TabItem = ({ title, count, engTitle }: TabItemProps) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("activeTab");
  const router = useRouter();
  const pathname = usePathname();
  const isActive = useMemo(() => activeTab === engTitle, [activeTab]);

  const handleRedirect = () => {
    router.push(`${pathname}?activeTab=${engTitle}`);
  };

  return (
    <div
      className="flex items-center gap-2 relative pb-3 cursor-pointer"
      onClick={handleRedirect}
    >
      <UI_Typography variant="Regular/Reg14" className="text-neutral-500">
        {title}
      </UI_Typography>
      {count > 0 ? (
        <div className="w-5 h-5 bg-neutral-500 flex justify-center items-center rounded-md">
          <UI_Typography variant="Regular/Reg14" className="text-white">
            {count}
          </UI_Typography>
        </div>
      ) : null}
      {isActive && (
        <div className="absolute h-[4px] rounded-sm w-full bg-red-600 bottom-0" />
      )}
    </div>
  );
};

export default TabItem;
