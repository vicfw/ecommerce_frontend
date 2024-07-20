import { Product } from "@/types/globalTypes";
import Image from "next/image";
import * as Lib from "./lib";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Info } from "lucide-react";
import { Discount } from "@/components/discount/Discount";
import { calculateDiscountedPrice, cn } from "@/lib/utils";
import { Price } from "@/components/price/Price";
import { WarrantyText } from "@/components/warranty-text/WarrantyText";

type ProductDetailProps = {
  product: Product;
};

const ProductDetailContainer = async ({ product }: ProductDetailProps) => {
  return (
    <main className="grid lg:grid-cols-[1fr_2fr] md:grid-cols-1 w-full mt-8 gap-14">
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
          <UI_Typography variant="Medium/Med18">{product.prName}</UI_Typography>
          {/* product en name */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <UI_Typography variant="Regular/Reg12" className="text-neutral-300">
              {product.enName}
            </UI_Typography>
            <div className="h-[1px] bg-neutral-200 flex-1" />
          </div>
          {/* product en name */}
          {/* specialty */}
          <div className="bg-neutral-100 rounded-lg p-[8px] max-w-[132px] mt-5">
            <UI_Typography
              className="text-neutral-500"
              variant="Regular/Reg14"
              component="p"
            >
              نوع زعفران
            </UI_Typography>
            <UI_Typography
              className="text-neutral-700 mt-2"
              variant="Regular/Reg14"
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
              <UI_Typography>مشاهده همه ویژگی‌ها</UI_Typography>
              <ChevronLeft size="18px" />
            </Button>
            <div className="h-[1px] bg-neutral-200 flex-1" />
          </div>
          {/* see all information */}
          {/* warning */}
          <div className="mt-5 flex justify-center items-start gap-4">
            <Info className="text-neutral-500" width={50} height={20} />
            <UI_Typography
              className="text-justify leading-5 text-neutral-500"
              variant="Regular/Reg14"
            >
              درخواست مرجوع کردن کالا در این گروه کالایی با دلیل "انصراف از
              خرید" تنها در صورتی قابل تایید است که کالا در شرایط اولیه باشد (در
              صورت پلمب بودن، کالا نباید باز شده باشد).
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
                      "text-neutral-400",
                      product.discount && "line-through"
                    )}
                    variant="Regular/Reg14"
                  >
                    {product.price.toLocaleString()}
                  </UI_Typography>
                  <Discount discount={product.discount} />
                </>
              ) : null}
            </div>

            <div>
              <Price
                price={calculateDiscountedPrice(
                  product.price,
                  product.discount
                )}
                variant="Medium/Med18"
              />
            </div>

            {/* buy Button */}
            <Button className="w-full mt-3">
              <UI_Typography variant="Medium/Med14">
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
  );
};

export default ProductDetailContainer;
