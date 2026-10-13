import {getTranslations, setRequestLocale} from "next-intl/server";
import {buildAlternates} from "@/i18n/metadata";
import {Nav} from "@/components/sections/Nav";
import {Footer} from "@/components/sections/Footer";
import {OptOutForm} from "@/components/sections/OptOutForm";

// B-2307: pagina publica de baja (art. 21 RGPD). Como /privacy, generateMetadata con
// getTranslations la hace dinamica, y @cloudflare/next-on-pages exige Edge.
export const runtime = "edge";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "optOut"});
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/opt-out"),
  };
}

export default async function OptOutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("optOut");
  return (
    <>
      <Nav />
      <main id="main" className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-24 sm:pt-24">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="text-3xl sm:text-4xl text-[var(--color-ink)] mb-6">{t("heading")}</h1>
          <p className="text-[var(--color-slate)] text-lg leading-relaxed mb-10">{t("intro")}</p>
          <OptOutForm locale={locale} />
          <p className="mt-8 text-sm text-[var(--color-slate)]">
            {t.rich("otherRequests", {
              email: (chunks) => (
                <a href="mailto:privacy@revcognition.com" className="underline underline-offset-4">{chunks}</a>
              ),
            })}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
