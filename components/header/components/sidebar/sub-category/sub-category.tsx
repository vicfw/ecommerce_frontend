"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SheetHeader } from "@/components/ui/sheet";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Category } from "@/types/globalTypes";
import { CategoryService } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";

type CategoryWithChildren = Category & {
  children?: CategoryWithChildren[];
};

type SubCategoryProps = {
  handleShowSubCategory: () => void;
  parentCategory: Category;
  onNavigate: () => void;
};

const SubCategory = ({
  handleShowSubCategory,
  parentCategory,
  onNavigate,
}: SubCategoryProps) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["category-path", parentCategory.id],
    queryFn: () => new CategoryService().getCategoryPath(parentCategory.id),
  });

  const children =
    (data?.data.data as CategoryWithChildren | undefined)?.children ?? [];

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isExpanded = (categoryId: number) =>
    expandedCategories.includes(categoryId);

  return (
    <>
      <SheetHeader>
        <div className="flex items-center justify-between mt-5">
          <Link
            href={`/category/${parentCategory.slug}`}
            onClick={onNavigate}
            className="flex-1 text-right hover:text-primary"
          >
            <UI_Typography className="med14">{parentCategory.name}</UI_Typography>
          </Link>
          <ChevronLeft
            onClick={handleShowSubCategory}
            className="cursor-pointer text-main"
          />
        </div>
      </SheetHeader>

      <div className="mt-5">
        <Link
          href={`/category/${parentCategory.slug}`}
          onClick={onNavigate}
          className="block mb-4 text-primary"
        >
          <UI_Typography className="reg14">مشاهده همه</UI_Typography>
        </Link>

        {isLoading && (
          <UI_Typography className="reg14 text-neutral-500">
            در حال بارگذاری...
          </UI_Typography>
        )}

        <div className="flex flex-col gap-2">
          {children.map((category) => (
            <div key={category.id} className="w-full">
              <div className="flex items-center justify-between">
                <Link
                  href={`/category/${category.slug}`}
                  onClick={onNavigate}
                  className="flex-1 hover:text-primary"
                >
                  <UI_Typography className="text-neutral-700 med14">
                    {category.name}
                  </UI_Typography>
                </Link>
                {(category.children?.length ?? 0) > 0 && (
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className="p-1"
                  >
                    {!isExpanded(category.id) ? (
                      <ChevronDown className="text-main" size={20} />
                    ) : (
                      <ChevronRight className="text-main" size={20} />
                    )}
                  </button>
                )}
              </div>

              {isExpanded(category.id) && (
                <div className="mt-2 mr-4 space-y-2">
                  {category.children?.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      href={`/category/${subcategory.slug}`}
                      onClick={onNavigate}
                      className="flex items-center justify-between px-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <UI_Typography className="text-neutral-600 reg14">
                        {subcategory.name}
                      </UI_Typography>
                    </Link>
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
