import { Button } from "@/components/ui/Button";

const CAL_URL = "https://cal.com/revcognition/demo";

export function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="max-w-3xl">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[--color-ink] leading-tight">
          Nuevos clientes, cada semana.{" "}
          <span className="text-[--color-warm]">Sin agencias.</span>{" "}
          Sin perder el tiempo.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[--color-slate] leading-relaxed max-w-2xl">
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
      </div>
    </section>
  );
}
