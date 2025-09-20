"use client";

import { useGlobalStore } from "@/store/globalStore";
import { AlignJustify } from "lucide-react";
import React from "react";
import { useShallow } from "zustand/react/shallow";

const HamburgerMenu = () => {
  const { handleOpenSidebar } = useGlobalStore(
    useShallow((state) => ({
      handleOpenSidebar: state.handleOpenSidebar,
    }))
  );

  return (
    <div className="md:hidden cursor-pointer" onClick={handleOpenSidebar}>
      <AlignJustify className="text-main md:w-7 md:h-7 h-7 w-7 mt-[2px]" />
    </div>
  );
};

export default HamburgerMenu;
