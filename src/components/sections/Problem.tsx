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
    <section className="bg-[--color-surface] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[--color-warm] mb-4">
          El problema
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[--color-ink] mb-4">
          ¿Qué estás haciendo ahora?
        </h2>
        <p className="text-[--color-slate] text-lg mb-12 max-w-xl">
          Todas las opciones tienen un coste real. Solo que en una de ellas ese
          coste aparece en la factura.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-[--color-paper] border border-[--color-border] rounded-xl p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[--color-slate-light] mb-1">
                {p.label}
              </p>
              <p className="font-semibold text-[--color-warm] mb-3">{p.cost}</p>
              <p className="text-[--color-slate] text-sm leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
