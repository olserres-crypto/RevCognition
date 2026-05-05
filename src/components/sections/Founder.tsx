export function Founder() {
  return (
    <section className="bg-[var(--color-surface)] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
            Por qué existe esto
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-6">
            Veinte años en marketing automation. Ninguna herramienta para el fundador solo.
          </h2>
          <div className="space-y-4 text-[var(--color-slate)] leading-relaxed">
            <p>
              Llevo veinte años trabajando en marketing automation, viendo
              de cerca cómo las grandes empresas gestionan su captación.
              Y también las herramientas que existían para los demás.
            </p>
            <p>
              La mayoría te piden que seas técnico, que escribas los mensajes,
              que gestiones las secuencias a mano, o que confíes ciegamente
              en una agencia que no entiende tu negocio. Ninguna de las dos
              opciones era aceptable para un fundador con poco tiempo y mucho
              que demostrar.
            </p>
          </div>
        </div>

        {/* Cierre — punto de extrañeza tipográfico (display + light, sale del max-w-2xl) */}
        <p className="mt-12 font-serif font-light text-3xl sm:text-5xl lg:text-6xl text-[var(--color-ink)] leading-[1.05] tracking-tight max-w-3xl">
          RevCognition es lo que{" "}
          <span className="italic text-[var(--color-warm)]">yo</span>{" "}
          habría querido tener.
        </p>
      </div>
    </section>
  );
}
