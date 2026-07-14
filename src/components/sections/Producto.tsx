"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { MockupShell, MockupRow } from "@/components/ui/MockupShell";

/* ---------- Mockups (datos ficticios .example) ---------- */

function MockupWizard() {
  const t = useTranslations("producto.mockups.wizard");
  const remitentes = t.raw("senders") as { name: string; role: string }[];
  return (
    <MockupShell icon="✦" title={t("title")} meta={{ text: t("metaText") }}>
      <div className="p-4 flex flex-col gap-3">
        <MockupRow label={t("domainLabel")} value={t("domainValue")} />
        <div>
          <div className="text-[10px] font-medium text-[var(--color-slate)] uppercase tracking-wider mb-1.5">
            {t("sendersHeading")}
          </div>
          <div className="flex flex-col gap-1.5">
            {remitentes.map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between h-8 px-3 rounded-lg border border-[var(--color-border)]"
              >
                <span className="text-[11px] font-medium text-[var(--color-ink)]">{r.name}</span>
                <span className="text-[10px] text-[var(--color-slate)]">{r.role}</span>
              </div>
            ))}
            <div className="text-[10px] text-[var(--color-slate-light)] pl-1">{t("moreSenders")}</div>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

function MockupAprobacion() {
  const t = useTranslations("producto.mockups.aprobacion");
  return (
    <MockupShell icon="✦" title={t("title")} meta={{ text: t("metaText") }}>
      <div className="p-4 flex flex-col gap-3">
        <div className="text-[10px] text-[var(--color-slate)]">
          <span className="font-semibold">{t("toLabel")}</span> {t("toValue")}
        </div>
        <div className="text-[10px] text-[var(--color-slate)]">
          <span className="font-semibold">{t("subjectLabel")}</span> {t("subjectValue")}
        </div>
        <div className="text-[11px] text-[var(--color-slate)] leading-relaxed border-t border-[var(--color-border)] pt-2.5">
          {t("body")}
        </div>
        <div className="flex items-center gap-2 pt-1">
          <span className="flex-1 h-8 rounded-lg bg-[var(--color-warm)] text-white text-[11px] font-semibold flex items-center justify-center">
            {t("approve")}
          </span>
          <span className="flex-1 h-8 rounded-lg border border-[var(--color-border)] text-[var(--color-slate)] text-[11px] font-semibold flex items-center justify-center">
            {t("discard")}
          </span>
        </div>
      </div>
    </MockupShell>
  );
}

function MockupSecuencia() {
  const t = useTranslations("producto.mockups.secuencia");
  const pasos = t.raw("steps") as { day: string; name: string }[];
  return (
    <MockupShell icon="✦" title={t("title")} meta={{ text: t("metaText") }}>
      <div className="p-4 flex flex-col">
        {pasos.map((p, i) => (
          <div key={p.day} className="flex gap-3">
            <div className="flex flex-col items-center shrink-0">
              <span className="w-2 h-2 rounded-full bg-[var(--color-warm)] mt-1" aria-hidden="true" />
              {i < pasos.length - 1 && (
                <span className="flex-1 w-px bg-[var(--color-border)] my-1" aria-hidden="true" />
              )}
            </div>
            <div className={i < pasos.length - 1 ? "pb-3" : ""}>
              <div className="text-[11px] font-semibold text-[var(--color-ink)]">{p.name}</div>
              <div className="text-[10px] text-[var(--color-slate-light)]">{p.day}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4 flex flex-col gap-3 border-t border-[var(--color-border)] pt-3">
        <MockupRow label={t("signalLabel")} value={t("signalValue")} />
        <div className="text-[11px] text-[var(--color-slate)] leading-relaxed">{t("body")}</div>
      </div>
    </MockupShell>
  );
}

function MockupRamp() {
  const t = useTranslations("producto.mockups.ramp");
  const semanas = t.raw("weeks") as { label: string; value: string }[];
  return (
    <MockupShell icon="✦" title={t("title")} meta={{ text: t("metaText"), tone: "success" }}>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-col">
          {semanas.map((w, i) => (
            <div
              key={w.label}
              className={`flex items-center justify-between py-2 ${i < semanas.length - 1 ? "border-b border-[var(--color-border)]" : ""}`}
            >
              <span className="text-[10px] font-medium text-[var(--color-slate)] uppercase tracking-wider">{w.label}</span>
              <span className="text-[11px] font-medium text-[var(--color-ink)] tabular-nums">{w.value}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-success-tint)]">
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
          <span className="text-[10px] font-medium text-[var(--color-success)]">
            {t("statusLabel")}
          </span>
        </div>
      </div>
    </MockupShell>
  );
}

/* ---------- Bloque temático ---------- */

type Feature = { title: string; body: string };

function ThemeBlock({
  id,
  band,
  eyebrow,
  title,
  intro,
  depth,
  oneLiners,
  mockup,
  reduce,
}: {
  id: string;
  band: "paper" | "surface";
  eyebrow: string;
  title: string;
  intro: string;
  depth: Feature[];
  oneLiners: Feature[];
  mockup: React.ReactNode;
  reduce: boolean | null;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 md:scroll-mt-32 py-16 sm:py-24 ${band === "surface" ? "bg-[var(--color-surface)]" : ""}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-4">{title}</h2>
        <p className="text-[var(--color-slate)] text-lg mb-12 max-w-xl">{intro}</p>

        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-8">
              {depth.map((f) => (
                <motion.div
                  key={f.title}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <h3 className="font-serif text-xl text-[var(--color-ink)] mb-2">{f.title}</h3>
                  <p className="text-[var(--color-slate)] leading-relaxed max-w-xl">{f.body}</p>
                </motion.div>
              ))}
            </div>

            {oneLiners.length > 0 && (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                {oneLiners.map((f) => (
                  <div key={f.title} className="border-t border-[var(--color-border)] py-4">
                    <p className="font-semibold text-[var(--color-ink)] text-sm mb-1">{f.title}</p>
                    <p className="text-[var(--color-slate)] text-sm leading-relaxed">{f.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.12, duration: 0.4, ease: "easeOut" }}
            className="hidden lg:block shrink-0 mt-2"
          >
            {mockup}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function Faq({ reduce }: { reduce: boolean | null }) {
  const t = useTranslations("producto.faq");
  const faqs = t.raw("items") as { q: string; a: string }[];
  return (
    <section id="faq" className="scroll-mt-20 md:scroll-mt-32 py-16 sm:py-24 bg-[var(--color-surface)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          {t("eyebrow")}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-12">
          {t("heading")}
        </h2>
        <div className="max-w-3xl divide-y divide-[var(--color-border)]">
          {faqs.map((f, i) => (
            <motion.div
              key={f.q}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 2) * 0.05, duration: 0.35, ease: "easeOut" }}
              className="py-6"
            >
              <h3 className="font-serif text-xl text-[var(--color-ink)] mb-2">{f.q}</h3>
              <p className="text-[var(--color-slate)] leading-relaxed">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Página ---------- */

export function Producto() {
  const t = useTranslations("producto");
  const reduce = useReducedMotion();

  const sections = [
    { id: "setup", label: t("nav.sections.setup") },
    { id: "dia-a-dia", label: t("nav.sections.diaADia") },
    { id: "motor", label: t("nav.sections.motor") },
    { id: "entregabilidad", label: t("nav.sections.entregabilidad") },
    { id: "faq", label: t("nav.sections.faq") },
  ];

  const setup = {
    depth: t.raw("setup.depth") as Feature[],
    oneLiners: t.raw("setup.oneLiners") as Feature[],
  };
  const diaADia = {
    depth: t.raw("diaADia.depth") as Feature[],
    oneLiners: t.raw("diaADia.oneLiners") as Feature[],
  };
  const motor = {
    depth: t.raw("motor.depth") as Feature[],
    oneLiners: t.raw("motor.oneLiners") as Feature[],
  };
  const entregabilidad = {
    depth: t.raw("entregabilidad.depth") as Feature[],
    oneLiners: t.raw("entregabilidad.oneLiners") as Feature[],
  };

  return (
    <>
      {/* Hero de página */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-10 sm:pt-24 sm:pb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
          {t("hero.eyebrow")}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[var(--color-ink)] leading-tight max-w-3xl">
          {t("hero.heading1")}{" "}
          <span className="font-light">{t("hero.heading2")}</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-[var(--color-slate)] leading-relaxed max-w-2xl">
          {t("hero.subtitle")}
        </p>

        {/* Nav in-page: plano en móvil */}
        <nav aria-label={t("nav.ariaLabel")} className="mt-8 flex flex-wrap gap-x-5 gap-y-2 md:hidden">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm font-medium text-[var(--color-warm)] hover:text-[var(--color-warm-hover)] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </section>

      {/* Nav de píldoras sticky: solo desktop */}
      <div className="hidden md:block sticky top-14 z-40 bg-[var(--color-paper)]/95 backdrop-blur-sm border-y border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <nav aria-label={t("nav.ariaLabel")} className="flex items-center gap-2 h-12 overflow-x-auto">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="whitespace-nowrap px-3 py-1.5 rounded-full text-sm text-[var(--color-slate)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <ThemeBlock
        id="setup"
        band="surface"
        eyebrow={t("setup.eyebrow")}
        title={t("setup.title")}
        intro={t("setup.intro")}
        reduce={reduce}
        depth={setup.depth}
        oneLiners={setup.oneLiners}
        mockup={<MockupWizard />}
      />

      <ThemeBlock
        id="dia-a-dia"
        band="paper"
        eyebrow={t("diaADia.eyebrow")}
        title={t("diaADia.title")}
        intro={t("diaADia.intro")}
        reduce={reduce}
        depth={diaADia.depth}
        oneLiners={diaADia.oneLiners}
        mockup={<MockupAprobacion />}
      />

      <ThemeBlock
        id="motor"
        band="surface"
        eyebrow={t("motor.eyebrow")}
        title={t("motor.title")}
        intro={t("motor.intro")}
        reduce={reduce}
        depth={motor.depth}
        oneLiners={motor.oneLiners}
        mockup={<MockupSecuencia />}
      />

      <ThemeBlock
        id="entregabilidad"
        band="paper"
        eyebrow={t("entregabilidad.eyebrow")}
        title={t("entregabilidad.title")}
        intro={t("entregabilidad.intro")}
        reduce={reduce}
        depth={entregabilidad.depth}
        oneLiners={entregabilidad.oneLiners}
        mockup={<MockupRamp />}
      />

      <Faq reduce={reduce} />
    </>
  );
}
