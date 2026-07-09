# RevCognition — Landing Page

Web de presentación de [revcognition.com](https://revcognition.com). Next.js 15 + Tailwind CSS v4 + Framer Motion. Es una web estática de marketing: no procesa pagos ni formularios. Toda conversión (solicitar acceso a la beta, elegir pack, activar la cuenta) enlaza a la app en `https://app.revcognition.com`.

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Estilos:** Tailwind CSS v4 + CSS custom properties (tokens en `src/app/globals.css`)
- **Animaciones:** Framer Motion
- **Deploy:** Cloudflare Pages vía [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages) (auto-deploy desde `main`)

No hay Stripe, ni Resend, ni backend en este repo. `/analisis` es un `redirect` a la app (ver `next.config.ts`), no un formulario.

## Estructura

```
src/
├── app/
│   ├── page.tsx              # Home (landing principal)
│   ├── producto/page.tsx     # Detalle de producto (16 features en 4 bloques + FAQ)
│   ├── gracias/page.tsx      # Confirmación (enlazada desde la app)
│   ├── privacy/page.tsx      # Política de privacidad
│   ├── layout.tsx            # Metadata/OG, fuentes, skip-to-content, CF Web Analytics (env-gated)
│   └── globals.css           # Tokens @theme + reset
├── components/
│   ├── sections/             # Secciones de la landing y de /producto
│   ├── providers/            # MotionProvider (reducedMotion="user")
│   └── ui/                   # Button, Logo, EmailPreviewCard, MockupShell
```

Sistema de diseño en `DESIGN.md`; voz y contenido en `PRODUCT.md`. Los claims de producto derivan de `Growth_Engine/docs/content/FEATURE_INVENTORY.md` (fuente única).

## Desarrollo local

```bash
npm install
npm run dev            # http://localhost:3000
npm run lint           # ESLint
npx tsc --noEmit       # Typecheck
```

## Build de deploy (Cloudflare Pages)

El build real que se despliega usa el adaptador de Cloudflare, no `next build` a secas:

```bash
npx @cloudflare/next-on-pages     # genera .vercel/output/static (ver wrangler.toml)
```

`wrangler.toml` apunta `pages_build_output_dir` a `.vercel/output/static` con `nodejs_compat`. El `vercel` CLI en `devDependencies` es solo tooling de build que usa `next-on-pages` internamente; **no se despliega en Vercel**.

## Variables de entorno

Todas opcionales. Sin ellas la web funciona igual.

```
NEXT_PUBLIC_CF_ANALYTICS_TOKEN=...   # Token de Cloudflare Web Analytics.
                                     # Sin token no se inyecta el script (cero medición, cero riesgo).
```

Para activar la medición: crear el site en Cloudflare Web Analytics → copiar el token → añadir la env var en el proyecto de CF Pages → redeploy. Como alternativa sin código, el toggle nativo de Web Analytics a nivel de zona/Pages también funciona.
