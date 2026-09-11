import UI_Typography from "@/components/ui/typography/UI_Typography";
import { SiteSettings } from "@/services/types/siteSettingsService.types";
import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  settings: SiteSettings | null;
  /** Extra classes on the image when a logo URL is present */
  className?: string;
  /** Show site name text next to the logo (auth layout) */
  showName?: boolean;
};

const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className ?? "h-6 w-6"}
    aria-hidden
  >
    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
  </svg>
);

export function SiteLogo({
  settings,
  className,
  showName = false,
}: SiteLogoProps) {
  const siteName = settings?.siteName?.trim() || "";
  const logoUrl = settings?.logoUrl?.trim() || "";
  const alt = settings?.logoAlt?.trim() || siteName || "Home";
  const ariaLabel = siteName || "Home";

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2"
      aria-label={ariaLabel}
    >
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={alt}
          width={280}
          height={64}
          className={className ?? "h-16 w-auto object-contain"}
          unoptimized
          priority
        />
      ) : (
        <PlaceholderIcon className="h-6 w-6" />
      )}
      {showName && siteName ? (
        <UI_Typography className="med18">{siteName}</UI_Typography>
      ) : null}
    </Link>
  );
}
