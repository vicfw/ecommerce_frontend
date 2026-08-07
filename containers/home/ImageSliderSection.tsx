"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { HomepageImageSliderSection } from "@/services/types/homepageService.types";

type ImageSliderSectionProps = {
  section: HomepageImageSliderSection;
  priority?: boolean;
};

const isExternalHref = (href: string) =>
  /^https?:\/\//i.test(href) || href.startsWith("//");

export const ImageSliderSection = ({
  section,
  priority = false,
}: ImageSliderSectionProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setSelectedIndex(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  if (section.slides.length === 0) return null;

  const showControls = section.slides.length > 1;

  return (
    <section className="w-full">
      <Carousel
        opts={{
          align: "center",
          loop: showControls,
          direction: "rtl",
        }}
        setApi={setApi}
        className="w-full"
      >
        <div className="flex items-center gap-2">
          {/* RTL: prev on the right, next on the left; icons flipped to match */}
          {showControls && (
            <CarouselPrevious className="hidden md:flex static top-auto translate-y-0 shrink-0 [&_svg]:rotate-180" />
          )}
          <div className="min-w-0 flex-1">
            <CarouselContent className="-ml-2 md:-ml-3">
              {section.slides.map((slide, index) => {
                const image = (
                  <div className="relative aspect-[5/2] w-full overflow-hidden rounded-lg">
                    <Image
                      src={slide.imageUrl}
                      alt={slide.alt || ""}
                      fill
                      priority={priority && index === 0}
                      sizes="(max-width: 768px) 90vw, 900px"
                      className="object-cover"
                    />
                  </div>
                );

                const content =
                  slide.href && isExternalHref(slide.href) ? (
                    <a
                      href={slide.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {image}
                    </a>
                  ) : slide.href ? (
                    <Link href={slide.href} className="block">
                      {image}
                    </Link>
                  ) : (
                    image
                  );

                return (
                  <CarouselItem
                    key={slide.id}
                    className="basis-[85%] pl-2 md:basis-[75%] md:pl-3 lg:basis-[70%]"
                  >
                    {content}
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </div>
          {showControls && (
            <CarouselNext className="hidden md:flex static top-auto translate-y-0 shrink-0 [&_svg]:rotate-180" />
          )}
        </div>

        {showControls && (
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {section.slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === selectedIndex}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "size-2 rounded-full transition-colors",
                  index === selectedIndex
                    ? "bg-foreground"
                    : "bg-muted-foreground/40"
                )}
              />
            ))}
          </div>
        )}
      </Carousel>
    </section>
  );
};
