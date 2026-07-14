import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { ServiciosB2B } from "@/components/sections/ServiciosB2B";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Footer } from "@/components/sections/Footer";
import {setRequestLocale} from "next-intl/server";

const TITLE =
  "Servicios B2B — RevCognition | Prospección en frío para despachos y agencias";
const DESCRIPTION =
  "Para despachos, agencias y consultoras que viven de referencias: RevCognition busca clientes nuevos que encajan con tu perfil y les escribe un mensaje propio. Tu única tarea, cinco minutos al día aprobando correos.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/soluciones/servicios-b2b" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://revcognition.com/soluciones/servicios-b2b",
    siteName: "RevCognition",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RevCognition para servicios B2B.",
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

export default async function ServiciosB2BPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return (
    <>
      <Nav />
      <main id="main">
        <ServiciosB2B />
      </main>
      <CtaFinal />
      <Footer />
    </>
  );
}
