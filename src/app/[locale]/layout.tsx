import type {Metadata} from "next";
import {Fraunces, Instrument_Sans} from "next/font/google";
import {notFound} from "next/navigation";
import {NextIntlClientProvider, hasLocale} from "next-intl";
import {setRequestLocale, getTranslations} from "next-intl/server";
import {routing} from "@/i18n/routing";
import {MotionProvider} from "@/components/providers/MotionProvider";
import "../globals.css";

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

const OG_LOCALE: Record<string, string> = {es: "es_ES", en: "en_US", fr: "fr_FR"};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "metadata"});
  const base = "https://revcognition.com";
  const path = locale === routing.defaultLocale ? "" : `/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(base),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        es: base,
        en: `${base}/en`,
        fr: `${base}/fr`,
        "x-default": base,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${base}${path}`,
      siteName: "RevCognition",
      locale: OG_LOCALE[locale],
      alternateLocale: Object.values(OG_LOCALE).filter((l) => l !== OG_LOCALE[locale]),
      type: "website",
      images: [{url: "/og.png", width: 1200, height: 630, alt: t("ogAlt")}],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: "a11y"});
  const cfAnalyticsToken = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;

  return (
    <html lang={locale}>
      <body className={`${fraunces.variable} ${instrumentSans.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-[var(--color-ink)] focus:text-[var(--color-paper)] focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-warm)] focus-visible:ring-offset-2"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
        {cfAnalyticsToken ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({token: cfAnalyticsToken})}
          />
        ) : null}
      </body>
    </html>
  );
}
