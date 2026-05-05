import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

export const metadata = {
  title: "Política de privacidad — RevCognition",
  description:
    "Cómo tratamos tus datos en RevCognition: qué recogemos, para qué, cuánto tiempo y cómo ejercer tus derechos.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-24 sm:pt-24">
        <Link
          href="/"
          className="text-sm text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors mb-8 inline-block px-1 py-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
        >
          ← Volver al inicio
        </Link>

        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm)] mb-4">
            Política de privacidad
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-ink)] mb-6">
            Tratamos tus datos como nos gustaría que trataran los nuestros.
          </h1>
          <p className="text-[var(--color-slate)] text-lg leading-relaxed mb-12">
            Texto en lenguaje claro. Si necesitas la versión legal completa o
            quieres ejercer cualquiera de tus derechos, escríbenos a{" "}
            <a
              href="mailto:olivier.serres@revcognition.com"
              className="text-[var(--color-ink)] underline underline-offset-4"
            >
              olivier.serres@revcognition.com
            </a>
            .
          </p>

          <div className="space-y-10 text-[var(--color-slate)] leading-relaxed">
            <section>
              <h2 className="font-serif text-xl text-[var(--color-ink)] mb-2">
                Quién es el responsable
              </h2>
              <p>
                RevCognition (Olivier Serres). Contacto:{" "}
                <a
                  href="mailto:olivier.serres@revcognition.com"
                  className="underline underline-offset-4 decoration-[var(--color-slate-light)] hover:text-[var(--color-ink)] transition-colors"
                >
                  olivier.serres@revcognition.com
                </a>
                . Sede en Barcelona, España.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-[var(--color-ink)] mb-2">
                Qué datos recogemos y para qué
              </h2>
              <p className="mb-3">
                Solo lo que tú nos das voluntariamente, y siempre con un fin
                concreto:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <span className="font-semibold text-[var(--color-ink)]">
                    Sign-up y onboarding del producto
                  </span>{" "}
                  (datos de cuenta, URL de tu web, descripción del producto,
                  configuración de ICP): para crear tu Company Brain y
                  ejecutar las campañas. Estos datos viven en{" "}
                  <a
                    href="https://app.revcognition.com"
                    className="underline underline-offset-4 decoration-[var(--color-slate-light)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    app.revcognition.com
                  </a>
                  , no en esta web.
                </li>
                <li>
                  <span className="font-semibold text-[var(--color-ink)]">
                    Datos de pago
                  </span>{" "}
                  (procesados por Stripe, no almacenados por nosotros): para
                  ejecutar el pago de los packs contratados desde la app.
                </li>
                <li>
                  <span className="font-semibold text-[var(--color-ink)]">
                    Datos de contacto comercial
                  </span>{" "}
                  recogidos durante la prospección: tratados conforme al
                  interés legítimo en comunicaciones B2B y siempre con opción
                  inmediata de baja en cada mensaje enviado.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-[var(--color-ink)] mb-2">
                Quién accede a tus datos
              </h2>
              <p>
                Encargados de tratamiento estrictamente operativos: Stripe
                (procesamiento de pagos), Resend (entrega de emails
                transaccionales), proveedores de infraestructura cloud (Vercel
                u equivalente). No vendemos datos a terceros. No los usamos
                para entrenar modelos generales. No los compartimos con
                anunciantes.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-[var(--color-ink)] mb-2">
                Cuánto tiempo los conservamos
              </h2>
              <p>
                El mínimo necesario. Las solicitudes de análisis se archivan
                durante 12 meses para poder responder a posibles dudas
                posteriores. Los datos fiscales asociados a pagos se conservan
                durante el plazo legal contable. Los datos de prospección
                comercial se eliminan a petición del titular o tras 14 días
                sin interacción si no hay base contractual posterior.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-[var(--color-ink)] mb-2">
                Tus derechos
              </h2>
              <p>
                Acceso, rectificación, supresión, oposición, limitación y
                portabilidad. Ejercer cualquiera de ellos es tan sencillo como
                escribir a{" "}
                <a
                  href="mailto:olivier.serres@revcognition.com?subject=Ejercicio%20de%20derechos%20RGPD"
                  className="underline underline-offset-4 decoration-[var(--color-slate-light)] hover:text-[var(--color-ink)] transition-colors"
                >
                  olivier.serres@revcognition.com
                </a>
                . Respondemos en menos de 30 días. Si crees que no lo hemos
                hecho bien, puedes presentar reclamación ante la Agencia
                Española de Protección de Datos (
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-[var(--color-slate-light)] hover:text-[var(--color-ink)] transition-colors"
                >
                  aepd.es
                </a>
                ).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-[var(--color-ink)] mb-2">
                Cookies
              </h2>
              <p>
                Esta web no utiliza cookies de seguimiento ni analítica de
                terceros. Solo cookies estrictamente necesarias para el
                funcionamiento (las que pueda establecer Stripe durante el
                proceso de pago).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-[var(--color-ink)] mb-2">
                Cambios en esta política
              </h2>
              <p>
                Si actualizamos esta política de forma sustancial, lo
                notificaremos por email a quienes tengan una relación activa
                con nosotros. Última actualización: mayo de 2026.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
