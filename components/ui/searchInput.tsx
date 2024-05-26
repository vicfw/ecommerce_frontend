import { SearchIcon } from "lucide-react";
import { InputProps } from "./input";
import React from "react";
import { cn } from "@/lib/utils";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm",
          className
        )}
      >
        <SearchIcon className="h-[16px] w-[16px] mr-2" />
        <input
          {...props}
          type="search"
          ref={ref}
          className="w-full text-main text-lg p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
