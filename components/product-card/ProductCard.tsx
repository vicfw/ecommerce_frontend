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
    <article className="flex flex-col  border py-3 px-4 rounded-md">
      <Link href={`/products/${slug}`}>
        <div className="flex flex-col gap-5 mb-5">
          <div className="flex justify-center items-center">
            <Image src={images[0]} alt="" width={200} height={200} />
          </div>
          <div>
            <UI_Typography
              className="text-main whitespace-nowrap overflow-hidden text-ellipsis"
              variant="Medium/Med14"
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
            <Price price={price} variant="Medium/Med16" />
          </div>
          <div className="flex justify-end">
            {discount ? (
              <UI_Typography
                className={cn("text-neutral-400", discount && "line-through")}
                variant="Regular/Reg14"
              >
                {price.toLocaleString()}
              </UI_Typography>
            ) : (
              <div className="h-[26.03px]"></div>
            )}
          </div>
        </div>
      </Link>

      <div className="flex justify-center items-center">
        <Button
          onClick={(e) => {
            on.handleClickOnAddToCartButton(e, id);
          }}
        >
          <UI_Typography variant="Medium/Med14">
            افزودن به سبد خرید
          </UI_Typography>
        </Button>
      </div>
    </article>
  );
};
