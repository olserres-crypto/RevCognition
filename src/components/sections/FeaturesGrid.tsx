"use client";

import { motion, useReducedMotion } from "framer-motion";

// Diferenciadores primero (aprobación, entregabilidad, personalización,
// respuestas), luego el resto. Copy derivado de "Mensaje corto" del inventario.
const features = [
  {
    title: "Tú apruebas lo que sale",
    body: "Cinco minutos al día para revisar los correos preparados. Nada se envía sin tu visto bueno, y puedes desactivar la aprobación cuando confíes en el sistema.",
  },
  {
    title: "Dominio propio, calentado con paciencia",
    body: "Un dominio de envío dedicado que sube su volumen poco a poco durante las primeras semanas, para llegar a la bandeja de entrada y no al spam.",
  },
  {
    title: "Un mensaje escrito para cada prospecto",
    body: "Cada correo se redacta desde cero con el contexto real de tu negocio y del destinatario. Una secuencia de hasta cuatro mensajes, no una plantilla rellenada.",
  },
  {
    title: "Las respuestas se clasifican solas",
    body: "Interesado, no interesado, hostil o fuera de oficina: cada respuesta se lee y se ordena sola. Los interesados se priorizan y te avisamos por correo y Telegram.",
  },
  {
    title: "Seis remitentes con firma propia",
    body: "Tus correos salen repartidos entre seis buzones, cada uno con su nombre y su cargo reales, para cuidar la reputación del dominio.",
  },
  {
    title: "De una respuesta a una reunión",
    body: "Cuando alguien contesta con interés, la secuencia se pausa y te avisamos al instante por correo y Telegram. El enlace de tu Cal.com viaja en cada correo, así que también puede reservar directamente desde ahí.",
  },
  {
    title: "Trae tus propios contactos",
    body: "¿Ya tienes una lista? Súbela en CSV y entra en la misma maquinaria de personalización y envío que la búsqueda automática.",
  },
  {
    title: "Pagas por prospecto trabajado",
    body: "No por asientos ni suscripciones. Un crédito por cada prospecto nuevo al que se escribe; los seguimientos de esa secuencia no gastan crédito extra.",
  },
];

export function FeaturesGrid() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-[var(--color-surface)] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          Qué hace por ti
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-4">
          Todo el trabajo mecánico de la prospección, hecho.
        </h2>
        <p className="text-[var(--color-slate)] text-lg mb-12 max-w-xl">
          Tú mantienes el criterio; el sistema pone las horas. Esto es lo que
          se ocupa de hacer, un día tras otro.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 2) * 0.06, duration: 0.35, ease: "easeOut" }}
              className="border-t border-[var(--color-border)] py-5"
            >
              <h3 className="font-serif text-xl text-[var(--color-ink)] mb-1.5">
                {f.title}
              </h3>
              <p className="text-[var(--color-slate)] text-sm leading-relaxed">
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="/producto"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-warm)] hover:text-[var(--color-warm-hover)] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
          >
            Ver todo lo que hace, en detalle
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
