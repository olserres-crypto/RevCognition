import type {MetadataRoute} from "next";

const BASE = "https://revcognition.com";
// Rutas sin prefijo de locale (la raíz canónica ES). El resto se derivan.
const PATHS = [
  "",
  "/producto",
  "/privacy",
  "/cookies",
  "/opt-out",
];
// Cada idioma lleva su propio <url> (Google lo pide así para hreflang en sitemap);
// ES es la raíz sin prefijo.
const PREFIX = {es: "", en: "/en", fr: "/fr"} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) => {
    const languages = Object.fromEntries(
      Object.entries(PREFIX).map(([lang, pre]) => [lang, `${BASE}${pre}${path}`]),
    );
    return Object.values(PREFIX).map((pre) => ({
      url: `${BASE}${pre}${path}`,
      lastModified: new Date(),
      alternates: {languages},
    }));
  });
}
