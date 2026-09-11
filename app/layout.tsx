import { AlertModal } from "@/components/alert-modal/AlertModal";
import { CompositionRoot } from "@/components/composition-root/CompositionRoot";
import { Toaster } from "@/components/ui/toaster";
import { getSiteSettingsSafe } from "@/lib/siteSettings";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const vazir = localFont({ src: "./Vazir.ttf" });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsSafe();
  const siteName = settings.siteName?.trim() || "فروشگاه";
  const iconUrl =
    settings.faviconUrl?.trim() || settings.logoUrl?.trim() || undefined;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    icons: iconUrl
      ? {
          icon: [{ url: iconUrl }],
          apple: [{ url: iconUrl }],
          shortcut: iconUrl,
        }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettingsSafe();
  const siteName = settings.siteName?.trim();
  const logoUrl = settings.logoUrl?.trim();

  const organizationJsonLd =
    siteName && logoUrl
      ? {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteName,
          url: siteUrl,
          logo: logoUrl,
        }
      : null;

  return (
    <html lang="fa" dir="rtl">
      <body className={vazir.className}>
        {organizationJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationJsonLd),
            }}
          />
        ) : null}
        <ReactQueryProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <CompositionRoot />
          <AlertModal />
          <Toaster />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
