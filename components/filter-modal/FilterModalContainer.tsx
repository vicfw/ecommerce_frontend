import React from "react";
import { FilterModal, FilterItem, FilterSection } from "./FilterModal";
import { PriceFilter } from "./PriceFilter";
import { useFilterModal } from "@/hooks/use-filter-modal";

interface FilterModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterModalContainer: React.FC<FilterModalContainerProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    currentView,
    priceFilter,
    navigateToView,
    goBack,
    updatePriceFilter,
    resetPriceFilter,
    applyPriceFilter,
  } = useFilterModal();

  const handleClose = () => {
    onClose();
  };

  const renderMainView = () => (
    <div className="flex flex-col">
      <FilterItem title="قیمت" onClick={() => navigateToView("price")} />
      {/* Add more filter items here in the future */}
      <FilterItem
        title="دسته بندی"
        onClick={() => console.log("Category filter clicked")}
      />
      <FilterItem
        title="برند"
        onClick={() => console.log("Brand filter clicked")}
      />
    </div>
  );

  const renderPriceView = () => (
    <FilterSection title="قیمت" onBack={goBack}>
      <div className="p-4">
        <PriceFilter
          minPrice={priceFilter.minPrice}
          maxPrice={priceFilter.maxPrice}
          onMinPriceChange={(value) => updatePriceFilter("minPrice", value)}
          onMaxPriceChange={(value) => updatePriceFilter("maxPrice", value)}
          onApply={applyPriceFilter}
          onReset={resetPriceFilter}
        />
      </div>
    </FilterSection>
  );

  const renderContent = () => {
    switch (currentView) {
      case "price":
        return renderPriceView();
      default:
        return renderMainView();
    }
  };

  return (
    <FilterModal isOpen={isOpen} onClose={handleClose}>
      {renderContent()}
    </FilterModal>
  );
};
