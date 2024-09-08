import { Label } from "@/components/ui/label";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import React from "react";

const FieldLabel = ({
  title,
  htmlFor,
  removeStar,
}: {
  title: string;
  htmlFor: string;
  removeStar?: boolean;
}) => {
  return (
    <Label htmlFor={htmlFor}>
      <UI_Typography variant="Regular/Reg14">{title}</UI_Typography>
      {!removeStar && (
        <UI_Typography variant="Regular/Reg14" className="text-destructive">
          *
        </UI_Typography>
      )}
    </Label>
  );
};

export default FieldLabel;
