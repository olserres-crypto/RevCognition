import {routing} from "./routing";

const BASE = "https://revcognition.com";

// path = locale-agnostic pathname, e.g. "" (home), "/producto",
// "/soluciones/servicios-b2b", "/privacy". Returns a self-referencing
// canonical for the given locale + full hreflang language set.
export function buildAlternates(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return {
    canonical: `${BASE}${prefix}${path}`,
    languages: {
      es: `${BASE}${path}`,
      en: `${BASE}/en${path}`,
      fr: `${BASE}/fr${path}`,
      "x-default": `${BASE}${path}`,
    },
  };
}
