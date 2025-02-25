import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { useSidebar } from "./useSidebar";

const Sidebar = () => {
  const { get, on } = useSidebar();

  return (
    <Sheet open={get.openSidebar} onOpenChange={on.handleOpenSidebar}>
      <SheetContent className="md:hidden w-[80%]" side="left">
        <SheetHeader>دسته بندی ها</SheetHeader>
        <div className="grid grid-cols-2 gap-3 mt-5">
          {get.categories?.map((category) => (
            <div
              key={category.id}
              className="border rounded-lg flex items-center py-[8px] px-[16px] gap-2  max-h-[40px] justify-center"
            >
              {category.name}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
