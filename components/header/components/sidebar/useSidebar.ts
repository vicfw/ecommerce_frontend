import { BrandService } from "@/services/brandService";
import { CategoryService } from "@/services/categoryService";
import { useGlobalStore } from "@/store/globalStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export const useSidebar = () => {
  const [showBrands, setShowBrands] = useState(false);

  const { handleOpenSidebar, openSidebar } = useGlobalStore(
    useShallow((state) => ({
      openSidebar: state.openSidebar,
      handleOpenSidebar: state.handleOpenSidebar,
    }))
  );

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => new CategoryService().getCategories(),
    enabled: openSidebar,
  });

  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: () => new BrandService().getBrands(),
    enabled: showBrands,
  });

  const handleSetShowBrands = () => {
    setShowBrands((prev) => !prev);
  };

  useEffect(() => {
    if (!openSidebar) {
      setShowBrands(false);
    }
  }, [openSidebar]);

  return {
    get: {
      openSidebar,
      categories: categories?.data.data,
      showBrands,
      brands: brands?.data.data,
    },
    on: { handleOpenSidebar, handleSetShowBrands },
  };
};
