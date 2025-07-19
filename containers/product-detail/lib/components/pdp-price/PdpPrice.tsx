import { Price } from "@/components/price/Price";
import { Discount } from "@/components/discount/Discount";
import { cn } from "@/lib/utils";
import UI_Typography from "@/components/ui/typography/UI_Typography";

type PdpPriceProps = {
  price: number;
  discount?: number;
  className?: string;
};

const PdpPrice = ({ price, discount, className }: PdpPriceProps) => {
  const hasDiscount = discount && discount > 0;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {hasDiscount ? (
        <>
          {/* Discount percentage and original price row */}
          <div className="flex items-center gap-2 mb-1">
            <UI_Typography className="text-neutral-400 line-through text-sm">
              {price.toLocaleString()} تومان
            </UI_Typography>
            <Discount discount={discount} />
          </div>

          {/* Discounted price */}
          <div>
            <Price
              price={price}
              discount={discount}
              className="med14 md:med16"
            />
          </div>
        </>
      ) : (
        /* No discount - just show original price */
        <div>
          <Price price={price} discount={discount} className="med14 md:med16" />
        </div>
      )}
    </div>
  );
};

export default PdpPrice;
