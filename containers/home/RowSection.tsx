import { BannerSection } from "./BannerSection";
import { ProductSliderSection } from "./ProductSliderSection";
import type { HomepageContentBlock } from "@/services/types/homepageService.types";
import type { Product } from "@/types/globalTypes";

type RowSectionProps = {
  columns: HomepageContentBlock[];
  productsById: Record<number, Product>;
  priorityBannerId?: string;
};

export const RowSection = ({
  columns,
  productsById,
  priorityBannerId,
}: RowSectionProps) => {
  if (columns.length === 0) return null;

  return (
    <section className="flex w-full flex-row gap-3 md:gap-4">
      {columns.map((column) => (
        <div key={column.id} className="min-w-0 flex-1">
          {column.type === "banner" ? (
            <BannerSection
              section={column}
              priority={column.id === priorityBannerId}
            />
          ) : (
            <ProductSliderSection
              title={column.title}
              products={column.productIds
                .map((id) => productsById[id])
                .filter((product): product is Product => !!product)}
              backgroundColor={column.backgroundColor}
            />
          )}
        </div>
      ))}
    </section>
  );
};
