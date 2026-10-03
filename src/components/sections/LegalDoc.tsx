import type {ReactNode} from "react";
import {Link} from "@/i18n/navigation";
import {Nav} from "@/components/sections/Nav";
import {Footer} from "@/components/sections/Footer";
import {getTranslations} from "next-intl/server";

// Shared renderer for the legal documents (/privacy, /legal, /terms, /cookies).
// Every string goes through t.rich with the same tag map, so any section of
// any document can link to the others without per-index special cases.

export const CONTACT_EMAIL = "olivier.serres@revcognition.com";
const APP_URL = "https://app.revcognition.com";
const AEPD_URL = "https://www.aepd.es";

const linkClass =
  "underline underline-offset-4 decoration-[var(--color-slate-light)] hover:text-[var(--color-ink)] transition-colors";

type Section = {
  heading: string;
  body?: string;
  paragraphs?: string[];
  intro?: string;
  items?: {label: string; body: string}[];
  outro?: string;
};

export type LegalNamespace = "privacy" | "legal" | "terms" | "cookies";

export async function LegalDoc({namespace}: {namespace: LegalNamespace}) {
  const t = await getTranslations(namespace);

  const tags = {
    email: (chunks: ReactNode) => (
      <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
        {chunks}
      </a>
    ),
    rightsEmail: (chunks: ReactNode) => (
      <a
        href={`mailto:${CONTACT_EMAIL}?subject=Ejercicio%20de%20derechos%20RGPD`}
        className={linkClass}
      >
        {chunks}
      </a>
    ),
    appLink: (chunks: ReactNode) => (
      <a href={APP_URL} className={linkClass}>
        {chunks}
      </a>
    ),
    aepd: (chunks: ReactNode) => (
      <a href={AEPD_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {chunks}
      </a>
    ),
    privacyLink: (chunks: ReactNode) => (
      <Link href="/privacy" className={linkClass}>
        {chunks}
      </Link>
    ),
    legalLink: (chunks: ReactNode) => (
      <Link href="/legal" className={linkClass}>
        {chunks}
      </Link>
    ),
    termsLink: (chunks: ReactNode) => (
      <Link href="/terms" className={linkClass}>
        {chunks}
      </Link>
    ),
    cookiesLink: (chunks: ReactNode) => (
      <Link href="/cookies" className={linkClass}>
        {chunks}
      </Link>
    ),
    strong: (chunks: ReactNode) => (
      <strong className="font-semibold text-[var(--color-ink)]">{chunks}</strong>
    ),
  };

  const sections = t.raw("sections") as Section[];

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
          <h1 className="text-3xl sm:text-4xl text-[var(--color-ink)] mb-6">{t("heading")}</h1>
          <p className="text-[var(--color-slate)] text-lg leading-relaxed mb-4">
            {t.rich("intro", tags)}
          </p>
          <p className="text-sm text-[var(--color-slate)] mb-12">{t("version")}</p>

          <div className="space-y-10 text-[var(--color-slate)] leading-relaxed">
            {sections.map((section, i) => (
              <section key={section.heading}>
                <h2 className="text-xl text-[var(--color-ink)] mb-2">{section.heading}</h2>
                {section.body !== undefined && (
                  <p>{t.rich(`sections.${i}.body`, tags)}</p>
                )}
                {section.paragraphs?.map((_, j) => (
                  <p key={j} className={j > 0 || section.body !== undefined ? "mt-3" : ""}>
                    {t.rich(`sections.${i}.paragraphs.${j}`, tags)}
                  </p>
                ))}
                {section.items && (
                  <>
                    {section.intro !== undefined && (
                      <p className={section.paragraphs ? "mt-3 mb-3" : "mb-3"}>{t.rich(`sections.${i}.intro`, tags)}</p>
                    )}
                    <ul className="space-y-2 list-disc pl-5">
                      {section.items.map((item, j) => (
                        <li key={item.label}>
                          <span className="font-semibold text-[var(--color-ink)]">
                            {item.label}
                          </span>{" "}
                          {t.rich(`sections.${i}.items.${j}.body`, tags)}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {section.outro !== undefined && (
                  <p className="mt-3">{t.rich(`sections.${i}.outro`, tags)}</p>
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
