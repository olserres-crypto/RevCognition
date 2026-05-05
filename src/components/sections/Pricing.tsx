import { Button } from "@/components/ui/Button";

const APP_URL = "https://app.revcognition.com";
const CAL_15MIN_URL = "https://cal.com/olivier-serres-js5hdw/15min";

const packs = [
  {
    prospects: 100,
    price: "100€",
    label: "Para empezar",
    description: "Prueba el sistema con tu primer segmento de mercado.",
    plan: "pack_100",
  },
  {
    prospects: 500,
    price: "500€",
    label: "Para crecer",
    description: "Cubre varios segmentos o mercados en paralelo.",
    featured: true,
    plan: "pack_500",
  },
  {
    prospects: 1000,
    price: "1.000€",
    label: "Para escalar",
    description: "Prospección continua sin tener que recargar constantemente.",
    plan: "pack_1000",
  },
];

export function Pricing() {
  return (
    <section id="precios" className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          Precios
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-4">
          1€ por prospecto. Sin sorpresas.
        </h2>
        <p className="text-[var(--color-slate)] text-lg mb-4 max-w-2xl">
          No pagas por emails. Pagas por un prospecto cualificado que recibe
          hasta 4 mensajes escritos para él. Si contesta antes, el sistema
          se para. Si no, cierra con elegancia.
        </p>
        <p className="text-[var(--color-slate)] text-sm mb-12 max-w-2xl">
          Cada prospecto incluye: identificación, enriquecimiento con señales
          reales y secuencia completa (apertura, seguimiento, nuevo ángulo,
          cierre). También disponible en un solo mensaje si lo prefieres.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {packs.map((pack) => (
            <div
              key={pack.prospects}
              className={`rounded-xl border p-6 flex flex-col gap-4 ${
                pack.featured
                  ? "border-[var(--color-warm)] bg-[color-mix(in_oklch,var(--color-warm)_5%,transparent)] ring-1 ring-[color-mix(in_oklch,var(--color-warm)_20%,transparent)]"
                  : "border-[var(--color-border)] bg-[var(--color-paper)]"
              }`}
            >
              {pack.featured && (
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-warm)]">
                  Más popular
                </span>
              )}
              <div>
                <p className="text-4xl font-semibold text-[var(--color-ink)] tabular-nums">
                  {pack.price}
                </p>
                <p className="text-[var(--color-slate)] text-sm mt-1">
                  {pack.prospects} prospectos cualificados
                </p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-slate)]">
                {pack.label}
              </p>
              <p className="text-[var(--color-slate)] text-sm leading-relaxed flex-1">
                {pack.description}
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant={pack.featured ? "warm-solid" : "ink-solid"}
                  href={`${APP_URL}/?plan=${pack.plan}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-sm py-3"
                >
                  Empezar con este pack
                </Button>
                <a
                  href={CAL_15MIN_URL}
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

        <div className="mt-8 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg inline-block">
          <p className="text-sm text-[var(--color-slate)]">
            <span className="font-semibold text-[var(--color-ink)]">Setup único: 50€.</span>
            {" "}Configuración inicial del sistema, análisis de tu web y definición de estrategia.
            Se paga una sola vez.
          </p>
        </div>

        <p className="mt-4 text-sm text-[var(--color-slate)] max-w-2xl">
          ¿Tienes una base de prospectos propia? Puedes usarla directamente.
          El sistema la enriquece y genera los mensajes sobre ella.
        </p>

        <p className="mt-3 text-xs text-[var(--color-slate-light)] max-w-2xl">
          Sign-up gratis. Pruebas tu ICP y company brain sin coste. El pago
          solo entra cuando eliges dominio de envío.
        </p>
      </div>
    </section>
  );
}
