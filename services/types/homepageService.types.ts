export type HomepageBannerSection = {
  id: string;
  type: "banner";
  imageUrl: string;
  href?: string;
  alt?: string;
};

export type HomepageProductSliderSection = {
  id: string;
  type: "product_slider";
  title: string;
  productIds: number[];
  backgroundColor?: string;
};

export type HomepageStoryLinkItem = {
  id: string;
  imageUrl: string;
  label: string;
  href: string;
};

export type HomepageStoryLinksSection = {
  id: string;
  type: "story_links";
  items: HomepageStoryLinkItem[];
};

export type HomepageImageSlide = {
  id: string;
  imageUrl: string;
  href?: string;
  alt?: string;
};

export type HomepageImageSliderSection = {
  id: string;
  type: "image_slider";
  slides: HomepageImageSlide[];
};

export type HomepageContentBlock =
  | HomepageBannerSection
  | HomepageProductSliderSection;

export type HomepageRowSection = {
  id: string;
  type: "row";
  columns: HomepageContentBlock[];
};

export type HomepageSection =
  | HomepageContentBlock
  | HomepageRowSection
  | HomepageStoryLinksSection
  | HomepageImageSliderSection;

export type HomepageLayout = {
  desktop: HomepageSection[];
  mobile: HomepageSection[];
};

export type Homepage = {
  id: number;
  sections: HomepageLayout;
  updatedAt: string | null;
};

const emptyLayout = (): HomepageLayout => ({
  desktop: [],
  mobile: [],
});

/** Normalize legacy flat section arrays into the desktop/mobile layout. */
export const normalizeHomepageLayout = (
  value: unknown
): HomepageLayout => {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Array.isArray((value as HomepageLayout).desktop) &&
    Array.isArray((value as HomepageLayout).mobile)
  ) {
    return {
      desktop: (value as HomepageLayout).desktop,
      mobile: (value as HomepageLayout).mobile,
    };
  }

  if (Array.isArray(value)) {
    return {
      desktop: value as HomepageSection[],
      mobile: [],
    };
  }

  return emptyLayout();
};

export const collectProductIdsFromSections = (
  sections: HomepageSection[]
): number[] =>
  sections.flatMap((section) => {
    if (section.type === "product_slider") return section.productIds;
    if (section.type === "row") {
      return section.columns.flatMap((column) =>
        column.type === "product_slider" ? column.productIds : []
      );
    }
    return [];
  });

export const collectProductIdsFromLayout = (
  layout: HomepageLayout
): number[] =>
  Array.from(
    new Set([
      ...collectProductIdsFromSections(layout.desktop),
      ...collectProductIdsFromSections(layout.mobile),
    ])
  );
