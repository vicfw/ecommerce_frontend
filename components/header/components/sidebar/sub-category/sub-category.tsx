import React, { useState } from "react";
import { SheetHeader } from "@/components/ui/sheet";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { ChevronLeft, ChevronDown, ChevronRight } from "lucide-react";

type SubCategoryProps = {
  handleShowSubCategory: () => void;
};

type CategoryLevel2 = {
  id: number;
  name: string;
  subcategories: CategoryLevel3[];
};

type CategoryLevel3 = {
  id: number;
  name: string;
};

const SubCategory = ({ handleShowSubCategory }: SubCategoryProps) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  // Mock data for demonstration
  const level2Categories: CategoryLevel2[] = [
    {
      id: 1,
      name: "لپ تاپ",
      subcategories: [
        { id: 1, name: "لپ تاپ گیمینگ" },
        { id: 2, name: "لپ تاپ اداری" },
        { id: 3, name: "لپ تاپ دانشجویی" },
      ],
    },
    {
      id: 2,
      name: "کامپیوتر",
      subcategories: [
        { id: 4, name: "کامپیوتر گیمینگ" },
        { id: 5, name: "کامپیوتر اداری" },
      ],
    },
    {
      id: 3,
      name: "موبایل",
      subcategories: [
        { id: 6, name: "گوشی هوشمند" },
        { id: 7, name: "گوشی اقتصادی" },
      ],
    },
  ];

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isExpanded = (categoryId: number) => {
    return expandedCategories.includes(categoryId);
  };

  return (
    <>
      <SheetHeader>
        <div className="flex items-center justify-between mt-5">
          <span className="flex-1 text-right">{"hello"}</span>
          <ChevronLeft
            onClick={handleShowSubCategory}
            className="cursor-pointer text-main"
          />
        </div>
      </SheetHeader>

      <div className="mt-5">
        <div className="flex flex-col gap-2">
          {level2Categories.map((category) => (
            <div key={category.id} className="w-full">
              {/* Level 2 Category */}
              <div
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => toggleCategory(category.id)}
              >
                <UI_Typography className="text-neutral-700 med14">
                  {category.name}
                </UI_Typography>
                {!isExpanded(category.id) ? (
                  <ChevronDown className="text-main" size={20} />
                ) : (
                  <ChevronRight className="text-main" size={20} />
                )}
              </div>

              {/* Level 3 Subcategories */}
              {isExpanded(category.id) && (
                <div className="mt-2 ml-4 space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className="flex items-center justify-between px-2 border-gray-200 hover:bg-gray-50 cursor-pointer"
                    >
                      <UI_Typography className="text-neutral-600 reg14">
                        {subcategory.name}
                      </UI_Typography>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubCategory;
