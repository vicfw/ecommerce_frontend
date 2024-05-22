import { cn } from "@/lib/utils";
import { ElementType, HTMLProps, ReactNode } from "react";

export interface IUI_TypographyProps extends HTMLProps<HTMLElement> {
  variant?: keyof typeof variantClasses;
  component?: ElementType;
  className?: string;
  children?: ReactNode;
  color?: string;
}

export const variantClasses = {
  "Regular/Reg53": "RegularReg53",
  "Regular/Reg43": "RegularReg43",
  "Regular/Reg34": "RegularReg34",
  "Regular/Reg30": "RegularReg30",
  "Regular/Reg28": "RegularReg28",
  "Regular/Reg24": "RegularReg24",
  "Regular/Reg22": "RegularReg22",
  "Regular/Reg20": "RegularReg20",
  "Regular/Reg18": "RegularReg18",
  "Regular/Reg16": "RegularReg16",
  "Regular/Reg14": "RegularReg14",
  "Regular/Reg12": "RegularReg12",
  "Regular/Reg10": "RegularReg10",
  "Regular/Reg8": "RegularReg8",
  "Medium/Med53": "MediumMed53",
  "Medium/Med43": "MediumMed43",
  "Medium/Med34": "MediumMed34",
  "Medium/Med30": "MediumMed30",
  "Medium/Med28": "MediumMed28",
  "Medium/Med24": "MediumMed24",
  "Medium/Med22": "MediumMed22",
  "Medium/Med20": "MediumMed20",
  "Medium/Med18": "MediumMed18",
  "Medium/Med16": "MediumMed16",
  "Medium/Med14": "MediumMed14",
  "Medium/Med12": "MediumMed12",
  "Medium/Med10": "MediumMed10",
  "Medium/Med8": "MediumMed8",
};

const UI_Typography = (props: IUI_TypographyProps) => {
  const {
    variant = "Regular/Reg12",
    component: Component = "span",
    className,
    children,
    color,
    ...otherProps
  } = props;

  return (
    <Component
      className={cn("base", variantClasses[variant], className)}
      {...otherProps}
    >
      {children}
    </Component>
  );
};

export default UI_Typography;
