"use client";

import { motion } from "framer-motion";

function MockupShell({ icon, title, meta, children }: {
  icon: string;
  title: string;
  meta?: { text: string; tone?: "muted" | "success" };
  children: React.ReactNode;
}) {
  const metaTone =
    meta?.tone === "success"
      ? "text-[var(--color-success)] font-medium"
      : "text-[var(--color-slate-light)]";
  return (
    <div className="w-[280px] rounded-xl overflow-hidden select-none bg-[var(--color-paper-deep)] border border-[var(--color-border)] shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2 px-4 h-11 border-b border-[var(--color-border)]">
        <span aria-hidden="true" className="text-[13px] text-[var(--color-warm)]">{icon}</span>
        <span className="text-[11px] font-semibold text-[var(--color-ink)]">{title}</span>
        {meta && (
          <span className={`ml-auto text-[10px] ${metaTone}`}>{meta.text}</span>
        )}
      </div>
      {children}
    </div>
  );
}

function MockupRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-medium text-[var(--color-slate)] uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="flex items-center h-8 px-3 rounded-lg border border-[var(--color-border)] text-xs text-[var(--color-ink)]">
        {value}
      </div>
    </div>
  );
}

function MockupDiagnostico() {
  const sectores = ["Fusiones M&A", "Litigación laboral", "Deuda corporativa"];
  return (
    <MockupShell icon="✦" title="RevCognition" meta={{ text: "Análisis generado" }}>
      <div className="p-4 flex flex-col gap-3">
        <MockupRow label="Perfil de cliente ideal" value="Despachos de abogados · +20 personas" />
        <MockupRow label="Problema clave" value="Dependen 100% de referencias" />
        <div>
          <div className="text-[10px] font-medium text-[var(--color-slate)] uppercase tracking-wider mb-1.5">
            Sectores detectados
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
  const rows = [
    { empresa: "Bufete Serrano & Asoc.", sector: "Legal", nivel: "Alto", tone: "success" as const },
    { empresa: "Consultoría Nexus RR.HH.", sector: "RR.HH.", nivel: "Medio", tone: "warning" as const },
    { empresa: "Garriga Fiscalidad SL", sector: "Fiscal", nivel: "Alto", tone: "success" as const },
  ];
  return (
    <MockupShell icon="✦" title="Prospectos" meta={{ text: "3 nuevos hoy", tone: "success" }}>
      <div
        className="grid px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]"
        style={{ gridTemplateColumns: "1fr 56px 56px" }}
      >
        {["Empresa", "Sector", "Señal"].map((h) => (
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
  return (
    <MockupShell icon="✦" title="Mensaje" meta={{ text: "Bufete Serrano" }}>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[color-mix(in_oklch,var(--color-warm)_5%,transparent)] border border-[color-mix(in_oklch,var(--color-warm)_14%,transparent)]">
          <span aria-hidden="true" className="text-xs">⚡</span>
          <span className="text-[10px] font-medium text-[var(--color-warm)]">
            Licitación pública ENISA · hace 2d
          </span>
        </div>
        <div className="text-[11px] text-[var(--color-slate)] leading-relaxed">
          <div className="mb-1.5">Buenos días, Marcos,</div>
          <div>
            He visto que Bufete Serrano participa en la convocatoria ENISA. En despachos similares hemos ayudado a estructurar la propuesta y...
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
          <span className="text-[10px] text-[var(--color-slate-light)]">Listo para enviar</span>
          <span className="text-[10px] font-semibold text-[var(--color-warm)]">
            Ver completo ↗
          </span>
        </div>
      </div>
    </MockupShell>
  );
}

const stepMockups = [MockupDiagnostico, MockupProspectos, MockupMensaje];

const steps = [
  {
    number: "01",
    title: "Cuéntanos quién eres",
    description:
      "Analizamos tu web y generamos automáticamente propuestas de posicionamiento: qué problema resuelves, tu tono, tus servicios, y tu perfil de cliente ideal. Tú eliges la estrategia que más te representa.",
    time: "Setup: 10–15 minutos",
  },
  {
    number: "02",
    title: "El sistema identifica a tus prospectos",
    description:
      "RevCognition busca empresas que encajan con tu perfil, las enriquece con señales reales (sector, tamaño, actividad, señales de intención) y construye una lista cualificada.",
    time: "Sin intervención tuya",
  },
  {
    number: "03",
    title: "Cada prospecto recibe un mensaje escrito para él",
    description:
      "Un LLM combina tu perfil, nuestro banco de mensajes comerciales de alto nivel, y los datos del prospecto para escribir un mensaje único. Tú apruebas los envíos diarios o los dejas ir solos.",
    time: "Validación opcional: 10 min/día",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          Cómo funciona
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-12">
          Tres pasos. Luego el sistema trabaja solo.
        </h2>

        <div className="flex flex-col gap-0">
          {steps.map((step, i) => {
            const MockupComponent = stepMockups[i];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.4, ease: "easeOut" }}
                className="flex gap-6 pb-10 last:pb-0"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full border-2 border-[var(--color-warm)] text-[var(--color-warm)] text-sm font-semibold flex items-center justify-center">
                    {step.number}
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
                    initial={{ opacity: 0, y: 12 }}
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
