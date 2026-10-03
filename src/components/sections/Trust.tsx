"use client";

import type {ReactNode} from "react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

// Bloque de confianza (B-2131). Cada frase es una afirmación jurídica
// comprobable: el texto vive en messages/*.json y la medición que lo respalda
// (región por proveedor) en el changelog del carril C de la 52.ª de Growth_Engine.
export function Trust() {
  const t = useTranslations("trust");
  const items = t.raw("items") as {title: string; body: string}[];
  const privacyLink = (chunks: ReactNode) => (
    <Link
      href="/privacy"
      className="underline underline-offset-4 decoration-[var(--color-slate-light)] hover:text-[var(--color-ink)] transition-colors"
    >
      {chunks}
    </Link>
  );

  return (
    <section id="confianza" className="scroll-mt-20 md:scroll-mt-32 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          {t("eyebrow")}
        </p>
        <h2 className="text-3xl sm:text-4xl text-[var(--color-ink)] mb-4 max-w-2xl">
          {t("heading")}
        </h2>
        <p className="text-[var(--color-slate)] text-lg mb-12 max-w-xl">{t("intro")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
          {items.map((item, i) => (
            <div key={item.title} className="border-t border-[var(--color-border)] py-4">
              <p className="font-semibold text-[var(--color-ink)] text-sm mb-1">{item.title}</p>
              <p className="text-[var(--color-slate)] text-sm leading-relaxed">
                {t.rich(`items.${i}.body`, {privacyLink})}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-[var(--color-slate)]">
          {t.rich("footnote", {privacyLink})}
        </p>
      </div>
    </section>
  );
}
