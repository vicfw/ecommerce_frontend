import { cn } from "@/lib/utils";
import { Loader2, LucideProps } from "lucide-react";
import React from "react";

type Props = LucideProps & { className?: string };

const Loader = ({ className, ...rest }: Props) => {
  return (
    <Loader2
      className={cn("animate-spin text-neutral-300", className)}
      {...rest}
    />
  );
};

export default Loader;
