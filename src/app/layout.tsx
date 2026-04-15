import type { Metadata } from "next";
import { DM_Serif_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RevCognition — Nuevos clientes, cada semana. Sin agencias.",
  description:
    "RevCognition identifica a tus clientes ideales y les escribe un mensaje único a cada uno. Tú no escribes nada. No pagas a ninguna agencia. Y no tienes que encontrar el tiempo.",
  metadataBase: new URL("https://revcognition.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${dmSerif.variable} ${sourceSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
