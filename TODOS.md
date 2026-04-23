# TODOS

Design system y a11y pendientes. Ordenados por prioridad. Estimaciones son para un dev que conoce el stack.

## A11y

- [ ] **Respetar `prefers-reduced-motion` en framer-motion.** Envolver todos los `motion.div` con `useReducedMotion()` y desactivar `initial`/`whileInView` cuando devuelve `true`. Archivos: `src/components/sections/Problem.tsx:43-50`, `src/components/sections/HowItWorks.tsx:42-48`. Est: 30 min.

- [ ] **Skip-to-content link** en `src/app/layout.tsx`. Link oculto con `sr-only`, visible al foco teclado, salta a `<main id="main">`. Requiere añadir `id="main"` en `src/app/page.tsx:16`. Est: 15 min.

- [ ] **Verificar contraste de `slate-light` sobre `paper`.** Ratio actual ~4.1:1, falla WCAG AA (4.5:1) para body text. Auditar usos: `Nav.tsx:12`, `Pricing.tsx:99,138`, `CtaFinal.tsx:20`, `Founder.tsx`, `Footer.tsx:6`, `Hero.tsx:35`. Cambiar a `slate` donde el texto sea body (≥14px normal weight). Dejar `slate-light` solo para metadatos pequeños (text-xs) o texto grande (≥18px). Est: 45 min.

## Design system

- [ ] **Extender `<Button>` con variantes `warm-solid` e `ink-solid`.** Hoy `Pricing.tsx:106-114` usa `<button>` plano con clases inline porque el componente no cubre el caso de "CTA principal dentro de card". Añadir las dos variantes al componente y refactorizar Pricing para usarlas. Est: 45 min.

## UX pendiente

- [ ] **Hamburger + drawer en nav móvil.** Actualmente `Nav.tsx:12` esconde los links de sección en `< 640px` sin alternativa. Patrón documentado en DESIGN.md §Responsive (drawer slide-in desde la derecha, fondo paper, links Fraunces text-2xl, cierre con tap outside + X + Escape). Est: 2h.

- [ ] **Error UI para checkout de Stripe.** Reemplazar los dos `alert()` en `Pricing.tsx:47,50` por el patrón de error inline documentado en DESIGN.md §Estados. Añadir estado local `error: string | null` al componente y renderizarlo debajo del botón de checkout que falló. Est: 1h.
