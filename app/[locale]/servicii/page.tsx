import type { Metadata } from "next";
import { breadcrumbSchema, pageMetadata, siteUrl, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { Comparison, Guarantees, ServiceGroups } from "@/components/sections";
import { FinalCta, PageIntro } from "@/components/ui";
import { isLocale, type Locale } from "@/lib/i18n";
import { services } from "@/lib/content/services";

const meta = {
  ro: ["Servicii: site-uri, magazine online, SEO, căutare AI și automatizări | Bloc", "Nouă servicii cu prețuri publice: site-uri de prezentare, magazine online, landing pages, SEO, SEO local, AEO/GEO, automatizări AI, branding și mentenanță."],
  en: ["Services: websites, e-commerce, SEO, AI search and automation | Bloc", "Nine services with public prices: business websites, online stores, landing pages, SEO, local SEO, AEO/GEO, AI automation, branding and maintenance."]
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro";
  return pageMetadata(locale, "/servicii", meta[locale][0], meta[locale][1]);
}

export default async function Services({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro"; const ro = locale === "ro";
  const list = { "@type": "ItemList", name: ro ? "Servicii Bloc" : "Bloc services", itemListElement: services[locale].map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: `${siteUrl}/${locale}/servicii/${s.slug}` })) };
  return <>
    <JsonLd locale={locale} nodes={[webPageSchema(locale, "/servicii", meta[locale][0], meta[locale][1], "CollectionPage"), list, breadcrumbSchema(locale, [[ro ? "Servicii" : "Services", "/servicii"]])]} />
    <PageIntro locale={locale} crumbs={[[ro ? "Servicii" : "Services"]]} title={ro ? "Ce construim. De ce contează." : "What we build. Why it matters."} accent={ro ? "contează" : "matters"} text={ro ? "Site-uri care vând, vizibilitate în Google și în AI și sisteme care îți dau timpul înapoi. Alegi doar ce rezolvă problema ta. Fiecare serviciu are preț public, termen scris și garanție." : "Websites that sell, visibility on Google and in AI, and systems that give you your time back. Pick only what solves your problem. Every service has a public price, a written deadline and a guarantee."} />
    <section className="shell section-tight" style={{ paddingTop: 0 }}><ServiceGroups locale={locale} /></section>
    <Comparison locale={locale} />
    <Guarantees locale={locale} />
    <FinalCta locale={locale} title={ro ? "Începe cu problema, nu cu pachetul." : "Start with the problem, not a package."} text={ro ? "Arată-ne ce te blochează. Îți spunem ce am construi primul și cât costă, în maximum o zi lucrătoare." : "Show us what is holding you back. Within one business day we will tell you what we would build first and what it costs."} button={ro ? "Programează discuția gratuită" : "Book the free call"} />
  </>;
}
