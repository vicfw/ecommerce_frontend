"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { ProductService } from "@/services/productService";
import { Product } from "@/types/globalTypes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const MIN_SEARCH_LENGTH = 1;
export const SUGGESTION_LIMIT = 8;

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
    queryKey: ["products", "search", debouncedTerm],
    queryFn: () =>
      new ProductService().getProducts({
        search: debouncedTerm,
        limit: SUGGESTION_LIMIT,
      }),
    enabled: debouncedTerm.length >= MIN_SEARCH_LENGTH,
  });

  const products: Product[] = data?.data ?? [];
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
    showSuggestions,
    showLoading,
    navigateToSearch,
  };
};
