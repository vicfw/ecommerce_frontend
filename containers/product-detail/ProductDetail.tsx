"use client";

import { Discount } from "@/components/discount/Discount";
import { Price } from "@/components/price/Price";
import { Button } from "@/components/ui/button";

import UI_Typography from "@/components/ui/typography/UI_Typography";
import { WarrantyText } from "@/components/warranty-text/WarrantyText";
import { calculateDiscountedPrice, cn } from "@/lib/utils";
import { Product } from "@/types/globalTypes";
import { ChevronLeft, Info, Truck } from "lucide-react";
import Image from "next/image";
import * as Lib from "./lib";
import PDPCarousel from "./lib/components/carousel/Carousel";
import CommentSection from "./lib/components/commentSection/CommentSection";
import { useProductDetail } from "./lib/useProductDetail";

type ProductDetailProps = {
  product: Product;
};

const ProductDetailContainer = ({ product }: ProductDetailProps) => {
  const { get, on } = useProductDetail(product.id);

  return (
    <>
      {/* Desktop */}
      <main className="md:grid lg:grid-cols-[1fr_2fr] md:grid-cols-1 w-full mt-8 gap-14 hidden">
        {/* image slider */}
        <section className="min-h-[356px]">
          <div className="relative w-full h-full">
            <Image
              fill
              alt={product.enName}
              src={product.images[0]}
              style={{ objectFit: "contain" }}
            />
          </div>

          <div className="mt-4 flex gap-5">
            {product.images.slice(1).map((image) => (
              <Lib.C.ImageVariant alt={product.enName} src={image} />
            ))}
          </div>
        </section>
        {/* detail section */}
        <section className="grid lg:grid-cols-[1.5fr_1fr] gap-5">
          <div>
            <UI_Typography classID="med18">{product.prName}</UI_Typography>
            {/* product en name */}
            <div className="flex justify-center items-center gap-4 mt-4">
              <UI_Typography className="text-neutral-300 reg-12">
                {product.enName}
              </UI_Typography>
              <div className="h-[1px] bg-neutral-200 flex-1" />
            </div>
            {/* product en name */}
            {/* specialty */}
            <div className="bg-neutral-100 rounded-lg p-[8px] max-w-[132px] mt-5">
              <UI_Typography className="text-neutral-500 reg14" component="p">
                نوع زعفران
              </UI_Typography>
              <UI_Typography
                className="text-neutral-700 mt-2 reg14"
                component="p"
              >
                سوپر نگین
              </UI_Typography>
            </div>
            {/* specialty */}
            {/* see all information */}
            <div className="flex justify-center items-center gap-5 mt-10">
              <div className="h-[1px] bg-neutral-200 flex-1" />
              <Button className="flex gap-2 justify-center items-center">
                <UI_Typography className="reg14">
                  مشاهده همه ویژگی‌ها
                </UI_Typography>
                <ChevronLeft size="18px" />
              </Button>
              <div className="h-[1px] bg-neutral-200 flex-1" />
            </div>
            {/* see all information */}
            {/* warning */}
            <div className="mt-5 flex justify-center items-start gap-4">
              <Info className="text-neutral-500" width={50} height={20} />
              <UI_Typography className="text-justify leading-5 text-neutral-500 reg14">
                درخواست مرجوع کردن کالا در این گروه کالایی با دلیل "انصراف از
                خرید" تنها در صورتی قابل تایید است که کالا در شرایط اولیه باشد
                (در صورت پلمب بودن، کالا نباید باز شده باشد).
              </UI_Typography>
            </div>
          </div>
          {/* price section */}
          <div className="border border-solid border-1 border-neutral-200 bg-neutral-100 rounded-lg px-[20px] py-[16px]">
            <div className="flex flex-col w-full items-end gap-2">
              <div className="flex gap-3 items-center">
                {product.discount ? (
                  <>
                    <UI_Typography
                      className={cn(
                        "text-neutral-400 reg14",
                        product.discount && "line-through"
                      )}
                    >
                      {product.price.toLocaleString()}
                    </UI_Typography>
                    <Discount discount={product.discount} />
                  </>
                ) : null}
              </div>

              <div>
                <Price
                  price={parseFloat(
                    calculateDiscountedPrice(product.price, product.discount)
                  )}
                  className="med18"
                />
              </div>

              {/* buy Button */}
              <Button className="w-full mt-3">
                <UI_Typography className="med14">
                  افزودن به سبد خرید
                </UI_Typography>
              </Button>
              <div className="w-full mt-2">
                <WarrantyText />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile */}

      <main className="md:hidden w-full mt-2 flex flex-col">
        <div className="mb-2">
          {/* TODO:BreadCrumb Goes Here */}

          {/* Image Slider */}
          <PDPCarousel images={product.images} name={product.prName} />

          <div className="mt-5">
            <UI_Typography className="med16">{product.prName}</UI_Typography>
          </div>
          {/* TODO:Rating , Comments , Favorite */}
          {/* Colors */}
          {product.colorImage ? (
            <div className="mt-4">
              <UI_Typography component="p" className="reg14">
                رنگ:{" "}
              </UI_Typography>
              <div className="flex justify-start gap-3">
                {product.colorImage.map((colorImage) => (
                  <Image
                    width={34}
                    height={34}
                    src={colorImage.colorImage}
                    alt={product.prName}
                    key={colorImage.id}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {/* shipping day */}
          <div className="border rounded-md py-2 px-1 flex items-center justify-start gap-3 mt-4 text-neutral-500">
            <Truck />
            <UI_Typography>ارسال از 2 روز دیگر</UI_Typography>
          </div>

          {/* Terms */}
          <div className="bg-neutral-100 flex items-center justify-between py-4 mt-4 rounded-sm">
            <div className="border-l text-neutral-600 px-2">
              <UI_Typography>
                بازگشت کالا تا 7 روز طبق شرایط مرجوعی{" "}
              </UI_Typography>
            </div>
            <div className="border-l text-neutral-600 px-2">
              <UI_Typography>
                بازگشت کالا تا 7 روز طبق شرایط مرجوعی{" "}
              </UI_Typography>
            </div>
            <div className="px-2 text-neutral-600">
              <UI_Typography>
                بازگشت کالا تا 7 روز طبق شرایط مرجوعی{" "}
              </UI_Typography>
            </div>
          </div>

          {/* Description */}

          <div className="bg-neutral-100 mt-5 rounded-sm border px-2">
            <UI_Typography className="text-neutral-500">
              {product.description}
            </UI_Typography>
          </div>

          {/* Comments */}
          <CommentSection />
        </div>

        {/* Bottom Sell Button */}
        <div className="sticky z-10 bottom-0 right-0 bg-white border-t h-[80px] flex items-center justify-between">
          <Button
            loading={get.addToAnonCartIsPending || get.addToCartIsPending}
            onClick={() => on.handleClickOnAddToCartButton(product.id)}
          >
            افزودن به سبد خرید
          </Button>

          <div>
            <UI_Typography className="text-lg">
              <Price discount={product.discount} price={product.price} />
            </UI_Typography>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetailContainer;
