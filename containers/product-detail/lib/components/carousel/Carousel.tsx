"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  images: string[];
  name: string;
};

const PDPCarousel = ({ images, name }: Props) => {
  return (
    <Carousel className="w-full" opts={{ direction: "rtl" }}>
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem
            className={cn("pr-4", images.length === 1 ? "" : "basis-3/4")}
            key={index}
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image width={200} height={200} src={img} alt={name} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PDPCarousel;
