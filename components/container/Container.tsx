import { cn } from "@/lib/utils";
import { ElementType, HTMLProps } from "react";

type ContainerProps = {
  component: ElementType;
} & HTMLProps<HTMLElement>;

export const Container = ({
  children,
  component: Component = "div",
  className,
  ...otherProps
}: ContainerProps) => {
  return (
    <Component
      className={cn(
        "flex w-full container mx-auto relative justify-between md:px-4 px-2",
        className
      )}
      {...otherProps}
    >
      {children}
    </Component>
  );
};
