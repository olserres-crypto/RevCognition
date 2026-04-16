"use client";

import { useState } from "react";

export function AnalisisForm() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!websiteUrl) {
      setError("La URL de tu web es obligatoria.");
      return;
    }

    try {
      new URL(websiteUrl);
    } catch {
      setError("Introduce una URL válida (ej: https://tuempresa.com).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/analisis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ websiteUrl, linkedinUrl, description }),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || "Algo fue mal. Inténtalo de nuevo.");
      }
    } catch {
      setError("No se pudo conectar con el servidor. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 text-center">
        <p className="text-2xl mb-3">✓</p>
        <p className="font-semibold text-[var(--color-ink)] mb-2">
          Solicitud recibida
        </p>
        <p className="text-[var(--color-slate)] text-sm">
          Te respondemos en menos de 24h con tu propuesta de ICP y estrategia de campaña.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="websiteUrl"
          className="block text-sm font-semibold text-[var(--color-ink)] mb-1.5"
        >
          URL de tu web <span className="text-[var(--color-warm)]">*</span>
        </label>
        <input
          id="websiteUrl"
          type="url"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          placeholder="https://tuempresa.com"
          required
          className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] text-[var(--color-ink)] placeholder:text-[var(--color-slate-light)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-warm)]/30 focus:border-[var(--color-warm)]"
        />
      </div>

      <div>
        <label
          htmlFor="linkedinUrl"
          className="block text-sm font-semibold text-[var(--color-ink)] mb-1.5"
        >
          LinkedIn de tu empresa{" "}
          <span className="text-[var(--color-slate-light)] font-normal">(opcional)</span>
        </label>
        <input
          id="linkedinUrl"
          type="url"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          placeholder="https://linkedin.com/company/..."
          className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] text-[var(--color-ink)] placeholder:text-[var(--color-slate-light)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-warm)]/30 focus:border-[var(--color-warm)]"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-[var(--color-ink)] mb-1.5"
        >
          ¿Qué producto o servicio quieres analizar?{" "}
          <span className="text-[var(--color-slate-light)] font-normal">(opcional)</span>
        </label>
        <p className="text-xs text-[var(--color-slate-light)] mb-2">
          Si no lo pones, lo deducimos de tu web.
        </p>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Ej: Software de gestión para clínicas dentales..."
          className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] text-[var(--color-ink)] placeholder:text-[var(--color-slate-light)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-warm)]/30 focus:border-[var(--color-warm)] resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-7 py-3 bg-[var(--color-warm)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando…" : "Enviar solicitud de análisis"}
        </button>
        <p className="mt-3 text-xs text-[var(--color-slate-light)]">
          Te respondemos en menos de 24h con tu propuesta.
        </p>
      </div>
    </form>
  );
}
