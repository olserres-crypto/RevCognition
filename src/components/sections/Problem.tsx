"use client";

import { motion } from "framer-motion";

const problems = [
  {
    label: "Tu red de contactos",
    cost: "Oportunidades perdidas",
    description:
      "Prospectas cuando tienes tiempo — que es casi nunca. El sistema se para cuando tú te paras.",
  },
  {
    label: "Una agencia de captación",
    cost: "500–2.000€/mes, resultados nulos",
    description:
      "Recibes informes, no reuniones. Los mensajes son genéricos aunque te digan que son personalizados. No ves qué se envía en tu nombre.",
  },
  {
    label: "Una herramienta genérica",
    cost: "Horas de configuración, spam",
    description:
      "Necesitas ser técnico para usarla o aceptar que los mensajes no tienen ningún contexto sobre tu negocio ni el del prospecto.",
  },
];

export function Problem() {
  return (
    <section className="bg-[var(--color-surface)] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          El problema
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-4">
          ¿Qué estás haciendo ahora?
        </h2>
        <p className="text-[var(--color-slate)] text-lg mb-12 max-w-xl">
          Todas las opciones tienen un coste real. Solo que en una de ellas ese
          coste aparece en la factura.
        </p>

        <div className="divide-y divide-[var(--color-border)]">
          {problems.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 16 }}
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-ink)] whitespace-nowrap">
                  <span className="text-red-500 font-bold leading-none">×</span>
                  {p.cost}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contraste RevCognition */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.28, duration: 0.35 }}
          className="mt-6 bg-white border border-[var(--color-border)] border-l-4 border-l-[var(--color-warm)] rounded-xl px-6 py-5 sm:flex sm:items-start sm:gap-8"
        >
          <div className="sm:flex-1">
            <p className="font-semibold text-[var(--color-ink)] mb-1">RevCognition</p>
            <p className="text-[var(--color-slate)] text-sm leading-relaxed">
              El sistema localiza prospectos que encajan con tu perfil, escribe un mensaje único para cada uno y los envía. Ves cada mensaje antes de salir. Sin configuración técnica, sin intermediarios.
            </p>
          </div>
          <div className="mt-2 sm:mt-0 sm:text-right sm:shrink-0">
            <p className="text-sm font-semibold text-[var(--color-warm)]">
              0€ en agencias
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
