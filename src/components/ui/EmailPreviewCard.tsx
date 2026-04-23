export function EmailPreviewCard() {
  return (
    <div className="hidden lg:block">
      <div className="bg-white border border-[var(--color-border)] border-l-4 border-l-[var(--color-warm)] rounded-xl p-5 shadow-md max-w-sm">
        <div className="border-b border-[var(--color-border)] pb-3 mb-4 space-y-1">
          <p className="text-xs text-[var(--color-slate-light)]">
            <span className="font-semibold text-[var(--color-slate)]">De:</span>{" "}
            Alex &lt;alex@martinez-asoc.com&gt;
          </p>
          <p className="text-xs text-[var(--color-slate-light)]">
            <span className="font-semibold text-[var(--color-slate)]">Para:</span>{" "}
            Ana Martínez &lt;a.martinez@gab-marcas.es&gt;
          </p>
          <p className="text-xs text-[var(--color-slate-light)]">
            <span className="font-semibold text-[var(--color-slate)]">Asunto:</span>{" "}
            Laboratorios Roca — depósito rechazado el 11/04
          </p>
        </div>

        {/* Email body */}
        <div className="space-y-2 text-sm text-[var(--color-slate)] leading-relaxed">
          <p>Hola Ana,</p>
          <p>
            El depósito de marca de Laboratorios Roca (clase 5, solicitud 04287391)
            fue rechazado el pasado 11 de abril. El plazo de recurso corre y, en
            nuestra experiencia, el 62&nbsp;% de los titulares aún no tiene abogado
            de PI asignado a estas alturas.
          </p>
          <p>
            Es exactamente el tipo de señal que gabinetes como Martínez & Asoc.
            convierten en cliente antes de que el titular busque en Google.
          </p>
          <a
            href="https://cal.com/revcognition/demo"
            className="inline-block mt-1 text-xs font-semibold text-[var(--color-warm)] underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Hablemos 10 minutos esta semana →
          </a>
          <p className="text-[var(--color-slate-light)] text-xs pt-1">
            Un saludo,<br />Alex
          </p>
        </div>
      </div>

      {/* Label below card */}
      <p className="mt-3 text-xs text-[var(--color-slate-light)] text-center">
        Generado en segundos · Escrito para este prospecto
      </p>
    </div>
  );
}
