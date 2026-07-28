"use client";

import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";

const APP_URL = "https://app.revcognition.com";
const CAL_30MIN_URL = "https://cal.com/olivier-serres-js5hdw/30min";

const BCP47_BY_LOCALE: Record<string, string> = {
  es: "es-ES",
  en: "en-US",
  fr: "fr-FR",
};

const packs = [
  {
    prospects: 100,
    price: 100,
    priceDecimals: 0,
    perUnit: 1,
    perUnitDecimals: 2,
    discountPercent: null,
    plan: "pack_100",
  },
  {
    prospects: 600,
    price: 500,
    priceDecimals: 0,
    perUnit: 0.83,
    perUnitDecimals: 2,
    discountPercent: 17,
    plan: "pack_600",
  },
  {
    prospects: 1300,
    price: 1000,
    priceDecimals: 0,
    perUnit: 0.77,
    perUnitDecimals: 2,
    discountPercent: 23,
    plan: "pack_1300",
  },
];

export function Pricing() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const bcp47 = BCP47_BY_LOCALE[locale] ?? "es-ES";
  const formatCurrency = (value: number, decimals: number) =>
    new Intl.NumberFormat(bcp47, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: "always",
    }).format(value);
  const plans = t.raw("plans") as {
    name: string;
    tagline: string;
    discount: string | null;
  }[];
  const setupIncludes = t.raw("setup.includes") as string[];

  return (
    <section id="precios" className="py-16 sm:py-24 bg-[var(--color-warm)]/25">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          {t("eyebrow")}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-4">
          {t("heading")}
        </h2>
        <p className="text-[var(--color-slate)] text-lg mb-4 max-w-2xl">
          {t("intro")}
        </p>
        <p className="text-[var(--color-slate)] text-sm mb-4 max-w-2xl">
          {t("perProspectIncludes")}
        </p>
        <p className="text-[var(--color-slate)] text-sm mb-12 max-w-2xl">
          {t("noCommitment")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {packs.map((pack, i) => {
            const plan = plans[i];
            return (
              <div
                key={pack.prospects}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-paper)] p-7 sm:p-8 flex flex-col gap-4"
              >
                <div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-semibold text-[var(--color-ink)] tabular-nums">
                      {formatCurrency(pack.price, pack.priceDecimals)}
                    </p>
                    <span className="text-sm text-[var(--color-slate)]">
                      {t("noVat")}
                    </span>
                  </div>
                  <p className="text-[var(--color-slate)] text-sm mt-1">
                    {t("qualifiedProspects", {
                      count: new Intl.NumberFormat(bcp47, { useGrouping: "always" }).format(pack.prospects),
                    })}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-[var(--color-slate)] tabular-nums">
                      {t("perSend", { value: formatCurrency(pack.perUnit, pack.perUnitDecimals) })}
                    </span>
                    {pack.discountPercent !== null && plan.discount && (
                      <span className="text-xs font-semibold text-[var(--color-warm)] bg-[var(--color-warm)]/10 rounded px-1.5 py-0.5">
                        {pack.discountPercent}% {plan.discount}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-slate)]">
                  {plan.name}
                </p>
                <p className="text-[var(--color-slate)] text-sm leading-relaxed flex-1">
                  {plan.tagline}
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <Button
                    variant="ink-solid"
                    href={`${APP_URL}/?plan=${pack.plan}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-sm py-3"
                  >
                    {t("requestAccess")}
                  </Button>
                  <a
                    href={CAL_30MIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 text-sm text-center rounded-md text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
                  >
                    {t("talkToFounder")}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Setup box: lead + bullet list */}
        <div className="mt-10 p-5 sm:p-6 bg-[var(--color-paper)] border border-[var(--color-border)] rounded-xl max-w-2xl">
          <p className="text-sm text-[var(--color-slate)] mb-3">
            <span className="font-semibold text-[var(--color-ink)]">{t("setup.title")}</span>
            {" "}{t("setup.description")}
          </p>
          <ul className="text-sm text-[var(--color-slate)] space-y-1.5 list-disc pl-5 marker:text-[var(--color-warm)]">
            {setupIncludes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-sm text-[var(--color-slate)] mt-4">
            <span className="font-semibold text-[var(--color-ink)]">{t("domainRenewal.title")}</span>
            {" "}{t("domainRenewal.description")}
          </p>
        </div>

        <p className="mt-4 text-sm text-[var(--color-slate)] max-w-2xl">
          {t("fiscalNote")}
        </p>

        <p className="mt-6 text-sm text-[var(--color-slate)] max-w-2xl">
          {t("ownList")}
        </p>

        <p className="mt-3 text-sm text-[var(--color-slate)] max-w-2xl">
          {t("betaNote")}
        </p>
      </div>
    </section>
  );
}
