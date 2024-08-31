import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import UI_Typography from "../ui/typography/UI_Typography";

type ComboboxProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  data: { value: string; label: string }[];
};

const Combobox = ({ placeholder, onChange, value, data }: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {value ? (
            data.find((dt) => dt.value === value)?.label
          ) : (
            <UI_Typography variant="Regular/Reg14">{placeholder}</UI_Typography>
          )}
          <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="جستجو" />
          <CommandList>
            <CommandEmpty>
              <UI_Typography variant="Regular/Reg14">
                موردی یافت نشد.
              </UI_Typography>
            </CommandEmpty>
            <CommandGroup>
              {data.map((dt) => (
                <CommandItem
                  key={dt.value}
                  value={dt.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === dt.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {
                    <UI_Typography variant="Regular/Reg14">
                      {dt.label}
                    </UI_Typography>
                  }
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
