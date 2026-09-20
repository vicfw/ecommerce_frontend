import UI_Typography from "@/components/ui/typography/UI_Typography";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type ProfileBackHeaderProps = {
  title: string;
  href?: string;
};

const ProfileBackHeader = ({
  title,
  href = "/profile",
}: ProfileBackHeaderProps) => {
  return (
    <header className="pb-4 px-3 flex items-center border-b border-border gap-2 md:hidden">
      <Link href={href} aria-label="بازگشت">
        <ArrowRight className="text-foreground" size={20} />
      </Link>
      <UI_Typography className="text-foreground reg14">{title}</UI_Typography>
    </header>
  );
};

export default ProfileBackHeader;
