import { Nav } from "@/components/sections/Nav";
import { ServiciosB2B } from "@/components/sections/ServiciosB2B";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Footer } from "@/components/sections/Footer";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {buildAlternates} from "@/i18n/metadata";

const OG_LOCALE: Record<string, string> = {es: "es_ES", en: "en_US", fr: "fr_FR"};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "serviciosB2B"});
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/soluciones/servicios-b2b"),
    openGraph: {
      title,
      description,
      url: "https://revcognition.com/soluciones/servicios-b2b",
      siteName: "RevCognition",
      locale: OG_LOCALE[locale] ?? "es_ES",
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export default async function ServiciosB2BPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return (
    <>
      <Nav />
      <main id="main">
        <ServiciosB2B />
      </main>
      <CtaFinal />
      <Footer />
    </>
  );
}
