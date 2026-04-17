import { Button } from "@/components/ui/Button";
import { EmailPreviewCard } from "@/components/ui/EmailPreviewCard";

const CAL_URL = "https://cal.com/revcognition/demo";

export function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
        {/* Left: copy */}
        <div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink)] leading-tight">
            Nuevos clientes, cada semana.{" "}
            <span className="text-[var(--color-warm)]">Sin agencias.</span>{" "}
            <span className="font-light">Sin perder el tiempo.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[var(--color-slate)] leading-relaxed">
            RevCognition identifica a tus clientes ideales y les escribe un mensaje
            único a cada uno. Tú no escribes nada. No pagas a ninguna agencia.
            Y no tienes que encontrar el tiempo.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href={CAL_URL} target="_blank" rel="noopener noreferrer" className="text-base px-7 py-3.5">
              Quiero una demo
            </Button>
            <Button
              variant="secondary"
              href="#como-funciona"
              className="text-base px-7 py-3.5"
            >
              Ver cómo funciona
            </Button>
          </div>

          <p className="mt-4">
            <a
              href="/analisis"
              className="text-sm text-[var(--color-slate)] underline decoration-[var(--color-slate-light)] underline-offset-4 hover:text-[var(--color-ink)] transition-colors"
            >
              Ver propuesta de ICP para mi negocio →
            </a>
          </p>
        </div>

        {/* Right: email mockup (desktop only) */}
        <EmailPreviewCard />
      </div>
    </section>
  );
}
