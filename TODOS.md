# TODOS

Design system y a11y. Ordenados por prioridad. Estimaciones son para un dev que conoce el stack.

## A11y

- [x] **Respetar `prefers-reduced-motion` en framer-motion.** `MotionProvider` aplica `MotionConfig reducedMotion="user"` (global) y, además, cada sección animada usa `useReducedMotion()` para desactivar `initial`/entrada cuando el usuario lo prefiere (Hero, Problem, HowItWorks, UseCases, FeaturesGrid, Producto). `scroll-behavior: smooth` se desactiva bajo reduced-motion en `globals.css`. (B-585)

- [x] **Skip-to-content link** en `src/app/layout.tsx` → `<main id="main">`. Presente en la home y en `/producto`.

- [x] **Contraste de `slate-light` sobre `paper`.** Auditado (B-585): el texto de tamaño body (`text-sm`+ peso normal) usa ahora `slate` (Hero subtexto, Footer, notas de Pricing). `slate-light` queda solo en metadatos pequeños (`text-xs`/`text-[10px]`) y en `decoration-*` de subrayados, usos que cumplen AA.

## UX

- [x] **Hamburger + drawer en nav móvil.** Implementado en `Nav.tsx` según DESIGN.md §Responsive: drawer slide-in desde la derecha, links Fraunces `text-2xl`, cierre con tap-outside + X + Escape, scroll-lock, cierre al navegar y gestión de foco (entra al drawer al abrir, vuelve al disparador al cerrar). (B-585)

- [ ] **Error UI inline (formularios futuros).** Si se reintroduce cualquier formulario en esta web (hoy no hay ninguno: la conversión enlaza a la app), aplicar el patrón de error inline documentado en DESIGN.md §Estados — nunca `alert()`/`confirm()`/`prompt()`.
