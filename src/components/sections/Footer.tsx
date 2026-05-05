import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[var(--color-slate-light)]">
        <span className="flex items-baseline gap-1.5">
          <Logo size="nav" className="opacity-70" />
          <span>© 2026</span>
        </span>
        <div className="flex items-center gap-2">
          <a
            href="/privacy"
            className="px-2 py-2 rounded-md hover:text-[var(--color-ink)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
          >
            Política de privacidad
          </a>
          <a
            href="mailto:olivier.serres@revcognition.com?subject=Baja%20de%20comunicaciones"
            className="px-2 py-2 rounded-md hover:text-[var(--color-ink)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
          >
            Unsubscribe
          </a>
        </div>
      </div>
    </footer>
  );
}
