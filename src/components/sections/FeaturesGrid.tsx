"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";

// Diferenciadores primero (aprobación, entregabilidad, personalización,
// respuestas), luego el resto. Copy derivado de "Mensaje corto" del inventario.
// El texto vive en el catálogo (messages/*.json, namespace featuresGrid);
// aquí solo queda lo estructural (orden).
// B-2228 (Q6): los 4 pasos de "Cómo encuentra a tus clientes" viven ahora en
// /producto (bloque "El motor"); la home ya cuenta el proceso en HowItWorks.

export function FeaturesGrid() {
  const t = useTranslations("featuresGrid");
  const features = t.raw("features") as { title: string; description: string }[];
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              y={16}
              delay={(i % 2) * 0.06}
              className="border-t border-[var(--color-border)] py-5"
            >
              <h3 className="text-xl text-[var(--color-ink)] mb-1.5">
                {f.title}
              </h3>
              <p className="text-[var(--color-slate)] text-sm leading-relaxed">
                {f.description}
              </p>
            </Reveal>
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
