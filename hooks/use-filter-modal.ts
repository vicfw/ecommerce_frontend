import { useEffect, useState } from "react";
import { PlpSearchParams } from "@/services/types/productService.types";

export type FilterView =
  | "main"
  | "price"
  | "category"
  | "brand"
  | "color"
  | "badge";

type UseFilterModalArgs = {
  currentFilters: PlpSearchParams;
  isOpen: boolean;
};

export const useFilterModal = ({
  currentFilters,
  isOpen,
}: UseFilterModalArgs) => {
  const [currentView, setCurrentView] = useState<FilterView>("main");
  const [draftFilters, setDraftFilters] =
    useState<PlpSearchParams>(currentFilters);

  useEffect(() => {
    if (isOpen) {
      setDraftFilters(currentFilters);
      setCurrentView("main");
    }
  }, [isOpen, currentFilters]);

  const navigateToView = (view: FilterView) => {
    setCurrentView(view);
  };

  const goBack = () => {
    setCurrentView("main");
  };

  const updateDraft = (patch: Partial<PlpSearchParams>) => {
    setDraftFilters((prev) => {
      const next = { ...prev };
      (Object.keys(patch) as (keyof PlpSearchParams)[]).forEach((key) => {
        const value = patch[key];
        if (value == null || value === "") {
          delete next[key];
        } else {
          next[key] = value;
        }
      });
      return next;
    });
  };

  const resetDraft = (keys?: (keyof PlpSearchParams)[]) => {
    if (!keys) {
      setDraftFilters({});
      return;
    }

    setDraftFilters((prev) => {
      const next = { ...prev };
      keys.forEach((key) => {
        delete next[key];
      });
      return next;
    });
  };

  return {
    currentView,
    draftFilters,
    navigateToView,
    goBack,
    updateDraft,
    resetDraft,
  };
};
