"use client";

import { Discount } from "@/components/discount/Discount";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { cn } from "@/lib/utils";
import { Product } from "@/types/globalTypes";
import Image from "next/image";
import Link from "next/link";
import { Price } from "../price/Price";

type ProductCardProps = Product;

export const ProductCard = ({
  id,
  prName,
  images,
  price,
  discount,
  slug,
  colorImages,
}: ProductCardProps) => {
  return (
    <article className="flex flex-col  border md:py-3 md:px-4 py-1 px-2 rounded-md">
      <Link href={`/products/${slug}`}>
        <div className="flex flex-col gap-5 mb-5">
          <div className="flex justify-center items-center">
            <Image src={images[0]} alt="" width={200} height={200} />
          </div>
          <div>
            <UI_Typography
              className="text-main whitespace-nowrap overflow-hidden text-ellipsis med12 md:med14"
              component="h3"
            >
              {prName}
            </UI_Typography>
          </div>
          <div
            className={cn(
              "flex items-center h-[34.03px]",
              discount ? "justify-between" : "justify-end"
            )}
          >
            {discount ? <Discount discount={discount} /> : null}
            <Price
              price={price}
              discount={discount}
              className="med14 md:med16"
            />
          </div>
          <div className="flex flex-row-reverse justify-between">
            {discount ? (
              <UI_Typography
                className={cn(
                  "text-neutral-400 reg12 reg14",
                  discount && "line-through"
                )}
              >
                {price.toLocaleString()} تومان
              </UI_Typography>
            ) : (
              <div className="h-[26.03px]"></div>
            )}
            {colorImages?.length ? (
              <UI_Typography className="text-neutral-400 reg12 md:reg14">
                {colorImages.length} رنگ
              </UI_Typography>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
};
