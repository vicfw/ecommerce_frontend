import UI_Typography from "@/components/ui/typography/UI_Typography";
import * as MainLib from "../../";

export const EmptyCart = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4 border-1 border-neutral-200 border rounded-md py-3 pb-12">
      <div>
        <MainLib.I.EmptyBasket />
      </div>
      <UI_Typography variant="Medium/Med18" className="text-neutral-800">
        سبد خرید شما خالی است!
      </UI_Typography>
      <UI_Typography variant="Regular/Reg14" className="text-neutral-600">
        می‌توانید برای مشاهده محصولات بیشتر به صفحات زیر بروید:
      </UI_Typography>
    </div>
  );
};
