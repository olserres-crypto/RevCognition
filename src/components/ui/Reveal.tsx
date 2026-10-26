"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, inView } from "framer-motion";

/**
 * B-2463: entrada al hacer scroll que sale VISIBLE del servidor. Sustituye a
 * `motion.* initial={{opacity:0}} whileInView`, que pintaba `style="opacity:0"`
 * en el HTML: sin JS (buscadores, previews, JS bloqueado o fallo de
 * hidratacion) las secciones bajo el pliegue quedaban en blanco.
 *
 * Mismo patron que B-2447 (HeroSequence): el HTML trae el estado final y la
 * animacion solo corre en cliente, sin prefers-reduced-motion y solo si el
 * elemento sigue fuera de pantalla (por debajo) al hidratar: ocultarlo ahi no
 * se ve, y lo que ya esta a la vista no parpadea. Lo protege
 * `npm run check:hero-ssr` (ningun `opacity:0` en el HTML servido).
 */
export function Reveal({
  as: Tag = "div",
  x = 0,
  y = 0,
  delay = 0,
  duration = 0.35,
  className,
  children,
}: {
  as?: "div" | "li";
  x?: number;
  y?: number;
  delay?: number;
  duration?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    animate(el, { opacity: 0, x, y }, { duration: 0 });
    const stop = inView(
      el,
      () => {
        animate(el, { opacity: 1, x: 0, y: 0 }, { delay, duration, ease: "easeOut" });
      },
      { margin: "-40px" }
    );
    return () => {
      stop();
      // Si el efecto se desmonta antes de entrar en pantalla (StrictMode, cambio
      // de props), el elemento no puede quedarse oculto.
      animate(el, { opacity: 1, x: 0, y: 0 }, { duration: 0 });
    };
  }, [x, y, delay, duration]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
