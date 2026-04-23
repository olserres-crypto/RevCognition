"use client";

import { motion } from "framer-motion";

function MockupDiagnostico() {
  return (
    <div
      className="w-[280px] rounded-xl overflow-hidden select-none bg-white"
      style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.06)" }}
    >
      <div
        className="flex items-center gap-2 px-4 h-11"
        style={{ borderBottom: "0.5px solid rgba(0,0,0,0.06)" }}
      >
        <span style={{ fontSize: 13, color: "var(--color-warm)" }}>✦</span>
        <span style={{ fontSize: 11, fontWeight: 590, color: "#0a0a0a" }}>RevCognition</span>
        <span className="ml-auto" style={{ fontSize: 10, color: "#8a8f98" }}>Análisis generado</span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div>
          <div style={{ fontSize: 9, fontWeight: 510, color: "#8a8f98", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
            Perfil de cliente ideal
          </div>
          <div
            className="flex items-center h-8 px-3 rounded-lg"
            style={{ border: "0.5px solid rgba(0,0,0,0.08)", fontSize: 12, color: "#0a0a0a" }}
          >
            Despachos de abogados · +20 personas
          </div>
        </div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 510, color: "#8a8f98", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
            Problema clave
          </div>
          <div
            className="flex items-center h-8 px-3 rounded-lg"
            style={{ border: "0.5px solid rgba(0,0,0,0.08)", fontSize: 12, color: "#0a0a0a" }}
          >
            Dependen 100% de referencias
          </div>
        </div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 510, color: "#8a8f98", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
            Sectores detectados
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Fusiones M&A", "Litigación laboral", "Deuda corporativa"].map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 10,
                  fontWeight: 510,
                  color: "var(--color-warm)",
                  background: "rgba(99,102,241,0.06)",
                  border: "0.5px solid rgba(99,102,241,0.15)",
                  padding: "3px 8px",
                  borderRadius: 4,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupProspectos() {
  const rows = [
    { empresa: "Bufete Serrano & Asoc.", sector: "Legal", nivel: "Alto", dot: "#22c55e" },
    { empresa: "Consultoría Nexus RR.HH.", sector: "RR.HH.", nivel: "Medio", dot: "#f59e0b" },
    { empresa: "Garriga Fiscalidad SL", sector: "Fiscal", nivel: "Alto", dot: "#22c55e" },
  ];
  return (
    <div
      className="w-[280px] rounded-xl overflow-hidden select-none bg-white"
      style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.06)" }}
    >
      <div
        className="flex items-center gap-2 px-4 h-11"
        style={{ borderBottom: "0.5px solid rgba(0,0,0,0.06)" }}
      >
        <span style={{ fontSize: 13, color: "var(--color-warm)" }}>✦</span>
        <span style={{ fontSize: 11, fontWeight: 590, color: "#0a0a0a" }}>Prospectos</span>
        <span className="ml-auto" style={{ fontSize: 10, color: "#22c55e", fontWeight: 510 }}>3 nuevos hoy</span>
      </div>
      <div
        className="grid px-4 py-2"
        style={{
          gridTemplateColumns: "1fr 44px 44px",
          borderBottom: "0.5px solid rgba(0,0,0,0.06)",
          background: "#fafaf9",
        }}
      >
        {["Empresa", "Sector", "Señal"].map((h) => (
          <div key={h} style={{ fontSize: 9, fontWeight: 510, color: "#8a8f98", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {h}
          </div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          className="grid items-center px-4 py-2.5"
          style={{
            gridTemplateColumns: "1fr 44px 44px",
            borderBottom: i < rows.length - 1 ? "0.5px solid rgba(0,0,0,0.04)" : "none",
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 510, color: "#0a0a0a" }}>{row.empresa}</div>
          <div style={{ fontSize: 10, color: "#8a8f98" }}>{row.sector}</div>
          <div style={{ fontSize: 10, fontWeight: 590, color: row.dot }}>● {row.nivel}</div>
        </div>
      ))}
    </div>
  );
}

function MockupMensaje() {
  return (
    <div
      className="w-[280px] rounded-xl overflow-hidden select-none bg-white"
      style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.06)" }}
    >
      <div
        className="flex items-center gap-2 px-4 h-11"
        style={{ borderBottom: "0.5px solid rgba(0,0,0,0.06)" }}
      >
        <span style={{ fontSize: 13, color: "var(--color-warm)" }}>✦</span>
        <span style={{ fontSize: 11, fontWeight: 590, color: "#0a0a0a" }}>Mensaje</span>
        <span className="ml-auto" style={{ fontSize: 10, color: "#8a8f98" }}>Bufete Serrano</span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: "rgba(99,102,241,0.05)", border: "0.5px solid rgba(99,102,241,0.14)" }}
        >
          <span style={{ fontSize: 12 }}>⚡</span>
          <span style={{ fontSize: 10, fontWeight: 510, color: "var(--color-warm)" }}>
            Licitación pública ENISA · hace 2d
          </span>
        </div>
        <div style={{ fontSize: 11, color: "#3a3a3a", lineHeight: 1.6 }}>
          <div style={{ marginBottom: 6 }}>Buenos días, Marcos,</div>
          <div>
            He visto que Bufete Serrano participa en la convocatoria ENISA. En despachos similares hemos ayudado a estructurar la propuesta y...
          </div>
        </div>
        <div
          className="flex items-center justify-between pt-2"
          style={{ borderTop: "0.5px solid rgba(0,0,0,0.06)" }}
        >
          <span style={{ fontSize: 10, color: "#8a8f98" }}>Listo para enviar</span>
          <span style={{ fontSize: 10, fontWeight: 590, color: "var(--color-warm)" }}>
            Ver completo ↗
          </span>
        </div>
      </div>
    </div>
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
      "RevCognition busca empresas que encajan con tu perfil, las enriquece con señales reales — sector, tamaño, actividad, señales de intención — y construye una lista cualificada.",
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
                {/* Número + línea conectora */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full border-2 border-[var(--color-warm)] text-[var(--color-warm)] text-sm font-semibold flex items-center justify-center">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 w-px bg-[var(--color-border)] mt-3" />
                  )}
                </div>

                {/* Texto + mockup */}
                <div className="flex-1 min-w-0 pt-1.5 flex flex-col lg:flex-row lg:items-start lg:gap-10">
                  <div className="pb-4 lg:pb-2 flex-1 min-w-0">
                    <h3 className="font-serif text-xl text-[var(--color-ink)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-slate)] leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-slate-light)] bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1 rounded-full">
                      {step.time}
                    </span>
                  </div>

                  {/* Panel de mockup — solo desktop */}
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
