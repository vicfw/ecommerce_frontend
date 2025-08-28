import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import SidebarBox from "./SidebarBox";
import { useSidebar } from "./useSidebar";
import Brands from "./brands/Brands";

const Sidebar = () => {
  const { get, on } = useSidebar();

  return (
    <Sheet open={get.openSidebar} onOpenChange={on.handleOpenSidebar}>
      <SheetContent className="md:hidden w-[80%]" side="left">
        {get.showBrands ? (
          <>
            <SheetHeader>
              <div className="flex items-center justify-between mt-5">
                <span className="flex-1">برند ها</span>
                <ChevronLeft onClick={on.handleSetShowBrands} />
              </div>
            </SheetHeader>
            <div className=" mt-5">
              <Brands />
            </div>
          </>
        ) : (
          <>
            <SheetHeader className="mt-5">دسته بندی ها</SheetHeader>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <SidebarBox onClick={on.handleSetShowBrands}>
                <UI_Typography>برند ها</UI_Typography>
              </SidebarBox>

              {get.categories?.map((category) => (
                <SidebarBox
                  href="#"
                  key={category.id}
                  onClick={on.handleOpenSidebar}
                >
                  <UI_Typography>{category.name}</UI_Typography>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={50}
                    height={50}
                  />
                </SidebarBox>
              ))}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
