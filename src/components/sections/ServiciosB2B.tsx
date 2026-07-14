"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "framer-motion";

type Step = { title: string; body: string };
type Metric = { label: string };
type Faq = { q: string; a: string };

export function ServiciosB2B() {
  const t = useTranslations("serviciosB2B");
  const reduce = useReducedMotion();

  const pasos = t.raw("steps.items") as Step[];
  const metricSlots = t.raw("stats.metrics") as Metric[];
  const faqs = t.raw("faq.items") as Faq[];

  return (
    <>
      {/* Hero-lite: pain-first + promesa. Sin bg explícito → paper (base de la página). */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-14 sm:pt-24 sm:pb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          {t("hero.eyebrow")}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[var(--color-ink)] leading-tight max-w-3xl">
          {t("hero.heading1")}{" "}
          <span className="font-light">{t("hero.heading2")}</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-[var(--color-slate)] leading-relaxed max-w-2xl">
          {t("hero.subtitle")}
        </p>
      </section>

      {/* Cómo funciona para tu caso — bg surface (alterna con el hero paper). */}
      <section
        id="como-funciona-caso"
        className="scroll-mt-20 py-16 sm:py-24 bg-[var(--color-surface)]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
            {t("steps.eyebrow")}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-4">
            {t("steps.heading")}
          </h2>
          <p className="text-[var(--color-slate)] text-lg mb-12 max-w-xl">
            {t("steps.intro")}
          </p>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mb-10">
            {pasos.map((paso, i) => (
              <motion.li
                key={paso.title}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.35, ease: "easeOut" }}
                className="list-none"
              >
                <div className="w-7 h-7 rounded-full border-2 border-[var(--color-warm)] text-[var(--color-warm)] text-xs font-semibold flex items-center justify-center mb-3">
                  {i + 1}
                </div>
                <h3 className="font-serif text-base text-[var(--color-ink)] mb-1.5">
                  {paso.title}
                </h3>
                <p className="text-[var(--color-slate)] text-sm leading-relaxed">
                  {paso.body}
                </p>
              </motion.li>
            ))}
          </ol>

          <Link
            href="/#como-encuentra"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-warm)] hover:text-[var(--color-warm-hover)] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
          >
            {t("steps.linkText")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Resultados — bg paper (alterna con la sección anterior surface). */}
      <section id="resultados" className="scroll-mt-20 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
            {t("stats.eyebrow")}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-6 max-w-2xl">
            {t("stats.heading")}
          </h2>
          <p className="text-[var(--color-slate)] text-lg leading-relaxed max-w-2xl">
            {t("stats.intro")}
          </p>

          {/* CASE-STUDY SLOT: swap con BR Latina cuando haya cifras (B-591 wave 2) */}
          <div className="mt-10 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-slate)] mb-2">
              {t("stats.caseStudy.label")}
            </p>
            <h3 className="font-serif text-xl text-[var(--color-ink)] mb-3">
              {t("stats.caseStudy.title")}
            </h3>
            <p className="text-[var(--color-slate)] text-sm leading-relaxed mb-6">
              {t("stats.caseStudy.body")}
            </p>
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-5 border-t border-[var(--color-border)]">
              {metricSlots.map((m) => (
                <div key={m.label}>
                  <p className="text-2xl sm:text-3xl font-semibold text-[var(--color-slate-light)] tabular-nums">
                    —
                  </p>
                  <p className="text-[11px] sm:text-xs text-[var(--color-slate)] mt-1 leading-snug">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — bg surface (alterna con Resultados paper). */}
      <section id="faq" className="scroll-mt-20 py-16 sm:py-24 bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
            {t("faq.eyebrow")}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-12">
            {t("faq.heading")}
          </h2>
          <div className="max-w-3xl divide-y divide-[var(--color-border)]">
            {faqs.map((f, i) => (
              <motion.div
                key={f.q}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 2) * 0.05, duration: 0.35, ease: "easeOut" }}
                className="py-6"
              >
                <h3 className="font-serif text-xl text-[var(--color-ink)] mb-2">
                  {f.q}
                </h3>
                <p className="text-[var(--color-slate)] leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
