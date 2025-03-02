import { cn } from "@/lib/utils";
import { ElementType, HTMLProps, ReactNode } from "react";

export interface IUI_TypographyProps extends HTMLProps<HTMLElement> {
  component?: ElementType;
  className?: string;
  children?: ReactNode;
  color?: string;
}

const UI_Typography = (props: IUI_TypographyProps) => {
  const {
    component: Component = "span",
    className,
    children,
    color,
    ...otherProps
  } = props;

  return (
    <Component {...otherProps} className={cn("base reg12", className)}>
      {children}
    </Component>
  );
};

export default UI_Typography;
