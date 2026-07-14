"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { MockupShell, MockupRow } from "@/components/ui/MockupShell";

function MockupDiagnostico() {
  const t = useTranslations("howItWorks.mockups.diagnostico");
  const sectores = ["Fusiones M&A", "Litigación laboral", "Deuda corporativa"];
  return (
    <MockupShell icon="✦" title="RevCognition" meta={{ text: t("metaText") }}>
      <div className="p-4 flex flex-col gap-3">
        <MockupRow label={t("profileLabel")} value={t("profileValue")} />
        <MockupRow label={t("problemLabel")} value={t("problemValue")} />
        <div>
          <div className="text-[10px] font-medium text-[var(--color-slate)] uppercase tracking-wider mb-1.5">
            {t("sectorsLabel")}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sectores.map((s) => (
              <span
                key={s}
                className="text-[10px] font-medium text-[var(--color-warm)] bg-[color-mix(in_oklch,var(--color-warm)_6%,transparent)] border border-[color-mix(in_oklch,var(--color-warm)_15%,transparent)] px-2 py-0.5 rounded"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

function MockupProspectos() {
  const t = useTranslations("howItWorks.mockups.prospectos");
  const rows = [
    { empresa: "Bufete Serrano & Asoc.", sector: "Legal", nivel: t("nivelAlto"), tone: "success" as const },
    { empresa: "Consultoría Nexus RR.HH.", sector: "RR.HH.", nivel: t("nivelMedio"), tone: "warning" as const },
    { empresa: "Garriga Fiscalidad SL", sector: "Fiscal", nivel: t("nivelAlto"), tone: "success" as const },
  ];
  const headers = [t("colEmpresa"), t("colSector"), t("colSenal")];
  return (
    <MockupShell icon="✦" title={t("title")} meta={{ text: t("metaText"), tone: "success" }}>
      <div
        className="grid px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]"
        style={{ gridTemplateColumns: "1fr 56px 56px" }}
      >
        {headers.map((h) => (
          <div
            key={h}
            className="text-[10px] font-medium text-[var(--color-slate)] uppercase tracking-wider"
          >
            {h}
          </div>
        ))}
      </div>
      {rows.map((row, i) => {
        const dotClass =
          row.tone === "success"
            ? "text-[var(--color-success)]"
            : "text-[var(--color-warning)]";
        return (
          <div
            key={i}
            className={`grid items-center px-4 py-2.5 ${i < rows.length - 1 ? "border-b border-[var(--color-border)]" : ""}`}
            style={{ gridTemplateColumns: "1fr 56px 56px" }}
          >
            <div className="text-[11px] font-medium text-[var(--color-ink)]">{row.empresa}</div>
            <div className="text-[10px] text-[var(--color-slate)]">{row.sector}</div>
            <div className={`text-[10px] font-semibold ${dotClass}`}>
              <span aria-hidden="true">●</span> {row.nivel}
            </div>
          </div>
        );
      })}
    </MockupShell>
  );
}

function MockupMensaje() {
  const t = useTranslations("howItWorks.mockups.mensaje");
  return (
    <MockupShell icon="✦" title={t("title")} meta={{ text: "Bufete Serrano" }}>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color-mix(in_oklch,var(--color-warm)_5%,transparent)] border border-[color-mix(in_oklch,var(--color-warm)_14%,transparent)]">
          <span aria-hidden="true" className="text-xs">⚡</span>
          <span className="text-[10px] font-medium text-[var(--color-warm)]">
            {t("signalNote")}
          </span>
        </div>
        <div className="text-[11px] text-[var(--color-slate)] leading-relaxed">
          <div className="mb-1.5">{t("greeting")}</div>
          <div>{t("body")}</div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
          <span className="text-[10px] text-[var(--color-slate-light)]">{t("readyToSend")}</span>
          <span className="text-[10px] font-semibold text-[var(--color-warm)]">
            {t("viewFull")} ↗
          </span>
        </div>
      </div>
    </MockupShell>
  );
}

const stepMockups = [MockupDiagnostico, MockupProspectos, MockupMensaje];
const stepNumbers = ["01", "02", "03"];

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const reduce = useReducedMotion();
  const steps = t.raw("steps") as { title: string; description: string; time: string }[];
  return (
    <section id="como-funciona" className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          {t("eyebrow")}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-12">
          {t("heading")}
        </h2>

        <div className="flex flex-col gap-0">
          {steps.map((step, i) => {
            const MockupComponent = stepMockups[i];
            return (
              <motion.div
                key={stepNumbers[i]}
                initial={reduce ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.4, ease: "easeOut" }}
                className="flex gap-6 pb-10 last:pb-0"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full border-2 border-[var(--color-warm)] text-[var(--color-warm)] text-sm font-semibold flex items-center justify-center">
                    {stepNumbers[i]}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 w-px bg-[var(--color-border)] mt-3" aria-hidden="true" />
                  )}
                </div>

                <div className="flex-1 min-w-0 pt-1.5 flex flex-col lg:flex-row lg:items-start lg:gap-10">
                  <div className="pb-4 lg:pb-2 flex-1 min-w-0">
                    <h3 className="font-serif text-xl text-[var(--color-ink)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-slate)] leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-slate)] bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1 rounded-full">
                      {step.time}
                    </span>
                  </div>

                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.12 + 0.18, duration: 0.4, ease: "easeOut" }}
                    className="hidden lg:block shrink-0"
                  >
                    <MockupComponent />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
