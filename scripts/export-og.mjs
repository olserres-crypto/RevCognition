import sharp from "sharp";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public");
mkdirSync(outDir, { recursive: true });

// Open Graph 1200×630.
// Wordmark centrado (visible en cualquier crop center-square que hagan
// los chat clients), tagline justo debajo.
function makeOgSvg() {
  const w = 1200;
  const h = 630;

  // Wordmark centrado. fontSize 120 da ~720px de ancho con Georgia → cabe en 1200.
  const wordmarkSize = 120;
  const wordmarkY = h / 2 - 10;

  // Tagline algo más pequeña, italic light para tono editorial.
  const taglineSize = 42;
  const taglineY = h / 2 + 80;

  // URL en bottom-right como firma sutil.
  const urlSize = 22;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="#f4f4f2"/>

  <text x="${w / 2}" y="${wordmarkY}"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${wordmarkSize}"
    text-anchor="middle"
    letter-spacing="-3">
    <tspan font-weight="300" fill="#6366f1">Rev</tspan><tspan font-weight="500" fill="#1a1a1a">Cognition</tspan>
  </text>

  <text x="${w / 2}" y="${taglineY}"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${taglineSize}"
    font-weight="300"
    font-style="italic"
    fill="#1a1a1a"
    text-anchor="middle"
    letter-spacing="-0.5">Nuevos clientes, cada semana.</text>

  <text x="${w - 40}" y="${h - 36}"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${urlSize}"
    font-weight="400"
    fill="#718096"
    text-anchor="end">revcognition.com</text>
</svg>`;
}

const svg = makeOgSvg();
const svgBuf = Buffer.from(svg);

await sharp(svgBuf).png().toFile(join(outDir, "og.png"));
await sharp(svgBuf).jpeg({ quality: 92 }).toFile(join(outDir, "og.jpg"));

console.log("✓ public/og.png  (1200×630)");
console.log("✓ public/og.jpg  (1200×630)");
