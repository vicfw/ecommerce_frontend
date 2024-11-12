import UI_Typography from "@/components/ui/typography/UI_Typography";
import { Paperclip } from "lucide-react";
import React from "react";

const EmptyOrder = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <Paperclip size={40} className="text-neutral-300" />
      <UI_Typography variant="Regular/Reg14" className="text-neutral-900">
        هنوز هیچ سفارشی ندادید
      </UI_Typography>
    </div>
  );
};

export default EmptyOrder;
