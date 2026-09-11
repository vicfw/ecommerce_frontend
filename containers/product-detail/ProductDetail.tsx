"use client";

import { Discount } from "@/components/discount/Discount";
import { Price } from "@/components/price/Price";
import { Button } from "@/components/ui/button";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { WarrantyText } from "@/components/warranty-text/WarrantyText";
import { calculateDiscountedPrice, cn } from "@/lib/utils";
import { Product } from "@/types/globalTypes";
import { ArrowLeft, ChevronLeft, Info, Truck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import * as Lib from "./lib";
import PDPCarousel from "./lib/components/carousel/Carousel";
import CommentSection from "./lib/components/commentSection/CommentSection";
import ColorPicker from "./lib/components/color-picker/ColorPicker";
import PdpPrice from "./lib/components/pdp-price/PdpPrice";
import { useProductDetail } from "./lib/useProductDetail";
import AddedToCartModal from "./lib/components/addedToCartModal/AddedToCartModal";

type ProductDetailProps = {
  product: Product;
};

const ProductTerms = () => (
  <div className="bg-neutral-100 flex items-stretch justify-between py-4 mt-4 rounded-sm overflow-hidden">
    <div className="border-l text-neutral-600 px-2 min-w-0 flex-1">
      <UI_Typography className="text-xs leading-5">
        بازگشت کالا تا 7 روز طبق شرایط مرجوعی{" "}
      </UI_Typography>
    </div>
    <div className="border-l text-neutral-600 px-2 min-w-0 flex-1">
      <UI_Typography className="text-xs leading-5">
        بازگشت کالا تا 7 روز طبق شرایط مرجوعی{" "}
      </UI_Typography>
    </div>
    <div className="px-2 text-neutral-600 min-w-0 flex-1">
      <UI_Typography className="text-xs leading-5">
        بازگشت کالا تا 7 روز طبق شرایط مرجوعی{" "}
      </UI_Typography>
    </div>
  </div>
);

const ProductDescription = ({ description }: { description: string }) => (
  <div className="bg-neutral-100 mt-5 rounded-sm border px-2 py-2">
    <UI_Typography className="text-neutral-500">{description}</UI_Typography>
  </div>
);

const ShippingStrip = () => (
  <div className="border rounded-md py-2 px-1 flex items-center justify-start gap-3 mt-4 text-neutral-500">
    <Truck />
    <UI_Typography>ارسال از 2 روز دیگر</UI_Typography>
  </div>
);

const ProductDetailContainer = ({ product }: ProductDetailProps) => {
  const { get, on } = useProductDetail(product);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const safeImageIndex =
    get.productImages.length > 0
      ? Math.min(selectedImageIndex, get.productImages.length - 1)
      : 0;

  const mainImage =
    get.productImages[safeImageIndex] ||
    get.productImages[0] ||
    product.defaultColorImage;

  const isAddingToCart = get.addToAnonCartIsPending || get.addToCartIsPending;

  const handleColorSelect = (images: string[], id: number) => {
    setSelectedImageIndex(0);
    on.handleClickOnColorImage(images, id);
  };

  return (
    <div className="w-full flex flex-col">
      <button
        type="button"
        onClick={on.routerBack}
        className="self-end mb-2 p-1 text-neutral-700"
        aria-label="بازگشت"
      >
        <ArrowLeft size={22} />
      </button>

      {/* Desktop */}
      <main className="md:grid lg:grid-cols-[1fr_2fr] md:grid-cols-1 w-full mt-2 md:mt-4 gap-14 hidden">
        <section className="min-h-[356px]">
          <div className="relative w-full h-[356px]">
            {mainImage && (
              <Image
                fill
                alt={product.enName}
                src={mainImage}
                style={{ objectFit: "contain" }}
              />
            )}
          </div>

          <div className="mt-4 flex gap-5 flex-wrap">
            {get.productImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                className={cn(
                  "rounded-lg",
                  safeImageIndex === index && "ring-2 ring-primary",
                )}
              >
                <Lib.C.ImageVariant alt={product.enName} src={image} />
              </button>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-[1.5fr_1fr] gap-5">
          <div>
            <UI_Typography className="med18">{product.prName}</UI_Typography>
            <div className="flex justify-center items-center gap-4 mt-4">
              <UI_Typography className="text-neutral-300 reg-12">
                {product.enName}
              </UI_Typography>
              <div className="h-[1px] bg-neutral-200 flex-1" />
            </div>

            <ColorPicker product={product} onColorSelect={handleColorSelect} />
            <ShippingStrip />

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

            <div className="mt-5 flex justify-center items-start gap-4">
              <Info className="text-neutral-500" width={50} height={20} />
              <UI_Typography className="text-justify leading-5 text-neutral-500 reg14">
                درخواست مرجوع کردن کالا در این گروه کالایی با دلیل &quot;انصراف
                از خرید&quot; تنها در صورتی قابل تایید است که کالا در شرایط
                اولیه باشد (در صورت پلمب بودن، کالا نباید باز شده باشد).
              </UI_Typography>
            </div>

            <ProductTerms />
            <ProductDescription description={product.description} />
          </div>

          <div className="border border-solid border-1 border-neutral-200 bg-neutral-100 rounded-lg px-[20px] py-[16px] h-fit sticky top-4">
            <div className="flex flex-col w-full items-end gap-2">
              <div className="flex gap-3 items-center">
                {product.discount ? (
                  <>
                    <UI_Typography
                      className={cn(
                        "text-neutral-400 reg14",
                        "line-through",
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
                    calculateDiscountedPrice(product.price, product.discount),
                  )}
                  className="med18"
                />
              </div>

              <Button
                className="w-full mt-3"
                loading={isAddingToCart}
                onClick={() => on.handleClickOnAddToCartButton(product.id)}
              >
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
        <div className="mb-2 min-w-0">
          <PDPCarousel images={get.productImages} name={product.prName} />

          <div className="mt-5">
            <UI_Typography className="med16">{product.prName}</UI_Typography>
          </div>

          <ColorPicker product={product} onColorSelect={handleColorSelect} />
          <ShippingStrip />
          <ProductTerms />
          <ProductDescription description={product.description} />
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t h-[80px] flex items-center justify-between px-4">
          <Button
            loading={isAddingToCart}
            onClick={() => on.handleClickOnAddToCartButton(product.id)}
          >
            افزودن به سبد خرید
          </Button>

          <div>
            <UI_Typography className="text-lg">
              <PdpPrice discount={product.discount} price={product.price} />
            </UI_Typography>
          </div>
        </div>
      </main>

      {/* Single mount — avoids double comment fetches / login sheets */}
      <div className="w-full mt-5 pb-[100px] md:pb-8 md:mt-8">
        <CommentSection />
      </div>

      <AddedToCartModal />
    </div>
  );
};

export default ProductDetailContainer;
