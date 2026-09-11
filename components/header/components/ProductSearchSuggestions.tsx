"use client";

import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Product } from "@/types/globalTypes";
import Image from "next/image";
import Link from "next/link";

type ProductSearchSuggestionsProps = {
  products: Product[];
  showLoading: boolean;
  onSelect?: () => void;
  className?: string;
  /** When false, only prName is shown (useful on narrow mobile layouts). */
  showEnglishName?: boolean;
};

const ProductSearchSuggestions = ({
  products,
  showLoading,
  onSelect,
  className,
  showEnglishName = true,
}: ProductSearchSuggestionsProps) => {
  if (showLoading) {
    return (
      <div className={className}>
        <div className="px-4 py-3">
          <UI_Typography className="reg14 text-muted-foreground">
            در حال جستجو...
          </UI_Typography>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={className}>
        <div className="px-4 py-3">
          <UI_Typography className="reg14 text-muted-foreground">
            محصولی یافت نشد
          </UI_Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link
              href={`/products/${product.slug}`}
              onClick={onSelect}
              className="flex min-w-0 items-center gap-3 overflow-hidden px-3 py-2 hover:bg-accent"
            >
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.prName}
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 object-contain"
                />
              ) : (
                <div className="h-10 w-10 shrink-0 bg-muted" />
              )}
              <div className="min-w-0 flex-1 overflow-hidden">
                <UI_Typography className="med14 block truncate text-main">
                  {product.prName}
                </UI_Typography>
                {showEnglishName && product.enName ? (
                  <UI_Typography className="reg12 block truncate text-muted-foreground">
                    {product.enName}
                  </UI_Typography>
                ) : null}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSearchSuggestions;
