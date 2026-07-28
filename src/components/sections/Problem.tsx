"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";

export function Problem() {
  const t = useTranslations("problem");
  const reduce = useReducedMotion();
  const problems = t.raw("items") as {
    label: string;
    cost: string;
    description: string;
  }[];
  return (
    <section className="bg-[var(--color-surface)] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          {t("eyebrow")}
        </p>
        <h2 className="text-3xl sm:text-4xl text-[var(--color-ink)] mb-4">
          {t("heading")}
        </h2>
        <p className="text-[var(--color-slate)] text-lg mb-12 max-w-xl">
          {t("intro")}
        </p>

        <div className="divide-y divide-[var(--color-border)]">
          {problems.map((p, i) => (
            <motion.div
              key={p.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className="py-6 sm:flex sm:items-start sm:gap-8"
            >
              <div className="sm:flex-1">
                <p className="font-semibold text-[var(--color-ink)] mb-1">{p.label}</p>
                <p className="text-[var(--color-slate)] text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
              <div className="mt-3 sm:mt-0 sm:shrink-0 flex sm:justify-end">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap text-[var(--color-danger)] bg-[var(--color-danger-tint)] border border-[var(--color-danger-border)]">
                  {p.cost}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contraste RevCognition: eyebrow pattern, sin side-stripe */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.28, duration: 0.35 }}
          className="mt-8 bg-[var(--color-paper)] border border-[var(--color-border)] rounded-xl px-6 py-5 sm:flex sm:items-start sm:gap-8"
        >
          <div className="sm:flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-2">
              {t("contrast.eyebrow")}
            </p>
            <p className="text-[var(--color-slate)] text-sm leading-relaxed">
              {t("contrast.description")}
            </p>
          </div>
          <div className="mt-2 sm:mt-0 sm:text-right sm:shrink-0">
            <p className="text-sm font-semibold text-[var(--color-warm)]">
              {t("contrast.cost")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
