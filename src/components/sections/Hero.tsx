"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { EmailPreviewCard } from "@/components/ui/EmailPreviewCard";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay },
  }),
};

function SignalCard() {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl select-none max-w-sm"
      style={{
        background: "rgba(99,102,241,0.05)",
        border: "0.5px solid rgba(99,102,241,0.18)",
      }}
    >
      <span style={{ fontSize: 15 }}>⚡</span>
      <div className="flex-1 min-w-0">
        <div style={{ fontSize: 11, fontWeight: 590, color: "var(--color-warm)", marginBottom: 2 }}>
          Señal detectada · hace 3 horas
        </div>
        <div style={{ fontSize: 10, color: "#8a8f98" }}>
          Laboratorios Roca · Depósito OEPM rechazado · clase 5 · 04287391
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span style={{ fontSize: 10, color: "#8a8f98" }}>En vivo</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">

        {/* Left: copy — stagger editorial */}
        <div>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink)] leading-tight"
          >
            Nuevos clientes, cada semana.{" "}
            <span className="text-[var(--color-warm)]">Sin agencias.</span>{" "}
            <span className="font-light">Sin perder el tiempo.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="mt-6 text-lg sm:text-xl text-[var(--color-slate)] leading-relaxed"
          >
            RevCognition identifica a tus clientes ideales y les escribe un mensaje
            único a cada uno. Tú no escribes nada. No pagas a ninguna agencia.
            Y no tienes que encontrar el tiempo.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Button href="/analisis" className="text-base px-7 py-3.5">
              Prueba gratuitamente una estrategia de prospección
            </Button>
            <Button
              variant="secondary"
              href="#como-funciona"
              className="text-base px-7 py-3.5"
            >
              Ver cómo funciona
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.28}
            className="mt-4 text-sm text-[var(--color-slate-light)] leading-relaxed max-w-sm"
          >
            Analizamos tu web y te preparamos una propuesta de ICP y estrategia
            de captación personalizada. Sin coste. Sin compromiso.
          </motion.p>
        </div>

        {/* Right: señal + email — entra ligeramente después */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.35}
          className="hidden lg:flex flex-col gap-3"
        >
          <SignalCard />
          <EmailPreviewCard />
        </motion.div>

      </div>
    </section>
  );
}
