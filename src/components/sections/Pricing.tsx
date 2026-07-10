import { Button } from "@/components/ui/Button";

const APP_URL = "https://app.revcognition.com";
const CAL_30MIN_URL = "https://cal.com/olivier-serres-js5hdw/30min";

const packs = [
  {
    prospects: 100,
    price: "100€",
    perUnit: "1,00€",
    discount: null,
    label: "Para empezar",
    description: "Prueba el sistema con tu primer segmento de mercado.",
    plan: "pack_100",
  },
  {
    prospects: 600,
    price: "500€",
    perUnit: "0,83€",
    discount: "17% más barato por envío",
    label: "Para crecer",
    description: "Cubre varios segmentos o mercados en paralelo.",
    plan: "pack_600",
  },
  {
    prospects: 1300,
    price: "1.000€",
    perUnit: "0,77€",
    discount: "23% más barato por envío",
    label: "Para escalar",
    description: "Prospección continua sin tener que recargar constantemente.",
    plan: "pack_1300",
  },
];

const setupIncludes = [
  "Compra y renovación automática del dominio de envío",
  "Auto-configuración de SPF, DKIM y DMARC",
  "Clasificación automática de respuestas (interesado, no interesado, hostil, fuera de oficina)",
  "Calentamiento automático del dominio: el volumen sube poco a poco hasta alcanzar el volumen pleno en la cuarta semana",
  "Seis remitentes con nombre y firma propios",
  "Agenda directa con tu calendario (Cal.com)",
];

export function Pricing() {
  return (
    <section id="precios" className="py-16 sm:py-24 bg-[var(--color-warm)]/25">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          Precios
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-4">
          Desde 1€ por prospecto. Cuanto mayor el pack, más barato por envío.
        </h2>
        <p className="text-[var(--color-slate)] text-lg mb-4 max-w-2xl">
          No pagas por asientos ni por herramientas. Pagas por prospecto
          trabajado: 1 crédito se consume en el primer envío a un prospecto
          nuevo, y los seguimientos de esa misma secuencia no gastan crédito
          adicional. Si contesta antes, el sistema se para. Si no, cierra con
          elegancia.
        </p>
        <p className="text-[var(--color-slate)] text-sm mb-4 max-w-2xl">
          Cada prospecto incluye: identificación, enriquecimiento con señales
          reales y secuencia completa (apertura, seguimiento, nuevo ángulo,
          cierre).
        </p>
        <p className="text-[var(--color-slate)] text-sm mb-12 max-w-2xl">
          Sin permanencia y sin suscripción. Los créditos no caducan.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {packs.map((pack) => (
            <div
              key={pack.prospects}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-paper)] p-7 sm:p-8 flex flex-col gap-4"
            >
              <div>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-semibold text-[var(--color-ink)] tabular-nums">
                    {pack.price}
                  </p>
                  <span className="text-sm text-[var(--color-slate)]">
                    sin IVA
                  </span>
                </div>
                <p className="text-[var(--color-slate)] text-sm mt-1">
                  {pack.prospects} prospectos cualificados
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-[var(--color-slate)] tabular-nums">
                    {pack.perUnit} / envío
                  </span>
                  {pack.discount && (
                    <span className="text-xs font-semibold text-[var(--color-warm)] bg-[var(--color-warm)]/10 rounded px-1.5 py-0.5">
                      {pack.discount}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-slate)]">
                {pack.label}
              </p>
              <p className="text-[var(--color-slate)] text-sm leading-relaxed flex-1">
                {pack.description}
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="ink-solid"
                  href={`${APP_URL}/?plan=${pack.plan}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-sm py-3"
                >
                  Solicitar acceso con este pack
                </Button>
                <a
                  href={CAL_30MIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-sm text-center rounded-md text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
                >
                  Hablar con el fundador →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Setup box: lead + bullet list */}
        <div className="mt-10 p-5 sm:p-6 bg-[var(--color-paper)] border border-[var(--color-border)] rounded-xl max-w-2xl">
          <p className="text-sm text-[var(--color-slate)] mb-3">
            <span className="font-semibold text-[var(--color-ink)]">Setup: 50€ (sin IVA).</span>
            {" "}Configuración inicial del sistema, análisis de tu web y
            definición de estrategia.
          </p>
          <ul className="text-sm text-[var(--color-slate)] space-y-1.5 list-disc pl-5 marker:text-[var(--color-warm)]">
            {setupIncludes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-sm text-[var(--color-slate)] max-w-2xl">
          Precios sin impuestos: el IVA u otros impuestos aplicables se añaden
          en factura según el país de tu empresa.
        </p>

        <p className="mt-6 text-sm text-[var(--color-slate)] max-w-2xl">
          ¿Tienes una base de prospectos propia? Puedes usarla directamente.
          El sistema la enriquece y genera los mensajes sobre ella.
        </p>

        <p className="mt-3 text-sm text-[var(--color-slate)] max-w-2xl">
          Beta cerrada, plazas limitadas. Solicita acceso y, si hay hueco,
          entras esta semana; si no, quedas en la lista de espera y te
          avisamos en cuanto se libere una plaza.
        </p>
      </div>
    </section>
  );
}
