import Link from "next/link";
import React, { useMemo } from "react";

type SidebarBoxProps = {
  children: React.ReactNode;
  href?: string;
} & (
  | React.HTMLAttributes<HTMLDivElement>
  | React.HTMLAttributes<HTMLAnchorElement>
);

const SidebarBox = ({ href, children, onClick, ...rest }: SidebarBoxProps) => {
  const className = useMemo(
    () =>
      "border rounded-lg  items-center py-[8px] px-[16px]  max-h-[85px] justify-center flex flex-col gap-2",
    []
  );

  return href ? (
    <Link
      href={href}
      {...(rest as React.HTMLAttributes<HTMLAnchorElement>)}
      className={className}
      onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
    >
      {children}
    </Link>
  ) : (
    <div
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      className={className}
      onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
    >
      {children}
    </div>
  );
};

export default SidebarBox;
