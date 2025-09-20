import { BrandService } from "@/services/brandService";
import { FetchDataPaginatedResponse } from "@/services/types/config";
import { Brand } from "@/types/globalTypes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useBrands = (
  initialBrands: FetchDataPaginatedResponse<Brand[]>
) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: brands } = useQuery({
    queryKey: ["brands", searchTerm],
    queryFn: ({ queryKey }) => new BrandService().getBrands(queryKey[1]),
    initialData: initialBrands,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return {
    get: {
      brands,
    },
    on: {
      search: handleSearch,
    },
    state: {
      searchTerm,
    },
  };
};
