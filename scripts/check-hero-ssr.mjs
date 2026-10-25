// B-2447: el hero tiene que salir VISIBLE del servidor. Si el HTML trae
// `opacity:0` en el hero, el H1 (elemento LCP) no se pinta hasta que hidrata
// el JS, y sin JS (crawler, JS bloqueado, fallo de hidratacion) queda en blanco.
//
// Uso: node scripts/check-hero-ssr.mjs [fichero.html ...]
// Sin argumentos lee el prerender de `next build`: .next/server/app/{es,en,fr}.html
import {readFileSync, existsSync} from "node:fs";

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["es", "en", "fr"].map((l) => `.next/server/app/${l}.html`);

let failed = 0;
for (const file of files) {
  if (!existsSync(file)) {
    console.error(`FALTA ${file} (corre antes npm run build)`);
    failed++;
    continue;
  }
  const html = readFileSync(file, "utf8");
  const start = html.indexOf("<section");
  const end = html.indexOf("</section>", start);
  const hero = start >= 0 && end > start ? html.slice(start, end) : "";
  const problems = [];
  if (!hero.includes("<h1")) problems.push("la primera <section> no contiene el <h1>");
  const hidden = hero.match(/opacity:\s*0(?![.\d])/g) ?? [];
  if (hidden.length) problems.push(`${hidden.length} estilo(s) opacity:0 en el hero`);
  if (problems.length) {
    console.error(`ROJO ${file}: ${problems.join("; ")}`);
    failed++;
  } else {
    console.log(`OK   ${file}: hero visible desde el servidor`);
  }
}
process.exit(failed ? 1 : 0);
