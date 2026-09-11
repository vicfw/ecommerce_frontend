import { LegalDocument } from "@/containers/legal/LegalDocument";
import {
  getPrivacyIntro,
  getPrivacySections,
  getPrivacyTitle,
} from "@/containers/legal/privacyContent";
import { getLegalFooterNote } from "@/containers/legal/termsContent";
import { getSiteSettingsSafe } from "@/lib/siteSettings";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsSafe();
  const siteName = settings.siteName?.trim() || "فروشگاه";

  return {
    title: "حریم خصوصی",
    description: `سیاست حفظ حریم خصوصی ${siteName}`,
  };
}

const PrivacyPage = async () => {
  const settings = await getSiteSettingsSafe();
  const siteName = settings.siteName?.trim() || "فروشگاه";

  return (
    <LegalDocument
      title={getPrivacyTitle(siteName)}
      intro={getPrivacyIntro(siteName)}
      sections={getPrivacySections(siteName)}
      footerNote={getLegalFooterNote(siteName)}
    />
  );
};

export default PrivacyPage;
