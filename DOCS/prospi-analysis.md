# Análisis de referencia: prospi.ai

Fecha: 2026-04-23. Análisis visual + DOM. No se ha copiado ningún asset ni texto.

---

## 1. Patrones editoriales identificados

### Patrón A — Mockup de dos paneles por paso (el más potente)

En la sección "From ZERO to Booked Calls in 5 Easy Steps", cada paso del proceso
tiene a su izquierda el copy (número, título, descripción) y a su derecha una
tarjeta con **dos mini-UIs en paralelo**:

- Panel izquierdo del mockup: el input del usuario (formulario, lista de leads, configuración)
- Panel derecho del mockup: el output de la herramienta (respuesta de IA, análisis, resultado)

Esto hace tangible la relación causa-efecto de cada paso sin necesidad de video.
El usuario ve exactamente qué pone y qué obtiene.

### Patrón B — Feature card con icon badge + mini-UI

En "Everything you need to scale outbound", cada capacidad se presenta como una
tarjeta que contiene:
1. Un badge de icono con gradiente naranja
2. Título (13px, weight 590) + subtítulo en gris
3. Una mini-UI que simula la función: buscador con filtros activos, tabla de datos,
   lista de resultados, etc.

El efecto es que el usuario entiende qué hace cada feature sin leer la descripción.

### Patrón C — Hero con artefacto central

El hero no es solo texto + CTA. Debajo del título hay un dashboard screenshot (JPG)
con un gráfico de actividad superpuesto en canvas. No es interactivo, pero ancla
la promesa visual del producto.

### Patrón D — Mockup móvil como cierre

Antes del footer, una sección de "Close Deals From Your Pocket" muestra un mockup
de teléfono con la UI del inbox dentro. El teléfono es HTML/CSS puro, no imagen.
Sirve para materializar el contexto de uso (en movimiento).

---

## 2. Técnica de implementación

### Stack técnico confirmado

**Prospi**: Next.js + Tailwind CSS + Lucide React + inline styles de precisión.
**RevCognition**: Next.js 15 + Tailwind v4 + Framer Motion + Lucide React.

Son prácticamente el mismo stack. Los patrones son trasladables sin fricción.

### Anatomía del mockup de paso (el más usado)

```html
<!-- Contenedor del mockup -->
<div class="w-[280px] rounded-[12px] overflow-hidden relative select-none"
     style="
       box-shadow: 0 4px 32px 0 rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.06);
       background: linear-gradient(180deg, #ffffff 0%, #fefaf8 100%);
       font-feature-settings: 'cv01', 'ss03';
     ">

  <!-- Titlebar (chrome del app) -->
  <div class="h-[48px] flex items-center px-6"
       style="border-bottom: 0.5px solid rgba(0,0,0,0.06)">
    <img src="/logo.svg" width="20" height="20" />
    <span style="font-size:12px; font-weight:590; color:#0a0a0a">NombreApp</span>
    <span class="ml-auto" style="font-size:11px; color:#8a8f98">Paso 2 de 3</span>
  </div>

  <!-- Contenido -->
  <div class="p-6">
    <!-- Label de campo -->
    <div style="font-size:10px; color:#62666d; font-weight:510; margin-bottom:4px">
      Nombre de empresa
    </div>
    <!-- Input simulado -->
    <div class="h-[32px] rounded-[6px] px-3 flex items-center"
         style="border: 0.5px solid rgba(0,0,0,0.08); background:#fff">
      <span style="font-size:12px; color:#0a0a0a">Bufete García & Asociados</span>
    </div>
    <!-- Tag/pill de estado (acento) -->
    <span style="
      font-size:10px; font-weight:510;
      color: var(--color-accent);
      background: rgba(var(--accent-rgb), 0.06);
      border: 0.5px solid rgba(var(--accent-rgb), 0.1);
      padding: 3px 8px; border-radius: 4px;
    ">Activo</span>
  </div>
</div>
```

### Tokens de estilo clave

| Token | Valor Prospi | Notas |
|-------|-------------|-------|
| Font weight normal | 510 | Variable font — entre regular y medium |
| Font weight semibold | 590 | Variable font — entre medium y semibold |
| Label color | #8a8f98 | Gris azulado apagado |
| Text color | #0a0a0a | Near-black |
| Border | 0.5px solid rgba(0,0,0,0.08) | Ultra-sutil |
| Card shadow | 0 4px 32px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.06) | Halo suave + borde fantasma |
| Card background | linear-gradient(180deg, #fff 0%, #fefaf8 100%) | Cálido pero casi invisible |
| Acento naranja | #F6470E | NO COPIAR — es su identidad |
| Font sizes mockup | 9px / 10px / 11px / 12px / 13px | Escala densa, UI simulada |

### SVGs y canvas

- 143 SVGs en página — todos son iconos Lucide, no ilustraciones
- 3 canvas — gráficos de curva (probablemente Chart.js)
- 0 imágenes dentro de los mockups de paso — todo es HTML/CSS
- La única imagen real es `dashboard.jpg` en el hero

---

## 3. Qué NO copiar

| Elemento | Por qué no |
|----------|-----------|
| Color naranja #F6470E | Es su identidad de marca. Usar el índigo de RevCognition |
| Copy en inglés sobre "cold email" y "leads database" | Producto diferente, público diferente |
| Las métricas "325M+ leads", "98.2% accuracy" | No aplicables. Inventar métricas sería engañoso |
| La estructura de 5 pasos lineales | Su proceso tiene lógica de SaaS de autoservicio; el mío es consultivo |
| El tono de "sin agencias, sin vendedores" | Prospi ataca al SDR. RevCognition vende a quien ES el vendedor |
| El mockup del teléfono móvil | No hay app móvil — no crear expectativas falsas |
| Avatar y nombres inventados de leads | Usar ejemplos del mercado español real |

---

## 4. Oportunidades concretas para RevCognition

### Oportunidad 1 — "Cómo funciona": mockup de diagnóstico

Actualmente el paso 1 ("Escucho") es solo texto. Un mockup que muestre
el artefacto entregado (un mapa de puntos de dolor de un despacho de abogados,
por ejemplo) hace tangible qué recibirá el cliente al final del paso.

**Qué mostrar**: Una tarjeta tipo "Informe de diagnóstico" con nombre del cliente
(ficticio, mercado español), 3-4 hallazgos categorizados, nivel de urgencia por
hallazgo. Sin imitar el look naranja de Prospi.

### Oportunidad 2 — "Cómo funciona": mockup de estrategia

El paso 2 ("Diseño") es abstracto. Un mockup que muestre un roadmap de
90 días con hitos concretos (semana 1: X, mes 2: Y) haría que el cliente
visualice lo que está comprando antes de comprarlo.

**Qué mostrar**: Una tabla o timeline compacto con fases, hitos y entregables.
Datos de ejemplo de una consultoría de recursos humanos española.

### Oportunidad 3 — Hero con artefacto central

El hero actual es solo tipografía. Una tarjeta de "resultado" (ej: "Rodrigo aumentó
un 40% su tasa de cierre en 8 semanas") con su contexto visual haría que la promesa
sea concreta desde el primer scroll.

**Qué mostrar**: Un mini-card de resultado, no un dashboard complejo.
Un antes/después o una métrica con contexto. Sobrio, sin números inventados.

### Oportunidad 4 — Sección de capacidades con feature cards

RevCognition ofrece análisis, estrategia y ejecución. Cada uno podría tener
una feature card con icon badge (en índigo, no naranja) y un mini-artefacto
que muestre qué produce esa capacidad.

**Qué mostrar**: Card "Análisis" → extracto de informe. Card "Estrategia" → fragmento
de plan de acción. Card "Ejecución" → check de hitos cumplidos.

### Oportunidad 5 — Comparativa "Agencia vs RevCognition"

Prospi hace una comparativa de "reply rate vs positive reply rate". RevCognition
podría hacer algo similar: "Agencia tradicional vs trabajo directo conmigo".
No como ataque, sino como diferenciación de modelo.

---

## 5. Copy y mensajes de referencia (para inspiración, no copia)

### Estructura de página de producto (patrón que repiten en cada sub-página)

```
1. Headline: beneficio directo (no nombre de feature)
2. Subheadline: mecanismo — el HOW en una frase
3. Tres métricas sociales: numéricas, contrastivas
4. Bloques de feature: título + 3-4 bullets concretos + mini-mockup
5. Testimonial con nombre, cargo, empresa y métrica
6. CTA de cierre: urgencia baja, promesa concreta
```

### Para consultores (público más parecido a RevCognition)

**Headline hero**: "Fill your pipeline without the hustle"
**Subheadline**: "You're great at what you do — but finding clients shouldn't be a full-time job"
**Promesa**: "Prospi automates your outreach so you can focus on delivering results for the clients you already have"
**Métricas**: 15+ Meetings/Month · $152 Per Meeting Cost · 0 SDRs Needed

Bloques de feature con sus titulares:
- "Find Your Ideal Clients" — filtros, ICP, señales de intención
- "Sound Like You Not a Robot" — tono auténtico, sin plantillas
- "Clients Come to You" — set up once, runs forever; AI categoriza, tú solo hablas con interesados

**Qué adaptar para RevCognition**:

| Prospi (inglés, SaaS) | RevCognition (español, servicio) |
|---|---|
| "Fill your pipeline without the hustle" | "Consigue clientes sin depender de agencias ni SDRs" |
| "You're great at what you do — but finding clients is hard" | "Eres bueno en lo tuyo. Vender tus servicios es otro oficio." |
| "Sound Like You Not a Robot" | "Una estrategia comercial que suena como tú, no como una consultora de Madrid" |
| "Clients Come to You" | "Tu mejor cliente ya existe. Solo hay que encontrarle." |
| "0 SDRs Needed" | "Sin equipo de ventas. Sin agencia. Solo tú y un sistema." |
| "Set it up once, let it run" | No aplica — servicio, no SaaS |

### AI Personalization — copy de features

**Headline**: "Every cold email feels like it was written just for them"
**Mecanismo**: "researches each prospect's company, funding, tech stack, hiring activity — not generic templates"
**Diferenciador negativo**: "0 Templates Used" (la clave: el contraste contra lo genérico)

Bullets de feature que inspiran:
- "AI learns your tone and value proposition"
- "References specific company details in every email"
- "Adapts tone to match industry and seniority"
- "Self-Improving AI: what gets replies gets amplified"

**Capacidades listadas** (para mapear a RevCognition):
- Website Analysis — extraer posicionamiento, productos, mensajes
- Job Post Mining — señales de crecimiento y dolor
- Blog & News Scanning — ganchos de personalización oportunos
- Funding & Growth Signals — priorizar prospectos de alta intención
- Tech Stack Detection — detectar oportunidades de desplazamiento

### Smart Inbox — copy de features

**Headline**: "One inbox for every reply across every campaign"
**Promesa de tiempo**: "We used to spend 2 hours a day sorting replies. Now it takes 10 minutes"
**Categorización**: Interested · Meeting Booked · Not Now · Not Interested

Bullets que inspiran (por mecanismo, no por copia):
- "Respond before the prospect forgets about you"
- "Context-aware reply generation — maintains conversation context across threads"
- "AI categorizes replies so you only see interested leads"

### Email Sequencing — copy estructural

**Stats como diferenciadores**: 68% Avg Open Rate · 12% Reply Rate · 40 Emails/Day/Account
**Promesa**: "Launch campaigns that land in inboxes and book meetings"
**Anti-patrón**: "No technical skills required"

Bullets estructurales (para adaptar al contexto de entregables de consultoría):
- "Set it up in an afternoon — runs indefinitely"
- "Conditional branching based on engagement"
- "Winning variant auto-promoted"

### Testimoniales — patrón de formato

Todos siguen: cita directa con métrica → nombre → cargo en empresa real

Ejemplos del patrón:
> "We stopped paying for three separate data tools. Prospi's database has better coverage and the verification actually works." — Tom Patterson, Founder at WKND Digital

> "The smart inbox changed how we handle responses. We used to spend 2 hours a day sorting replies. Now it takes 10 minutes." — Nick S., Partner at BAD Marketing

> "Our reply rates went from 3% to 15% overnight." — Justin Stayrook, Head of Growth at Eyemagine

**Para RevCognition**: el formato funciona. Adaptar con clientes españoles reales o ficticios verosímiles (bufetes, consultorías RR.HH., asesorías fiscales).

### Métricas de contraste (patrón de 3 stats en hero/feature)

Prospi usa siempre 3 métricas numéricas contrastivas bajo el hero:
- Un número positivo grande (reach, volume, accuracy)
- Un ratio que vence a la industria
- Un cero que elimina un pain

Para RevCognition:
- "8 semanas" (tiempo medio hasta primer cliente nuevo)
- "Sin equipo de ventas" (el cero de Prospi)
- Pendiente de definir la tercera con datos reales

---

## 6. Mapeo de funcionalidades Prospi → RevCognition

| Funcionalidad Prospi | Equivalente RevCognition | Qué mostrar en el mockup |
|---|---|---|
| Lead Database (búsqueda de ICP) | Análisis de mercado + perfil de cliente ideal | Tabla de segmentos, filtros por sector/tamaño/rol |
| AI Personalization (emails únicos) | Mensajes de captación personalizados por sector | Card con prospecto ficticio español + mensaje adaptado |
| Email Sequencing (campañas automáticas) | Cadencia de contacto diseñada + seguimiento | Timeline de 3 pasos con delays y condiciones |
| Smart Inbox (categorización de replies) | Sistema de seguimiento de oportunidades | Lista categorizada: Interesado · Reunión · En espera |
| Deliverability Engine (inbox placement) | Diagnóstico de posicionamiento / propuesta de valor | Checklist de elementos validados |
| Mobile App (respuesta rápida) | No aplica — no hay app | — |

### Funcionalidades de RevCognition sin equivalente en Prospi

- Diagnóstico inicial de negocio (RevCognition lo hace, Prospi no)
- Definición de propuesta de valor (el "por qué yo" del fundador)
- Estrategia de contenido y posicionamiento (Prospi solo hace outbound)
- Acompañamiento en cierre de ventas (Prospi solo genera replies)

Estos son los diferenciadores reales. El mockup de "diagnóstico" (Oportunidad 1) no tiene equivalente visual en Prospi — es territorio propio de RevCognition.

---

## 8. Resumen de implementación recomendada

El patrón más valioso es el **mockup de dos paneles por paso** (Patrón A).

Para RevCognition, adaptado:
- Cada paso de "Cómo funciona" tiene un mockup a la derecha del copy
- El mockup muestra el artefacto entregado en ese paso (no el proceso interno)
- HTML/CSS puro con Tailwind v4 + inline styles — mismo stack, cero imágenes
- Paleta: índigo de RevCognition en lugar del naranja de Prospi
- Textos en español, ejemplos de bufetes, consultorías, PYMEs españolas
- Sin métricas inventadas: solo estructura visual realista

Empezar por la sección "Cómo funciona" (paso 1) antes de tocar hero o features.
