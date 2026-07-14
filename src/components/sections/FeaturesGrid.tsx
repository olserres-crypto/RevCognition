"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";

// Diferenciadores primero (aprobación, entregabilidad, personalización,
// respuestas), luego el resto. Copy derivado de "Mensaje corto" del inventario.
// El texto vive en el catálogo (messages/*.json, namespace featuresGrid);
// aquí solo queda lo estructural (número de pasos, orden).

export function FeaturesGrid() {
  const t = useTranslations("featuresGrid");
  const reduce = useReducedMotion();
  const features = t.raw("features") as { title: string; description: string }[];
  const howEncuentraSteps = t.raw("howEncuentra.steps") as {
    title: string;
    description: string;
  }[];
  return (
    <section className="bg-[var(--color-surface)] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          {t("eyebrow")}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-4">
          {t("heading")}
        </h2>
        <p className="text-[var(--color-slate)] text-lg mb-12 max-w-xl">
          {t("intro")}
        </p>

        <div
          id="como-encuentra"
          className="scroll-mt-20 mb-14 sm:mb-16 pb-12 sm:pb-14 border-b border-[var(--color-border)]"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-slate)] mb-3">
            {t("howEncuentra.eyebrow")}
          </p>
          <p className="text-[var(--color-ink)] text-base leading-relaxed mb-8 max-w-2xl">
            {t("howEncuentra.intro")}
          </p>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
            {howEncuentraSteps.map((step, i) => (
              <motion.li
                key={step.title}
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
                  {step.title}
                </h3>
                <p className="text-[var(--color-slate)] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 2) * 0.06, duration: 0.35, ease: "easeOut" }}
              className="border-t border-[var(--color-border)] py-5"
            >
              <h3 className="font-serif text-xl text-[var(--color-ink)] mb-1.5">
                {f.title}
              </h3>
              <p className="text-[var(--color-slate)] text-sm leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/producto"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-warm)] hover:text-[var(--color-warm-hover)] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
          >
            {t("moreLink")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
