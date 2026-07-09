import { Button } from "@/components/ui/Button";

const APP_URL = "https://app.revcognition.com";
const CAL_URL = "https://cal.com/revcognition/demo";

export function CtaFinal() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl">
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-4">
            Entra en la beta cerrada.
          </h2>
          <p className="text-[var(--color-slate)] text-lg mb-8">
            Estamos abriendo plazas poco a poco para cuidar cada cuenta.
            Solicita acceso y empezamos por analizar tu web y tu mercado.
          </p>
          <Button href={APP_URL} target="_blank" rel="noopener noreferrer" className="text-base px-8 py-4">
            Solicita acceso a la beta
          </Button>
          <p className="mt-6 text-sm text-[var(--color-slate)]">
            ¿Prefieres verlo antes con el fundador?{" "}
            <a
              href="mailto:olivier.serres@revcognition.com"
              className="underline decoration-[var(--color-slate-light)] underline-offset-4 hover:text-[var(--color-ink)] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
            >
              Escríbeme directamente.
            </a>
            {" · "}
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[var(--color-slate-light)] underline-offset-4 hover:text-[var(--color-ink)] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
            >
              Reservar reunión
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
