"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/* ---------- Cómo funciona para tu caso (deriva de "Cómo encuentra a tus
   clientes" en FeaturesGrid.tsx / #como-encuentra — mismos 4 pasos,
   redactados en el registro de un despacho o agencia de servicios B2B) ---------- */

const pasos = [
  {
    number: "1",
    title: "Lee tu web",
    body: "Entiende a qué te dedicas y a qué tipo de cliente sirves, a partir de tu propia web.",
  },
  {
    number: "2",
    title: "Construye tu perfil de cliente ideal",
    body: "Lo traduce en un perfil de cliente ideal: sector, ubicación y tamaño de empresa.",
  },
  {
    number: "3",
    title: "Busca en continuo sobre bases de datos partner",
    body: "Cruza ese perfil sin parar contra varias bases de datos de empresas y puntúa cada una por lo bien que encaja.",
  },
  {
    number: "4",
    title: "Verifica correos y detecta señales de compra",
    body: "Localiza al contacto adecuado en cada empresa, verifica su correo antes de escribir y revisa si hay señales recientes, como una contratación.",
  },
];

/* ---------- FAQ del segmento — reescrita al registro de quien lleva un
   despacho o agencia de servicios B2B y nunca ha hecho prospección en frío.
   Fuentes: FEATURE_INVENTORY.md — "Dedicated sending domains + automatic
   warmup", "Reply detection & sentiment", "Automatic meeting booking
   (Cal.com)", "Unsubscribe & compliance handling", "Company sourcing
   matching your ICP", "Contact discovery & email verification". ---------- */

const faqs = [
  {
    title: "¿Funciona en mi sector o en mi país?",
    body: "El sistema busca en continuo sobre bases de datos partner especializadas: para un despacho o agencia con un perfil de cliente definido —sector, ubicación y tamaño— puede haber más de 400.000 empresas candidatas. No hace falta que tu especialidad sea común ni que tu zona sea grande: la búsqueda no depende de una sola lista.",
  },
  {
    title: "¿De dónde salen los datos de los contactos?",
    body: "Los contactos salen de bases de datos partner especializadas en información profesional. Antes de escribir, cada dirección de correo se verifica para mantener el rebote bajo, y cada correo incluye una opción de baja: quien se da de baja no vuelve a recibir nada, en cumplimiento con la normativa.",
  },
  {
    title: "¿Acabaré en spam?",
    body: "Es la primera duda razonable, sobre todo si nunca has hecho prospección en frío. Por eso nunca se envía desde tu correo del despacho o de la agencia: usas un dominio de envío dedicado y separado, que se autentica automáticamente y sube su volumen poco a poco a lo largo de las primeras semanas, hasta alcanzar el volumen pleno. Tu buzón principal no se toca en ningún momento, y tu reputación con tus clientes actuales queda al margen.",
  },
  {
    title: "¿Qué pasa cuando alguien responde?",
    body: "Cada respuesta se lee y se clasifica sola: interesado, no interesado, agresivo o ausente. Si hay interés, la secuencia se pausa al instante, te avisamos por correo y Telegram, y el prospecto recibe tu enlace de Cal.com para reservar directamente, sin ida y vuelta de correos. Si no hay interés o la respuesta es hostil, el hilo se cierra con cuidado y no se vuelve a contactar. Como en cualquier correo, cada mensaje lleva una opción de baja; quien se da de baja no vuelve a recibir nada.",
  },
];

/* ---------- Case-study slot: 3 métricas placeholder, sin cifras ---------- */

const metricSlots = [
  { label: "Correos enviados" },
  { label: "Respuestas de interés" },
  { label: "Reuniones agendadas" },
];

export function ServiciosB2B() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* Hero-lite: pain-first + promesa. Sin bg explícito → paper (base de la página). */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-14 sm:pt-24 sm:pb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          Servicios B2B
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[var(--color-ink)] leading-tight max-w-3xl">
          Vives de tus referencias.{" "}
          <span className="font-light">Y no te queda tiempo para prospectar.</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-[var(--color-slate)] leading-relaxed max-w-2xl">
          Despachos, agencias y consultoras suelen depender de a quién les
          recomiendan. RevCognition busca clientes nuevos que encajan con tu
          perfil y les escribe un mensaje propio a cada uno, mientras tú
          sigues con los clientes que ya tienes. Tu única tarea: revisar los
          correos preparados, cinco minutos al día.
        </p>
      </section>

      {/* Cómo funciona para tu caso — bg surface (alterna con el hero paper). */}
      <section
        id="como-funciona-caso"
        className="scroll-mt-20 py-16 sm:py-24 bg-[var(--color-surface)]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
            Cómo funciona
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-4">
            Cómo encuentra a tus próximos clientes.
          </h2>
          <p className="text-[var(--color-slate)] text-lg mb-12 max-w-xl">
            ¿Y si tu especialidad es poco frecuente, o tu zona es pequeña? La
            búsqueda no se apoya en una sola lista: para un solo perfil de
            cliente puede haber más de 400.000 empresas candidatas, y el
            sistema las revisa sin parar para quedarse solo con las que
            encajan.
          </p>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mb-10">
            {pasos.map((paso, i) => (
              <motion.li
                key={paso.number}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.35, ease: "easeOut" }}
                className="list-none"
              >
                <div className="w-7 h-7 rounded-full border-2 border-[var(--color-warm)] text-[var(--color-warm)] text-xs font-semibold flex items-center justify-center mb-3">
                  {paso.number}
                </div>
                <h3 className="font-serif text-base text-[var(--color-ink)] mb-1.5">
                  {paso.title}
                </h3>
                <p className="text-[var(--color-slate)] text-sm leading-relaxed">
                  {paso.body}
                </p>
              </motion.li>
            ))}
          </ol>

          <Link
            href="/#como-encuentra"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-warm)] hover:text-[var(--color-warm-hover)] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
          >
            Ver el detalle completo
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Resultados — bg paper (alterna con la sección anterior surface). */}
      <section id="resultados" className="scroll-mt-20 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
            Resultados
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-6 max-w-2xl">
            Lo probamos con nuestras propias campañas.
          </h2>
          <p className="text-[var(--color-slate)] text-lg leading-relaxed max-w-2xl">
            Usamos RevCognition para nuestra propia prospección: las
            campañas que nos consiguen clientes corren sobre este mismo
            producto —el mismo dominio dedicado, el mismo motor de mensajes
            y la misma revisión diaria de cinco minutos que verías tú—.
          </p>

          {/* CASE-STUDY SLOT: swap con BR Latina cuando haya cifras (B-591 wave 2) */}
          <div className="mt-10 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-slate)] mb-2">
              Próximo caso de cliente
            </p>
            <h3 className="font-serif text-xl text-[var(--color-ink)] mb-3">
              El primer caso de cliente, en curso.
            </h3>
            <p className="text-[var(--color-slate)] text-sm leading-relaxed mb-6">
              Primer caso de cliente en curso: publicaremos aquí los
              resultados de la primera campaña completa, con cifras reales.
            </p>
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-5 border-t border-[var(--color-border)]">
              {metricSlots.map((m) => (
                <div key={m.label}>
                  <p className="text-2xl sm:text-3xl font-semibold text-[var(--color-slate-light)] tabular-nums">
                    —
                  </p>
                  <p className="text-[11px] sm:text-xs text-[var(--color-slate)] mt-1 leading-snug">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — bg surface (alterna con Resultados paper). */}
      <section id="faq" className="scroll-mt-20 py-16 sm:py-24 bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
            Preguntas
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-12">
            Lo que suelen preguntarnos antes de entrar.
          </h2>
          <div className="max-w-3xl divide-y divide-[var(--color-border)]">
            {faqs.map((f, i) => (
              <motion.div
                key={f.title}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 2) * 0.05, duration: 0.35, ease: "easeOut" }}
                className="py-6"
              >
                <h3 className="font-serif text-xl text-[var(--color-ink)] mb-2">
                  {f.title}
                </h3>
                <p className="text-[var(--color-slate)] leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
