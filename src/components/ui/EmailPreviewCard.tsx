export function EmailPreviewCard() {
  return (
    <div className="hidden lg:block">
      <div className="bg-white border border-[var(--color-border)] border-l-4 border-l-[var(--color-warm)] rounded-xl p-5 shadow-md max-w-sm">
        {/* Email client chrome */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
        </div>

        {/* Email header */}
        <div className="border-b border-[var(--color-border)] pb-3 mb-3 space-y-1">
          <p className="text-xs text-[var(--color-slate-light)]">
            <span className="font-semibold text-[var(--color-slate)]">Para:</span>{" "}
            Ana Martínez &lt;a.martinez@gab-marcas.es&gt;
          </p>
          <p className="text-xs text-[var(--color-slate-light)]">
            <span className="font-semibold text-[var(--color-slate)]">Asunto:</span>{" "}
            El depósito de Laboratorios Roca — una idea rápida
          </p>
        </div>

        {/* Email body */}
        <div className="space-y-2 text-sm text-[var(--color-slate)] leading-relaxed">
          <p>Hola Ana,</p>
          <p>
            Vi que Laboratorios Roca tuvo un depósito de marca rechazado la
            semana pasada. En casos así, el plazo para actuar es corto.
          </p>
          <p>
            Trabajamos con gabinetes como el tuyo que usan esa señal para
            llegar antes que nadie. ¿Tiene sentido hablar 15 minutos?
          </p>
          <p className="text-[var(--color-slate-light)] text-xs pt-1">
            — Generado por{" "}
            <span style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.02em" }}>
              <span style={{ fontWeight: 300, color: "var(--color-warm)" }}>Rev</span><span style={{ fontWeight: 500 }}>Cognition</span>
            </span>
            {" "}para Gab. Martínez & Asoc.
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
