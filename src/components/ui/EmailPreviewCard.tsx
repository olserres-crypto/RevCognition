export function EmailPreviewCard() {
  return (
    <div className="bg-[var(--color-paper-deep)] border border-[var(--color-border)] rounded-xl p-5 shadow-md max-w-sm">
      {/* Leading element warm sustituye al border-l-4 anterior */}
      <div className="flex items-center gap-2 mb-3">
        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[var(--color-warm)]" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-warm)]">
          Email generado · listo para enviar
        </span>
      </div>
      <div className="border-b border-[var(--color-border)] pb-3 mb-4 space-y-1">
        <p className="text-xs text-[var(--color-slate)]">
          <span className="font-semibold">De:</span>{" "}
          Alex &lt;alex@martinez-asoc.com&gt;
        </p>
        <p className="text-xs text-[var(--color-slate)]">
          <span className="font-semibold">Para:</span>{" "}
          Ana Martínez &lt;a.martinez@gab-marcas.es&gt;
        </p>
        <p className="text-xs text-[var(--color-slate)]">
          <span className="font-semibold">Asunto:</span>{" "}
          Laboratorios Roca, depósito rechazado el 11/04
        </p>
      </div>

      <div className="space-y-2 text-sm text-[var(--color-slate)] leading-relaxed">
        <p>Hola Ana,</p>
        <p>
          El depósito de marca de Laboratorios Roca (clase 5, solicitud 04287391)
          fue rechazado el pasado 11 de abril. El plazo de recurso corre y, en
          nuestra experiencia, el 62&nbsp;% de los titulares aún no tiene abogado
          de PI asignado a estas alturas.
        </p>
        <p>
          Es exactamente el tipo de señal que gabinetes como Martínez &amp; Asoc.
          convierten en cliente antes de que el titular busque en Google.
        </p>
        <a
          href="https://cal.com/revcognition/demo"
          className="inline-block mt-1 text-xs font-semibold text-[var(--color-warm)] underline underline-offset-2 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2 rounded-sm"
        >
          Hablemos 10 minutos esta semana →
        </a>
        <p className="text-[var(--color-slate-light)] text-xs pt-1">
          Un saludo,<br />Alex
        </p>
      </div>
    </div>
  );
}
