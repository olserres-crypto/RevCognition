import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Producto } from "@/components/sections/Producto";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Footer } from "@/components/sections/Footer";
import {setRequestLocale} from "next-intl/server";

const TITLE = "Producto — RevCognition | Prospección en frío, de principio a fin";
const DESCRIPTION =
  "Todo lo que hace RevCognition: puesta en marcha en una sesión, revisión diaria de cinco minutos, mensajes escritos para cada prospecto, dominio propio calentado con paciencia y respuestas clasificadas solas.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/producto" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://revcognition.com/producto",
    siteName: "RevCognition",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RevCognition — el producto en detalle.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default async function ProductoPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return (
    <>
      <Nav />
      <main id="main">
        <Producto />
      </main>
      <CtaFinal />
      <Footer />
    </>
  );
}
