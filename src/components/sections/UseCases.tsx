"use client";

import { motion } from "framer-motion";

const cases = [
  {
    icon: "⚖️",
    sector: "Gabinete de abogados de marcas",
    problem:
      "Una DB de señales perfectas, emails que nadie contesta",
    problemDetail:
      "Cada depósito de marca rechazado es una empresa con una urgencia legal real. Tienen la DB. Pero los emails que manda su agencia son genéricos, sin mencionar el rechazo específico ni el riesgo concreto. Resultado: casi cero respuestas, pese a tener la señal de intención más clara que existe.",
    solution:
      "RevCognition toma cada rechazo como señal de entrada, identifica al responsable legal de la empresa, y le escribe un mensaje que menciona su caso específico — sin que el abogado tenga que hacer nada.",
  },
  {
    icon: "📡",
    sector: "Agencia de venta de espacios publicitarios",
    problem:
      "Prospectas por red personal. Cuando estás ocupado, se para todo",
    problemDetail:
      "Una sola persona lo gestiona todo. Sabe que hay mercado, sabe que debería prospectar más. Pero la prospección siempre queda para cuando haya tiempo — que nunca llega. No hay sistema, solo llamadas esporádicas a contactos ya conocidos.",
    solution:
      "RevCognition identifica marcas del sector que encajan con el perfil de cliente ideal, las enriquece, y les escribe mensajes contextualizados. El sistema funciona aunque el fundador esté con un cliente.",
  },
];

export function UseCases() {
  return (
    <section className="bg-[var(--color-surface)] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          Casos reales
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-4">
          El sistema entiende tu contexto específico.
        </h2>
        <p className="text-[var(--color-slate)] text-lg mb-12 max-w-xl">
          No manda emails genéricos. Eso lo hace cualquier agencia.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.sector}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
              className="bg-[var(--color-paper)] border border-[var(--color-border)] rounded-xl p-6 sm:p-7 flex flex-col gap-5"
            >
              <div>
                <span className="text-3xl">{c.icon}</span>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-slate-light)] mt-3 mb-1">
                  {c.sector}
                </p>
                <h3 className="font-serif text-xl text-[var(--color-ink)]">
                  {c.problem}
                </h3>
              </div>

              <p className="text-[var(--color-slate)] text-sm leading-relaxed">
                {c.problemDetail}
              </p>

              <div className="border-t border-[var(--color-border)] pt-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-2">
                  Cómo lo resuelve RevCognition
                </p>
                <p className="text-[var(--color-slate)] text-sm leading-relaxed">
                  {c.solution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
