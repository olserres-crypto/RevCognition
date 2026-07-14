import type {MetadataRoute} from "next";

const BASE = "https://revcognition.com";
// Rutas sin prefijo de locale (la raíz canónica ES). El resto se derivan.
const PATHS = ["", "/producto", "/soluciones/servicios-b2b", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        es: `${BASE}${path}`,
        en: `${BASE}/en${path}`,
        fr: `${BASE}/fr${path}`,
      },
    },
  }));
}
