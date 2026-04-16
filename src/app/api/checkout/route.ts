import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRODUCTS: Record<string, { name: string; price: number; description: string }> = {
  price_pack_100: {
    name: "Pack 100 Prospectos",
    price: 10000, // céntimos
    description: "100 prospectos cualificados con hasta 4 mensajes únicos cada uno",
  },
  price_pack_500: {
    name: "Pack 500 Prospectos",
    price: 50000,
    description: "500 prospectos cualificados con hasta 4 mensajes únicos cada uno",
  },
  price_pack_1000: {
    name: "Pack 1000 Prospectos",
    price: 100000,
    description: "1000 prospectos cualificados con hasta 4 mensajes únicos cada uno",
  },
};

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();

    const product = PRODUCTS[productId];
    if (!product) {
      return NextResponse.json({ error: "Producto no válido" }, { status: 400 });
    }

    const origin = req.headers.get("origin") ?? "https://revcognition.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: product.price,
            product_data: {
              name: product.name,
              description: product.description,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        product_id: productId,
      },
      success_url: `${origin}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#precios`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Error al crear el pago" }, { status: 500 });
  }
}
