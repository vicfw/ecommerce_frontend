"use client";

import { SearchInput } from "@/components/ui/search-input";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { useDebounce } from "@/hooks/use-debounce";
import { ProductService } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const MIN_SEARCH_LENGTH = 2;
const SUGGESTION_LIMIT = 8;

const ProductSearch = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [term, setTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedTerm = useDebounce(term.trim(), 300);

  const { data, isFetching } = useQuery({
    queryKey: ["products", "search", debouncedTerm],
    queryFn: () =>
      new ProductService().getProducts({
        search: debouncedTerm,
        limit: SUGGESTION_LIMIT,
      }),
    enabled: debouncedTerm.length >= MIN_SEARCH_LENGTH,
  });

  const products = data?.data ?? [];
  const showDropdown = isOpen && debouncedTerm.length >= MIN_SEARCH_LENGTH;

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

  const navigateToSearch = () => {
    const query = term.trim();
    if (!query) return;
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

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
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-80 overflow-y-auto rounded-md border bg-white shadow-md">
          {isFetching ? (
            <div className="px-4 py-3">
              <UI_Typography className="reg14 text-neutral-500">
                در حال جستجو...
              </UI_Typography>
            </div>
          ) : products.length === 0 ? (
            <div className="px-4 py-3">
              <UI_Typography className="reg14 text-neutral-500">
                محصولی یافت نشد
              </UI_Typography>
            </div>
          ) : (
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-50"
                  >
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.prName}
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-neutral-100" />
                    )}
                    <div className="min-w-0 flex-1">
                      <UI_Typography className="med14 text-main truncate">
                        {product.prName}
                      </UI_Typography>
                      {product.enName ? (
                        <UI_Typography className="reg12 text-neutral-500 truncate">
                          {product.enName}
                        </UI_Typography>
                      ) : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ProductSearch;
