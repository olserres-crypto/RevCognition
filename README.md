# RevCognition — Landing Page

Landing page de [revcognition.com](https://revcognition.com). Next.js 15 + Tailwind CSS v4 + Framer Motion. Desplegado en Vercel.

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Estilos:** Tailwind CSS v4 + CSS custom properties
- **Animaciones:** Framer Motion
- **Pagos:** Stripe Checkout Sessions
- **Email:** Resend
- **Deploy:** Vercel (auto-deploy desde `main`)

## Estructura

```
src/
├── app/
│   ├── page.tsx              # Home (landing principal)
│   ├── analisis/page.tsx     # Formulario de análisis gratuito de ICP
│   ├── gracias/page.tsx      # Página de confirmación post-pago
│   └── api/
│       ├── checkout/         # POST → crea sesión de Stripe Checkout
│       └── analisis/         # POST → envía email via Resend
├── components/
│   ├── sections/             # Secciones de la landing
│   └── ui/                   # Componentes reutilizables
```

## Variables de entorno

Crea un `.env.local` en la raíz con:

```
STRIPE_SECRET_KEY=sk_test_...
RESEND_API_KEY=re_...
```

En producción, configura estas variables en el dashboard de Vercel.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).
