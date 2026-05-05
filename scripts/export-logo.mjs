import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/logos");
mkdirSync(outDir, { recursive: true });

// Logo C: "Rev" light indigo + "Cognition" medium black
// Georgia como fallback de Fraunces para SVG standalone
function makeSvg(fontSize, padding, width, height) {
  const revSize   = fontSize;
  const cogSize   = fontSize;
  const baseline  = padding + fontSize * 0.82;

  return `<svg xmlns="http://www.w3.org/2000/svg"
  width="${width}" height="${height}"
  viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="white"/>
  <text
    x="${padding}"
    y="${baseline}"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${revSize}"
    font-weight="300"
    fill="#6366f1"
    letter-spacing="-1">Rev</text>
  <text
    x="${padding + revSize * 1.72}"
    y="${baseline}"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${cogSize}"
    font-weight="500"
    fill="#1a1a1a"
    letter-spacing="-0.5">Cognition</text>
</svg>`;
}

const variants = [
  { name: "logo-nav",   fontSize: 28,  padding: 16, width: 480,  height: 60  },
  { name: "logo-md",    fontSize: 48,  padding: 20, width: 720,  height: 90  },
  { name: "logo-lg",    fontSize: 80,  padding: 28, width: 1120, height: 140 },
];

for (const v of variants) {
  const svg = makeSvg(v.fontSize, v.padding, v.width, v.height);
  const svgBuf = Buffer.from(svg);

  await sharp(svgBuf).jpeg({ quality: 95 }).toFile(join(outDir, `${v.name}.jpg`));
  await sharp(svgBuf).png().toFile(join(outDir, `${v.name}.png`));
  console.log(`✓ ${v.name}.jpg  (${v.width}×${v.height}px)`);
}

// ── Versiones cuadradas 1×1 — solo "Rev" centrado ───────────────────────────
function makeSquareSvg(size) {
  const fontSize = Math.round(size * 0.36);
  // "Rev" en Georgia ≈ 1.72em de ancho — centramos con text-anchor middle
  const cx = size / 2;
  const cy = size / 2 + fontSize * 0.35; // ajuste baseline visual
  return `<svg xmlns="http://www.w3.org/2000/svg"
  width="${size}" height="${size}"
  viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="white"/>
  <text
    x="${cx}"
    y="${cy}"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${fontSize}"
    font-weight="400"
    fill="#6366f1"
    text-anchor="middle"
    letter-spacing="-1">Rev</text>
</svg>`;
}

const squareVariants = [
  { name: "logo-square-sm",  size: 256  },
  { name: "logo-square-md",  size: 512  },
  { name: "logo-square-lg",  size: 1024 },
];

console.log("");
for (const v of squareVariants) {
  const svg = makeSquareSvg(v.size);
  const svgBuf = Buffer.from(svg);

  await sharp(svgBuf).jpeg({ quality: 95 }).toFile(join(outDir, `${v.name}.jpg`));
  await sharp(svgBuf).png().toFile(join(outDir, `${v.name}.png`));
  console.log(`✓ ${v.name}.jpg  (${v.size}×${v.size}px)`);
}

console.log(`\nArchivos en: public/logos/`);
