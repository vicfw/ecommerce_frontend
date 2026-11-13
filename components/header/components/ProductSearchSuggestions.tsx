"use client";

import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Brand, Category, Product } from "@/types/globalTypes";
import Image from "next/image";
import Link from "next/link";

type ProductSearchSuggestionsProps = {
  products: Product[];
  brands: Brand[];
  categories: Pick<Category, "id" | "name" | "slug">[];
  showLoading: boolean;
  onSelect?: () => void;
  className?: string;
  listboxId: string;
  /** When false, only prName is shown (useful on narrow mobile layouts). */
  showEnglishName?: boolean;
};

const ProductSearchSuggestions = ({
  products,
  brands,
  categories,
  showLoading,
  onSelect,
  className,
  listboxId,
  showEnglishName = true,
}: ProductSearchSuggestionsProps) => {
  if (showLoading) {
    return (
      <div className={className} id={listboxId} role="listbox" aria-label="پیشنهادهای جستجو">
        <div className="px-4 py-3">
          <UI_Typography className="reg14 text-muted-foreground">
            در حال جستجو...
          </UI_Typography>
        </div>
      </div>
    );
  }

  const isEmpty =
    products.length === 0 && brands.length === 0 && categories.length === 0;

  if (isEmpty) {
    return (
      <div className={className} id={listboxId} role="listbox" aria-label="پیشنهادهای جستجو">
        <div className="px-4 py-3">
          <UI_Typography className="reg14 text-muted-foreground">
            محصولی یافت نشد
          </UI_Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={className} id={listboxId} role="listbox" aria-label="پیشنهادهای جستجو">
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={`product-${product.id}`} role="option">
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
      ) : null}

      {brands.length > 0 ? (
        <div className="border-t border-border">
          <div className="px-3 pt-2 pb-1">
            <UI_Typography className="reg12 text-muted-foreground">
              برندها
            </UI_Typography>
          </div>
          <ul>
            {brands.map((brand) => (
              <li key={`brand-${brand.id}`} role="option">
                <Link
                  href={`/brands/${brand.slug}`}
                  onClick={onSelect}
                  className="block px-3 py-2 hover:bg-accent"
                >
                  <UI_Typography className="med14 truncate text-main">
                    {brand.name}
                  </UI_Typography>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {categories.length > 0 ? (
        <div className="border-t border-border">
          <div className="px-3 pt-2 pb-1">
            <UI_Typography className="reg12 text-muted-foreground">
              دسته‌بندی‌ها
            </UI_Typography>
          </div>
          <ul>
            {categories.map((category) => (
              <li key={`category-${category.id}`} role="option">
                <Link
                  href={`/category/${category.slug}`}
                  onClick={onSelect}
                  className="block px-3 py-2 hover:bg-accent"
                >
                  <UI_Typography className="med14 truncate text-main">
                    {category.name}
                  </UI_Typography>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default ProductSearchSuggestions;
