import { Button } from "@/components/ui/Button";

const CAL_URL = "https://cal.com/revcognition/demo";

export function CtaFinal() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl">
          <h2 className="font-serif text-3xl sm:text-4xl text-[--color-ink] mb-4">
            ¿Quieres ver cómo funciona con tu negocio?
          </h2>
          <p className="text-[--color-slate] text-lg mb-8">
            En 30 minutos te mostramos cómo quedaría el sistema configurado
            para tu mercado específico.
          </p>
          <Button href={CAL_URL} target="_blank" rel="noopener noreferrer" className="text-base px-8 py-4">
            Reservar una demo gratuita
          </Button>
          <p className="mt-6 text-sm text-[--color-slate-light]">
            ¿Preguntas antes de la demo?{" "}
            <a
              href="mailto:olivier@revcognition.com"
              className="underline decoration-[--color-slate-light] underline-offset-4 hover:text-[--color-ink] transition-colors"
            >
              Escríbeme directamente.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
