import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PriceFilterProps {
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onApply,
  onReset,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            حداقل قیمت
          </label>
          <Input
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            حداکثر قیمت
          </label>
          <Input
            type="number"
            placeholder="1000000"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          onClick={onApply}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          اعمال
        </Button>
        <Button onClick={onReset} variant="outline" className="flex-1">
          پاک کردن
        </Button>
      </div>
    </div>
  );
};
