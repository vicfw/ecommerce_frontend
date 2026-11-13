"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { ProductService } from "@/services/productService";
import { Brand, Category, Product } from "@/types/globalTypes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const MIN_SEARCH_LENGTH = 1;

type UseProductSearchOptions = {
  onNavigate?: () => void;
};

export const useProductSearch = (options?: UseProductSearchOptions) => {
  const router = useRouter();
  const [term, setTerm] = useState("");
  const trimmedTerm = term.trim();
  const debouncedTerm = useDebounce(trimmedTerm, 300);
  const isDebouncing = trimmedTerm !== debouncedTerm;

  const { data, isPending } = useQuery({
    queryKey: ["products", "suggest", debouncedTerm],
    queryFn: async () => {
      const response = await new ProductService().getSuggestions(debouncedTerm);
      return response.data.data;
    },
    enabled: debouncedTerm.length >= MIN_SEARCH_LENGTH,
  });

  const products: Product[] = data?.products ?? [];
  const brands: Brand[] = data?.brands ?? [];
  const categories: Pick<Category, "id" | "name" | "slug">[] =
    data?.categories ?? [];
  const showSuggestions = trimmedTerm.length >= MIN_SEARCH_LENGTH;
  const showLoading =
    showSuggestions &&
    (isDebouncing ||
      (debouncedTerm.length >= MIN_SEARCH_LENGTH && isPending));

  const navigateToSearch = () => {
    if (!trimmedTerm) return;
    options?.onNavigate?.();
    router.push(`/search?q=${encodeURIComponent(trimmedTerm)}`);
  };

  return {
    term,
    setTerm,
    products,
    brands,
    categories,
    showSuggestions,
    showLoading,
    navigateToSearch,
  };
};
