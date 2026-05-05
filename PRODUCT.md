# RevCognition — PRODUCT.md

> **Nota de superficie.** Este repositorio es la **web de presentación** del producto que se está construyendo en `Growth_Engine/`. El producto subyacente es el mismo; este documento es una copia espejo del `Growth_Engine/PRODUCT.md` con el register ajustado a esta superficie.
>
> **Register efectivo aquí**: `brand` — la web es marketing/landing, el diseño ES el producto en este surface. Cualquier mención a "product UI" más abajo debe interpretarse como contexto del producto que esta web presenta, no de esta web.

## Register

**brand** (en este repositorio) — landing / marketing site para el producto Growth Engine. La página presenta, no opera.

(Para el producto en sí, ver `Growth_Engine/PRODUCT.md` → register: product.)

## Users

**Primary user**: solo founder or revenue lead at a B2B SaaS / service company doing 10–500 employees. Technical literacy is uneven (some are ex-engineers, some are pure GTM). All are time-poor and skeptical of marketing automation tools because most are bloated.

They're already running outbound (or burned by trying). They want:
- AI does the heavy lifting (research + drafting) but THEY stay in control of approval.
- Daily rhythm: one short review session a day, not a constant configuration burden.
- Transparency about what the AI extracted (Brain editor) — they want to fix what's wrong.
- Verifiable quality (can SEE the email before it sends, can SEE who's in the queue).

**Secondary user**: same role at a Latin America–targeted consultancy / service business (the V0 is brlatina, an IP services firm in LATAM). Spanish UI not yet shipped — copy is in English with brand voice that respects regional sales culture.

**Anti-user**: marketing teams at 500+ employee companies who buy enterprise stacks. Not for them — they need integrations + per-seat pricing + governance dashboards we deliberately don't have.

## Product purpose

Replace "spend $2k/month on Apollo + Lemlist + Clay + a junior SDR" with one tool that:
1. Sources companies matching your ICP (Apollo + LLM scoring)
2. Finds + verifies contacts
3. Generates personalized cold emails using AI that reads your website and the prospect's signals
4. Sends through warm domains we provision per-customer (no shared IP)
5. Lets you approve daily batches before they go out
6. Tracks replies + sentiment + bookings (Cal.com integration)

The product's truth: most outbound sucks because the SDR is junior, time-strapped, and using templates. We replace the SDR's mechanical work with AI but keep the founder's taste in the loop via daily approval.

## Brand

**Name**: RevCognition (parent brand). Internal product working name: Growth Engine.

**Tone**: editorial, calm, respectful of the user's time. Not playful, not corporate. Closer to Stripe Docs than Mailchimp. Numbers + names where possible. No exclamation marks. No "magic" claims.

**Voice anchors** (web copy en castellano — ver DESIGN.md sección "Voz y tono"):
- "Sin agencias. Sin perder el tiempo." → no "🎉 ¡Empieza ya!"
- "Setup único: 50€. Se paga una sola vez." → no "Precios competitivos a partir de…"
- "Beta cerrada · 2 fundadores" → no "Ya nos usan más de 500 empresas"

## Anti-references

What we are NOT:
- **Not Lemlist / Apollo / Outreach** — those are tool collections; we're a single integrated workflow.
- **Not HubSpot** — too heavy, too configurable, too "platform-y". We're opinionated.
- **Not Clay** — they're a powerful workbench for ops people; we're a finished product for founders.
- **Not Mailchimp / Brevo** — those are broadcast email; cold B2B sales is a different game.

Visual anti-references (críticos para el AI slop test del audit):
- ❌ Purple-blue gradients (Apollo, Lemlist generic SaaS reflex)
- ❌ Hero metric tiles (the "12,847 emails sent ↑8.2%" template)
- ❌ Identical icon-card grids on every settings page
- ❌ Glassmorphism, neon, "premium dark" aesthetic
- ❌ Stock illustration mascots of paper planes / rockets / charts
- ❌ Mockups con chrome de macOS (los puntos rojo/amarillo/verde) — explícitamente prohibidos en EmailPreviewCard

## Strategic principles

1. **Approval-gated, not auto-pilot.** The user approves what goes out. Always. No "AI sends without you noticing".
2. **One canonical view per concept.** The Brain has one editor (not "Strategy" tab + "Identity" tab + "Voice" tab fragmented). The Approval Center is one screen.
3. **Daily rhythm > continuous configuration.** Tools that demand constant tweaking lose. We want a 5-minute daily review and the rest happens.
4. **Surface real numbers, not vanity.** If we show "12 leads queued", they really are 12. Counts before progress bars before percentages before icons.
5. **Defer to existing user habits.** If they already have Calendly, accept Calendly. If they have a domain, transfer it. Don't force them into our walled garden.

## Design palette (existing tokens, do not invent new)

Para esta superficie web ver `DESIGN.md` (Editorial Moderno — RevCognition Design System). Tokens canónicos en `src/app/globals.css` bajo `@theme`. Tipografía: Fraunces (serif display) + Instrument Sans (body). Acento único: `warm` (#6366f1).

Surface convention en este repo: bandas alternadas `paper`/`surface`, contenedor `max-w-5xl`, eyebrow UPPERCASE en `warm` sobre cada sección. Lee como long-form post.
