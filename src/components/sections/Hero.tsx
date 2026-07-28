"use client";

import {useTranslations} from "next-intl";
import {motion, useReducedMotion, type Variants} from "framer-motion";
import {Button} from "@/components/ui/Button";
import {EmailPreviewCard} from "@/components/ui/EmailPreviewCard";

const fadeUp: Variants = {
  hidden: {opacity: 0, y: 14},
  show: (delay: number) => ({
    opacity: 1, y: 0,
    transition: {duration: 0.45, ease: "easeOut", delay},
  }),
};

function SignalCard() {
  const t = useTranslations("hero.signalCard");
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl select-none max-w-sm bg-[color-mix(in_oklch,var(--color-warm)_5%,transparent)] border border-[color-mix(in_oklch,var(--color-warm)_18%,transparent)]">
      <span aria-hidden="true" className="text-[15px]">⚡</span>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-semibold text-[var(--color-warm)] mb-0.5">{t("detected")}</div>
        <div className="text-[10px] text-[var(--color-slate-light)]">{t("example")}</div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
        <span className="text-[10px] text-[var(--color-slate-light)]">{t("live")}</span>
      </div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
        <div>
          <motion.h1
            variants={fadeUp} initial={reduce ? false : "hidden"} animate="show" custom={0}
            className="text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink)] leading-tight"
          >
            {t("line1")}{" "}
            <span className="text-[var(--color-warm)]">{t("line1Accent")}</span>{" "}
            <span className="block font-light">{t("line2")}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial={reduce ? false : "hidden"} animate="show" custom={0.1}
            className="mt-6 text-lg sm:text-xl text-[var(--color-slate)] leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={fadeUp} initial={reduce ? false : "hidden"} animate="show" custom={0.2}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Button href="https://app.revcognition.com/" target="_blank" rel="noopener noreferrer" className="text-base px-7 py-3.5">
              {t("ctaPrimary")}
            </Button>
            <Button variant="secondary" href="#como-funciona" className="text-base px-7 py-3.5">
              {t("ctaSecondary")}
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp} initial={reduce ? false : "hidden"} animate="show" custom={0.28}
            className="mt-4 text-sm text-[var(--color-slate)] leading-relaxed max-w-sm"
          >
            {t("note")}
          </motion.p>
        </div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.35} className="hidden lg:flex flex-col gap-3">
          <SignalCard />
          <EmailPreviewCard />
        </motion.div>
      </div>
    </section>
  );
}
