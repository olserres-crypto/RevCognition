export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[var(--color-slate-light)]">
        <span>RevCognition © 2026</span>
        <div className="flex items-center gap-6">
          <a href="/privacy" className="hover:text-[var(--color-ink)] transition-colors">
            Política de privacidad
          </a>
          <a href="/unsubscribe" className="hover:text-[var(--color-ink)] transition-colors">
            Unsubscribe
          </a>
        </div>
      </div>
    </footer>
  );
}
