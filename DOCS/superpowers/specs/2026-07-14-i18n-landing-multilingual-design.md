# Landing multilingüe (ES / EN / FR) — Design Spec

**Fecha:** 2026-07-14
**Repo:** `RevCognition` (landing marketing, `revcognition.com`)
**Estado:** Diseño validado por el fundador — pendiente de plan de implementación

---

## 1. Contexto y objetivo

La landing pública de RevCognition (`revcognition.com`) está hoy **solo en español**, con todo el
copy **hardcodeado inline** dentro de los componentes JSX (~490 strings repartidos en 13 secciones).
El objetivo es servir la misma web en **español, inglés y francés**, para captar leads
internacionales, sin romper las URLs ni el SEO existentes en español.

**No-objetivo:** el portal de la app (`app.revcognition.com`, repo `Growth_Engine`) — no tiene i18n
y queda **fuera de alcance** (ver §9).

### Stack de referencia (no cambia)

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4 + tokens en `globals.css`
- Framer Motion (`MotionProvider`, `reducedMotion="user"`)
- Deploy: **Cloudflare Pages** vía `@cloudflare/next-on-pages` (runtime edge, auto-deploy desde `main`)
- Fuentes: Fraunces + Instrument Sans, subset `latin` → cubre acentos FR (é, à, ç) sin subset extra

---

## 2. Decisiones cerradas (validadas por el fundador)

| # | Decisión | Valor |
|---|----------|-------|
| D1 | Superficie | **Solo la landing marketing** (repo RevCognition). El portal queda fuera. |
| D2 | Estrategia de URLs | **ES en raíz, EN/FR con prefijo** (`localePrefix: 'as-needed'`). `/` y `/producto` intactos. |
| D3 | Origen del copy EN/FR | **Lo redacta Claude con calidad marketing (no literal), el fundador revisa antes de shippear.** |
| D4 | Auto-detección de idioma | **ON** — el middleware detecta `Accept-Language` en la primera visita y sirve el idioma del navegador, con cookie de persistencia. |
| D5 | Switcher manual | **Disponible siempre** — selector ES/EN/FR en `Nav` (y `Footer`), navega a la misma página en el otro idioma. La elección manual fija la cookie y prevalece sobre la auto-detección. |
| D6 | Librería i18n | **`next-intl`** (estándar App Router, soporta `as-needed`, helpers hreflang/metadata, corre en edge). |

### Idiomas y códigos

- `es` — español (idioma por defecto, en raíz)
- `en` — inglés (prefijo `/en`)
- `fr` — francés (prefijo `/fr`)

---

## 3. Arquitectura

### 3.1 Routing — `app/[locale]/`

Todas las páginas actuales se mueven bajo un segmento dinámico `[locale]`:

```
src/app/
├── [locale]/
│   ├── layout.tsx              (era app/layout.tsx — ahora localizado)
│   ├── page.tsx                (home)
│   ├── producto/page.tsx
│   ├── soluciones/servicios-b2b/page.tsx
│   ├── gracias/page.tsx
│   └── privacy/page.tsx
├── sitemap.ts                  (nuevo — con alternates hreflang)
└── globals.css                 (sin cambios — se importa desde [locale]/layout)
```

Con `localePrefix: 'as-needed'` y `defaultLocale: 'es'`:

| URL | Idioma servido |
|-----|----------------|
| `revcognition.com/` | español (sin prefijo — URL actual intacta) |
| `revcognition.com/producto` | español (intacta) |
| `revcognition.com/en` · `/en/producto` | inglés |
| `revcognition.com/fr` · `/fr/producto` | francés |

`generateStaticParams` emite los 3 locales para prerender. El `redirect` de `/analisis → app.revcognition.com`
(en `next.config.ts`) se mantiene y se hace **locale-agnóstico** (aplica a `/analisis`, `/en/analisis`, `/fr/analisis`).

### 3.2 Catálogo de mensajes — `messages/{es,en,fr}.json`

Un fichero JSON por idioma, versionado en git, con claves **namespaced por sección**:

```
messages/
├── es.json     ← extraído del código actual, verbatim
├── en.json     ← redactado por Claude, revisado por el fundador
└── fr.json     ← redactado por Claude, revisado por el fundador
```

Estructura de namespaces (1 por sección/página):

```
nav, hero, problem, howItWorks, featuresGrid, useCases, pricing, founder,
ctaFinal, footer, producto, serviciosB2B, gracias, privacy, metadata
```

Los tres ficheros son **estructuralmente idénticos** (mismas claves) — un test de paridad de claves
lo garantiza (ver §7). Placeholders dinámicos e íconos/emoji se mantienen fuera del texto traducible
cuando son puramente decorativos (`aria-hidden`).

### 3.3 Config next-intl

- `src/i18n/routing.ts` — `locales`, `defaultLocale: 'es'`, `localePrefix: 'as-needed'`.
- `src/i18n/request.ts` — carga el catálogo del locale activo por request.
- `src/middleware.ts` — middleware de next-intl: **detección `Accept-Language` (D4)** + cookie de
  persistencia + reescritura de raíz a locale por defecto. `matcher` que excluye `/_next`, assets
  estáticos, `og.png`, `/analisis`, etc.

### 3.4 Detección + switcher (D4 + D5)

- **Primera visita a `/`:** middleware lee `Accept-Language`. Navegador en inglés → sirve `/en`
  (navegador francés → `/fr`; cualquier otro → raíz español). Fija cookie `NEXT_LOCALE`.
- **Crawler-safe:** cada URL sirve **contenido estable** para su locale (no hay redirección
  dependiente de user-agent para bots). Cada página emite `hreflang` recíproco + `canonical`
  auto-referente → sin canibalización SEO entre versiones.
- **Switcher (Nav + Footer):** componente cliente ES/EN/FR. Al elegir, navega a la ruta equivalente
  del nuevo locale (misma página) y **fija la cookie**, de modo que la elección manual prevalece
  sobre la auto-detección en visitas posteriores.

### 3.5 SEO / metadata por idioma

- `[locale]/layout.tsx` genera metadata **localizada** vía `generateMetadata`:
  - `title`, `description` desde `metadata` namespace del catálogo.
  - `openGraph.locale` dinámico (`es_ES` | `en_US` | `fr_FR`) + `openGraph.locale.alternate`.
  - `alternates.languages` con las 3 URLs (`hreflang` alternate) + `x-default` → español.
  - `alternates.canonical` auto-referente por locala.
- `html lang={locale}` dinámico (hoy es fijo).
- `sitemap.ts` nuevo: cada ruta × 3 locales con `alternates.languages`.

---

## 4. Inventario de extracción (componente → namespace)

Cada uno pasa de strings inline → `useTranslations('<namespace>')` (o `getTranslations` en server
components). Volumen orientativo por revisar durante la implementación:

| Fichero | Namespace | Tipo |
|---------|-----------|------|
| `sections/Nav.tsx` | `nav` | client (+ switcher nuevo) |
| `sections/Hero.tsx` | `hero` | client |
| `sections/Problem.tsx` | `problem` | client |
| `sections/HowItWorks.tsx` | `howItWorks` | client |
| `sections/FeaturesGrid.tsx` | `featuresGrid` | client (grid de features — lista) |
| `sections/UseCases.tsx` | `useCases` | client |
| `sections/Pricing.tsx` | `pricing` | client (curva de bundles + nota fiscal) |
| `sections/Founder.tsx` | `founder` | client |
| `sections/CtaFinal.tsx` | `ctaFinal` | client |
| `sections/Footer.tsx` | `footer` | client (+ switcher nuevo) |
| `sections/Producto.tsx` | `producto` | client (16 features en 4 bloques + FAQ) |
| `sections/ServiciosB2B.tsx` | `serviciosB2B` | client (case-study + FAQ) |
| `app/[locale]/gracias/page.tsx` | `gracias` | server/page |
| `app/[locale]/privacy/page.tsx` | `privacy` | server/page (texto legal denso) |
| `app/[locale]/layout.tsx` | `metadata` | server (metadata) |
| `ui/EmailPreviewCard.tsx`, `ui/MockupShell.tsx` | según contenido | revisar si llevan copy visible |

**Nota:** `ui/Button.tsx`, `ui/Logo.tsx` son estructurales — el texto viene por props/children desde
las secciones, no requieren namespace propio salvo strings internos.

---

## 5. Enfoque de traducción (D3)

- **ES:** se extrae **verbatim** del código actual (sin reinterpretar) → `es.json`.
- **EN / FR:** Claude redacta **adaptación marketing**, no traducción literal — respeta tono, claims,
  y matices comerciales (la nota fiscal multi-país de Pricing, los claims de dogfooding, los CTAs).
  El francés recibe especial cuidado de tono.
- Los catálogos EN/FR se entregan al fundador para **revisión previa al ship** (gate explícito).
- Terminología de marca que **no** se traduce: "RevCognition", nombres de producto, y cualquier
  término que el fundador marque como fijo durante la revisión.

---

## 6. Impacto en componentes cliente + Framer Motion

- `next-intl` provee `useTranslations` (client) y `getTranslations` (server). Los componentes de
  sección ya son `"use client"` (usan Framer Motion) → usarán `useTranslations`.
- El `NextIntlClientProvider` envuelve el árbol en `[locale]/layout.tsx` para que los client
  components accedan al catálogo. Convive con `MotionProvider` (se anidan).
- Las animaciones no cambian: solo cambia el **origen del texto**, no el markup ni las variantes.

---

## 7. Plan de verificación

1. **Paridad de claves:** test/script que verifica que `en.json` y `fr.json` tienen exactamente
   las mismas claves que `es.json` (sin faltantes ni sobrantes) → falla el build si hay drift.
2. **Build local `next-on-pages`:** `npx @cloudflare/next-on-pages` compila sin errores (edge runtime,
   middleware incluido).
3. **Dogfood gstack (renderizado):** navegar `/`, `/en`, `/fr` + `/producto`, `/en/producto`,
   `/fr/producto`; verificar (a) idioma correcto, (b) switcher navega y persiste, (c) auto-detección
   con `Accept-Language` simulado, (d) `<html lang>` y `hreflang` correctos en el HTML servido.
4. **SEO check:** inspeccionar `hreflang`/`canonical`/`og:locale` en las 3 versiones de home.
5. **No-regresión ES:** confirmar que `revcognition.com/` y `/producto` siguen sirviendo el español
   idéntico al actual (mismas URLs, mismo copy verbatim).

Gate de ship: **revisión del fundador de `en.json` + `fr.json`** + verificación 1-5 en verde.

---

## 8. Riesgos y mitigaciones

| Riesgo | Mitigación |
|--------|-----------|
| Middleware next-intl en edge (`next-on-pages`) | next-intl soporta edge; validar en build `next-on-pages` (verif. §7.2) antes de shippear. |
| Auto-redirect canibaliza SEO ES | Contenido estable por URL + `hreflang` recíproco + `canonical` auto-referente + `x-default=es`. |
| Deriva de claves entre catálogos | Test de paridad de claves fail-closed (§7.1). |
| Copy FR de baja calidad | Gate de revisión del fundador previo al ship (§5). |
| Romper URLs ES existentes | `localePrefix: 'as-needed'` mantiene `/` y `/producto` sin prefijo (D2). |

---

## 9. Fuera de alcance (YAGNI)

- **Portal `app.revcognition.com`** (repo Growth_Engine): no tiene i18n; los CTA de la landing siguen
  enlazando igual. i18n del portal sería su propio ciclo spec→plan→implementación.
- **Handoff de idioma a la app** (`?lang=en` al enlazar a la app): futura fase; hoy la app decide su
  idioma por su cuenta.
- **4º idioma:** la arquitectura lo soporta (añadir `de.json` + locale en `routing.ts`), pero no se
  construye ahora.
- **CMS / traducción externa:** los catálogos viven en git como JSON; no se introduce CMS.

---

## 10. Entregable

- Landing sirviendo ES (raíz) / EN (`/en`) / FR (`/fr`) con auto-detección + switcher.
- Catálogos `messages/{es,en,fr}.json` completos y revisados.
- SEO multilingüe (hreflang, canonical, og:locale, sitemap con alternates).
- Verificación §7 en verde + revisión de copy del fundador.
- Deploy a Cloudflare Pages (merge a `main`).
