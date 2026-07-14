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
