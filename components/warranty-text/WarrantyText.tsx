import { ShieldCheck } from "lucide-react";
import React from "react";
import UI_Typography from "../ui/typography/UI_Typography";

export const WarrantyText = () => {
  return (
    <div className="flex items-center gap-2">
      <ShieldCheck size="20" className="text-neutral-500" />
      <UI_Typography variant="Regular/Reg14" className="text-neutral-500">
        گارانتی اصالت و سلامت فیزیکی کالا
      </UI_Typography>
    </div>
  );
};
