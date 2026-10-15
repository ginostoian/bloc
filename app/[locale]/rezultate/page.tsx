import type { Metadata } from "next";
import { breadcrumbSchema, pageMetadata, siteUrl, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { Beliefs, ProjectGrid, StatStrip } from "@/components/sections";
import { FinalCta, PageIntro } from "@/components/ui";
import { isLocale, type Locale } from "@/lib/i18n";
import { projects } from "@/lib/content/common";

const meta = {
  ro: ["Rezultate și proiecte: site-uri live construite de Bloc", "Clinici, branduri de produse, renovări în UK: vezi site-urile live construite de Bloc și problema pe care a rezolvat-o fiecare."],
  en: ["Results and projects: live websites built by Bloc", "Clinics, product brands, UK home renovation: see the live websites Bloc built and the problem each one solved."]
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro";
  return pageMetadata(locale, "/rezultate", meta[locale][0], meta[locale][1]);
}

export default async function Results({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro"; const ro = locale === "ro";
  const list = { "@type": "ItemList", itemListElement: projects[locale].map((p, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "CreativeWork", name: p.name, url: p.url, description: p.built, creator: { "@id": `${siteUrl}/#organization` } } })) };
  return <>
    <JsonLd locale={locale} nodes={[webPageSchema(locale, "/rezultate", meta[locale][0], meta[locale][1], "CollectionPage"), list, breadcrumbSchema(locale, [[ro ? "Rezultate" : "Results", "/rezultate"]])]} />
    <PageIntro locale={locale} crumbs={[[ro ? "Rezultate" : "Results"]]} title={ro ? "Site-uri live. Nu mockup-uri." : "Live sites. Not mockups."} accent={ro ? "live." : "Live"} text={ro ? "Orice agenție poate arăta capturi frumoase. Noi îți dăm linkuri. Deschide-le pe telefon, verifică viteza, citește textele. Apoi decide." : "Any agency can show pretty screenshots. We give you links. Open them on your phone, check the speed, read the copy. Then decide."}>
      <StatStrip locale={locale} />
    </PageIntro>
    <section className="shell section-tight" style={{ paddingTop: 0 }}><ProjectGrid locale={locale} detailed /></section>
    <Beliefs locale={locale} title={ro ? "Același proces pentru fiecare client." : "The same process for every client."} />
    <FinalCta locale={locale} title={ro ? "Următorul proiect din listă poate fi al tău." : "The next project on this page could be yours."} text={ro ? "Luăm maximum patru proiecte noi pe lună, ca fiecare să primească atenția cuvenită. Scrie-ne și îți spunem când putem începe." : "We take on at most four new projects a month so each gets proper attention. Message us and we will tell you when we can start."} button={ro ? "Rezervă un loc" : "Reserve a slot"} />
  </>;
}
