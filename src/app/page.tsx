import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ImpactStats } from "@/components/impact-stats";
import { Pillars } from "@/components/pillars";
import { Transparency } from "@/components/transparency";
import { WaysToGive } from "@/components/ways-to-give";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ImpactStats />
        <Pillars />
        <Transparency />
        <WaysToGive />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
