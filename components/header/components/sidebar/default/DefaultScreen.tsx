import { SheetHeader } from "@/components/ui/sheet";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { GetAllCategoriesResponse } from "@/services/types/categoryService.types";
import Image from "next/image";
import SidebarBox from "../SidebarBox";

type DefaultScreenProps = {
  handleSetShowBrands: () => void;
  parentCategories: GetAllCategoriesResponse;
  handleShowSubCategory: () => void;
};

const DefaultScreen = ({
  handleSetShowBrands,
  parentCategories,
  handleShowSubCategory,
}: DefaultScreenProps) => {
  return (
    <>
      <SheetHeader className="mt-5">دسته بندی ها</SheetHeader>
      <div className="grid grid-cols-2 gap-3 mt-5">
        <SidebarBox onClick={handleSetShowBrands}>
          <UI_Typography>برند ها</UI_Typography>
        </SidebarBox>

        {parentCategories?.map((parentCategory) => (
          <SidebarBox
            href="#"
            key={parentCategory.id}
            onClick={handleShowSubCategory}
          >
            <Image
              src={parentCategory.parentImage}
              alt={parentCategory.name}
              width={30}
              height={30}
            />
            <UI_Typography>{parentCategory.name}</UI_Typography>
          </SidebarBox>
        ))}
      </div>
    </>
  );
};

export default DefaultScreen;
