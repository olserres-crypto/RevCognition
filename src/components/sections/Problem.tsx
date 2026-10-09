"use client";

import { useRef, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Row = { label: string; what: string; cost: string; costNote: string };

/**
 * «El problema» como libro de cuentas (propuesta React Bits 3, B-2228, patron
 * inspirado en StrokeText/ScrollReveal sin gsap): al entrar en pantalla se tacha
 * el coste de cada opcion actual y aparece la fila RevCognition debajo.
 *
 * Fases: "ssr" (HTML del servidor / sin JS: tabla completa sin tachar y la
 * respuesta visible) → "pre" (cliente, respuesta oculta a la espera) → "run".
 * Con prefers-reduced-motion se salta directo a "run" sin transiciones (CSS).
 */
const noopSubscribe = () => () => {};

export function Problem() {
  const t = useTranslations("problem");
  const prefersReduced = useReducedMotion();
  const rows = t.raw("rows") as Row[];
  const ref = useRef<HTMLTableElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  // false en el servidor y durante la hidratacion, true despues (sin setState en efecto).
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  // useReducedMotion ya vale true/false en la hidratacion pero null en el servidor:
  // si el render dependiera de el antes de hidratar, React no parchea la clase.
  const reduce = hydrated && prefersReduced === true;
  const phase = !hydrated ? "ssr" : reduce || inView ? "run" : "pre";

  const run = phase === "run";
  const STEP = 380;
  const done = 400 + rows.length * STEP;

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

        <table
          ref={ref}
          className={cn(
            "w-full border-collapse block sm:table sm:table-fixed bg-[var(--color-paper)] border border-[var(--color-border)] rounded-xl overflow-hidden",
            run && "ledger-run"
          )}
        >
          <colgroup>
            <col className="sm:w-[28%]" />
            <col />
            <col className="sm:w-[30%]" />
          </colgroup>
          <thead className="hidden sm:table-header-group">
            <tr>
              {[t("columns.option"), t("columns.what"), t("columns.cost")].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="text-left px-[18px] py-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-slate-light)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block sm:table-row-group">
            {rows.map((r, i) => (
              <tr
                key={r.label}
                className={cn(
                  "ledger-row block sm:table-row px-[18px] py-4 sm:p-0 border-t border-[var(--color-border)] first:border-t-0 sm:first:border-t transition-opacity duration-500 ease-out",
                  run && "opacity-[0.62]"
                )}
                style={{ transitionDelay: run && !reduce ? `${done}ms` : undefined }}
              >
                <th
                  scope="row"
                  className="block sm:table-cell text-left align-top font-semibold text-base text-[var(--color-ink)] sm:px-[18px] sm:py-4"
                >
                  {r.label}
                </th>
                <td className="block sm:table-cell align-top mt-1.5 sm:mt-0 text-sm text-[var(--color-slate)] leading-relaxed sm:px-[18px] sm:py-4">
                  {r.what}
                </td>
                <td className="block sm:table-cell align-top mt-1 sm:mt-0 sm:px-[18px] sm:py-4">
                  <b
                    className="strike-cost text-sm font-semibold text-[var(--color-danger)]"
                    style={{ ["--strike-delay" as string]: reduce ? "0ms" : `${400 + i * STEP}ms` }}
                  >
                    {r.cost}
                  </b>
                  <small className="block text-xs text-[var(--color-slate)]">{r.costNote}</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className={cn(
            "ledger-answer mt-5 grid gap-1.5 sm:grid-cols-[28%_1fr_30%] sm:gap-0 rounded-xl border border-[var(--color-warm)] bg-[color-mix(in_oklch,var(--color-warm)_5%,var(--color-paper))] shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-warm)_20%,transparent)] px-[18px] py-4 transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            phase === "pre" ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}
          style={{ transitionDelay: run && !reduce ? `${done + 200}ms` : undefined }}
        >
          <p className="font-semibold text-[var(--color-ink)] sm:pr-[18px]">{t("answer.label")}</p>
          <p className="text-sm text-[var(--color-slate)] leading-relaxed sm:px-[18px]">
            {t("answer.what")}
          </p>
          <p className="sm:pl-[18px]">
            <b className="text-sm font-semibold text-[var(--color-ink)]">{t("answer.cost")}</b>
            <small className="block text-xs text-[var(--color-slate)]">{t("answer.costNote")}</small>
            <a
              href="#precios"
              className="inline-block mt-1 text-[13px] font-semibold text-[var(--color-warm)] no-underline hover:underline underline-offset-2"
            >
              {t("answer.link")}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
