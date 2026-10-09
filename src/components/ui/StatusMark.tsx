import { cn } from "@/lib/utils";

/**
 * Check que se dibuja (circulo + palomita) al pasar de pending a done.
 * Port minimo de StatusMark (React Bits, Micro): solo los estados que usa la
 * home. La animacion es CSS (.status-mark en globals.css) y respeta
 * prefers-reduced-motion alli.
 */
export function StatusMark({ on, className }: { on: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("status-mark w-[22px] h-[22px] shrink-0", on && "is-on", className)}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M7.5 12.5l3 3 6-6.5" />
    </svg>
  );
}
