import React from "react";
import { FilterModal, FilterItem, FilterSection } from "./FilterModal";
import { PriceFilter } from "./PriceFilter";
import { useFilterModal } from "@/hooks/use-filter-modal";
import {
  PlpSearchParams,
  ProductFiltersResponse,
} from "@/services/types/productService.types";
import { EMPTY_PRODUCT_FILTERS } from "@/lib/plp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import UI_Typography from "@/components/ui/typography/UI_Typography";

interface FilterModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  filterOptions?: ProductFiltersResponse;
  currentFilters?: PlpSearchParams;
  lockedFilterKeys?: (keyof PlpSearchParams)[];
  onApply?: (filters: PlpSearchParams) => void;
}

export const FilterModalContainer: React.FC<FilterModalContainerProps> = ({
  isOpen,
  onClose,
  filterOptions = EMPTY_PRODUCT_FILTERS,
  currentFilters = {},
  lockedFilterKeys = [],
  onApply,
}) => {
  const {
    currentView,
    draftFilters,
    navigateToView,
    goBack,
    updateDraft,
    resetDraft,
  } = useFilterModal({ currentFilters, isOpen });

  const isLocked = (key: keyof PlpSearchParams) =>
    lockedFilterKeys.includes(key);

  const handleApplyAll = () => {
    onApply?.(draftFilters);
    onClose();
  };

  const handleClearAll = () => {
    const cleared: PlpSearchParams = {};
    lockedFilterKeys.forEach((key) => {
      if (currentFilters[key]) {
        cleared[key] = currentFilters[key];
      }
    });
    onApply?.(cleared);
    onClose();
  };

  const renderOptionList = (
    items: { id: string | number; label: string; selected: boolean }[],
    onSelect: (id: string) => void
  ) => (
    <div className="flex flex-col">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(String(item.id))}
          className={cn(
            "w-full text-right px-4 py-3 border-b hover:bg-gray-50",
            item.selected && "bg-primary/5 text-primary"
          )}
        >
          <UI_Typography className="reg14">{item.label}</UI_Typography>
        </button>
      ))}
      {items.length === 0 && (
        <div className="p-4">
          <UI_Typography className="reg14 text-neutral-500">
            موردی یافت نشد
          </UI_Typography>
        </div>
      )}
    </div>
  );

  const renderMainView = () => (
    <div className="flex flex-col min-h-full">
      <div className="flex-1">
        <FilterItem title="قیمت" onClick={() => navigateToView("price")} />
        {!isLocked("category") && (
          <FilterItem
            title="دسته بندی"
            onClick={() => navigateToView("category")}
          />
        )}
        <FilterItem title="برند" onClick={() => navigateToView("brand")} />
        <FilterItem title="رنگ" onClick={() => navigateToView("color")} />
        <FilterItem title="برچسب" onClick={() => navigateToView("badge")} />
      </div>
      <div className="sticky bottom-0 p-4 border-t flex gap-3 bg-white">
        <Button onClick={handleApplyAll} className="flex-1">
          اعمال فیلترها
        </Button>
        <Button onClick={handleClearAll} variant="outline" className="flex-1">
          پاک کردن
        </Button>
      </div>
    </div>
  );

  const renderPriceView = () => (
    <FilterSection title="قیمت" onBack={goBack}>
      <div className="p-4">
        <PriceFilter
          minPrice={draftFilters.minPrice || ""}
          maxPrice={draftFilters.maxPrice || ""}
          placeholderMin={
            filterOptions.priceRange.minPrice
              ? String(filterOptions.priceRange.minPrice)
              : "0"
          }
          placeholderMax={
            filterOptions.priceRange.maxPrice
              ? String(filterOptions.priceRange.maxPrice)
              : undefined
          }
          onMinPriceChange={(value) => updateDraft({ minPrice: value })}
          onMaxPriceChange={(value) => updateDraft({ maxPrice: value })}
          onApply={goBack}
          onReset={() => resetDraft(["minPrice", "maxPrice"])}
        />
      </div>
    </FilterSection>
  );

  const renderCategoryView = () => (
    <FilterSection title="دسته بندی" onBack={goBack}>
      {renderOptionList(
        filterOptions.categories.map((category) => ({
          id: category.slug,
          label: category.name,
          selected: draftFilters.category === category.slug,
        })),
        (slug) => {
          updateDraft({
            category: draftFilters.category === slug ? undefined : slug,
          });
          goBack();
        }
      )}
    </FilterSection>
  );

  const renderBrandView = () => (
    <FilterSection title="برند" onBack={goBack}>
      {renderOptionList(
        filterOptions.brands.map((brand) => ({
          id: brand.slug,
          label: `${brand.name} (${brand.engName})`,
          selected: draftFilters.brand === brand.slug,
        })),
        (slug) => {
          updateDraft({
            brand: draftFilters.brand === slug ? undefined : slug,
          });
          goBack();
        }
      )}
    </FilterSection>
  );

  const renderColorView = () => (
    <FilterSection title="رنگ" onBack={goBack}>
      {renderOptionList(
        filterOptions.colors.map((color) => ({
          id: color.name,
          label: color.name,
          selected: draftFilters.color === color.name,
        })),
        (name) => {
          updateDraft({
            color: draftFilters.color === name ? undefined : name,
          });
          goBack();
        }
      )}
    </FilterSection>
  );

  const renderBadgeView = () => (
    <FilterSection title="برچسب" onBack={goBack}>
      {renderOptionList(
        filterOptions.badges.map((badge) => ({
          id: badge.id,
          label: badge.title,
          selected: draftFilters.badge === String(badge.id),
        })),
        (id) => {
          updateDraft({
            badge: draftFilters.badge === id ? undefined : id,
          });
          goBack();
        }
      )}
    </FilterSection>
  );

  const renderContent = () => {
    switch (currentView) {
      case "price":
        return renderPriceView();
      case "category":
        return renderCategoryView();
      case "brand":
        return renderBrandView();
      case "color":
        return renderColorView();
      case "badge":
        return renderBadgeView();
      default:
        return renderMainView();
    }
  };

  return (
    <FilterModal isOpen={isOpen} onClose={onClose}>
      {renderContent()}
    </FilterModal>
  );
};
