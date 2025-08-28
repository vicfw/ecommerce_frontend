"use client";

import UI_Typography from "@/components/ui/typography/UI_Typography";
import { BrandService } from "@/services/brandService";
import { GetBrandProductsResponse } from "@/services/types/brandService.types";
import { FetchDataPaginatedResponse } from "@/services/types/config";
import { useQuery } from "@tanstack/react-query";
import { ProductListContainer } from "../home/ProductList";
import { Filter, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { FilterModalContainer } from "@/components/filter-modal";

type BrandsProductsProps = {
  initialData: FetchDataPaginatedResponse<GetBrandProductsResponse>;
  slug: string;
};

const BrandsProducts = ({ initialData, slug }: BrandsProductsProps) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["brands", slug],
    queryFn: () => new BrandService().getBrandProducts(slug),
    initialData: initialData,
    enabled: false,
  });

  if (!data) {
    return "no data found";
  }

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <div>
      <UI_Typography className="med14">
        {data.data?.brand.name}{" "}
        <UI_Typography className="reg12 text-neutral-500">
          ({data.total})
        </UI_Typography>
      </UI_Typography>

      {/* Filter and Sort Section */}
      <div className="flex justify-between items-center mt-4 mb-6">
        <div
          className="flex items-center gap-2 text-primary cursor-pointer hover:text-primary/80"
          onClick={handleOpenFilterModal}
        >
          <Filter className="h-4 w-4" />
          <UI_Typography className="reg14">فیلتر ها</UI_Typography>
        </div>
        <div className="flex items-center gap-2 text-primary cursor-pointer hover:text-primary/80">
          <ArrowUpDown className="h-4 w-4" />
          <UI_Typography className="reg14">مرتب سازی</UI_Typography>
        </div>
      </div>

      <ProductListContainer products={data.data?.products ?? []} />

      {/* Filter Modal */}
      <FilterModalContainer
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
      />
    </div>
  );
};

export default BrandsProducts;
