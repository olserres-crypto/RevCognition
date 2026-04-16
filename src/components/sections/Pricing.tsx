"use client";

import { useState } from "react";

const CAL_15MIN_URL = "https://cal.com/olivier-serres-js5hdw/15min";

const packs = [
  {
    prospects: 100,
    price: "100€",
    label: "Para empezar",
    description: "Prueba el sistema con tu primer segmento de mercado.",
    productId: "price_pack_100",
  },
  {
    prospects: 500,
    price: "500€",
    label: "Para crecer",
    description: "Cubre varios segmentos o mercados en paralelo.",
    featured: true,
    productId: "price_pack_500",
  },
  {
    prospects: 1000,
    price: "1.000€",
    label: "Para escalar",
    description: "Prospección continua sin tener que recargar constantemente.",
    productId: "price_pack_1000",
  },
];

export function Pricing() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleCheckout(productId: string) {
    setLoadingId(productId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error al iniciar el pago. Inténtalo de nuevo.");
      }
    } catch {
      alert("Error al conectar con el servidor. Inténtalo de nuevo.");
    } finally {
      setLoadingId(null);
    }
  }

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
                  ? "border-[var(--color-warm)] bg-[var(--color-warm)]/5 ring-1 ring-[var(--color-warm)]/20"
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
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-slate-light)]">
                {pack.label}
              </p>
              <p className="text-[var(--color-slate)] text-sm leading-relaxed flex-1">
                {pack.description}
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => handleCheckout(pack.productId)}
                  disabled={loadingId === pack.productId}
                  className={`w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${
                    pack.featured
                      ? "bg-[var(--color-warm)] text-white hover:opacity-90"
                      : "bg-[var(--color-ink)] text-[var(--color-paper)] hover:opacity-90"
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {loadingId === pack.productId ? "Redirigiendo…" : "Contratar este pack"}
                </button>
                <a
                  href={CAL_15MIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-4 text-sm text-center text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors"
                >
                  Hablar con el fundador →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg inline-block">
          <p className="text-sm text-[var(--color-slate)]">
            <span className="font-semibold text-[var(--color-ink)]">Setup único: 50€</span>
            {" — "}Configuración inicial del sistema, análisis de tu web y definición de estrategia.
            Se paga una sola vez.
          </p>
        </div>

        <p className="mt-4 text-sm text-[var(--color-slate-light)] max-w-2xl">
          ¿Tienes una base de prospectos propia? Puedes usarla directamente.
          El sistema la enriquece y genera los mensajes sobre ella.
        </p>
      </div>
    </section>
  );
}
