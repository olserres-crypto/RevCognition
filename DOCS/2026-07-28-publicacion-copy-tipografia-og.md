# Publicación 2026-07-28 — copy, tipografía y Open Graph

**`main` publicado en `d2f0730`.** Cuatro merges `--no-ff`, revertibles por separado con
`git revert -m 1 <sha>`. Deploy: GitHub Action "Deploy to Cloudflare Pages" run `30403123421`,
`completed success`.

| Merge | Rama | Contenido |
|---|---|---|
| `e185002` | `fix/pricing-unit-and-renewal` | unidad de precio, setup pago único, renovación, FAQ |
| `0416243` | `fix/comparative-claim` | retirada de "resultados nulos" |
| `9402ae7` | `feat/hero-referrals` | hero de recomendación, metadatos SEO, OG por idioma |
| `d2f0730` | `chore/typography-sans` | retirada del serif + Instrument Sans aplicada |

Sin conflictos. `Hero.tsx` lo resolvió git solo: `feat/hero-referrals` toca los spans (líneas
44-46) y `chore/typography-sans` la clase del `h1` (línea 42). Verificado a mano que quedaron
**las dos cosas**: `line1Accent` presente y `font-serif` ausente.

## Verificado en producción tras el deploy

- `h1` computa a `"Instrument Sans", "Instrument Sans Fallback", …` y `--font-sans` resuelve
  en `:root` (antes: `ui-sans-serif` del preflight).
- Etiquetas de precio: `1,00 € / prospecto`, `0,83 €`, `0,77 €`, y "más barato por prospecto" ×2.
- Setup declara pago único; "Renovación del dominio: 20€" presente; la viñeta ya dice
  "Compra y configuración del dominio".
- FAQ de `/producto`: "packs de prospectos" y la renovación mencionada.
- `og:image` por idioma: `/og-es.png`, `/og-en.png`, `/og-fr.png`.
- Columna de agencias: "sin ver lo que se envía".

## Los dos hallazgos que cambiaron el encargo

**No había cobro mal etiquetado en la renovación de dominio.** No existe ningún cobro al cliente
por renovación, ni bien ni mal etiquetado; ningún dominio ha renovado (el más próximo caduca
2027-04-24). Los 8 `INCOME_SETUP_FEE` que parecían renovaciones son de la org del fundador. Vive
en Growth_Engine como B-634, fuera del alcance de esta publicación.

**Ni Fraunces ni Instrument Sans se aplicaban.** `next/font` cuelga su variable del `<body>`, pero
el `@theme` de Tailwind v4 la resuelve en `:root`. La sustitución fallaba, `--font-sans` quedaba
inválida y todo caía al `ui-sans-serif` del preflight. El encargo pedía retirar el serif; retirarlo
sin más habría dejado el sitio en la sans del sistema, que no es una decisión tipográfica. Por eso
la corrección va en dos commits separados (`3182c19` retirada del serif, sin cambio visual;
`03e49c4` variable al `<html>`, que sí cambia el aspecto de todo el sitio).

## Correcciones a informes anteriores de esta sesión

- Reporté los literales `hero.emailPreview.fromValue` en la tarjeta del hero como bug visible en
  producción. **Es solo de dev**: producción los renderiza bien.
- Al justificar la migración de B-634 dije que el fichero de referencia del CHECK enumeraba 24
  valores. Es cierto de `bb3` (mayo), pero el vigente es `wave1` con 40. Leer el constraint en
  vivo seguía siendo lo correcto; el peligro estaba exagerado.

## Queda abierto en este repo

Ver `TODOS.md` §Tipografía: `public/design-preview.html` sigue con el titular retirado y es
público; y `font-light` en el wordmark no rinde 300 porque solo se cargan 400/500/600.

## Fuera de alcance, sin tocar

Growth_Engine: `b634-domain-renewal` y `b799-funnel-window` siguen sin mergear y la migración de
B-634 sin aplicar en producción.
