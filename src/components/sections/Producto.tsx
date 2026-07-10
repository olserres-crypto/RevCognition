"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MockupShell, MockupRow } from "@/components/ui/MockupShell";

const sections = [
  { id: "setup", label: "Puesta en marcha" },
  { id: "dia-a-dia", label: "El día a día" },
  { id: "motor", label: "El motor" },
  { id: "entregabilidad", label: "Entregabilidad" },
  { id: "faq", label: "Preguntas" },
];

/* ---------- Mockups (datos ficticios .example) ---------- */

function MockupWizard() {
  const remitentes = [
    { nombre: "Alex Serra", cargo: "Fundador" },
    { nombre: "Marina Gil", cargo: "Desarrollo de negocio" },
    { nombre: "Pau Roig", cargo: "Cuentas" },
  ];
  return (
    <MockupShell icon="✦" title="Configuración" meta={{ text: "Paso 5 de 6" }}>
      <div className="p-4 flex flex-col gap-3">
        <MockupRow label="Dominio de envío" value="correo-tuempresa.example" />
        <div>
          <div className="text-[10px] font-medium text-[var(--color-slate)] uppercase tracking-wider mb-1.5">
            Remitentes · 6 buzones
          </div>
          <div className="flex flex-col gap-1.5">
            {remitentes.map((r) => (
              <div
                key={r.nombre}
                className="flex items-center justify-between h-8 px-3 rounded-lg border border-[var(--color-border)]"
              >
                <span className="text-[11px] font-medium text-[var(--color-ink)]">{r.nombre}</span>
                <span className="text-[10px] text-[var(--color-slate)]">{r.cargo}</span>
              </div>
            ))}
            <div className="text-[10px] text-[var(--color-slate-light)] pl-1">+ 3 remitentes más</div>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

function MockupAprobacion() {
  return (
    <MockupShell icon="✦" title="Aprobación" meta={{ text: "1 de 8 pendientes" }}>
      <div className="p-4 flex flex-col gap-3">
        <div className="text-[10px] text-[var(--color-slate)]">
          <span className="font-semibold">Para:</span> Ana Ruiz · Bufete Serrano
        </div>
        <div className="text-[10px] text-[var(--color-slate)]">
          <span className="font-semibold">Asunto:</span> Vuestra convocatoria ENISA
        </div>
        <div className="text-[11px] text-[var(--color-slate)] leading-relaxed border-t border-[var(--color-border)] pt-2.5">
          Buenos días, Ana. He visto que Bufete Serrano participa en la
          convocatoria ENISA. En despachos similares hemos ayudado a...
        </div>
        <div className="flex items-center gap-2 pt-1">
          <span className="flex-1 h-8 rounded-lg bg-[var(--color-warm)] text-white text-[11px] font-semibold flex items-center justify-center">
            Aprobar
          </span>
          <span className="flex-1 h-8 rounded-lg border border-[var(--color-border)] text-[var(--color-slate)] text-[11px] font-semibold flex items-center justify-center">
            Descartar
          </span>
        </div>
      </div>
    </MockupShell>
  );
}

function MockupSecuencia() {
  const pasos = [
    { dia: "Día 0", nombre: "Apertura" },
    { dia: "+3 días", nombre: "Seguimiento" },
    { dia: "+5 días", nombre: "Nuevo ángulo" },
    { dia: "+4 días", nombre: "Cierre" },
  ];
  return (
    <MockupShell icon="✦" title="Secuencia" meta={{ text: "4 mensajes" }}>
      <div className="p-4 flex flex-col">
        {pasos.map((p, i) => (
          <div key={p.dia} className="flex gap-3">
            <div className="flex flex-col items-center shrink-0">
              <span className="w-2 h-2 rounded-full bg-[var(--color-warm)] mt-1" aria-hidden="true" />
              {i < pasos.length - 1 && (
                <span className="flex-1 w-px bg-[var(--color-border)] my-1" aria-hidden="true" />
              )}
            </div>
            <div className={i < pasos.length - 1 ? "pb-3" : ""}>
              <div className="text-[11px] font-semibold text-[var(--color-ink)]">{p.nombre}</div>
              <div className="text-[10px] text-[var(--color-slate-light)]">{p.dia}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4 flex flex-col gap-3 border-t border-[var(--color-border)] pt-3">
        <MockupRow label="Señal detectada" value="Empresa Ejemplo amplía su equipo comercial" />
        <div className="text-[11px] text-[var(--color-slate)] leading-relaxed">
          Hola, Laura. He visto que Empresa Ejemplo está ampliando el equipo
          comercial — imagino que la prospección forma parte de esa
          expansión...
        </div>
      </div>
    </MockupShell>
  );
}

function MockupRamp() {
  const semanas = [
    { s: "Semana 1", v: "4 – 16 / día" },
    { s: "Semana 2", v: "18 – 30 / día" },
    { s: "Semana 3", v: "32 – 44 / día" },
    { s: "Semana 4", v: "50 / día · pleno" },
  ];
  return (
    <MockupShell icon="✦" title="Calentamiento" meta={{ text: "En curso", tone: "success" }}>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-col">
          {semanas.map((w, i) => (
            <div
              key={w.s}
              className={`flex items-center justify-between py-2 ${i < semanas.length - 1 ? "border-b border-[var(--color-border)]" : ""}`}
            >
              <span className="text-[10px] font-medium text-[var(--color-slate)] uppercase tracking-wider">{w.s}</span>
              <span className="text-[11px] font-medium text-[var(--color-ink)] tabular-nums">{w.v}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-success-tint)]">
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
          <span className="text-[10px] font-medium text-[var(--color-success)]">
            Respuesta clasificada · Interesado
          </span>
        </div>
      </div>
    </MockupShell>
  );
}

/* ---------- Bloque temático ---------- */

type Feature = { title: string; body: string };

function ThemeBlock({
  id,
  band,
  eyebrow,
  title,
  intro,
  depth,
  oneLiners,
  mockup,
  reduce,
}: {
  id: string;
  band: "paper" | "surface";
  eyebrow: string;
  title: string;
  intro: string;
  depth: Feature[];
  oneLiners: Feature[];
  mockup: React.ReactNode;
  reduce: boolean | null;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 md:scroll-mt-32 py-16 sm:py-24 ${band === "surface" ? "bg-[var(--color-surface)]" : ""}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-4">{title}</h2>
        <p className="text-[var(--color-slate)] text-lg mb-12 max-w-xl">{intro}</p>

        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-8">
              {depth.map((f) => (
                <motion.div
                  key={f.title}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <h3 className="font-serif text-xl text-[var(--color-ink)] mb-2">{f.title}</h3>
                  <p className="text-[var(--color-slate)] leading-relaxed max-w-xl">{f.body}</p>
                </motion.div>
              ))}
            </div>

            {oneLiners.length > 0 && (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                {oneLiners.map((f) => (
                  <div key={f.title} className="border-t border-[var(--color-border)] py-4">
                    <p className="font-semibold text-[var(--color-ink)] text-sm mb-1">{f.title}</p>
                    <p className="text-[var(--color-slate)] text-sm leading-relaxed">{f.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.12, duration: 0.4, ease: "easeOut" }}
            className="hidden lg:block shrink-0 mt-2"
          >
            {mockup}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

const faqs: Feature[] = [
  {
    title: "¿Acabaré en spam?",
    body: "Es lo primero que cuidamos. Envías desde un dominio propio y dedicado, no compartido, y su reputación se calienta poco a poco a lo largo de las primeras cuatro semanas, hasta alcanzar el volumen de envío pleno. Además, cada dirección de correo se verifica antes de escribir, para que el rebote se mantenga bajo y tus mensajes lleguen a la bandeja de entrada.",
  },
  {
    title: "¿Cuánto control tengo?",
    body: "Todo el que quieras. Cada correo se prepara pero no sale hasta que lo apruebas —una revisión de unos cinco minutos al día— y puedes editar el texto antes de enviarlo. Si prefieres delegar, desactivas la aprobación y los envíos salen solos. El perfil comercial que guía cada mensaje lo ajustas tú cuando quieras.",
  },
  {
    title: "¿En qué idioma escribe?",
    body: "En el idioma que corresponde a la ubicación de cada prospecto, con el inglés por defecto. No es necesariamente tu idioma: si escribes a una empresa en Francia, el mensaje va en francés; a una en Alemania, en alemán. El objetivo es que cada destinatario lea el correo en su propio idioma.",
  },
  {
    title: "¿Qué pasa cuando alguien responde?",
    body: "Cada respuesta se lee y se clasifica sola: interesado, no interesado, hostil o fuera de oficina. Si hay interés, la secuencia se pausa al instante y recibes la respuesta por correo y Telegram para retomarla tú mismo; el enlace de tu Cal.com viaja en cada correo enviado, así que el prospecto también puede reservar directamente desde ahí. Si no hay interés o la respuesta es hostil, el hilo se cierra con cuidado y no se vuelve a contactar.",
  },
  {
    title: "¿Qué cuesta?",
    body: "Un setup único de 50€ para dejar la cuenta lista, y luego pagas por prospecto trabajado: 1€ por cada prospecto nuevo al que se escribe. Un crédito se consume con el primer correo a un prospecto; los seguimientos de esa misma secuencia no gastan crédito extra, y un prospecto que descartas en la revisión nunca gasta crédito.",
  },
  {
    title: "¿Funciona en mi sector o en mi país?",
    body: "El sistema busca en continuo sobre bases de datos partner especializadas: para un solo perfil de cliente ideal —sector, ubicación y tamaño— puede haber más de 400.000 empresas candidatas. Y cada correo llega en el idioma que corresponde al país de quien lo recibe, así que la cobertura no depende del idioma que hables tú.",
  },
  {
    title: "¿De dónde salen los datos de los contactos?",
    body: "Los contactos salen de bases de datos partner especializadas en información profesional. Antes de escribir, cada dirección de correo se verifica para mantener el rebote bajo, y cada correo incluye una opción de baja: quien se da de baja no vuelve a recibir nada, en cumplimiento con la normativa.",
  },
];

function Faq({ reduce }: { reduce: boolean | null }) {
  return (
    <section id="faq" className="scroll-mt-20 md:scroll-mt-32 py-16 sm:py-24 bg-[var(--color-surface)]">
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
              <h3 className="font-serif text-xl text-[var(--color-ink)] mb-2">{f.title}</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Página ---------- */

export function Producto() {
  const reduce = useReducedMotion();
  return (
    <>
      {/* Hero de página */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-10 sm:pt-24 sm:pb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          Producto
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[var(--color-ink)] leading-tight max-w-3xl">
          Todo lo que hace el sistema,{" "}
          <span className="font-light">de la primera sesión al primer sí.</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-[var(--color-slate)] leading-relaxed max-w-2xl">
          RevCognition monta tu prospección en frío de principio a fin y la
          sostiene día tras día. Esto es lo que ocurre por dentro, sin jerga.
        </p>

        {/* Nav in-page: plano en móvil */}
        <nav aria-label="Secciones de la página" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 md:hidden">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm font-medium text-[var(--color-warm)] hover:text-[var(--color-warm-hover)] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </section>

      {/* Nav de píldoras sticky: solo desktop */}
      <div className="hidden md:block sticky top-14 z-40 bg-[var(--color-paper)]/95 backdrop-blur-sm border-y border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <nav aria-label="Secciones de la página" className="flex items-center gap-2 h-12 overflow-x-auto">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="whitespace-nowrap px-3 py-1.5 rounded-full text-sm text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <ThemeBlock
        id="setup"
        band="surface"
        eyebrow="Puesta en marcha"
        title="De tu web a una campaña activa, en una sesión."
        intro="Montar prospección en frío desde cero —dominio, buzones, secuencia, mensajes— suele llevar semanas y varias herramientas. Aquí es una sola sesión guiada de principio a fin."
        reduce={reduce}
        depth={[
          {
            title: "Un asistente que deja la cuenta lista para enviar",
            body: "Pegas la URL de tu web y el sistema redacta un primer perfil comercial: a quién te diriges, qué te diferencia y tu tono. Lo revisas, eliges un dominio dedicado, defines tus remitentes y tu enlace para agendar, y al terminar el dominio entra en calentamiento. Sin agencias y sin semanas de configuración.",
          },
          {
            title: "Un dominio de correo propio, autenticado",
            body: "Eliges un dominio dedicado para tus envíos. El sistema lo autentica (SPF, DKIM, DMARC) y arranca su reputación desde cero, para no tocar tu buzón principal ni depender de una IP compartida.",
          },
        ]}
        oneLiners={[
          {
            title: "Perfil comercial editable",
            body: "Corrige lo que la IA entendió de tu negocio. Tu criterio guía cada correo, y los cambios se aplican a la siguiente tanda de contactos.",
          },
          {
            title: "Remitentes con identidad real",
            body: "Tus remitentes, con nombre y cargo reales, protegidos para no romper la reputación del dominio.",
          },
        ]}
        mockup={<MockupWizard />}
      />

      <ThemeBlock
        id="dia-a-dia"
        band="paper"
        eyebrow="El día a día"
        title="Cinco minutos al día. El resto ocurre solo."
        intro="El criterio humano se queda en el centro: nada sale sin tu visto bueno, pero la revisión es una sesión corta al día, no una configuración constante."
        reduce={reduce}
        depth={[
          {
            title: "Apruebas lo que sale, y solo eso",
            body: "En el Centro de Aprobación ves cada correo ya redactado —asunto y cuerpo, con nombre, empresa y dirección— antes de que salga. Editas el texto si quieres, despliegas la secuencia completa de seguimientos, marcas los que apruebas y descartas el resto. Cuando confíes en el sistema, puedes desactivar la aprobación y dejar que salgan solos.",
          },
        ]}
        oneLiners={[
          {
            title: "Un panel honesto",
            body: "Números reales, no gráficos decorativos: correos enviados, respuestas y tasa de respuesta de tus últimos 30 días.",
          },
          {
            title: "Tus listas, con estado claro",
            body: "Las listas de contactos, agrupadas por archivo y fecha, con lo que se ha procesado y lo que queda.",
          },
          {
            title: "Trae tus propios contactos",
            body: "Un CSV y tus contactos entran en la misma personalización y envío que la búsqueda automática.",
          },
          {
            title: "Tú controlas los ajustes",
            body: "Cuándo envías, cómo te avisamos (correo y Telegram) y cómo se comporta tu campaña, sin abrir un ticket para cada cambio.",
          },
          {
            title: "Pagas por prospecto trabajado",
            body: "No por asientos ni suscripciones. Recargas créditos cuando quieras, de forma segura con Stripe.",
          },
        ]}
        mockup={<MockupAprobacion />}
      />

      <ThemeBlock
        id="motor"
        band="surface"
        eyebrow="El motor"
        title="Encuentra, verifica y escribe. Por cada prospecto."
        intro="Encontrar buenas empresas objetivo es el trabajo más lento de la prospección. El sistema lo hace en continuo, y sobre cada contacto escribe un mensaje pensado para él."
        reduce={reduce}
        depth={[
          {
            title: "Un mensaje escrito desde cero, no una plantilla",
            body: "Con tu perfil comercial y el contexto real de cada empresa, el sistema redacta una secuencia completa por contacto —apertura, seguimiento, nuevo ángulo y cierre—. Cada correo se genera en el idioma que corresponde a la ubicación de la empresa, para que suene como algo escrito a mano y no como una plantilla rellenada.",
          },
          {
            title: "Cuando hay una señal, el mensaje la aprovecha",
            body: "El sistema también vigila señales de actividad reciente en la empresa objetivo, como una contratación. Cuando aparece una, el mensaje puede apoyarse en ella —por ejemplo, si la empresa está ampliando su equipo— para llegar en el momento en que tiene más sentido.",
          },
        ]}
        oneLiners={[
          {
            title: "Empresas que encajan con tu ICP",
            body: "Encuentra por ti las empresas que encajan con tu cliente ideal —sector, ubicación y tamaño— y descarta las que no.",
          },
          {
            title: "Contactos con correo verificado",
            body: "Las personas adecuadas en cada empresa, con la dirección de correo verificada antes de escribir.",
          },
        ]}
        mockup={<MockupSecuencia />}
      />

      <ThemeBlock
        id="entregabilidad"
        band="paper"
        eyebrow="Entregabilidad y respuestas"
        title="Llegar a la bandeja de entrada, y saber qué hacer después."
        intro="Enviar en frío desde un dominio nuevo o compartido acaba en spam. Un dominio dedicado y calentado con cuidado protege tu reputación; y cuando llegan respuestas, cada una se trata como merece."
        reduce={reduce}
        depth={[
          {
            title: "Calentamiento real, no un interruptor",
            body: "El dominio empieza con pocos correos al día y sube el volumen poco a poco —de una franja de 4 a 16 diarios en la primera semana hasta el volumen pleno de 50 en la cuarta—. En el panel ves el día de calentamiento y el volumen actual en todo momento.",
          },
          {
            title: "Cada respuesta, leída y clasificada",
            body: "Interesado, no interesado, hostil o fuera de oficina: la intención se detecta sola. Si hay interés, la secuencia se pausa y recibes la respuesta al instante por correo y Telegram para retomar tú la conversación; el enlace de tu Cal.com viaja en cada correo, así que el prospecto también puede reservar directamente desde ahí. Una ausencia temporal pausa y reanuda a los pocos días; una respuesta hostil cierra el hilo para siempre.",
          },
        ]}
        oneLiners={[
          {
            title: "De la respuesta a la reunión",
            body: "Cuando alguien responde con interés, la secuencia se pausa y te avisamos al instante por correo y Telegram; el enlace de tu Cal.com viaja en cada correo, así que también puede reservar directamente desde ahí.",
          },
          {
            title: "Bajas y cumplimiento por defecto",
            body: "Cada correo permite darse de baja, y quien lo hace no vuelve a recibir nada, en ninguna de tus campañas.",
          },
        ]}
        mockup={<MockupRamp />}
      />

      <Faq reduce={reduce} />
    </>
  );
}
