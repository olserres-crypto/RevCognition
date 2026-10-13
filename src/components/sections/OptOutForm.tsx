"use client";

import {useEffect, useRef, useState, useSyncExternalStore} from "react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/ui/Button";

// B-2307: el formulario hace POST directo al backend (api_server.py, CORS solo para
// revcognition.com). Las defensas viven en el servidor: Turnstile, campo trampa, pregunta
// sencilla, limite por IP y por email. La respuesta es la misma exista o no el email.
const API_URL = "https://api.revcognition.cc/opt-out";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

type Estado = "idle" | "enviando" | "ok" | "error" | "limite";

const inputClass =
  "w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)]";
const labelClass = "block text-sm font-semibold text-[var(--color-ink)] mb-1";

function aleatorio() {
  return 1 + Math.floor(Math.random() * 9);
}

// La pregunta se elige solo en el navegador (en el servidor no hay pregunta: si se eligiera
// alli, la hidratacion veria otros numeros). Un par por carga de pagina.
let PAR: [number, number] | null = null;
const parDeLaPagina = () => (PAR ??= [aleatorio(), aleatorio()]);
const sinCambios = () => () => {};

export function OptOutForm({locale}: {locale: string}) {
  const t = useTranslations("optOut");
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const [token, setToken] = useState("");
  const [estado, setEstado] = useState<Estado>("idle");
  const pregunta = useSyncExternalStore(sinCambios, parDeLaPagina, () => null);

  useEffect(() => {
    if (!SITE_KEY) return;
    const pintar = () => {
      if (!window.turnstile || !widgetRef.current || widgetId.current) return;
      widgetId.current = window.turnstile.render(widgetRef.current, {
        sitekey: SITE_KEY,
        action: "opt-out",
        language: locale,
        callback: (tk: string) => setToken(tk),
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
    };
    if (window.turnstile) {
      pintar();
      return;
    }
    let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = TURNSTILE_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", pintar);
    return () => script?.removeEventListener("load", pintar);
  }, [locale]);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!pregunta) return;
    const f = new FormData(e.currentTarget);
    setEstado("enviando");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: f.get("email"),
          first_name: f.get("first_name"),
          last_name: f.get("last_name"),
          linkedin: f.get("linkedin"),
          motivo: f.get("motivo"),
          borrar: f.get("borrar") === "on",
          website: f.get("website"),
          pregunta_a: pregunta[0],
          pregunta_b: pregunta[1],
          pregunta_respuesta: Number(f.get("respuesta")),
          turnstile_token: token,
          idioma: locale,
        }),
      });
      setEstado(res.ok ? "ok" : res.status === 429 ? "limite" : "error");
    } catch {
      setEstado("error");
    }
    // El token de Turnstile es de un solo uso: se pide otro para el siguiente intento.
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
    setToken("");
  }

  if (estado === "ok") {
    return (
      <div role="status" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper-deep)] p-6">
        <h2 className="text-xl text-[var(--color-ink)] mb-2">{t("okHeading")}</h2>
        <p className="text-[var(--color-slate)]">{t("okBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="space-y-5">
      <div>
        <label htmlFor="oo-email" className={labelClass}>{t("email")}</label>
        <input id="oo-email" name="email" type="email" required autoComplete="email" maxLength={254} className={inputClass} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="oo-first" className={labelClass}>{t("firstName")}</label>
          <input id="oo-first" name="first_name" autoComplete="given-name" maxLength={100} className={inputClass} />
        </div>
        <div>
          <label htmlFor="oo-last" className={labelClass}>{t("lastName")}</label>
          <input id="oo-last" name="last_name" autoComplete="family-name" maxLength={100} className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="oo-linkedin" className={labelClass}>{t("linkedin")}</label>
        <input id="oo-linkedin" name="linkedin" type="url" maxLength={300} placeholder="https://www.linkedin.com/in/..." className={inputClass} />
      </div>
      <div>
        <label htmlFor="oo-motivo" className={labelClass}>{t("reason")}</label>
        <textarea id="oo-motivo" name="motivo" rows={3} maxLength={1000} className={inputClass} />
      </div>

      {/* Campo trampa: invisible para personas; lo rellenan los bots que rellenan todo. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="oo-website">Website</label>
        <input id="oo-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="space-y-3">
        <legend className={labelClass}>{t("scopeLegend")}</legend>
        <p className="text-sm text-[var(--color-slate)]">{t("scopeAlways")}</p>
        <label className="flex gap-3 items-start text-[var(--color-slate)]">
          <input type="checkbox" name="borrar" className="mt-1" />
          <span>{t("scopeErase")}</span>
        </label>
      </fieldset>

      <div>
        <label htmlFor="oo-respuesta" className={labelClass}>
          {pregunta ? t("question", {a: pregunta[0], b: pregunta[1]}) : t("questionLoading")}
        </label>
        <input id="oo-respuesta" name="respuesta" type="number" inputMode="numeric" required min={0} max={40} className={`${inputClass} max-w-[8rem]`} />
      </div>

      <div ref={widgetRef} />
      {!SITE_KEY && <p className="text-sm text-[var(--color-danger)]">{t("unavailable")}</p>}

      {estado === "error" && <p role="alert" className="text-sm text-[var(--color-danger)]">{t("error")}</p>}
      {estado === "limite" && <p role="alert" className="text-sm text-[var(--color-danger)]">{t("rateLimited")}</p>}

      <p className="text-sm text-[var(--color-slate)]">
        {t.rich("privacyNote", {
          privacyLink: (chunks) => (
            <Link href="/privacy" className="underline underline-offset-4">{chunks}</Link>
          ),
        })}
      </p>

      <Button type="submit" disabled={!SITE_KEY || !token || !pregunta || estado === "enviando"}>
        {estado === "enviando" ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
