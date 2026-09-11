import { LegalDocument } from "@/containers/legal/LegalDocument";
import {
  getLegalFooterNote,
  getTermsIntro,
  getTermsSections,
  getTermsTitle,
} from "@/containers/legal/termsContent";
import { getSiteSettingsSafe } from "@/lib/siteSettings";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsSafe();
  const siteName = settings.siteName?.trim() || "فروشگاه";

  return {
    title: "قوانین و مقررات",
    description: `قوانین و مقررات خرید از ${siteName}`,
  };
}

const TermsPage = async () => {
  const settings = await getSiteSettingsSafe();
  const siteName = settings.siteName?.trim() || "فروشگاه";

  return (
    <LegalDocument
      title={getTermsTitle(siteName)}
      intro={getTermsIntro(siteName)}
      sections={getTermsSections(siteName)}
      footerNote={getLegalFooterNote(siteName)}
    />
  );
};

export default TermsPage;
