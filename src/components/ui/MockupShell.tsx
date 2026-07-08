import type { ReactNode } from "react";

/**
 * Editorial UI mockup shell — the framed "screenshot" language used across the
 * site (HowItWorks steps, /producto theme blocks). Deliberately NOT a macOS
 * window (no traffic-light dots — prohibited by PRODUCT.md). Fake data only.
 */
export function MockupShell({
  icon,
  title,
  meta,
  children,
}: {
  icon: string;
  title: string;
  meta?: { text: string; tone?: "muted" | "success" };
  children: ReactNode;
}) {
  const metaTone =
    meta?.tone === "success"
      ? "text-[var(--color-success)] font-medium"
      : "text-[var(--color-slate-light)]";
  return (
    <div className="w-[280px] rounded-xl overflow-hidden select-none bg-[var(--color-paper-deep)] border border-[var(--color-border)] shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2 px-4 h-11 border-b border-[var(--color-border)]">
        <span aria-hidden="true" className="text-[13px] text-[var(--color-warm)]">{icon}</span>
        <span className="text-[11px] font-semibold text-[var(--color-ink)]">{title}</span>
        {meta && (
          <span className={`ml-auto text-[10px] ${metaTone}`}>{meta.text}</span>
        )}
      </div>
      {children}
    </div>
  );
}

export function MockupRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-medium text-[var(--color-slate)] uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="flex items-center h-8 px-3 rounded-lg border border-[var(--color-border)] text-xs text-[var(--color-ink)]">
        {value}
      </div>
    </div>
  );
}
