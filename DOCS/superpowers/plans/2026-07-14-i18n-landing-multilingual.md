# Landing multilingüe (ES / EN / FR) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Servir la landing de RevCognition en español (raíz), inglés (`/en`) y francés (`/fr`), con auto-detección de idioma por navegador y switcher manual, sin romper las URLs ni el SEO en español.

**Architecture:** Migración a `next-intl` sobre App Router. Todas las páginas se mueven bajo un segmento dinámico `app/[locale]/`. Los ~490 strings hoy hardcodeados en JSX se extraen a catálogos `messages/{es,en,fr}.json`. Un middleware de next-intl detecta `Accept-Language` y enruta (`localePrefix: 'as-needed'` → ES sin prefijo). Metadata, `hreflang`, `og:locale` y `sitemap` se localizan.

**Tech Stack:** Next.js 15 (App Router, TS), `next-intl` (nueva dependencia), Tailwind v4, Framer Motion, `@cloudflare/next-on-pages` (deploy edge).

## Global Constraints

- **Locales:** `es` (defaultLocale, en la raíz), `en` (`/en`), `fr` (`/fr`). `localePrefix: 'as-needed'`.
- **No romper URLs ES:** `revcognition.com/` y `/producto` deben seguir sirviendo español sin prefijo.
- **ES verbatim:** el copy español se extrae del código actual **sin reinterpretar**.
- **EN/FR = adaptación marketing** (no literal). Los tres catálogos tienen **paridad exacta de claves** (script fail-closed).
- **Gate de ship:** el fundador revisa `en.json` + `fr.json` antes del merge a `main`.
- **Términos que NO se traducen:** `"RevCognition"`, nombres propios de producto, y siglas técnicas de marca (SPF, DKIM, DMARC, ICP, LLM, Cal.com, Telegram, CSV, OEPM, ENISA, M&A). Cualquier otro término que el fundador marque en revisión.
- **Sin nuevas dependencias** salvo `next-intl`.
- **Enlaces internos locale-aware:** usar el `Link`/navegación de next-intl (`@/i18n/navigation`). Enlaces externos (`app.revcognition.com`, `mailto:`) siguen como `<a>` normal.
- **next-on-pages edge:** el middleware corre en edge; las páginas quedan prerenderizadas (`generateStaticParams`). Validar con build `next-on-pages` antes de shippear.

## Nota sobre testing

Este repo **no tiene framework de tests** (solo eslint). No se introduce vitest/playwright solo para esto (scope creep). La extracción de copy no tiene lógica de runtime unitaria: el "comportamiento" es "renderiza el texto localizado". Por tanto la verificación de cada tarea es una tríada **runnable**:

1. **`npx tsc --noEmit`** (o `npm run build`) compila sin errores.
2. **`node scripts/check-i18n-parity.mjs`** → paridad de claves de los 3 catálogos en verde (creado en Task 1).
3. **grep de ausencia**: el string español extraído ya no aparece hardcodeado en el `.tsx`.

La verificación **renderizada** (gstack: idioma correcto, switcher, auto-detección, hreflang) se concentra en la Task final 14. Esto es una decisión consciente, no una omisión.

---

## Extraction Convention (recipe compartida — todas las tareas de sección la siguen)

Cada sección se transforma con **el mismo patrón**. La Task 4 (Hero) es el ejemplo trabajado completo; las demás siguen esta receta.

### A. Strings simples

**Antes** (texto hardcodeado en JSX):
```tsx
<h2 className="font-serif ...">¿Qué estás haciendo ahora?</h2>
```
**Después** (client component — ya son `"use client"`):
```tsx
import {useTranslations} from 'next-intl';
export function Problem() {
  const t = useTranslations('problem');
  // ...
  <h2 className="font-serif ...">{t('heading')}</h2>
}
```
**Catálogo** — misma clave en los 3 ficheros:
```jsonc
// messages/es.json          // messages/en.json              // messages/fr.json
"problem": {                 "problem": {                     "problem": {
  "heading": "¿Qué estás       "heading": "What are you         "heading": "Que faites-vous
    haciendo ahora?"             doing right now?"                actuellement ?"
}                            }                                }
```

### B. Listas / arrays de objetos con texto

Cuando la sección itera sobre un array (ej. `problems`, `steps`, `features`): el **texto** va al catálogo como array de objetos; los **campos estructurales/estilo** (tono, color, `gridTemplateColumns`, iconos decorativos) se quedan en el componente, unidos por índice.

**Antes:**
```tsx
const problems = [
  { label: "Tu red de contactos", cost: "Oportunidades perdidas", description: "Prospectas cuando..." },
  // ...
];
```
**Después:**
```tsx
const t = useTranslations('problem');
const problems = t.raw('items') as {label: string; cost: string; description: string}[];
```
**Catálogo (es):**
```jsonc
"problem": {
  "items": [
    {"label": "Tu red de contactos", "cost": "Oportunidades perdidas", "description": "Prospectas cuando tienes tiempo, que es casi nunca. El sistema se para cuando tú te paras."},
    {"label": "Una agencia de captación", "cost": "500–2.000€/mes, resultados nulos", "description": "Recibes informes, no reuniones..."},
    {"label": "Una herramienta genérica", "cost": "Horas de configuración, spam", "description": "Necesitas ser técnico..."}
  ]
}
```
> `t.raw()` devuelve el valor sin procesar ICU — correcto para copy marketing. El array EN/FR debe tener **la misma longitud y las mismas claves** que el ES.

### C. Metadata / server components

Las páginas (`gracias`, `privacy`) y `generateMetadata` usan la variante server:
```tsx
import {getTranslations} from 'next-intl/server';
const t = await getTranslations('privacy');
```

### D. Enlaces internos

Reemplazar `import Link from 'next/link'` y `<a href="/producto">` por el `Link` de next-intl:
```tsx
import {Link} from '@/i18n/navigation';
<Link href="/producto">{t('nav.producto')}</Link>   // en /fr renderiza /fr/producto
```
Anclas de la home (`/#precios`, `#como-funciona`) → `Link` de next-intl las prefija correctamente. Enlaces **externos** (`https://app.revcognition.com`, `mailto:`) se quedan como `<a>` normal.

### E. Contenido demo/ilustrativo (mockups)

Los mockups (SignalCard, MockupShell rows en Hero/HowItWorks/Producto) contienen **datos de ejemplo** (nombres de empresa inventados como "Laboratorios Roca", "Bufete Serrano", cifras). Regla:
- **Chrome/UI y etiquetas** ("Señal detectada", "En vivo", "Listo para enviar", "Perfil de cliente ideal", "3 nuevos hoy") → **se traducen**.
- **Nombres propios inventados y códigos** ("Laboratorios Roca", "04287391", "Alex Serra") → se pueden dejar tal cual (ilustrativos, neutros); el fundador decide en revisión si prefiere ejemplos nativos por idioma. Default: dejarlos, marcarlos en el PR para revisión.

---

## Task 1: Infraestructura next-intl + migración a `[locale]`

**Files:**
- Create: `messages/es.json`, `messages/en.json`, `messages/fr.json` (con namespace `metadata` de arranque)
- Create: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/i18n/navigation.ts`
- Create: `src/middleware.ts`
- Create: `scripts/check-i18n-parity.mjs`
- Create: `app/layout.tsx` passthrough (reemplaza el actual) y `src/app/[locale]/layout.tsx`
- Modify: `next.config.ts` (wrap `createNextIntlPlugin` + redirect locale-agnóstico)
- Modify: `package.json` (dep `next-intl` + script `i18n:check`)
- Move: `src/app/page.tsx` → `src/app/[locale]/page.tsx`; `src/app/producto/` → `src/app/[locale]/producto/`; `src/app/soluciones/` → `src/app/[locale]/soluciones/`; `src/app/gracias/` → `src/app/[locale]/gracias/`; `src/app/privacy/` → `src/app/[locale]/privacy/`

**Interfaces:**
- Produces: `routing` (de `@/i18n/routing`), `{Link, useRouter, usePathname, redirect, getPathname}` (de `@/i18n/navigation`), catálogos `messages/{locale}.json`, y la estructura `app/[locale]/`. Todas las tareas siguientes consumen esto.

- [ ] **Step 1: Instalar next-intl**

Run:
```bash
cd C:/PROYECTOS_DEV/RevCognition && npm install next-intl
```
Expected: `next-intl` añadido a `dependencies` en `package.json`.

- [ ] **Step 2: Crear `src/i18n/routing.ts`**

```ts
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en', 'fr'],
  defaultLocale: 'es',
  localePrefix: 'as-needed'
});
```

- [ ] **Step 3: Crear `src/i18n/navigation.ts`**

```ts
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
```

- [ ] **Step 4: Crear `src/i18n/request.ts`**

```ts
import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

- [ ] **Step 5: Crear `src/middleware.ts`**

```ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// localeDetection por defecto = true → detecta Accept-Language en la primera
// visita (D4) y persiste con cookie NEXT_LOCALE. La elección manual del switcher
// fija la misma cookie y prevalece.
export default createMiddleware(routing);

export const config = {
  // Excluye api, _next, /analisis (redirect en next.config) y cualquier ruta
  // con extensión (og.png, favicon, etc.).
  matcher: ['/((?!api|_next|_vercel|analisis|.*\\..*).*)']
};
```

- [ ] **Step 6: Envolver `next.config.ts` con el plugin + redirect locale-agnóstico**

```ts
import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const APP_URL = "https://app.revcognition.com";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {source: "/analisis", destination: APP_URL, permanent: false},
      {source: "/:locale(en|fr)/analisis", destination: APP_URL, permanent: false},
    ];
  },
};

export default withNextIntl(nextConfig);
```
> El plugin busca por defecto `./src/i18n/request.ts` (creado en Step 4).

- [ ] **Step 7: Mover las páginas bajo `src/app/[locale]/`**

```bash
cd C:/PROYECTOS_DEV/RevCognition/src/app
mkdir -p "[locale]"
git mv page.tsx "[locale]/page.tsx"
git mv producto "[locale]/producto"
git mv soluciones "[locale]/soluciones"
git mv gracias "[locale]/gracias"
git mv privacy "[locale]/privacy"
```
> `globals.css` se queda en `src/app/globals.css` (no se mueve).

- [ ] **Step 8: Convertir `src/app/layout.tsx` en passthrough**

Reemplazar TODO el contenido de `src/app/layout.tsx` por:
```tsx
import type {ReactNode} from "react";

// El <html>/<body> vive ahora en app/[locale]/layout.tsx. Este root layout
// solo pasa children (Next requiere un root layout).
export default function RootLayout({children}: {children: ReactNode}) {
  return children;
}
```

- [ ] **Step 9: Crear `src/app/[locale]/layout.tsx`** (mueve html/body/fonts/skip-link/analytics del layout viejo + añade i18n)

```tsx
import type {Metadata} from "next";
import {Fraunces, Instrument_Sans} from "next/font/google";
import {notFound} from "next/navigation";
import {NextIntlClientProvider, hasLocale} from "next-intl";
import {setRequestLocale, getTranslations} from "next-intl/server";
import {routing} from "@/i18n/routing";
import {MotionProvider} from "@/components/providers/MotionProvider";
import "../globals.css";

const fraunces = Fraunces({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const OG_LOCALE: Record<string, string> = {es: "es_ES", en: "en_US", fr: "fr_FR"};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "metadata"});
  const base = "https://revcognition.com";
  const path = locale === routing.defaultLocale ? "" : `/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(base),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        es: base,
        en: `${base}/en`,
        fr: `${base}/fr`,
        "x-default": base,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${base}${path}`,
      siteName: "RevCognition",
      locale: OG_LOCALE[locale],
      alternate: Object.values(OG_LOCALE).filter((l) => l !== OG_LOCALE[locale]),
      type: "website",
      images: [{url: "/og.png", width: 1200, height: 630, alt: t("ogAlt")}],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: "a11y"});
  const cfAnalyticsToken = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;

  return (
    <html lang={locale}>
      <body className={`${fraunces.variable} ${instrumentSans.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-[var(--color-ink)] focus:text-[var(--color-paper)] focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
        {cfAnalyticsToken ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({token: cfAnalyticsToken})}
          />
        ) : null}
      </body>
    </html>
  );
}
```

- [ ] **Step 10: Añadir `setRequestLocale` a cada page** (para prerender estático)

En cada `src/app/[locale]/{page,producto/page,soluciones/servicios-b2b/page,gracias/page,privacy/page}.tsx`, añadir al principio del componente de página el desempaquetado de `params` y la llamada. Ejemplo para `src/app/[locale]/page.tsx`:
```tsx
import {setRequestLocale} from "next-intl/server";
import {routing} from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return (
    <>
      {/* ...secciones sin cambios en este task... */}
    </>
  );
}
```
> Las **secciones internas siguen con su texto hardcodeado** en esta task — se compilan igual. Se extraen en Tasks 3-13.

- [ ] **Step 11: Crear los 3 catálogos con el namespace de arranque**

`messages/es.json`:
```json
{
  "metadata": {
    "title": "RevCognition — Nuevos clientes, cada semana. Sin agencias.",
    "description": "RevCognition identifica a tus clientes ideales y les escribe un mensaje único a cada uno. Tú no escribes nada. No pagas a ninguna agencia. Y no tienes que encontrar el tiempo.",
    "ogAlt": "RevCognition — Nuevos clientes, cada semana."
  },
  "a11y": {
    "skipToContent": "Saltar al contenido"
  }
}
```
`messages/en.json`:
```json
{
  "metadata": {
    "title": "RevCognition — New clients, every week. No agencies.",
    "description": "RevCognition finds your ideal clients and writes each one a unique message. You write nothing. You pay no agency. And you don't have to find the time.",
    "ogAlt": "RevCognition — New clients, every week."
  },
  "a11y": {
    "skipToContent": "Skip to content"
  }
}
```
`messages/fr.json`:
```json
{
  "metadata": {
    "title": "RevCognition — De nouveaux clients, chaque semaine. Sans agence.",
    "description": "RevCognition identifie vos clients idéaux et écrit à chacun un message unique. Vous n'écrivez rien. Vous ne payez aucune agence. Et vous n'avez pas à trouver le temps.",
    "ogAlt": "RevCognition — De nouveaux clients, chaque semaine."
  },
  "a11y": {
    "skipToContent": "Aller au contenu"
  }
}
```

- [ ] **Step 12: Crear el script de paridad `scripts/check-i18n-parity.mjs`**

```js
import {readFileSync} from "node:fs";

const LOCALES = ["es", "en", "fr"];
const REF = "es";

function keyPaths(obj, prefix = "") {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) {
      out.push(`${path}[]:${v.length}`);
      v.forEach((item, i) => {
        if (item && typeof item === "object") out.push(...keyPaths(item, `${path}[${i}]`));
      });
    } else if (v && typeof v === "object") {
      out.push(...keyPaths(v, path));
    } else {
      out.push(path);
    }
  }
  return out.sort();
}

const catalogs = Object.fromEntries(
  LOCALES.map((l) => [l, JSON.parse(readFileSync(new URL(`../messages/${l}.json`, import.meta.url)))])
);

const refKeys = keyPaths(catalogs[REF]);
let failed = false;

for (const l of LOCALES.filter((x) => x !== REF)) {
  const keys = keyPaths(catalogs[l]);
  const missing = refKeys.filter((k) => !keys.includes(k));
  const extra = keys.filter((k) => !refKeys.includes(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`\n[${l}] drift vs ${REF}:`);
    missing.forEach((k) => console.error(`  MISSING: ${k}`));
    extra.forEach((k) => console.error(`  EXTRA:   ${k}`));
  }
}

if (failed) {
  console.error("\ni18n parity check FAILED\n");
  process.exit(1);
}
console.log(`i18n parity OK — ${refKeys.length} keys across ${LOCALES.join(", ")}`);
```
Añadir a `package.json` scripts:
```json
"i18n:check": "node scripts/check-i18n-parity.mjs"
```

- [ ] **Step 13: Verificar build + paridad**

Run:
```bash
cd C:/PROYECTOS_DEV/RevCognition && npm run i18n:check && npx tsc --noEmit && npm run build
```
Expected: parity OK; tsc sin errores; build genera `/`, `/en`, `/fr`, `/producto`, `/en/producto`, `/fr/producto`, etc. (las páginas muestran texto ES aún, salvo metadata que ya está localizada).

- [ ] **Step 14: Commit**

```bash
git add -A
git commit -m "feat(i18n): next-intl scaffolding + [locale] migration (ES en raíz, /en /fr)"
```

---

## Task 2: SEO — sitemap con alternates

**Files:**
- Create: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `routing` de `@/i18n/routing`.

- [ ] **Step 1: Crear `src/app/sitemap.ts`**

```ts
import type {MetadataRoute} from "next";

const BASE = "https://revcognition.com";
// Rutas sin prefijo de locale (la raíz canónica ES). El resto se derivan.
const PATHS = ["", "/producto", "/soluciones/servicios-b2b", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        es: `${BASE}${path}`,
        en: `${BASE}/en${path}`,
        fr: `${BASE}/fr${path}`,
      },
    },
  }));
}
```
> `/gracias` se omite del sitemap a propósito (página de confirmación enlazada desde la app, no indexable de interés).

- [ ] **Step 2: Verificar**

Run: `cd C:/PROYECTOS_DEV/RevCognition && npx tsc --noEmit && npm run build`
Expected: `sitemap.xml` generado con `xhtml:link rel="alternate" hreflang` para es/en/fr.

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(i18n): sitemap con alternates hreflang es/en/fr"
```

---

## Task 3: Language switcher + extracción `nav` / `footer`

**Files:**
- Create: `src/components/ui/LanguageSwitcher.tsx`
- Modify: `src/components/sections/Nav.tsx`
- Modify: `src/components/sections/Footer.tsx`
- Modify: `messages/{es,en,fr}.json` (namespaces `nav`, `footer`)

**Interfaces:**
- Consumes: `usePathname`, `useRouter` de `@/i18n/navigation`; `routing`.
- Produces: `<LanguageSwitcher />` reutilizable.

- [ ] **Step 1: Crear `src/components/ui/LanguageSwitcher.tsx`**

```tsx
"use client";

import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";

const LABELS: Record<string, string> = {es: "ES", en: "EN", fr: "FR"};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname(); // ruta SIN prefijo de locale
  const router = useRouter();

  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="Idioma / Language">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          aria-current={l === locale ? "true" : undefined}
          onClick={() => router.replace(pathname, {locale: l})}
          className={`px-1.5 py-1 rounded text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-1 ${
            l === locale
              ? "text-[var(--color-warm)]"
              : "text-[var(--color-slate-light)] hover:text-[var(--color-ink)]"
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
```
> `router.replace(pathname, {locale})` navega a la misma página en el otro idioma y next-intl fija la cookie `NEXT_LOCALE` → la elección manual prevalece sobre la auto-detección.

- [ ] **Step 2: Añadir namespaces `nav` y `footer` a los 3 catálogos**

Extraer de `Nav.tsx` (navLinks + botón + aria) y `Footer.tsx`. Claves ES (verbatim del código actual):
```jsonc
// es.json (añadir)
"nav": {
  "comoFunciona": "Cómo funciona",
  "producto": "Producto",
  "precios": "Precios",
  "accederApp": "Acceder a la App",
  "openMenu": "Abrir menú",
  "closeMenu": "Cerrar menú",
  "mainMenu": "Menú principal",
  "home": "RevCognition — inicio"
},
"footer": {
  "unsubscribe": "Darse de baja",   // ← verificar wording exacto en Footer.tsx al extraer
  "rights": "..."                    // ← extraer los strings reales visibles de Footer.tsx
}
```
> **Al implementar:** leer `Footer.tsx` completo y extraer sus strings reales (el grep mostró estructura pero no todo el copy legible). EN/FR redactados por convención. Mantener `mailto:` y el `subject=` como están (no traducibles aquí; el subject del mailto puede localizarse opcionalmente).

- [ ] **Step 3: Refactorizar `Nav.tsx`**

- Cambiar `navLinks` para leer labels de `useTranslations('nav')` (patrón B/A de la convención).
- Cambiar `<a href={l.href}>` internos y `<Link href="/">` por el `Link` de `@/i18n/navigation`.
- Sustituir `"Acceder a la App"`, aria-labels y `"RevCognition — inicio"` por claves `nav.*`.
- Insertar `<LanguageSwitcher />` en la barra desktop (junto a los navLinks) y dentro del drawer móvil.

- [ ] **Step 4: Refactorizar `Footer.tsx`**

- Sustituir strings visibles por `useTranslations('footer')`.
- Insertar `<LanguageSwitcher />` en el footer.
- Enlaces internos → `Link` de next-intl; `mailto:` se queda como `<a>`.

- [ ] **Step 5: Verificar**

Run:
```bash
cd C:/PROYECTOS_DEV/RevCognition && npm run i18n:check && npx tsc --noEmit && npm run build
```
Expected: parity OK; build OK. Grep de ausencia:
```bash
grep -n "Acceder a la App\|Cómo funciona" src/components/sections/Nav.tsx
```
Expected: sin resultados (ya no hardcodeado).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): language switcher + nav/footer localizados"
```

---

## Task 4: Sección Hero (EJEMPLO TRABAJADO COMPLETO)

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `messages/{es,en,fr}.json` (namespace `hero`)

**Interfaces:**
- Consumes: `useTranslations`. Sin producción nueva.

- [ ] **Step 1: Añadir el namespace `hero` a los 3 catálogos**

`es.json` (verbatim del componente actual):
```json
"hero": {
  "line1": "Nuevos clientes, cada semana.",
  "line2": "Sin agencias.",
  "line3": "Sin perder el tiempo.",
  "subtitle": "RevCognition identifica a tus clientes ideales y les escribe un mensaje único a cada uno. Tú no escribes nada. No pagas a ninguna agencia. Y no tienes que encontrar el tiempo.",
  "ctaPrimary": "Solicita acceso a la beta",
  "ctaSecondary": "Ver cómo funciona",
  "note": "Beta cerrada, plazas limitadas. Analizamos tu web y te preparamos una propuesta de perfil de cliente ideal antes de que decidas nada.",
  "signalCard": {
    "detected": "Señal detectada · hace 3 horas",
    "example": "Laboratorios Roca · Depósito OEPM rechazado · clase 5 · 04287391",
    "live": "En vivo"
  }
}
```
`en.json`:
```json
"hero": {
  "line1": "New clients, every week.",
  "line2": "No agencies.",
  "line3": "No wasted time.",
  "subtitle": "RevCognition identifies your ideal clients and writes each one a unique message. You write nothing. You pay no agency. And you don't have to find the time.",
  "ctaPrimary": "Request beta access",
  "ctaSecondary": "See how it works",
  "note": "Closed beta, limited seats. We analyze your website and prepare an ideal-customer-profile proposal before you decide anything.",
  "signalCard": {
    "detected": "Signal detected · 3 hours ago",
    "example": "Laboratorios Roca · OEPM filing rejected · class 5 · 04287391",
    "live": "Live"
  }
}
```
`fr.json`:
```json
"hero": {
  "line1": "De nouveaux clients, chaque semaine.",
  "line2": "Sans agence.",
  "line3": "Sans perdre de temps.",
  "subtitle": "RevCognition identifie vos clients idéaux et écrit à chacun un message unique. Vous n'écrivez rien. Vous ne payez aucune agence. Et vous n'avez pas à trouver le temps.",
  "ctaPrimary": "Demander l'accès à la bêta",
  "ctaSecondary": "Voir comment ça marche",
  "note": "Bêta fermée, places limitées. Nous analysons votre site et préparons une proposition de profil de client idéal avant que vous ne décidiez quoi que ce soit.",
  "signalCard": {
    "detected": "Signal détecté · il y a 3 heures",
    "example": "Laboratorios Roca · Dépôt OEPM rejeté · classe 5 · 04287391",
    "live": "En direct"
  }
}
```
> Nombres/códigos demo (`Laboratorios Roca`, `04287391`) se dejan; solo se traduce el chrome. Marcar en PR.

- [ ] **Step 2: Refactorizar `Hero.tsx`**

```tsx
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
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink)] leading-tight"
          >
            {t("line1")}{" "}
            <span className="text-[var(--color-warm)]">{t("line2")}</span>{" "}
            <span className="font-light">{t("line3")}</span>
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
```

- [ ] **Step 3: Verificar**

Run:
```bash
cd C:/PROYECTOS_DEV/RevCognition && npm run i18n:check && npx tsc --noEmit && npm run build && grep -n "Nuevos clientes, cada semana" src/components/sections/Hero.tsx
```
Expected: parity OK; tsc/build OK; grep sin resultados.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(i18n): sección Hero localizada es/en/fr"
```

---

## Tasks 5–10: Secciones de la home (mismo patrón que Task 4)

Cada una: (1) añadir su namespace a los 3 catálogos con el copy ES verbatim + EN/FR por convención; (2) refactorizar el componente a `useTranslations`; (3) verificar `i18n:check` + `tsc` + `build` + grep-ausencia; (4) commit `feat(i18n): sección <X> localizada es/en/fr`. Seguir la **Extraction Convention** (arrays → `t.raw('items')`).

### Task 5: `Problem.tsx` → namespace `problem`
Strings a extraer (ES verbatim): eyebrow `"El problema"`, heading `"¿Qué estás haciendo ahora?"`, intro `"Todas las opciones tienen un coste real..."`, array `items` (3 objetos `{label, cost, description}` — ver convención §B con el contenido real del componente), bloque RevCognition: eyebrow `"RevCognition"`, texto `"El sistema localiza prospectos..."`, `"0€ en agencias"`.

### Task 6: `HowItWorks.tsx` → namespace `howItWorks`
eyebrow `"Cómo funciona"`, heading `"Tres pasos. Luego el sistema trabaja solo."`, array `steps` (3 × `{number, title, description, time}` — `number` "01/02/03" se queda en código, es estructural; traducir `title/description/time`). **Mockups** (`MockupDiagnostico/Prospectos/Mensaje`): traducir el chrome (`"Perfil de cliente ideal"`, `"Prospectos"`, `"3 nuevos hoy"`, `"Empresa/Sector/Señal"`, `"Listo para enviar"`, `"Ver completo"`, etc. → subnamespace `howItWorks.mockups`); nombres propios demo se dejan.

### Task 7: `FeaturesGrid.tsx` → namespace `featuresGrid`
Heading `"Cómo encuentra a tus clientes"`, intro, grid de features (`{title, description}` × N: "Lee tu web", "Verifica correos y detecta señales de compra", "Un mensaje escrito para cada prospecto", "Tú apruebas lo que sale", "Las respuestas se clasifican solas", "De una respuesta a una reunión", "Seis remitentes con firma propia", "Dominio propio, calentado con paciencia", "Pagas por prospecto trabajado", "Trae tus propios contactos" + sus descripciones), CTA `"¿Ya tienes una lista? Súbela en CSV..."`. Ojo: `"Company sourcing matching your ICP"` ya está en inglés en el ES actual — en `es.json` va tal cual; en `en.json` igual; en `fr.json` traducir. Reportar al fundador esta mezcla EN-en-ES.

### Task 8: `UseCases.tsx` → namespace `useCases`
Heading + intro + 2 casos (`{sector, situationTitle, situationBody, solutionBody}`): "Gabinete de abogados de marcas", "Agencia de venta de espacios publicitarios", y los párrafos largos asociados.

### Task 9: `Pricing.tsx` → namespace `pricing`
eyebrow, heading, intro, 3 planes (`{name, tagline, price, ...}`: "Para empezar/crecer/escalar" + taglines), badges `"17% más barato por envío"` / `"23% más barato por envío"`, lista de features incluidas (SPF/DKIM/DMARC, calentamiento, clasificación de respuestas, Cal.com, seis remitentes…), notas fiscales al pie. **Cifras de precio y `%` se quedan** (estructural/numérico); traducir solo el texto.

### Task 10: `Founder.tsx` + `CtaFinal.tsx` → namespaces `founder`, `ctaFinal` (agrupadas, ambas pequeñas)
- `founder`: eyebrow, heading, párrafos del bloque fundador (leer el copy real del componente al extraer — el grep no mostró el texto largo), frase destacada final.
- `ctaFinal`: heading, subtítulo, CTA, nota legal con enlace.

---

## Task 11: Página Producto (`ServiciosB2B` NO — ver Task 12)

**Files:**
- Modify: `src/components/sections/Producto.tsx`
- Modify: `messages/{es,en,fr}.json` (namespace `producto`)

Es la sección **más densa** (16 features en 4 bloques: El motor / Entregabilidad y respuestas / El día a día + FAQ de 7 preguntas + mockups de calentamiento). Subnamespaces sugeridos: `producto.hero`, `producto.motor`, `producto.entregabilidad`, `producto.diaADia`, `producto.faq` (array de `{q, a}`), `producto.mockups`.

- [ ] **Step 1:** Leer `Producto.tsx` completo y mapear cada string a una clave bajo `producto.*` (ES verbatim). Incluye la FAQ (`"¿Acabaré en spam?"`, `"¿Cuánto control tengo?"`, `"¿De dónde salen los datos de los contactos?"`, `"¿En qué idioma escribe?"`, `"¿Funciona en mi sector o en mi país?"`, `"¿Qué cuesta?"`, `"¿Qué pasa cuando alguien responde?"` + respuestas largas). Chrome de mockups de calentamiento (`"Día 0"`, `"50 / día · pleno"`, `"Apertura/Cierre"`, `"Empresa Ejemplo amplía su equipo comercial"`, etc.) → `producto.mockups`.
- [ ] **Step 2:** Redactar EN/FR por convención. **Cuidado especial** con la FAQ de idioma (`"¿En qué idioma escribe?"` → la respuesta menciona que escribe en el idioma del destinatario; en FR/EN mantener el sentido).
- [ ] **Step 3:** Refactorizar `Producto.tsx` a `useTranslations('producto')` + `t.raw()` para FAQ/listas.
- [ ] **Step 4:** Verificar `i18n:check` + `tsc` + `build` + grep-ausencia de 3-4 strings clave.
- [ ] **Step 5:** Commit `feat(i18n): página Producto localizada es/en/fr`.

---

## Task 12: Página ServiciosB2B (`/soluciones/servicios-b2b`)

**Files:**
- Modify: `src/components/sections/ServiciosB2B.tsx`
- Modify: `messages/{es,en,fr}.json` (namespace `serviciosB2B`)

Segunda sección más densa (hero de segmento + 4-pasos "Cómo encuentra…" reutilizado con copy propio + stats "Correos enviados/Respuestas de interés/Reuniones agendadas" + FAQ de 4). Subnamespaces: `serviciosB2B.hero`, `serviciosB2B.steps`, `serviciosB2B.stats`, `serviciosB2B.faq`. Mismo ciclo que Task 11. Nota: contiene labels en inglés en el ES actual (`"Contact discovery & email verification"`, `"Reply detection & sentiment"`, `"Unsubscribe & compliance handling"`) — en `es.json` van verbatim; reportar al fundador.

- [ ] **Steps 1–5:** idénticos en estructura a Task 11 (leer completo → mapear ES → redactar EN/FR → refactor → verificar → commit `feat(i18n): página ServiciosB2B localizada es/en/fr`).

---

## Task 13: Páginas `gracias` + `privacy` (agrupadas)

**Files:**
- Modify: `src/app/[locale]/gracias/page.tsx`, `src/app/[locale]/privacy/page.tsx`
- Modify: `messages/{es,en,fr}.json` (namespaces `gracias`, `privacy`)

Son **server components** (páginas) → usar `getTranslations` (convención §C), no `useTranslations`.

- [ ] **Step 1:** Leer ambas páginas. `gracias` es corta (confirmación). `privacy` es **texto legal denso** — mapear por secciones (`privacy.sections` array de `{heading, body}`). ES verbatim.
- [ ] **Step 2:** Redactar EN/FR. El texto legal debe traducirse con precisión; marcar claramente para revisión del fundador (posible revisión jurídica posterior). Los datos de contacto/empresa (email, nombre legal) **no** se traducen.
- [ ] **Step 3:** Refactor a `getTranslations`. Añadir `setRequestLocale(locale)` (ya en Task 1 Step 10, verificar presente).
- [ ] **Step 4:** Verificar `i18n:check` + `tsc` + `build`.
- [ ] **Step 5:** Commit `feat(i18n): páginas gracias + privacy localizadas es/en/fr`.

---

## Task 14: Verificación final + gate de revisión

**Files:** ninguno (verificación).

- [ ] **Step 1: Paridad + build de producción edge**

Run:
```bash
cd C:/PROYECTOS_DEV/RevCognition && npm run i18n:check && npx tsc --noEmit && npx @cloudflare/next-on-pages
```
Expected: parity OK; sin errores TS; build `next-on-pages` (edge, middleware incluido) exitoso → `.vercel/output/static`.

- [ ] **Step 2: Grep global de strings ES residuales**

Run:
```bash
grep -rnE '"[¿¡][A-Za-zÁÉÍÓÚáéíóúñ]|[a-záéíóú] (que|con|para|sin|los|las) ' src/components src/app --include="*.tsx" | grep -v "className\|aria-\|useTranslations\|t(\|t\.raw" | head -40
```
Expected: sin copy visible hardcodeado (solo clases/atributos). Investigar cualquier hallazgo.

- [ ] **Step 3: Dogfood renderizado (gstack)**

Levantar `npm run dev` y con gstack (o `/browse`) verificar:
- `/`, `/producto` → español, URLs sin prefijo intactas.
- `/en`, `/en/producto` → inglés. `/fr`, `/fr/producto` → francés.
- **Switcher**: pulsar EN/FR en Nav navega a la misma página en el idioma elegido y persiste al recargar (cookie).
- **Auto-detección**: request con header `Accept-Language: fr` a `/` → sirve francés (redirige a `/fr`). Con `en` → `/en`. Con `es`/otro → raíz español.
- **`<html lang>`** correcto por locale; `hreflang` alternate (es/en/fr + x-default) y `canonical` auto-referente presentes en el `<head>` de la home en los 3 idiomas.
- **No-regresión ES**: el copy español es idéntico al de producción actual.

- [ ] **Step 4: Gate de revisión del fundador**

Presentar `messages/en.json` + `messages/fr.json` (o un render de las 3 versiones) para revisión. Recoger correcciones de tono/marca, aplicarlas, re-verificar `i18n:check`. **No mergear a `main` sin este OK.**

- [ ] **Step 5: Documentar + cerrar rama**

Actualizar `README.md` (sección i18n: catálogos en `messages/`, cómo añadir un idioma, `npm run i18n:check`). Seguir `superpowers:finishing-a-development-branch` para el merge a `main` (que dispara el auto-deploy de Cloudflare Pages).

---

## Self-Review (cobertura del spec)

- **D1 alcance landing** → Tasks 1-13 solo tocan RevCognition. ✅
- **D2 URLs as-needed (ES raíz)** → Task 1 (routing `localePrefix: 'as-needed'`, Step 2). Verificado Task 14 Step 3. ✅
- **D3 copy EN/FR Claude + gate fundador** → Tasks 4-13 redactan; Task 14 Step 4 gate. ✅
- **D4 auto-detección** → Task 1 Step 5 (middleware `localeDetection` default). Verificado Task 14 Step 3. ✅
- **D5 switcher** → Task 3. ✅
- **D6 next-intl** → Task 1. ✅
- **SEO hreflang/canonical/og:locale** → Task 1 Step 9 (`generateMetadata`). **sitemap** → Task 2. ✅
- **Paridad de claves fail-closed** → Task 1 Step 12 (`check-i18n-parity.mjs`), corre en cada task. ✅
- **Enlaces locale-aware** → convención §D; aplicado en Task 3 (Nav/Footer) y secciones. ✅
- **`/analisis` redirect preservado** → Task 1 Step 6 (+ variante locale) y matcher excluye `/analisis`. ✅
- **No-regresión ES** → Task 14 Step 3. ✅
