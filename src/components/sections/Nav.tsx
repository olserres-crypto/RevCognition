import { Button } from "@/components/ui/Button";

const CAL_URL = "https://cal.com/revcognition/demo";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-paper)]/95 backdrop-blur-sm border-b border-[var(--color-border)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <span className="font-serif text-lg font-normal text-[var(--color-ink)] tracking-tight">
          RevCognition
        </span>

        <div className="hidden sm:flex items-center gap-6 text-sm text-[var(--color-slate)]">
          <a href="#como-funciona" className="hover:text-[var(--color-ink)] transition-colors">
            Cómo funciona
          </a>
          <a href="#precios" className="hover:text-[var(--color-ink)] transition-colors">
            Precios
          </a>
        </div>

        <Button href={CAL_URL} target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-2">
          Quiero una demo
        </Button>
      </div>
    </nav>
  );
}
