"use client";

import {useTranslations} from "next-intl";
import {Button} from "@/components/ui/Button";
import {HeroSequence} from "@/components/ui/HeroSequence";

/**
 * B-2447: la columna de texto (H1, lead, CTA, firma) sale del servidor visible
 * y quieta: el H1 es el elemento LCP y no puede esperar a que hidrate el JS.
 * Solo la columna de producto entra animada, y en CSS (`.hero-rise` en
 * globals.css), de modo que sin JS también acaba visible y con
 * prefers-reduced-motion no se anima.
 */
export function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
        <div>
          {/* lg:text-5xl, no 6xl: este h1 vive en media columna (lg:grid-cols-2),
              así que su medida útil son ~456px (max-w-5xl − px-6 − gap-16, partido
              en dos), no los ~976px del resto de la página. A 60px caben ~15
              caracteres por línea y el titular parte en SEIS; a 48px caben ~19 y
              parte en cuatro. Es medida, no estética: donde el h1 ocupa el ancho
              completo, text-6xl sigue siendo lo correcto. Ver DESIGN.md §Tipografía.
              Pesos 500/400: los dos están cargados (layout.tsx), 300 no. */}
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-medium text-[var(--color-ink)] leading-[1.08]">
            {t("line1")}{" "}
            <span className="text-[var(--color-warm)]">{t("line1Accent")}</span>{" "}
            <span className="block font-normal text-[var(--color-slate)]">{t("line2")}</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[var(--color-slate)] leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href="https://app.revcognition.com/" target="_blank" rel="noopener noreferrer" className="text-base px-7 py-3.5">
              {t("ctaPrimary")}
            </Button>
            <Button variant="secondary" href="#como-funciona" className="text-base px-7 py-3.5">
              {t("ctaSecondary")}
            </Button>
          </div>

          <p className="mt-4 text-sm text-[var(--color-slate)] leading-relaxed max-w-sm">
            {t("note")}
          </p>

          {/* Firma del fundador, sin foto (P465 10a): iniciales como monograma.
              Prueba social honesta en la primera pantalla: persona + hechos
              comprobables, nunca clientes inventados (DESIGN.md §Social proof). */}
          <div className="mt-7 flex items-center gap-3 text-sm text-[var(--color-slate)] leading-snug">
            <span
              aria-hidden="true"
              className="flex-none w-9 h-9 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] grid place-items-center text-xs font-semibold text-[var(--color-ink)]"
            >
              {t("byline.initials")}
            </span>
            <p>
              <span className="font-medium text-[var(--color-ink)]">{t("byline.name")}</span>{" "}
              {t("byline.text")}
            </p>
          </div>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-[var(--color-slate)]">
            <li>{t("facts.eu")}</li>
            <li>{t("facts.b2b")}</li>
            <li>{t("facts.approval")}</li>
          </ul>
        </div>

        {/* Columna de producto: también en móvil (debajo de los CTA, fuera del
            primer pliegue), con la entrada en CSS. data-hero-rise lo lee
            HeroSequence para no reiniciar la secuencia si ya es visible. */}
        <div data-hero-rise className="hero-rise mt-12 lg:mt-0 flex flex-col gap-3 min-w-0">
          <HeroSequence />
        </div>
      </div>
    </section>
  );
}
