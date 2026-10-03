import {getTranslations, setRequestLocale} from "next-intl/server";
import {buildAlternates} from "@/i18n/metadata";
import {LegalDoc} from "@/components/sections/LegalDoc";

// This route has a page-level generateMetadata (getTranslations) so Next renders
// it dynamically; @cloudflare/next-on-pages requires non-static routes to run on
// the Edge runtime.
export const runtime = "edge";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "terms"});
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/terms"),
  };
}

export default async function TermsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <LegalDoc namespace="terms" />;
}
