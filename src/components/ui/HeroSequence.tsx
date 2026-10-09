"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import { StatusMark } from "@/components/ui/StatusMark";
import { cn } from "@/lib/utils";

type Phase = "draft" | "pending" | "pressed" | "approved";

const STATE_COLOR: Record<Phase, string> = {
  draft: "text-[var(--color-warm)]",
  pending: "text-[var(--color-warning)]",
  pressed: "text-[var(--color-warning)]",
  approved: "text-[var(--color-success)]",
};

/**
 * Columna derecha del hero (propuesta React Bits 2, B-2228): señal detectada →
 * el correo se redacta (TextType portado sin gsap: cursor por @keyframes) →
 * pendiente de tu aprobación → aprobado. Una sola vez, sin bucle.
 *
 * El HTML del servidor trae el estado FINAL con el texto completo (buscadores,
 * lectores de pantalla, sin JS); la secuencia solo corre en cliente y no corre
 * con prefers-reduced-motion. El texto visible que crece es aria-hidden: el
 * lector de pantalla lee la copia sr-only completa.
 */
export function HeroSequence() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const body = t("emailPreview.body");
  // null = texto completo (servidor, reduced-motion o secuencia terminada).
  const [typed, setTyped] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("approved");
  // Entrada escalonada de la maqueta: 0 nada, 1 señal, 2 señal + correo.
  const [enter, setEnter] = useState(2);

  useEffect(() => {
    if (reduce !== false) return; // null (aun sin medir) o true: estado final
    const timers: ReturnType<typeof setTimeout>[] = [];
    // Reinicio al estado inicial en un timer, no en el cuerpo del efecto: el
    // contenedor del hero aun esta en opacity 0 (fadeUp), asi que no se ve.
    timers.push(
      setTimeout(() => {
        setTyped(0);
        setPhase("draft");
        setEnter(0);
      }, 0)
    );
    timers.push(setTimeout(() => setEnter(1), 150));
    timers.push(setTimeout(() => setEnter(2), 600));
    let i = 0;
    const tick = () => {
      i = Math.min(body.length, i + 2);
      setTyped(i);
      if (i < body.length) {
        timers.push(setTimeout(tick, 18));
        return;
      }
      setTyped(null);
      timers.push(setTimeout(() => setPhase("pending"), 250));
      timers.push(setTimeout(() => setPhase("pressed"), 1700));
      timers.push(setTimeout(() => setPhase("approved"), 1900));
    };
    timers.push(setTimeout(tick, 1100));
    return () => timers.forEach(clearTimeout);
  }, [reduce, body]);

  const typing = typed !== null;
  const enterClass = (n: number) =>
    cn(
      "transition-[opacity,translate] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
      enter >= n ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
    );
  const barVisible = !typing && phase !== "draft";
  const stateLabel =
    phase === "draft"
      ? t("emailPreview.stateDraft")
      : phase === "approved"
        ? t("emailPreview.stateApproved")
        : t("emailPreview.statePending");

  return (
    <>
      <div className={cn(enterClass(1), "flex items-center gap-3 px-4 py-3 rounded-xl select-none max-w-sm bg-[color-mix(in_oklch,var(--color-warm)_5%,transparent)] border border-[color-mix(in_oklch,var(--color-warm)_18%,transparent)]")}>
        <span aria-hidden="true" className="text-[15px]">⚡</span>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold text-[var(--color-warm)] mb-0.5">{t("signalCard.detected")}</div>
          <div className="text-[10px] text-[var(--color-slate-light)]">{t("signalCard.example")}</div>
        </div>
        <span className="shrink-0 text-[10px] text-[var(--color-slate-light)]">{t("signalCard.label")}</span>
      </div>

      <div className={cn(enterClass(2), "bg-[var(--color-paper-deep)] border border-[var(--color-border)] rounded-xl p-5 shadow-md max-w-sm")}>
        <div
          className={cn(
            "flex items-center gap-2 mb-3 text-[10px] font-semibold uppercase tracking-widest transition-colors duration-300",
            STATE_COLOR[phase]
          )}
        >
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-current" />
          <span>{stateLabel}</span>
        </div>
        <div className="border-b border-[var(--color-border)] pb-3 mb-4 space-y-1">
          <p className="text-xs text-[var(--color-slate)]">
            <span className="font-semibold">{t("emailPreview.fromLabel")}</span> {t("emailPreview.fromValue")}
          </p>
          <p className="text-xs text-[var(--color-slate)]">
            <span className="font-semibold">{t("emailPreview.toLabel")}</span> {t("emailPreview.toValue")}
          </p>
          <p className="text-xs text-[var(--color-slate)]">
            <span className="font-semibold">{t("emailPreview.subjectLabel")}</span> {t("emailPreview.subjectValue")}
          </p>
        </div>

        <div className="space-y-2 text-sm text-[var(--color-slate)] leading-relaxed">
          <p>{t("emailPreview.greeting")}</p>
          <p aria-hidden="true">
            {typed === null ? body : body.slice(0, typed)}
            {typing && <span className="type-caret" />}
          </p>
          <p className="sr-only">{body}</p>
        </div>

        <div
          className={cn(
            "flex items-center justify-between gap-2.5 border-t border-[var(--color-border)] mt-3 pt-3 min-h-11 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            barVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
          )}
        >
          <span className="text-[11px] text-[var(--color-slate-light)]">
            {phase === "approved" ? t("emailPreview.approvedAt") : t("emailPreview.approveHint")}
          </span>
          <span className="flex items-center gap-2">
            <StatusMark on={phase === "approved"} />
            {phase !== "approved" && (
              <span
                aria-hidden="true"
                className={cn(
                  "text-xs font-semibold rounded-md px-3 py-[7px] border border-[var(--color-ink)] text-[var(--color-paper)]",
                  phase === "pressed" ? "bg-[var(--color-slate)]" : "bg-[var(--color-ink)]"
                )}
              >
                {t("emailPreview.approve")}
              </span>
            )}
          </span>
        </div>
      </div>
    </>
  );
}
