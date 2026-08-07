import Image from "next/image";
import Link from "next/link";
import { HomepageBannerSection } from "@/services/types/homepageService.types";

type BannerSectionProps = {
  section: HomepageBannerSection;
  priority?: boolean;
};

const isExternalHref = (href: string) =>
  /^https?:\/\//i.test(href) || href.startsWith("//");

export const BannerSection = ({
  section,
  priority = false,
}: BannerSectionProps) => {
  const image = (
    <Image
      src={section.imageUrl}
      alt={section.alt || ""}
      width={1200}
      height={400}
      priority={priority}
      sizes="(max-width: 768px) 100vw, 1200px"
      className="h-auto w-full object-cover"
    />
  );

  const content =
    section.href && isExternalHref(section.href) ? (
      <a href={section.href} target="_blank" rel="noopener noreferrer">
        {image}
      </a>
    ) : section.href ? (
      <Link href={section.href} className="block">
        {image}
      </Link>
    ) : (
      image
    );

  return (
    <section className="w-full overflow-hidden rounded-md">{content}</section>
  );
};
