import { BrandService } from "@/services/brandService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useBrands = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: brands } = useQuery({
    queryKey: ["brands", searchTerm],
    queryFn: ({ queryKey }) => new BrandService().getBrands(queryKey[1]),
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
