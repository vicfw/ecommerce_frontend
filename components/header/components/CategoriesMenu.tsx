"use client";

import { useGlobalStore } from "@/store/globalStore";
import { Menu } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Button } from "@/components/ui/button";

const CategoriesMenu = () => {
  const { handleOpenSidebar } = useGlobalStore(
    useShallow((state) => ({
      handleOpenSidebar: state.handleOpenSidebar,
    })),
  );

  return (
    <Button
      type="button"
      variant="outline"
      className="hidden md:flex items-center gap-2 shrink-0"
      onClick={handleOpenSidebar}
    >
      <Menu size={18} className="text-main" />
      <UI_Typography className="text-main med12">دسته‌بندی</UI_Typography>
    </Button>
  );
};

export default CategoriesMenu;
