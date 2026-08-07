import { GoToCartModal } from "@/components/go-to-cart-modal/GoToCartModal";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import {
  type HomepageLayout,
  type HomepageSection,
} from "@/services/types/homepageService.types";
import { Product } from "@/types/globalTypes";
import { BannerSection } from "./BannerSection";
import { ImageSliderSection } from "./ImageSliderSection";
import { ProductSliderSection } from "./ProductSliderSection";
import { RowSection } from "./RowSection";
import { StoryLinksSection } from "./StoryLinksSection";

type HomeContainerProps = {
  layout: HomepageLayout;
  productsById: Record<number, Product>;
};

/** Prefer first banner, else first image slider, for LCP priority. */
const firstPriorityImageId = (sections: HomepageSection[]) => {
  for (const section of sections) {
    if (section.type === "banner") return section.id;
    if (section.type === "row") {
      const banner = section.columns.find((c) => c.type === "banner");
      if (banner) return banner.id;
    }
  }
  for (const section of sections) {
    if (section.type === "image_slider" && section.slides.length > 0) {
      return section.id;
    }
  }
  return undefined;
};

const renderSections = (
  sections: HomepageSection[],
  productsById: Record<number, Product>,
  keyPrefix: string,
  priorityImageId?: string
) =>
  sections.map((section) => {
    if (section.type === "banner") {
      return (
        <BannerSection
          key={`${keyPrefix}-${section.id}`}
          section={section}
          priority={section.id === priorityImageId}
        />
      );
    }

    if (section.type === "story_links") {
      return (
        <StoryLinksSection
          key={`${keyPrefix}-${section.id}`}
          section={section}
        />
      );
    }

    if (section.type === "image_slider") {
      return (
        <ImageSliderSection
          key={`${keyPrefix}-${section.id}`}
          section={section}
          priority={section.id === priorityImageId}
        />
      );
    }

    if (section.type === "row") {
      return (
        <RowSection
          key={`${keyPrefix}-${section.id}`}
          columns={section.columns}
          productsById={productsById}
          priorityBannerId={priorityImageId}
        />
      );
    }

    const products = section.productIds
      .map((id) => productsById[id])
      .filter((product): product is Product => !!product);

    return (
      <ProductSliderSection
        key={`${keyPrefix}-${section.id}`}
        title={section.title}
        products={products}
        backgroundColor={section.backgroundColor}
      />
    );
  });

export const HomeContainer = ({
  layout,
  productsById,
}: HomeContainerProps) => {
  const hasDesktop = layout.desktop.length > 0;
  const hasMobile = layout.mobile.length > 0;

  if (!hasDesktop && !hasMobile) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <UI_Typography component="h1" className="text-foreground med18">
          فروشگاه
        </UI_Typography>
        <UI_Typography className="text-muted-foreground med14">
          به زودی محتوای صفحه اصلی اضافه می‌شود.
        </UI_Typography>
      </div>
    );
  }

  const desktopPriority = firstPriorityImageId(layout.desktop);
  const mobilePriority = firstPriorityImageId(layout.mobile);

  return (
    <div className="flex w-full flex-col gap-6 pb-20 md:gap-8 md:pb-4">
      <UI_Typography component="h1" className="sr-only">
        فروشگاه
      </UI_Typography>

      {hasDesktop && (
        <div
          className={
            hasMobile
              ? "hidden w-full flex-col gap-6 md:flex md:gap-8"
              : "flex w-full flex-col gap-6 md:gap-8"
          }
        >
          {renderSections(
            layout.desktop,
            productsById,
            "desktop",
            desktopPriority
          )}
        </div>
      )}

      {hasMobile && (
        <div
          className={
            hasDesktop
              ? "flex w-full flex-col gap-6 md:hidden"
              : "flex w-full flex-col gap-6 md:gap-8"
          }
        >
          {renderSections(
            layout.mobile,
            productsById,
            "mobile",
            mobilePriority
          )}
        </div>
      )}

      <GoToCartModal />
    </div>
  );
};
