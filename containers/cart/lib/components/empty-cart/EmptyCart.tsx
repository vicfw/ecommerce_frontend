import UI_Typography from "@/components/ui/typography/UI_Typography";
import { EmptyBasket } from "../../icons";

export const EmptyCart = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4 border-1 border-neutral-200 border rounded-md py-3 pb-12 justify-start h-fit mt-4 md:m-0">
      <div>
        <EmptyBasket />
      </div>
      <UI_Typography className="text-neutral-800 med18">
        سبد خرید شما خالی است!
      </UI_Typography>
      <UI_Typography className="text-neutral-600 reg14">
        می‌توانید برای مشاهده محصولات بیشتر به صفحات زیر بروید:
      </UI_Typography>
    </div>
  );
};
