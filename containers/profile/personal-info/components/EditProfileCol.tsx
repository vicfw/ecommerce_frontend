import UI_Typography from "@/components/ui/typography/UI_Typography";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";

type Props = {
  label: string;
  value: string | undefined;
  onClick: () => void;
  className?: string;
};

export const EditProfileCol = ({ label, value, className, onClick }: Props) => {
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
      <Edit className="cursor-pointer text-[#424750]" onClick={onClick} />
    </div>
  );
};
