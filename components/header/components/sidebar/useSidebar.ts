import { CategoryService } from "@/services/categoryService";
import { useGlobalStore } from "@/store/globalStore";
import { Category } from "@/types/globalTypes";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export const useSidebar = () => {
  const [showBrands, setShowBrands] = useState(false);
  const [isDefaultScreen, setIsDefaultScreen] = useState(true);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [selectedParentCategory, setSelectedParentCategory] =
    useState<Category | null>(null);

  const { handleOpenSidebar, openSidebar } = useGlobalStore(
    useShallow((state) => ({
      openSidebar: state.openSidebar,
      handleOpenSidebar: state.handleOpenSidebar,
    }))
  );

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => new CategoryService().getAllCategoriesByLevel(1),
    enabled: openSidebar,
  });

  const handleSetShowBrands = () => {
    setShowBrands((prev) => !prev);
    setIsDefaultScreen((prev) => !prev);
  };

  const handleShowSubCategory = (category?: Category) => {
    if (category) {
      setSelectedParentCategory(category);
      setShowSubCategory(true);
      setIsDefaultScreen(false);
      return;
    }

    setShowSubCategory(false);
    setSelectedParentCategory(null);
    setIsDefaultScreen(true);
  };

  useEffect(() => {
    if (!openSidebar) {
      setShowBrands(false);
      setShowSubCategory(false);
      setIsDefaultScreen(true);
      setSelectedParentCategory(null);
    }
  }, [openSidebar]);

  return {
    get: {
      openSidebar,
      parentCategories: categories?.data.data,
      showBrands,
      isDefaultScreen,
      showSubCategory,
      selectedParentCategory,
    },
    on: {
      handleOpenSidebar,
      handleSetShowBrands,
      handleShowSubCategory,
    },
  };
};
