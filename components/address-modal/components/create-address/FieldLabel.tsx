import { Label } from "@/components/ui/label";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import React from "react";

const FieldLabel = ({ title, htmlFor }: { title: string; htmlFor: string }) => {
  return (
    <Label htmlFor={htmlFor}>
      <UI_Typography variant="Regular/Reg16">{title}</UI_Typography>
      <UI_Typography variant="Medium/Med14" className="text-destructive">
        *
      </UI_Typography>
    </Label>
  );
};

export default FieldLabel;
