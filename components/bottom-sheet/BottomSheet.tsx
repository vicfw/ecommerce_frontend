import { Sheet, SheetContent } from "@/components/ui/sheet";

type Props = {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const BottomSheet = ({ children, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal>
      <SheetContent side="bottom" className="rounded-t-lg rounded-tl-lg">
        <div className="py-2">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default BottomSheet;
