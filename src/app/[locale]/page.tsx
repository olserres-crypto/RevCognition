import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { UseCases } from "@/components/sections/UseCases";
import { Pricing } from "@/components/sections/Pricing";
import { Founder } from "@/components/sections/Founder";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Footer } from "@/components/sections/Footer";
import {setRequestLocale} from "next-intl/server";
import {routing} from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <FeaturesGrid />
        <UseCases />
        <Pricing />
        <Founder />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
