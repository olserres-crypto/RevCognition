"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

const APP_URL = "https://app.revcognition.com";

const navLinks = [
  { href: "/#como-funciona", key: "comoFunciona" },
  { href: "/producto", key: "producto" },
  { href: "/#precios", key: "precios" },
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Mover el foco al drawer al abrir; devolverlo al disparador al cerrar.
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[var(--color-paper)]/95 border-b border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link
            href="/"
            aria-label={t("home")}
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
          >
            <Logo size="nav" />
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-sm text-[var(--color-slate)]">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 rounded-md hover:text-[var(--color-ink)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
              >
                {t(l.key)}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-1">
            <Button
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2.5"
            >
              {t("accederApp")}
            </Button>

            <button
              ref={triggerRef}
              type="button"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
              onClick={() => setOpen((v) => !v)}
              className="sm:hidden ml-1 inline-flex items-center justify-center w-11 h-11 rounded-md text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                {open ? (
                  <>
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-[var(--color-ink)]/30 sm:hidden"
              aria-hidden="true"
            />
            <motion.div
              id="mobile-nav-drawer"
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label={t("mainMenu")}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80%] max-w-sm bg-[var(--color-paper)] border-l border-[var(--color-border)] flex flex-col sm:hidden"
            >
              <div className="flex items-center justify-between h-14 px-4 border-b border-[var(--color-border)]">
                <Link
                  href="/"
                  aria-label={t("home")}
                  onClick={() => setOpen(false)}
                  className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
                >
                  <Logo size="nav" />
                </Link>
                <button
                  ref={closeBtnRef}
                  type="button"
                  aria-label={t("closeMenu")}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-md text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block font-serif text-2xl text-[var(--color-ink)] py-3 hover:text-[var(--color-warm)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2 rounded-md"
                      >
                        {t(l.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-4 border-t border-[var(--color-border)] flex flex-col gap-4">
                <LanguageSwitcher />
                <Button
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  {t("accederApp")}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
