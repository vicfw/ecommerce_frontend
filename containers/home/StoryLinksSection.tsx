import Image from "next/image";
import Link from "next/link";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import type { HomepageStoryLinksSection } from "@/services/types/homepageService.types";

type StoryLinksSectionProps = {
  section: HomepageStoryLinksSection;
};

const isExternalHref = (href: string) =>
  /^https?:\/\//i.test(href) || href.startsWith("//");

export const StoryLinksSection = ({ section }: StoryLinksSectionProps) => {
  if (section.items.length === 0) return null;

  return (
    <section className="w-full">
      <div className="flex w-full gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {section.items.map((item) => {
          const content = (
            <span className="flex w-[72px] shrink-0 flex-col items-center gap-2 sm:w-[88px]">
              <span className="relative size-16 overflow-hidden rounded-full bg-muted sm:size-20">
                <Image
                  src={item.imageUrl}
                  alt={item.label}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </span>
              <UI_Typography className="line-clamp-2 text-center text-foreground reg12 sm:reg14">
                {item.label}
              </UI_Typography>
            </span>
          );

          if (isExternalHref(item.href)) {
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={item.id} href={item.href} className="shrink-0">
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
};
