import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-instrument-sans",
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
      <body className={`${fraunces.variable} ${instrumentSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
