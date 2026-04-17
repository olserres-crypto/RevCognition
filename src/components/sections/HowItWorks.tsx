"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Cuéntanos quién eres",
    description:
      "Analizamos tu web y generamos automáticamente propuestas de posicionamiento: qué problema resuelves, tu tono, tus servicios, y tu perfil de cliente ideal. Tú eliges la estrategia que más te representa y puedes añadir contexto adicional si lo deseas.",
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
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.4, ease: "easeOut" }}
              className="flex gap-6 pb-10 last:pb-0"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border-2 border-[var(--color-warm)] text-[var(--color-warm)] text-sm font-semibold flex items-center justify-center flex-shrink-0">
                  {step.number}
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 w-px bg-[var(--color-border)] mt-3" />
                )}
              </div>
              <div className="pt-1.5 pb-2">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
