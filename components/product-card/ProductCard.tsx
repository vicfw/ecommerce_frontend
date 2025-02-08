"use client";

import { Discount } from "@/components/discount/Discount";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Product } from "@/types/globalTypes";
import Image from "next/image";
import { Button } from "../ui/button";
import { Price } from "../price/Price";
import { cn } from "@/lib/utils";
import { useProductCard } from "./useProductCard";
import Link from "next/link";

type ProductCardProps = Product;

export const ProductCard = ({
  id,
  prName,
  images,
  price,
  discount,
  slug,
}: ProductCardProps) => {
  const { get, on } = useProductCard();

  return (
    <article className="flex flex-col  border md:py-3 md:px-4 py-1 px-2 rounded-md">
      <Link href={`/products/${slug}`}>
        <div className="flex flex-col gap-5 mb-5">
          <div className="flex justify-center items-center">
            <Image src={images[0]} alt="" width={200} height={200} />
          </div>
          <div>
            <UI_Typography
              className="text-main whitespace-nowrap overflow-hidden text-ellipsis"
              variant={get.isMobile ? "Medium/Med12" : "Medium/Med14"}
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
              variant={get.isMobile ? "Medium/Med14" : "Medium/Med16"}
            />
          </div>
          <div className="flex justify-end">
            {discount ? (
              <UI_Typography
                className={cn("text-neutral-400", discount && "line-through")}
                variant={get.isMobile ? "Regular/Reg12" : "Regular/Reg14"}
              >
                {price.toLocaleString()}
              </UI_Typography>
            ) : (
              <div className="h-[26.03px]"></div>
            )}
          </div>
        </div>
      </Link>

      <div className="flex justify-center md:items-center h-full md:h-auto items-end">
        <Button
          onClick={(e) => {
            on.handleClickOnAddToCartButton(e, id);
          }}
          className="py-1 "
        >
          <UI_Typography
            variant={get.isMobile ? "Medium/Med12" : "Medium/Med14"}
          >
            افزودن به سبد خرید
          </UI_Typography>
        </Button>
      </div>
    </article>
  );
};
