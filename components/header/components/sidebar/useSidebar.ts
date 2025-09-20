import { CategoryService } from "@/services/categoryService";
import { useGlobalStore } from "@/store/globalStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export const useSidebar = () => {
  const [showBrands, setShowBrands] = useState(false);
  const [isDefaultScreen, setIsDefaultScreen] = useState(true);
  const [showSubCategory, setShowSubCategory] = useState(false);

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

  const handleShowSubCategory = () => {
    setShowSubCategory((prev) => !prev);
    setIsDefaultScreen((prev) => !prev);
  };

  useEffect(() => {
    if (!openSidebar) {
      if (showBrands) setShowBrands(false);
    }
  }, [openSidebar]);

  return {
    get: {
      openSidebar,
      parentCategories: categories?.data.data,
      showBrands,
      isDefaultScreen,
      showSubCategory,
    },
    on: { handleOpenSidebar, handleSetShowBrands, handleShowSubCategory },
  };
};
