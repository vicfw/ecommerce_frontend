import UI_Typography from "@/components/ui/typography/UI_Typography";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";

type Props = {
  label: string;
  value: string | undefined;
  onClick: () => void;
  className?: string;
  editTestId?: string;
  editAriaLabel?: string;
};

export const EditProfileCol = ({
  label,
  value,
  className,
  onClick,
  editTestId,
  editAriaLabel,
}: Props) => {
  return (
    <div
      className={cn(
        "py-3 lg:py-4 pl-4 flex items-center justify-between",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <UI_Typography variant="Regular/Reg14" className="text-neutral-500">
          {label}
        </UI_Typography>
        <div>
          <UI_Typography variant="Medium/Med12" className="text-neutral-700">
            {value}
          </UI_Typography>
        </div>
      </div>
      <button
        type="button"
        className="cursor-pointer text-muted-foreground"
        onClick={onClick}
        aria-label={editAriaLabel ?? `ویرایش ${label}`}
        {...(editTestId ? { "data-testid": editTestId } : {})}
      >
        <Edit aria-hidden />
      </button>
    </div>
  );
};
