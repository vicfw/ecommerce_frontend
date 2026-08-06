"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Filter, ArrowUpDown } from "lucide-react";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { ProductListContainer } from "@/containers/home/ProductList";
import { FilterModalContainer } from "@/components/filter-modal";
import { ProductService } from "@/services/productService";
import {
  PLP_PAGE_SIZE,
  PlpSearchParams,
  ProductFiltersResponse,
} from "@/services/types/productService.types";
import { FetchDataPaginatedResponse } from "@/services/types/config";
import { Product } from "@/types/globalTypes";
import { CATALOG_TTL_SECONDS } from "@/lib/catalogCache";
import {
  buildPlpQueryString,
  mergePlpFilters,
  toGetProductsParams,
} from "@/lib/plp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SORT_OPTIONS = [
  { value: "default", label: "پیش‌فرض" },
  { value: "newest", label: "جدیدترین" },
  { value: "price_asc", label: "ارزان‌ترین" },
  { value: "price_desc", label: "گران‌ترین" },
] as const;

type ProductListingProps = {
  title: string;
  initialData: FetchDataPaginatedResponse<Product[]>;
  filterOptions: ProductFiltersResponse;
  filters: PlpSearchParams;
  /** Keys locked by the route (e.g. category on /category/[slug]) */
  lockedFilterKeys?: (keyof PlpSearchParams)[];
};

export const ProductListing = ({
  title,
  initialData,
  filterOptions,
  filters,
  lockedFilterKeys = [],
}: ProductListingProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["plp", pathname, filters],
      queryFn: ({ pageParam }) =>
        new ProductService().getProducts(
          toGetProductsParams(filters, {
            page: pageParam,
            limit: PLP_PAGE_SIZE,
          })
        ),
      initialPageParam: 1,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
      staleTime: CATALOG_TTL_SECONDS * 1000,
      refetchOnWindowFocus: true,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? (lastPage.page ?? 1) + 1 : undefined,
    });

  const products = data?.pages.flatMap((page) => page.data ?? []) ?? [];
  const total = data?.pages[0]?.total ?? initialData.total ?? 0;

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const updateFilters = (next: PlpSearchParams) => {
    const query = buildPlpQueryString(next, lockedFilterKeys);
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleApplyFilters = (draft: PlpSearchParams) => {
    updateFilters(mergePlpFilters(draft, lockedFilterKeys, filters));
    setIsFilterModalOpen(false);
  };

  const handleSortChange = (sort: string) => {
    updateFilters({
      ...filters,
      sort: sort === "default" ? undefined : sort,
    });
  };

  const currentSortLabel =
    SORT_OPTIONS.find((option) => option.value === (filters.sort || "default"))
      ?.label ?? "مرتب سازی";

  return (
    <div>
      <UI_Typography className="med14">
        {title}{" "}
        <UI_Typography className="reg12 text-neutral-500">
          ({total})
        </UI_Typography>
      </UI_Typography>

      <div className="flex justify-between items-center mt-4 mb-6">
        <button
          type="button"
          className="flex items-center gap-2 text-primary cursor-pointer hover:text-primary/80"
          onClick={() => setIsFilterModalOpen(true)}
        >
          <Filter className="h-4 w-4" />
          <UI_Typography className="reg14">فیلتر ها</UI_Typography>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 text-primary cursor-pointer hover:text-primary/80"
            >
              <ArrowUpDown className="h-4 w-4" />
              <UI_Typography className="reg14">{currentSortLabel}</UI_Typography>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {SORT_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {products.length === 0 ? (
        <div className="py-16 text-center">
          <UI_Typography className="reg14 text-neutral-500">
            محصولی یافت نشد
          </UI_Typography>
        </div>
      ) : (
        <>
          <ProductListContainer products={products} />
          <div ref={sentinelRef} className="h-8 w-full" />
          {isFetchingNextPage && (
            <div className="py-4 text-center">
              <UI_Typography className="reg12 text-neutral-500">
                در حال بارگذاری...
              </UI_Typography>
            </div>
          )}
        </>
      )}

      <FilterModalContainer
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filterOptions={filterOptions}
        currentFilters={filters}
        lockedFilterKeys={lockedFilterKeys}
        onApply={handleApplyFilters}
      />
    </div>
  );
};
