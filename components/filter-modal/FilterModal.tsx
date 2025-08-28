import * as React from "react";
import { X, ChevronRight, ChevronDown, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface FilterItemProps {
  title: string;
  isExpanded?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-semibold">فیلتر ها</h2>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export const FilterItem: React.FC<FilterItemProps> = ({
  title,
  isExpanded = false,
  onClick,
  children,
}) => {
  return (
    <div className="border-b">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
      >
        <span className="text-base">{title}</span>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </button>
      {isExpanded && <div className="px-4 pb-4">{children}</div>}
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
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronRight className="h-6 w-6" />
        </button>
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Section Content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};
