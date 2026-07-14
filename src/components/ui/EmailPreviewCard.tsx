"use client";

import {useTranslations} from "next-intl";

export function EmailPreviewCard() {
  const t = useTranslations("hero.emailPreview");
  return (
    <div className="bg-[var(--color-paper-deep)] border border-[var(--color-border)] rounded-xl p-5 shadow-md max-w-sm">
      {/* Leading element warm sustituye al border-l-4 anterior */}
      <div className="flex items-center gap-2 mb-3">
        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[var(--color-warm)]" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-warm)]">
          {t("badge")}
        </span>
      </div>
      <div className="border-b border-[var(--color-border)] pb-3 mb-4 space-y-1">
        <p className="text-xs text-[var(--color-slate)]">
          <span className="font-semibold">{t("fromLabel")}</span>{" "}
          {t("fromValue")}
        </p>
        <p className="text-xs text-[var(--color-slate)]">
          <span className="font-semibold">{t("toLabel")}</span>{" "}
          {t("toValue")}
        </p>
        <p className="text-xs text-[var(--color-slate)]">
          <span className="font-semibold">{t("subjectLabel")}</span>{" "}
          {t("subjectValue")}
        </p>
      </div>

      <div className="space-y-2 text-sm text-[var(--color-slate)] leading-relaxed">
        <p>{t("greeting")}</p>
        <p>{t("body1")}</p>
        <p>{t("body2")}</p>
        <p className="inline-block mt-1 text-xs font-semibold text-[var(--color-warm)] underline underline-offset-2">
          {t("cta")}
        </p>
        <p className="text-[var(--color-slate-light)] text-xs pt-1">
          {t("signoffLine")}<br />{t("signoffName")}
        </p>
      </div>
    </div>
  );
}
