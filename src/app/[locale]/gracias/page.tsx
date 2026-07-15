import { Link } from "@/i18n/navigation";
import { Nav } from "@/components/sections/Nav";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {buildAlternates} from "@/i18n/metadata";

// This route has a page-level generateMetadata (getTranslations) so Next renders
// it dynamically; @cloudflare/next-on-pages requires non-static routes to run on
// the Edge runtime.
export const runtime = "edge";

const CONTACT_EMAIL = "olivier.serres@revcognition.com";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "gracias"});
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: {index: false, follow: false},
    alternates: buildAlternates(locale, "/gracias"),
  };
}

export default async function GraciasPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gracias");
  return (
    <>
      <Nav />
      <main id="main" className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-32 text-center">
        <p
          aria-hidden="true"
          className="font-serif text-3xl text-[var(--color-warm)] mb-6"
        >
          ✓
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-4">
          {t("heading")}
        </h1>
        <p className="text-[var(--color-slate)] text-lg max-w-md mx-auto mb-8">
          {t("bodyPre")}{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[var(--color-ink)] underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <Link
          href="/"
          className="text-sm text-[var(--color-slate)] underline decoration-[var(--color-slate-light)] underline-offset-4 hover:text-[var(--color-ink)] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2 inline-block px-1 py-1"
        >
          {t("backLink")}
        </Link>
      </main>
    </>
  );
}
