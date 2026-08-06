import React from "react";
import { X } from "lucide-react";
import { FilterModal, FilterItem, FilterSection } from "./FilterModal";
import { PriceFilter } from "./PriceFilter";
import { useFilterModal } from "@/hooks/use-filter-modal";
import {
  PlpSearchParams,
  ProductFiltersResponse,
} from "@/services/types/productService.types";
import { EMPTY_PRODUCT_FILTERS } from "@/lib/plp";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

type ActiveFilterBadge = {
  key: string;
  label: string;
  onRemove: () => void;
};

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

  const getActiveFilterBadges = (): ActiveFilterBadge[] => {
    const badges: ActiveFilterBadge[] = [];

    if (!isLocked("category") && draftFilters.category) {
      const category = filterOptions.categories.find(
        (item) => item.slug === draftFilters.category
      );
      badges.push({
        key: "category",
        label: category?.name || draftFilters.category,
        onRemove: () => updateDraft({ category: undefined }),
      });
    }

    if (draftFilters.brand) {
      const brand = filterOptions.brands.find(
        (item) => item.slug === draftFilters.brand
      );
      badges.push({
        key: "brand",
        label: brand ? brand.name : draftFilters.brand,
        onRemove: () => updateDraft({ brand: undefined }),
      });
    }

    if (draftFilters.color) {
      badges.push({
        key: "color",
        label: draftFilters.color,
        onRemove: () => updateDraft({ color: undefined }),
      });
    }

    if (draftFilters.badge) {
      const badge = filterOptions.badges.find(
        (item) => String(item.id) === draftFilters.badge
      );
      badges.push({
        key: "badge",
        label: badge?.title || draftFilters.badge,
        onRemove: () => updateDraft({ badge: undefined }),
      });
    }

    if (draftFilters.minPrice || draftFilters.maxPrice) {
      const min = draftFilters.minPrice
        ? Number(draftFilters.minPrice).toLocaleString("fa-IR")
        : null;
      const max = draftFilters.maxPrice
        ? Number(draftFilters.maxPrice).toLocaleString("fa-IR")
        : null;
      const label =
        min && max
          ? `${min} - ${max}`
          : min
            ? `از ${min}`
            : `تا ${max}`;

      badges.push({
        key: "price",
        label,
        onRemove: () => resetDraft(["minPrice", "maxPrice"]),
      });
    }

    return badges;
  };

  const handleApplyAll = () => {
    onApply?.(draftFilters);
    onClose();
  };

  const handleRemoveAllFilters = () => {
    const removableKeys = (
      [
        "brand",
        "minPrice",
        "maxPrice",
        "color",
        "badge",
        "category",
        "sort",
        "q",
      ] as (keyof PlpSearchParams)[]
    ).filter((key) => !isLocked(key));

    resetDraft(removableKeys);
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
            "w-full text-right px-4 py-3 border-b hover:bg-accent",
            item.selected && "bg-accent text-accent-foreground"
          )}
        >
          <UI_Typography className="reg14">{item.label}</UI_Typography>
        </button>
      ))}
      {items.length === 0 && (
        <div className="p-4">
          <UI_Typography className="reg14 text-muted-foreground">
            موردی یافت نشد
          </UI_Typography>
        </div>
      )}
    </div>
  );

  const renderActiveFilters = () => {
    const activeFilterBadges = getActiveFilterBadges();
    if (activeFilterBadges.length === 0) return null;

    return (
      <div className="px-4 py-3 border-b space-y-3">
        <div className="flex items-center justify-between gap-2">
          <UI_Typography className="reg14 text-muted-foreground">
            فیلترهای فعال
          </UI_Typography>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemoveAllFilters}
            className="h-auto px-2 py-1 text-destructive hover:text-destructive"
          >
            حذف همه
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {activeFilterBadges.map((filter) => (
            <Badge
              key={filter.key}
              variant="outline"
              className="gap-1 pl-2 pr-1 py-1 font-normal"
            >
              <span>{filter.label}</span>
              <button
                type="button"
                onClick={filter.onRemove}
                className="rounded-full p-0.5 hover:bg-accent"
                aria-label={`حذف فیلتر ${filter.label}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  const renderMainView = () => (
    <div className="flex flex-col min-h-full">
      <div className="flex-1">
        {renderActiveFilters()}
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
      <div className="sticky bottom-0 p-4 border-t flex gap-3 bg-background">
        <Button onClick={handleApplyAll} className="flex-1">
          اعمال فیلترها
        </Button>
        <Button onClick={handleClearAll} variant="outline" className="flex-1">
          پاک کردن همه
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
