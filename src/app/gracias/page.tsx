import Link from "next/link";
import { Nav } from "@/components/sections/Nav";

export const metadata = {
  title: "¡Gracias! — RevCognition",
  description: "Tu compra se ha procesado correctamente.",
};

export default function GraciasPage() {
  return (
    <>
      <Nav />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-32 text-center">
        <p className="text-5xl mb-6">✓</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-4">
          Compra confirmada
        </h1>
        <p className="text-[var(--color-slate)] text-lg max-w-md mx-auto mb-8">
          Recibirás un email con los próximos pasos. Si tienes alguna pregunta,
          escríbenos a{" "}
          <a
            href="mailto:olivier@revcognition.com"
            className="text-[var(--color-ink)] underline underline-offset-4"
          >
            olivier@revcognition.com
          </a>
          .
        </p>
        <Link
          href="/"
          className="text-sm text-[var(--color-slate)] underline decoration-[var(--color-slate-light)] underline-offset-4 hover:text-[var(--color-ink)] transition-colors"
        >
          ← Volver al inicio
        </Link>
      </main>
    </>
  );
}
