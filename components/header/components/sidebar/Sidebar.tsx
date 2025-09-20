"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import Brands from "./brands/Brands";
import { useSidebar } from "./useSidebar";
import DefaultScreen from "./default/DefaultScreen";
import { Brand } from "@/types/globalTypes";
import { FetchDataPaginatedResponse } from "@/services/types/config";
import SubCategory from "./sub-category/sub-category";

type SidebarProps = {
  brands: FetchDataPaginatedResponse<Brand[]>;
};

const Sidebar = ({ brands }: SidebarProps) => {
  const { get, on } = useSidebar();

  return (
    <Sheet open={get.openSidebar} onOpenChange={on.handleOpenSidebar}>
      <SheetContent className="md:hidden w-[80%]" side="left">
        {get.isDefaultScreen && (
          <DefaultScreen
            handleSetShowBrands={on.handleSetShowBrands}
            handleShowSubCategory={on.handleShowSubCategory}
            parentCategories={get.parentCategories || []}
          />
        )}
        {get.showBrands && (
          <Brands
            handleBrandClick={on.handleOpenSidebar}
            handleSetShowBrands={on.handleSetShowBrands}
            initialBrands={brands}
          />
        )}

        {get.showSubCategory && (
          <SubCategory
            handleShowSubCategory={on.handleShowSubCategory}
            // initialSubCategories={subCategories}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
