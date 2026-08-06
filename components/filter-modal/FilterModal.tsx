import * as React from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface FilterItemProps {
  title: string;
  onClick: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-background">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-semibold text-foreground">فیلتر ها</h2>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0">{children}</div>
      </div>
    </div>
  );
};

export const FilterItem: React.FC<FilterItemProps> = ({ title, onClick }) => {
  return (
    <div className="border-b">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 hover:bg-accent text-foreground"
      >
        <span className="text-base">{title}</span>
        <ChevronLeft className="h-5 w-5 text-muted-foreground" />
      </button>
    </div>
  );
};

export const FilterSection: React.FC<{
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}> = ({ title, onBack, children }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Section Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={onBack} className="p-2 hover:bg-accent rounded-full">
          <ChevronRight className="h-6 w-6" />
        </button>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Section Content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};
