"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/types/globalTypes";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import UI_Typography from "@/components/ui/typography/UI_Typography";

type ColorPickerProps = {
  product: Product;
  onColorSelect: (images: string[], colorImageId: number) => void;
};

const ColorPicker = ({ product, onColorSelect }: ColorPickerProps) => {
  const searchParams = useSearchParams();

  if (!product.defaultColorImage && !product.colorImages?.length) return null;

  const selectedCi = searchParams.get("ci");

  return (
    <div className="mt-4">
      <UI_Typography component="p" className="reg14">
        رنگ:{" "}
      </UI_Typography>
      <div className="flex justify-start gap-2 items-center">
        {product.defaultColorImage ? (
          <button
            type="button"
            className={cn(
              "relative p-0.5 transition-all duration-200 cursor-pointer",
              !selectedCi && "ring-2 ring-primary ring-offset-1",
            )}
            onClick={() => onColorSelect(product.images ?? [], 0)}
          >
            <Image
              width={28}
              height={28}
              src={product.defaultColorImage}
              alt={product.prName}
              className="h-[28px] w-[28px]"
            />
          </button>
        ) : null}

        {product.colorImages?.map((colorImage) => {
          const isSelected = selectedCi === colorImage.id.toString();
          return (
            <button
              type="button"
              key={colorImage.id}
              className={cn(
                "relative p-0.5 transition-all duration-200",
                isSelected && "ring-2 ring-primary ring-offset-1",
              )}
              onClick={() => onColorSelect(colorImage.images, colorImage.id)}
            >
              <Image
                width={28}
                height={28}
                src={colorImage.colorImage}
                alt={product.prName}
                className={cn(
                  "cursor-pointer transition-transform duration-200",
                  isSelected && "scale-105",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorPicker;
