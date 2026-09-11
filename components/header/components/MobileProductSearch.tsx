"use client";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { useProductSearch } from "@/hooks/use-product-search";
import { Search, X } from "lucide-react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import ProductSearchSuggestions from "./ProductSearchSuggestions";

const MobileProductSearch = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    term,
    setTerm,
    products,
    showSuggestions,
    showLoading,
    navigateToSearch,
  } = useProductSearch({
    onNavigate: () => setOpen(false),
  });

  useEffect(() => {
    if (open) {
      // Defer focus until the sheet has mounted
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
    setTerm("");
  }, [open, setTerm]);

  // Close the sheet if the viewport crosses into desktop while it is open
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = () => {
      if (mediaQuery.matches) setOpen(false);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      navigateToSearch();
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="md:hidden h-7 w-7 p-0"
        aria-label="جستجو در محصولات"
        onClick={() => setOpen(true)}
      >
        <Search className="h-7 w-7 text-main" />
      </Button>

      <SheetContent
        side="top"
        className="inset-0 z-[60] flex h-dvh w-full max-w-none flex-col gap-0 border-0 p-0"
      >
        <SheetTitle className="sr-only">جستجو در محصولات</SheetTitle>

        <div className="flex shrink-0 items-center gap-2 border-b border-border px-3 py-3">
          <SheetClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0"
              aria-label="بستن جستجو"
            >
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
          <div className="min-w-0 flex-1">
            <SearchInput
              ref={inputRef}
              value={term}
              onSearch={setTerm}
              onKeyDown={handleKeyDown}
              placeholder="جستجو در محصولات"
              className="w-full"
            />
          </div>
        </div>

        {showSuggestions ? (
          <ProductSearchSuggestions
            products={products}
            showLoading={showLoading}
            onSelect={() => setOpen(false)}
            showEnglishName={false}
            className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto"
          />
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default MobileProductSearch;
