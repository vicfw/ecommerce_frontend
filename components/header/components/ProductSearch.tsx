"use client";

import { SearchInput } from "@/components/ui/search-input";
import { useProductSearch } from "@/hooks/use-product-search";
import {
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import ProductSearchSuggestions from "./ProductSearchSuggestions";

const ProductSearch = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const {
    term,
    setTerm,
    products,
    showSuggestions,
    showLoading,
    navigateToSearch,
  } = useProductSearch({
    onNavigate: () => setIsOpen(false),
  });

  const showDropdown = isOpen && showSuggestions;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      navigateToSearch();
    }
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <SearchInput
        value={term}
        onSearch={(value) => {
          setTerm(value);
          setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        placeholder="جستجو در محصولات"
        className="w-full"
      />

      {showDropdown ? (
        <ProductSearchSuggestions
          products={products}
          showLoading={showLoading}
          onSelect={() => setIsOpen(false)}
          className="absolute top-full left-0 right-0 z-50 mt-1 max-h-80 overflow-y-auto rounded-md border bg-popover shadow-md"
        />
      ) : null}
    </div>
  );
};

export default ProductSearch;
