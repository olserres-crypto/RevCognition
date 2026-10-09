"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { StatusMark } from "@/components/ui/StatusMark";

type QueueItem = { company: string; subject: string; signal: string };

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fila arrastrable (port minimo de SwipeRow, React Bits Micro): derecha
 * aprueba, izquierda descarta. El gesto nunca es la unica via: los dos botones hacen lo mismo y tienen nombre accesible. El gesto
 * va con pointer events propios (como la maqueta), no con drag de framer-motion.
 */
function SwipeRow({
  item,
  reduce,
  onDecide,
}: {
  item: QueueItem;
  reduce: boolean;
  onDecide: (approved: boolean) => void;
}) {
  const t = useTranslations("howItWorks.mockups.cola");
  const ref = useRef<HTMLDivElement>(null);
  const decided = useRef(false);
  const x = useMotionValue(0);
  const approveOpacity = useTransform(x, [0, 60], [0, 1]);
  const discardOpacity = useTransform(x, [-60, 0], [1, 0]);
  // Oculto en reposo: si no, el color asoma por las esquinas redondeadas.
  const drawerOpacity = useTransform(x, [-1, 0, 1], [1, 0, 1]);
  const drawerBg = useTransform(x, (v) =>
    v >= 0 ? "var(--color-success)" : "var(--color-danger)"
  );

  const drag = useRef<{ x0: number; dx: number } | null>(null);

  const endDrag = () => {
    if (!drag.current) return;
    const { dx } = drag.current;
    drag.current = null;
    const width = ref.current?.offsetWidth ?? 320;
    if (Math.abs(dx) > width * 0.35) decide(dx > 0);
    else animate(x, 0, { duration: reduce ? 0 : 0.35, ease: EASE });
  };

  const decide = (approved: boolean) => {
    if (decided.current) return;
    decided.current = true;
    ref.current?.closest("li")?.setAttribute("data-leaving", "");
    const width = ref.current?.offsetWidth ?? 320;
    animate(x, (approved ? 1 : -1) * width * 1.1, {
      duration: reduce ? 0 : 0.3,
      ease: EASE,
    }).then(() => onDecide(approved));
  };

  return (
    <div className="relative overflow-hidden rounded-[10px]">
      <motion.div
        aria-hidden="true"
        style={{ backgroundColor: drawerBg, opacity: drawerOpacity }}
        className="absolute inset-0 flex items-center justify-between px-4 text-xs font-semibold text-white"
      >
        <motion.span style={{ opacity: approveOpacity }}>✓ {t("approve")}</motion.span>
        <motion.span style={{ opacity: discardOpacity }}>{t("discard")} ✕</motion.span>
      </motion.div>
      <motion.div
        ref={ref}
        onPointerDown={(e) => {
          if (decided.current || (e.target as HTMLElement).closest("button")) return;
          drag.current = { x0: e.clientX, dx: 0 };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          drag.current.dx = e.clientX - drag.current.x0;
          x.set(drag.current.dx);
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{ x, touchAction: "pan-y" }}
        className="relative grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-2.5 gap-y-1 items-center rounded-[10px] border border-[var(--color-border)] bg-[var(--color-paper)] px-3 py-2.5 cursor-grab active:cursor-grabbing select-none"
      >
        <span className="text-xs font-semibold text-[var(--color-ink)]">{item.company}</span>
        <span className="sm:col-start-1 text-[11px] text-[var(--color-slate)] truncate">
          {item.subject}
        </span>
        <span className="sm:col-start-1 text-[10px] text-[var(--color-warm)]">{item.signal}</span>
        <span className="mt-1.5 sm:mt-0 sm:col-start-2 sm:row-start-1 sm:row-span-3 flex gap-1.5">
          <button
            type="button"
            onClick={() => decide(true)}
            aria-label={t("approveAria", { company: item.company })}
            className="min-h-9 px-2.5 rounded-md text-[11px] font-semibold cursor-pointer bg-[var(--color-ink)] text-[var(--color-paper)] border border-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-warm)]"
          >
            {t("approve")}
          </button>
          <button
            type="button"
            onClick={() => decide(false)}
            aria-label={t("discardAria", { company: item.company })}
            className="min-h-9 px-2.5 rounded-md text-[11px] font-semibold cursor-pointer bg-transparent text-[var(--color-slate)] border border-[var(--color-border)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-warm)]"
          >
            {t("discard")}
          </button>
        </span>
      </motion.div>
    </div>
  );
}

/** Cola de aprobacion del paso 3 de «Cómo funciona» (propuesta React Bits 1, B-2228). */
export function ApprovalQueue() {
  const t = useTranslations("howItWorks.mockups.cola");
  const reduce = useReducedMotion() ?? false;
  const items = t.raw("items") as QueueItem[];
  const [left, setLeft] = useState(() => items.map((_, i) => i));
  const [approved, setApproved] = useState(0);
  const [markOn, setMarkOn] = useState(false);
  const done = left.length === 0;
  const listRef = useRef<HTMLUListElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const refocus = useRef(false);

  // Si la decision se tomo con el teclado, el foco no puede caer a <body> al
  // retirarse la fila: pasa a la siguiente fila o, al final, al mensaje.
  useEffect(() => {
    if (!refocus.current) return;
    refocus.current = false;
    const next = listRef.current?.querySelector<HTMLButtonElement>("li:not([data-leaving]) button");
    (next ?? statusRef.current)?.focus();
  }, [left]);

  useEffect(() => {
    if (!done) return;
    const id = setTimeout(() => setMarkOn(true), 40);
    return () => clearTimeout(id);
  }, [done]);

  return (
    <div className="w-full max-w-[420px] rounded-xl overflow-hidden bg-[var(--color-paper-deep)] border border-[var(--color-border)] shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2 px-4 h-11 border-b border-[var(--color-border)]">
        <span aria-hidden="true" className="text-[13px] text-[var(--color-warm)]">✦</span>
        <span className="text-[11px] font-semibold text-[var(--color-ink)]">{t("title")}</span>
        <span className="ml-auto text-[10px] text-[var(--color-slate)]" aria-live="polite">
          <b className="tabular-nums text-[var(--color-warning)]">{left.length}</b> {t("today")}
        </span>
      </div>
      <ul ref={listRef} className="list-none m-0 p-2 grid gap-2">
        <AnimatePresence initial={false}>
          {left.map((i) => (
            <motion.li
              key={i}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <SwipeRow
                item={items[i]}
                reduce={reduce}
                onDecide={(ok) => {
                  refocus.current = !!listRef.current?.contains(document.activeElement);
                  if (ok) setApproved((n) => n + 1);
                  setLeft((l) => l.filter((j) => j !== i));
                }}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {/* La region viva existe desde el principio: si se montara ya con el
          texto, muchos lectores de pantalla no lo anunciarian. */}
      <div ref={statusRef} tabIndex={-1} role="status" className="outline-none">
        {done && (
          <div className="flex items-center gap-2.5 px-3 pt-1 pb-3.5 text-xs text-[var(--color-slate)]">
            <StatusMark on={markOn} />
            <span>{t("done", { count: approved })}</span>
          </div>
        )}
      </div>
      {!done && (
        <p className="px-3.5 pb-2.5 text-[10px] text-[var(--color-slate-light)]">{t("hint")}</p>
      )}
    </div>
  );
}
