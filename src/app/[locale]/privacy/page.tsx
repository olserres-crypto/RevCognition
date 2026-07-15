import type {ReactNode} from "react";
import { Link } from "@/i18n/navigation";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {buildAlternates} from "@/i18n/metadata";

// This route has a page-level generateMetadata (getTranslations) so Next renders
// it dynamically; @cloudflare/next-on-pages requires non-static routes to run on
// the Edge runtime.
export const runtime = "edge";

const CONTACT_EMAIL = "olivier.serres@revcognition.com";
const APP_URL = "https://app.revcognition.com";
const AEPD_URL = "https://www.aepd.es";

const linkClass =
  "underline underline-offset-4 decoration-[var(--color-slate-light)] hover:text-[var(--color-ink)] transition-colors";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "privacy"});
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/privacy"),
  };
}

export default async function PrivacyPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  // Rich-text renderers shared across sections: the visible link text for
  // contact/URL chunks is invariant across locales (email address, bare
  // domain), so the translated string only supplies the surrounding prose.
  const emailTag = (chunks: ReactNode) => (
    <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
      {chunks}
    </a>
  );
  const rightsEmailTag = (chunks: ReactNode) => (
    <a
      href={`mailto:${CONTACT_EMAIL}?subject=Ejercicio%20de%20derechos%20RGPD`}
      className={linkClass}
    >
      {chunks}
    </a>
  );
  const appLinkTag = (chunks: ReactNode) => (
    <a href={APP_URL} className={linkClass}>
      {chunks}
    </a>
  );
  const aepdTag = (chunks: ReactNode) => (
    <a href={AEPD_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {chunks}
    </a>
  );

  const sections = t.raw("sections") as {
    heading: string;
    body?: string;
    intro?: string;
    items?: {label: string; body: string}[];
  }[];

  return (
    <>
      <Nav />
      <main id="main" className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-24 sm:pt-24">
        <Link
          href="/"
          className="text-sm text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors mb-8 inline-block px-1 py-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
        >
          {t("backLink")}
        </Link>

        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-6">
            {t("heading")}
          </h1>
          <p className="text-[var(--color-slate)] text-lg leading-relaxed mb-12">
            {t.rich("intro", {email: emailTag})}
          </p>

          <div className="space-y-10 text-[var(--color-slate)] leading-relaxed">
            {sections.map((section, i) => (
              <section key={section.heading}>
                <h2 className="font-serif text-xl text-[var(--color-ink)] mb-2">
                  {section.heading}
                </h2>
                {section.items ? (
                  <>
                    <p className="mb-3">{section.intro}</p>
                    <ul className="space-y-2 list-disc pl-5">
                      {section.items.map((item, j) => (
                        <li key={item.label}>
                          <span className="font-semibold text-[var(--color-ink)]">
                            {item.label}
                          </span>{" "}
                          {j === 0
                            ? t.rich(`sections.${i}.items.${j}.body`, {appLink: appLinkTag})
                            : item.body}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : i === 0 ? (
                  <p>{t.rich(`sections.${i}.body`, {email: emailTag})}</p>
                ) : i === 4 ? (
                  <p>
                    {t.rich(`sections.${i}.body`, {
                      email: rightsEmailTag,
                      aepd: aepdTag,
                    })}
                  </p>
                ) : (
                  <p>{section.body}</p>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
