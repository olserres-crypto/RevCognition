"use client";

import {useTranslations} from "next-intl";

export function Founder() {
  const t = useTranslations("founder");
  return (
    <section className="bg-[var(--color-surface)] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-6">
            {t("heading")}
          </h2>
          <div className="space-y-4 text-[var(--color-slate)] leading-relaxed">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
          </div>
        </div>

        {/* Cierre — punto de extrañeza tipográfico (display + light, sale del max-w-2xl) */}
        <p className="mt-12 font-serif font-light text-3xl sm:text-5xl lg:text-6xl text-[var(--color-ink)] leading-[1.05] tracking-tight max-w-3xl">
          {t("closingPre")}{" "}
          <span className="italic text-[var(--color-warm)]">{t("closingItalic")}</span>{" "}
          {t("closingPost")}
        </p>
      </div>
    </section>
  );
}
