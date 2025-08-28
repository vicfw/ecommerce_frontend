import { useState } from "react";

export type FilterView = "main" | "price";

export const useFilterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<FilterView>("main");
  const [priceFilter, setPriceFilter] = useState({
    minPrice: "",
    maxPrice: "",
  });

  const openModal = () => {
    setIsOpen(true);
    setCurrentView("main");
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentView("main");
    // Reset filters when closing
    setPriceFilter({ minPrice: "", maxPrice: "" });
  };

  const navigateToView = (view: FilterView) => {
    setCurrentView(view);
  };

  const goBack = () => {
    setCurrentView("main");
  };

  const updatePriceFilter = (field: "minPrice" | "maxPrice", value: string) => {
    setPriceFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetPriceFilter = () => {
    setPriceFilter({ minPrice: "", maxPrice: "" });
  };

  const applyPriceFilter = () => {
    // Here you can implement the logic to apply the price filter
    console.log("Applying price filter:", priceFilter);
    // You might want to close the modal or go back to main view
    goBack();
  };

  return {
    isOpen,
    currentView,
    priceFilter,
    openModal,
    closeModal,
    navigateToView,
    goBack,
    updatePriceFilter,
    resetPriceFilter,
    applyPriceFilter,
  };
};
