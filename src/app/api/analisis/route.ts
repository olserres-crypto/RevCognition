import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { websiteUrl, linkedinUrl, description } = body;

    if (!websiteUrl || !isValidUrl(websiteUrl)) {
      return NextResponse.json(
        { error: "URL de la web no válida" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "RevCognition <noreply@revcognition.com>",
      to: "olivier@revcognition.com",
      subject: `Nueva solicitud de análisis — ${websiteUrl}`,
      text: [
        "Nueva solicitud de análisis de ICP recibida.",
        "",
        `Web: ${websiteUrl}`,
        linkedinUrl ? `LinkedIn: ${linkedinUrl}` : "LinkedIn: (no proporcionado)",
        "",
        "Descripción del producto/servicio:",
        description || "(no proporcionada)",
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Analisis route error:", err);
    return NextResponse.json(
      { error: "Error al enviar la solicitud" },
      { status: 500 }
    );
  }
}
