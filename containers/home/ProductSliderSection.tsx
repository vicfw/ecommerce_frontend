"use client";

import { ProductCard } from "@/components/product-card/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { cn } from "@/lib/utils";
import { Product } from "@/types/globalTypes";

type ProductSliderSectionProps = {
  title: string;
  products: Product[];
  backgroundColor?: string;
};

export const ProductSliderSection = ({
  title,
  products,
  backgroundColor,
}: ProductSliderSectionProps) => {
  if (products.length === 0) return null;

  const hasBg = !!backgroundColor;

  return (
    <section className="w-full">
      <UI_Typography
        component="h2"
        className="mb-3 text-foreground med16 md:med18"
      >
        {title}
      </UI_Typography>

      <div
        className={cn("w-full", hasBg && "rounded-lg p-3 md:p-4")}
        style={hasBg ? { backgroundColor } : undefined}
      >
        <Carousel
          opts={{
            align: "start",
            direction: "rtl",
            dragFree: true,
            skipSnaps: false,
            duration: 40,
          }}
          className="w-full"
        >
          <div className="flex items-center gap-2">
            {/* RTL: prev on the right, next on the left; icons flipped to match */}
            <CarouselPrevious className="hidden md:flex static top-auto translate-y-0 shrink-0 [&_svg]:rotate-180" />
            <div className="min-w-0 flex-1">
              <CarouselContent className="-ml-2 md:-ml-4">
                {products.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="pl-2 basis-[48%] sm:basis-1/3 md:basis-1/4 lg:basis-1/5 md:pl-4"
                  >
                    <ProductCard {...product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
            <CarouselNext className="hidden md:flex static top-auto translate-y-0 shrink-0 [&_svg]:rotate-180" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
