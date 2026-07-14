"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-[var(--color-border)] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[var(--color-slate)]">
        <span className="flex items-baseline gap-1.5">
          <Logo size="nav" className="opacity-70" />
          <span>{t("copyright")}</span>
        </span>
        <div className="flex items-center gap-2">
          <Link
            href="/soluciones/servicios-b2b"
            className="px-2 py-2 rounded-md hover:text-[var(--color-ink)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
          >
            {t("solutions")}
          </Link>
          <Link
            href="/privacy"
            className="px-2 py-2 rounded-md hover:text-[var(--color-ink)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
          >
            {t("privacy")}
          </Link>
          <a
            href="mailto:olivier.serres@revcognition.com?subject=Baja%20de%20comunicaciones"
            className="px-2 py-2 rounded-md hover:text-[var(--color-ink)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
          >
            {t("unsubscribe")}
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
