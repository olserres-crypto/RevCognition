"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";

// Icono/estructura por índice; el texto vive en el catálogo
// (messages/*.json, namespace useCases, campo "cases").
// Corregido en auditoría UseCases (B-591 wave, Task 8): la versión anterior
// implicaba una fuente de señal automática (registro de marcas) y una
// identificación de contacto sin intervención del abogado, ninguna de las
// dos verificable contra FEATURE_INVENTORY.md. Reescrito sobre "Trae tus
// propios contactos" (CSV + contexto) + generación de mensajes + revisión
// diaria — las tres, features reales del inventario.
const caseIcons = ["⚖️", "📡"];

export function UseCases() {
  const t = useTranslations("useCases");
  const reduce = useReducedMotion();
  const cases = t.raw("cases") as {
    sector: string;
    problem: string;
    problemDetail: string;
    solution: string;
  }[];
  return (
    <section className="py-16 sm:py-24">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.sector}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 sm:p-7 flex flex-col gap-5"
            >
              <div>
                <span aria-hidden="true" className="text-3xl">{caseIcons[i]}</span>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-slate)] mt-3 mb-1">
                  {c.sector}
                </p>
                <h3 className="text-xl text-[var(--color-ink)]">
                  {c.problem}
                </h3>
              </div>

              <p className="text-[var(--color-slate)] text-sm leading-relaxed">
                {c.problemDetail}
              </p>

              <div className="border-t border-[var(--color-border)] pt-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-2">
                  {t("solutionLabel")}
                </p>
                <p className="text-[var(--color-slate)] text-sm leading-relaxed">
                  {c.solution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/soluciones/servicios-b2b"
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
