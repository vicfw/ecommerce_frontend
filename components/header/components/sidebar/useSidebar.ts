import { CategoryService } from "@/services/categoryService";
import { useGlobalStore } from "@/store/globalStore";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

export const useSidebar = () => {
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

  return {
    get: { openSidebar, categories: categories?.data.data },
    on: { handleOpenSidebar },
  };
};
