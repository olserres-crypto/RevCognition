const packs = [
  {
    prospects: 100,
    price: "100€",
    label: "Para empezar",
    description: "Prueba el sistema con tu primer segmento de mercado.",
  },
  {
    prospects: 500,
    price: "500€",
    label: "Para crecer",
    description: "Cubre varios segmentos o mercados en paralelo.",
    featured: true,
  },
  {
    prospects: 1000,
    price: "1.000€",
    label: "Para escalar",
    description: "Prospección continua sin tener que recargar constantemente.",
  },
];

export function Pricing() {
  return (
    <section id="precios" className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[--color-warm] mb-4">
          Precios
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[--color-ink] mb-4">
          1€ por prospecto. Sin sorpresas.
        </h2>
        <p className="text-[--color-slate] text-lg mb-4 max-w-2xl">
          No pagas por emails. Pagas por un prospecto cualificado que recibe
          hasta 4 mensajes escritos para él. Si contesta antes, el sistema
          se para. Si no, cierra con elegancia.
        </p>
        <p className="text-[--color-slate] text-sm mb-12 max-w-2xl">
          Cada prospecto incluye: identificación + enriquecimiento con señales
          reales + secuencia completa (apertura, seguimiento, nuevo ángulo,
          cierre). También disponible en un solo mensaje si lo prefieres.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {packs.map((pack) => (
            <div
              key={pack.prospects}
              className={`rounded-xl border p-6 flex flex-col gap-4 ${
                pack.featured
                  ? "border-[--color-warm] bg-[--color-warm]/5 ring-1 ring-[--color-warm]/20"
                  : "border-[--color-border] bg-[--color-paper]"
              }`}
            >
              {pack.featured && (
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[--color-warm]">
                  Más popular
                </span>
              )}
              <div>
                <p className="text-4xl font-semibold text-[--color-ink] tabular-nums">
                  {pack.price}
                </p>
                <p className="text-[--color-slate] text-sm mt-1">
                  {pack.prospects} prospectos cualificados
                </p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--color-slate-light]">
                {pack.label}
              </p>
              <p className="text-[--color-slate] text-sm leading-relaxed">
                {pack.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-[--color-slate-light] max-w-2xl">
          ¿Tienes una base de prospectos propia? Puedes usarla directamente.
          El sistema la enriquece y genera los mensajes sobre ella.
        </p>
      </div>
    </section>
  );
}
