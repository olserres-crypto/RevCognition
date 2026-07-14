import { Nav } from "@/components/sections/Nav";
import { Producto } from "@/components/sections/Producto";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Footer } from "@/components/sections/Footer";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {buildAlternates} from "@/i18n/metadata";

const OG_LOCALE: Record<string, string> = {es: "es_ES", en: "en_US", fr: "fr_FR"};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "producto"});
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/producto"),
    openGraph: {
      title,
      description,
      url: "https://revcognition.com/producto",
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

export default async function ProductoPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return (
    <>
      <Nav />
      <main id="main">
        <Producto />
      </main>
      <CtaFinal />
      <Footer />
    </>
  );
}
