"use client";

import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";

const LABELS: Record<string, string> = {es: "ES", en: "EN", fr: "FR"};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname(); // ruta SIN prefijo de locale
  const router = useRouter();

  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="Idioma / Language">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          aria-current={l === locale ? "true" : undefined}
          onClick={() => router.replace(pathname, {locale: l})}
          className={`px-1.5 py-1 rounded text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-1 ${
            l === locale
              ? "text-[var(--color-warm)]"
              : "text-[var(--color-slate-light)] hover:text-[var(--color-ink)]"
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
