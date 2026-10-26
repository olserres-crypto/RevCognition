// B-2447: el hero tiene que salir VISIBLE del servidor. Si el HTML trae
// `opacity:0` en el hero, el H1 (elemento LCP) no se pinta hasta que hidrata
// el JS, y sin JS (crawler, JS bloqueado, fallo de hidratacion) queda en blanco.
//
// B-2463: lo mismo para TODA la pagina (secciones bajo el pliegue con
// whileInView): ningun `opacity:0` ni clase `opacity-0` en el HTML servido. Las
// entradas al hacer scroll van por <Reveal>, que oculta solo en cliente.
//
// Uso: node scripts/check-hero-ssr.mjs [home.html ...] [--page otra.html ...]
// Sin argumentos lee el prerender de `next build`: .next/server/app/{es,en,fr}.html
// (hero + pagina). `--page` comprueba solo la pagina, para rutas dinamicas sin
// prerender (p. ej. /producto guardado con curl desde `next start`).
import {readFileSync, existsSync} from "node:fs";

const args = process.argv.slice(2);
const pageFlag = args.indexOf("--page");
const homeArgs = pageFlag >= 0 ? args.slice(0, pageFlag) : args;
const pageArgs = pageFlag >= 0 ? args.slice(pageFlag + 1) : [];
const pages = [
  ...(homeArgs.length || pageArgs.length
    ? homeArgs
    : ["es", "en", "fr"].map((l) => `.next/server/app/${l}.html`)
  ).map((file) => ({file, hero: true})),
  ...pageArgs.map((file) => ({file, hero: false})),
];

// `opacity:0` en linea, sin contar fill-opacity/stop-opacity (SVG) ni 0.5.
const STYLE_HIDDEN = /(?<![\w-])opacity:\s*0(?![.\d])/g;

let failed = 0;
for (const {file, hero: checkHero} of pages) {
  if (!existsSync(file)) {
    console.error(`FALTA ${file} (corre antes npm run build)`);
    failed++;
    continue;
  }
  const html = readFileSync(file, "utf8");
  const problems = [];
  let rest = html;
  if (checkHero) {
    const start = html.indexOf("<section");
    const end = html.indexOf("</section>", start);
    const hero = start >= 0 && end > start ? html.slice(start, end) : "";
    // El resto de la pagina se mira abajo sin el hero, para no contar dos veces.
    if (hero) rest = html.slice(0, start) + html.slice(end);
    if (!hero.includes("<h1")) problems.push("la primera <section> no contiene el <h1>");
    const hidden = hero.match(STYLE_HIDDEN) ?? [];
    if (hidden.length) problems.push(`${hidden.length} estilo(s) opacity:0 en el hero`);
    // Ocultacion por clase (Tailwind opacity-0, con o sin variante) en el hero.
    const hiddenClass = hero.match(/class="[^"]*\bopacity-0\b[^"]*"/g) ?? [];
    if (hiddenClass.length) problems.push(`${hiddenClass.length} elemento(s) con clase opacity-0 en el hero`);
    // La entrada CSS (.hero-rise) es solo para la columna de producto: si envuelve
    // al H1, el LCP vuelve a esperar a la animacion.
    const beforeH1 = hero.slice(0, Math.max(0, hero.indexOf("<h1")));
    if (/\bhero-rise\b/.test(beforeH1)) problems.push("el <h1> esta dentro de .hero-rise");
  }
  // Resto de la pagina (B-2463), sobre el HTML tal cual: la misma cuenta que el
  // censo de la ficha (`curl -s https://revcognition.com/ | grep -o opacity:0`).
  const pageHidden = rest.match(STYLE_HIDDEN) ?? [];
  if (pageHidden.length) problems.push(`${pageHidden.length} estilo(s) opacity:0 en la pagina`);
  const pageHiddenClass = rest.match(/class="(?:[^"]*\s)?opacity-0(?:\s[^"]*)?"/g) ?? [];
  if (pageHiddenClass.length) problems.push(`${pageHiddenClass.length} elemento(s) con clase opacity-0 en la pagina`);
  report(file, problems, checkHero ? "hero y pagina visibles desde el servidor" : "pagina visible desde el servidor");
}

function report(file, problems, okText) {
  if (problems.length) {
    console.error(`ROJO ${file}: ${problems.join("; ")}`);
    failed++;
  } else {
    console.log(`OK   ${file}: ${okText}`);
  }
}
process.exit(failed ? 1 : 0);
