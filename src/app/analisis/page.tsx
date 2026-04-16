import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { AnalisisForm } from "@/components/sections/AnalisisForm";

export const metadata = {
  title: "Análisis gratuito de ICP — RevCognition",
  description:
    "Cuéntanos sobre tu negocio y te preparamos una propuesta de ICP y estrategia de prospección.",
};

export default function AnalisisPage() {
  return (
    <>
      <Nav />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-24 sm:pt-24">
        <Link
          href="/"
          className="text-sm text-[--color-slate-light] hover:text-[--color-slate] transition-colors mb-8 inline-block"
        >
          ← Volver al inicio
        </Link>

        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[--color-warm] mb-4">
            Análisis gratuito
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[--color-ink] mb-4">
            Te decimos exactamente a quién prospectar
          </h1>
          <p className="text-[--color-slate] text-lg mb-10 leading-relaxed">
            Analizamos tu web y te preparamos una propuesta de ICP y estrategia
            de captación personalizada. Sin coste. Sin compromiso.
          </p>

          <AnalisisForm />
        </div>
      </main>
    </>
  );
}
