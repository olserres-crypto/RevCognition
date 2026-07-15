# TODOS

Design system y a11y. Ordenados por prioridad. Estimaciones son para un dev que conoce el stack.

## i18n (ES/EN/FR — LIVE desde 2026-07-15)

La landing es multilingüe con `next-intl` (ES en raíz, `/en`, `/fr`, auto-detección + switcher).
Spec/plan: `DOCS/superpowers/{specs,plans}/2026-07-14-i18n-landing-multilingual*.md`. Catálogos en `messages/`.
Paridad de claves: `npm run i18n:check` (fail-closed). Deploy = GitHub Action (logs vía `gh run view`, no dashboard CF).

- [ ] **Revisión jurídica del texto legal de `privacy` (EN/FR).** Las traducciones de `messages/{en,fr}.json` namespace `privacy` las redactó Claude (fieles al ES pero SIN revisión de abogado). Repasar retenciones de datos y terminología GDPR/RGPD antes de meter tráfico serio a `/en/privacy` `/fr/privacy`.
- [ ] **(Opcional) Volver estáticas las 4 páginas `runtime='edge'`.** `producto`, `soluciones/servicios-b2b`, `gracias`, `privacy` llevan `export const runtime='edge'` porque su `generateMetadata` las hace dinámicas (requisito de `@cloudflare/next-on-pages`). Se pueden volver a estáticas (mejor perf/coste) llamando `setRequestLocale(locale)` DENTRO de su `generateMetadata` antes de `getTranslations` + `generateStaticParams` propio, y quitando el `runtime`. Edge en Cloudflare es válido → optimización, no urgencia. Validar SOLO en el Action (el build edge no corre en Windows).
- [ ] **Bump Node 20 → 22 en `.github/workflows/deploy.yml`.** GitHub deprecó Node 20 en runners. El workflow usa `npm install` (no `npm ci`) por drift de versión de lockfile — revisitar si se alinea el npm local con el del CI.
- [ ] **(Opcional) Localizar `footer` "Unsubscribe" en ES.** El footer español dice "Unsubscribe" (heredado del código original). El fundador lo dejó así en la revisión; cambiar a "Darse de baja" si se quiere.

## A11y

- [x] **Respetar `prefers-reduced-motion` en framer-motion.** `MotionProvider` aplica `MotionConfig reducedMotion="user"` (global) y, además, cada sección animada usa `useReducedMotion()` para desactivar `initial`/entrada cuando el usuario lo prefiere (Hero, Problem, HowItWorks, UseCases, FeaturesGrid, Producto). `scroll-behavior: smooth` se desactiva bajo reduced-motion en `globals.css`. (B-585)

- [x] **Skip-to-content link** en `src/app/layout.tsx` → `<main id="main">`. Presente en la home y en `/producto`.

- [x] **Contraste de `slate-light` sobre `paper`.** Auditado (B-585): el texto de tamaño body (`text-sm`+ peso normal) usa ahora `slate` (Hero subtexto, Footer, notas de Pricing). `slate-light` queda solo en metadatos pequeños (`text-xs`/`text-[10px]`) y en `decoration-*` de subrayados, usos que cumplen AA.

## UX

- [x] **Hamburger + drawer en nav móvil.** Implementado en `Nav.tsx` según DESIGN.md §Responsive: drawer slide-in desde la derecha, links Fraunces `text-2xl`, cierre con tap-outside + X + Escape, scroll-lock, cierre al navegar y gestión de foco (entra al drawer al abrir, vuelve al disparador al cerrar). (B-585)

- [ ] **Error UI inline (formularios futuros).** Si se reintroduce cualquier formulario en esta web (hoy no hay ninguno: la conversión enlaza a la app), aplicar el patrón de error inline documentado en DESIGN.md §Estados — nunca `alert()`/`confirm()`/`prompt()`.
