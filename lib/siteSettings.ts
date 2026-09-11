import { catalogTags, CATALOG_TTL_SECONDS } from "@/lib/catalogCache";
import { SiteSettings } from "@/services/types/siteSettingsService.types";

const emptySettings = (): SiteSettings => ({
  id: 0,
  siteName: "",
  logoUrl: null,
  logoAlt: null,
  faviconUrl: null,
  updatedAt: null,
});

const NEEDS_CLOUDINARY_AUTO_FORMAT = /\.(heic|heif|tif|tiff)(?:$|\?)/i;

/**
 * Cloudinary stores iPhone HEIC as-is. Next/Image and most browsers cannot
 * decode HEIC, so ask Cloudinary to convert on delivery.
 */
export function withCloudinaryAutoFormat(
  url: string | null | undefined
): string | null {
  if (!url?.trim()) return url ?? null;
  if (!NEEDS_CLOUDINARY_AUTO_FORMAT.test(url)) return url;

  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "res.cloudinary.com") return url;

    const marker = "/image/upload/";
    const idx = parsed.pathname.indexOf(marker);
    if (idx === -1) return url;
    if (parsed.pathname.includes("f_auto")) return url;

    const insertAt = idx + marker.length;
    parsed.pathname = `${parsed.pathname.slice(0, insertAt)}f_auto,q_auto/${parsed.pathname.slice(insertAt)}`;
    return parsed.toString();
  } catch {
    return url;
  }
}

function normalizeSettings(settings: SiteSettings): SiteSettings {
  return {
    ...settings,
    logoUrl: withCloudinaryAutoFormat(settings.logoUrl),
    faviconUrl: withCloudinaryAutoFormat(settings.faviconUrl),
  };
}

/**
 * Soft-fetch site settings so layout never 500s if the API is down.
 */
export async function getSiteSettingsSafe(): Promise<SiteSettings> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_API_URL?.trim() ?? "";
  const url = `${baseUrl}/site-settings`;

  try {
    if (!baseUrl) {
      return emptySettings();
    }

    const response = await fetch(url, {
      next: {
        revalidate: CATALOG_TTL_SECONDS,
        tags: [catalogTags.siteSettings],
      },
    });

    if (!response.ok) {
      return emptySettings();
    }

    const json = await response.json();
    const data = (json?.data as SiteSettings) ?? emptySettings();
    return normalizeSettings(data);
  } catch {
    return emptySettings();
  }
}
