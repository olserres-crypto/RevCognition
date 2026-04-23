# Editorial Moderno — RevCognition Design System

Sistema de diseño para productos B2B serios que quieren verse como artículos de publicación, no como landing pages SaaS. La prospección es un oficio, no un "growth hack"; la marca lo refleja.

## Tesis

Cuatro decisiones fundacionales:

1. **Serif display, sans body.** Fraunces en H1/H2/H3 y wordmark; Instrument Sans en todo lo demás. Serif en display comunica craft y permanencia; sans en body comunica utilidad y legibilidad en pantalla.
2. **Paleta monocroma con un acento cromático.** Seis tonos neutros + un solo indigo warm. Todo lo que quiere atención usa warm; todo lo demás se apaga.
3. **Ritmo editorial, no de dashboard.** Bandas alternadas paper/surface, contenedor `max-w-5xl`, eyebrow UPPERCASE sobre cada sección. Lee como un long-form post.
4. **Voz directa, negación honesta.** "Sin agencias. Sin perder el tiempo." No hay "AI-powered", no hay hype. Precios son precios, tiempos son tiempos.

## Tipografía

**Fuentes**
- `--font-serif`: **Fraunces** (Google Fonts), pesos 300/400/500. `letter-spacing: -0.02em` en headings.
- `--font-sans`: **Instrument Sans** (Google Fonts), pesos 400/500/600.
- Cargadas en `src/app/layout.tsx` vía `next/font/google` con `display: swap`.

**Escala**

| Nivel | Clases | Familia | Peso | Uso |
|-------|--------|---------|------|-----|
| Display XL | `text-4xl sm:text-5xl lg:text-6xl leading-tight` | serif | 400 | H1 hero (único por página) |
| H2 | `text-3xl sm:text-4xl` | serif | 400 | Título de sección |
| H3 | `text-xl` | serif | 400 | Subtítulo en card o paso |
| Lead | `text-lg sm:text-xl` | sans | 400 | Subtítulo del hero |
| Body | default (`text-base`) | sans | 400 | Texto corrido |
| Meta | `text-sm` | sans | 400 | Descripciones de card |
| Micro | `text-xs` | sans | 400 | Metadatos, email chrome |
| Eyebrow | `text-sm font-semibold uppercase tracking-widest` | sans | 600 | Sobre cada H2, color `warm` |

**Peso 300** solo en Fraunces, para tensión dentro del H1 y el wordmark "Rev". No usar en body.

## Color

Tokens en `src/app/globals.css` bajo `@theme`.

| Token | Hex | Uso |
|-------|-----|-----|
| `paper` | `#f4f4f2` | Fondo default, card default |
| `surface` | `#ebebea` | Bandas alternas, píldora |
| `ink` | `#1a1a1a` | Texto primario, heading, borde CTA secundario |
| `warm` | `#6366f1` | Acento — wordmark "Rev", eyebrow, link, CTA primario |
| `warm-hover` | `#4f52e0` | Hover de warm |
| `slate` | `#4a5568` | Texto body secundario |
| `slate-light` | `#718096` | Texto tertiary/meta (ver TODOS.md contraste) |
| `border` | `#e2e2e0` | Dividers, bordes de card |

**Reglas de uso**

- **warm es escaso.** Un CTA primario por sección. Un acento cromático por heading. Tres `warm` en la misma pantalla = demasiado.
- **ink nunca con gradientes o shadows complejos.** Es plano.
- **Card backgrounds**: `paper` por defecto dentro de secciones `surface`, o cuando la card es un contenedor del sistema. `white` (#fff) solo cuando la card representa un artefacto externo (email en EmailPreviewCard).

## Wordmark — "RevCognition"

- "Rev" — Fraunces, peso **300**, color `warm`.
- "Cognition" — Fraunces, peso **500**, color `ink`.
- Sin espacio entre las dos palabras (se leen como una).
- `letter-spacing: -0.03em`, `leading-none`.

Tamaños: `nav` (17px), `md` (24px), `lg` (36px). Componente: `src/components/ui/Logo.tsx`.

**No hacer:**
- No usar el wordmark sobre fondos cromáticos que compitan con `warm`.
- No romper el contraste de pesos (300 vs 500). Si no hay Fraunces disponible, ocultar el wordmark y usar texto plano — no sustituir por Georgia.
- No aplicar uppercase al wordmark.

## Layout y ritmo

- **Contenedor**: `max-w-5xl mx-auto px-4 sm:px-6`. El sitio es long-form, no dashboard.
- **Ritmo vertical**: `py-16 sm:py-24` por sección. Uniforme.
- **Bandas**: secciones `paper` y `surface` se alternan. Actualmente: Hero (paper) → Problem (surface) → HowItWorks (paper) → ValidationBadge (surface) → Pricing (paper) → Founder (surface) → CtaFinal (paper) → Footer (border-top sobre paper).
- **Radios**: `rounded-lg` para botones, `rounded-xl` para cards, `rounded-full` para píldoras y números de paso.
- **Breakpoints**: `sm` (640px) es el quiebre principal; `lg` (1024px) reserva layouts dos-columnas (Hero).

## Componentes

### Button — `src/components/ui/Button.tsx`

Variantes actuales:
- **primary** — gradiente vertical indigo 500→600, texto blanco. CTA principal.
- **secondary** — borde ink 1px + texto ink. CTA secundario.

Variantes pendientes (TODOS.md):
- **warm-solid** — fondo warm plano, texto blanco. Para cards con borde warm (featured pricing).
- **ink-solid** — fondo ink plano, texto paper. Para cards default con CTA firme.

Padding base: `px-6 py-3`. Tipografía: `font-semibold text-base`. Focus: `focus-visible:ring-2 focus-visible:ring-offset-2`.

### Eyebrow

Patrón repetido en cada sección sobre el H2:

```tsx
<p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
  Cómo funciona
</p>
```

Regla: uno por sección. Máximo 3-4 palabras. Siempre en `warm`.

### Card

Base: `bg-[var(--color-paper)] border border-[var(--color-border)] rounded-xl p-6 sm:p-7`.

Featured variant (Pricing):
`border-[var(--color-warm)] bg-[var(--color-warm)]/5 ring-1 ring-[var(--color-warm)]/20`.

### Paso numerado (HowItWorks)

Círculo `w-10 h-10` con `border-2 border-warm`, texto warm `font-semibold`. Connector `w-px bg-border` entre pasos. El número es la jerarquía.

### EmailPreviewCard — `src/components/ui/EmailPreviewCard.tsx`

Mockup editorial de un email generado. `bg-white` (artefacto externo), borde `border-l-4 border-l-warm` como acento de hilo. Header con `De:/Para:/Asunto:` en `text-xs`, sin chrome imitativo de cliente de correo (mac window dots están prohibidos). Body con tipografía del sistema.

## Motion

Librería: **framer-motion**.

**Principios:**
- Entrada por scroll con `whileInView` + `viewport: { once: true, margin: "-40px" }`.
- Transform: fade + translate de 16-20px (y o x).
- Duración 0.35-0.4s, ease-out o default.
- Stagger 0.08-0.12s entre elementos.
- **Una sola animación por viewport entry**. No animar color + rotate + scale simultáneamente.

**Requisito (TODO):** todas las animaciones deben respetar `prefers-reduced-motion` via `useReducedMotion()`.

## Voz y tono

**Principios:**
- **Concreta antes que aspiracional.** "1€ por prospecto" > "precio competitivo". "10-15 minutos" > "setup rápido".
- **Negación honesta como gancho.** "Sin agencias. Sin perder el tiempo." Establece qué NO hace antes de qué sí.
- **Precios son precios.** Sin asteriscos. Sin "a partir de". "Setup único: 50€. Se paga una sola vez."
- **Transparencia sobre el estado.** "Beta cerrada · 2 fundadores" — no esconder tamaño. La transparencia es la validación.
- **Sin hype words.** No "AI-powered", "revolutionary", "game-changing", "next-gen". Si hay un LLM dentro, se dice "Un LLM combina…" (concreto).
- **Español castellano**, no neutro. "a medida", "propuesta", "tono". No "customizado".

**No escribir:**
- "Unlock the power of…"
- "Your all-in-one solution for…"
- "Welcome to RevCognition"
- Cualquier frase que funcione igual para tres productos distintos.

## Estados

### Loading (botón)

Texto cambia a contexto específico ("Redirigiendo…"). `disabled={true}` + `disabled:opacity-60 disabled:cursor-not-allowed`. Patrón canónico en `src/components/sections/Pricing.tsx:107-115`.

### Error (checkout, formularios)

*Pendiente de implementación — ver TODOS.md.* Patrón a aplicar:

- Inline debajo del botón o campo, nunca modal ni `alert()`.
- Eyebrow `text-xs font-semibold uppercase tracking-widest` en rojo (`#c53030` o `text-red-700`).
- Mensaje en `text-sm` sobre `paper` (no fondo rojo).
- Acción de recuperación concreta ("Reintentar" o "Escríbeme a olivier@revcognition.com").
- **Prohibido**: `alert()`, `confirm()`, `prompt()` nativos.

### Empty

El sitio marketing no tiene estados vacíos. Si en el futuro hay dashboard: empty states son features, no "No items found". Cada uno con warmth + primary action + contexto.

## Social proof

La prueba social se hace vía `ValidationBadge` (estado beta honesto: "En uso activo por 2 fundadores mientras perfeccionamos el sistema"), **no con case studies ficticios**. El componente `UseCases` se eliminó explícitamente para evitar fabricar credibilidad. Cuando haya clientes reales con permiso para citar, se reincorporará con nombres reales.

## Accessibility baseline

- `lang="es"` en `<html>` ✓
- `focus-visible:ring-2 focus-visible:ring-offset-2` en todo elemento interactivo ✓
- `prefers-reduced-motion` respetado — TODO
- Skip-to-content link — TODO
- Touch targets mínimo 44px (Button default `py-3` ≈ 46px con `text-base`) ✓
- Contraste WCAG AA: `ink` sobre `paper` ✓, `slate` sobre `paper` ✓, `slate-light` sobre `paper` a verificar — TODO
- Semántica: `<nav>`, `<main>`, `<section>`, `<footer>` ✓
- Emoji o elementos decorativos: `aria-hidden="true"` obligatorio.

## Responsive

**Breakpoints principales**

- **< 640px** (mobile): layout vertical, nav con hamburger (TODO), Hero sin EmailPreviewCard.
- **640-1024px**: grids `sm:grid-cols-2` o `sm:grid-cols-3`, sección padding `sm:py-24`.
- **≥ 1024px**: Hero dos columnas, EmailPreviewCard visible.

**Nav móvil (patrón pendiente)**

- Botón hamburger visible < `sm`, alineado al lado del CTA "Acceder a la App".
- Drawer slide-in desde la derecha, fondo `paper`, 80% ancho de viewport.
- Links en Fraunces `text-2xl`, uno por línea, padding vertical ≥ 48px por link.
- Cierre con tap outside + botón X + tecla Escape.

## Do's & Don'ts

**Do**
- Usar el eyebrow pattern en cada sección nueva.
- Mantener `max-w-5xl` como tope. Full-bleed solo para Nav y Footer.
- Alternar `paper` / `surface` para ritmo. Tres bandas `paper` seguidas rompen el pulso.
- Serif en display, sans en body. Siempre.
- Un CTA primario por viewport. Dos CTAs = uno primario + uno secundario.

**Don't**
- No introducir un nuevo color hex sin añadirlo a `globals.css`.
- No usar `alert()`, `confirm()`, `prompt()` nativos.
- No centrar todo. El sitio es left-aligned editorial.
- No usar 3-column feature grids con iconos en círculos.
- No añadir emoji como decoración de sección.
- No usar gradientes de background. Gradientes solo en CTAs primarios.
- No usar `system-ui` como display font.
- No meter `rotate`, `scale > 1.05`, o `spin` en animaciones de entrada. Solo `opacity` + `translate`.

## Referencias

- Tokens: `src/app/globals.css`
- Wordmark: `src/components/ui/Logo.tsx`
- Button: `src/components/ui/Button.tsx`
- Cargado de fuentes: `src/app/layout.tsx`
- Ritmo de sección canónico: `src/components/sections/Problem.tsx`, `HowItWorks.tsx`, `Pricing.tsx`
