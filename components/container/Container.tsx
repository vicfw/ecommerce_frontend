import { ElementType, HTMLProps, ReactNode } from "react";

type ContainerProps = {
  component: ElementType;
} & HTMLProps<HTMLElement>;

export const Container = ({
  children,
  component: Component = "div",
  ...otherProps
}: ContainerProps) => {
  return (
    <Component
      className="flex w-full container mx-auto relative justify-between md:px-4 grow"
      {...otherProps}
    >
      {children}
    </Component>
  );
};
