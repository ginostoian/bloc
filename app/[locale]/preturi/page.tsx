import type { Metadata } from "next";
import { breadcrumbSchema, faqSchema, orgRef, pageMetadata, siteUrl, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { Guarantees, PlanCard } from "@/components/sections";
import { Faq, FinalCta, PageIntro } from "@/components/ui";
import { isLocale, type Locale } from "@/lib/i18n";
import { plans, pricingFaqs } from "@/lib/content/common";

const meta = {
  ro: ["Prețuri: site de la 2.400 €, SEO de la 900 €/lună | Bloc", "Prețuri publice și fixe: landing page 900 €, site de prezentare 2.400 €, magazin online 4.900 €, SEO 900 €/lună, mentenanță de la 149 €/lună. Fără costuri ascunse."],
  en: ["Pricing: websites from €2,400, SEO from €900/month | Bloc", "Public, fixed prices: landing page €900, business website €2,400, online store €4,900, SEO €900/month, maintenance from €149/month. No hidden costs."]
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro";
  return pageMetadata(locale, "/preturi", meta[locale][0], meta[locale][1]);
}

const num = (p: string) => Number(p.replace(/[^\d]/g, ""));

export default async function Pricing({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro"; const ro = locale === "ro"; const p = plans[locale];
  const catalog = { "@type": "OfferCatalog", name: ro ? "Prețuri Bloc" : "Bloc pricing", url: `${siteUrl}/${locale}/preturi`, itemListElement: [...p.projects, ...p.monthly].map(x => ({ "@type": "Offer", name: x.name, description: x.desc, price: num(x.price), priceCurrency: "EUR", seller: orgRef, url: `${siteUrl}/${locale}/servicii/${x.service}` })) };
  return <>
    <JsonLd locale={locale} nodes={[webPageSchema(locale, "/preturi", meta[locale][0], meta[locale][1]), catalog, faqSchema(pricingFaqs[locale]), breadcrumbSchema(locale, [[ro ? "Prețuri" : "Pricing", "/preturi"]])]} />
    <PageIntro locale={locale} crumbs={[[ro ? "Prețuri" : "Pricing"]]} title={ro ? "Prețuri fixe. Publice. Fără surprize." : "Fixed prices. Public. No surprises."} accent={ro ? "Publice." : "Public."} text={ro ? "Majoritatea agențiilor îți spun prețul abia după trei call-uri. Noi îl punem aici. Suma finală o primești în scris înainte să începem și nu se schimbă pe parcurs." : "Most agencies only tell you the price after three calls. We put it here. You get the final figure in writing before we start, and it does not change along the way."} />
    <section className="shell section-tight" style={{ paddingTop: 0 }}>
      <div className="meta">// {ro ? "Proiecte, plătite o singură dată" : "Projects, paid once"}</div>
      <div className="plan-grid" style={{ marginTop: 24 }}>{p.projects.map(x => <PlanCard key={x.name} plan={x} locale={locale} />)}</div>
    </section>
    <section className="shell section-tight">
      <div className="meta">// {ro ? "Planuri lunare, fără contract pe termen lung" : "Monthly plans, no long-term contract"}</div>
      <div className="plan-grid four" style={{ marginTop: 24 }}>{p.monthly.map(x => <PlanCard key={x.name} plan={x} locale={locale} />)}</div>
      <p className="body anchor-note" style={{ marginTop: 28 }}>{ro ? "Pentru context: un specialist SEO angajat costă peste 3.000 € pe lună, iar o agenție full-service cere de obicei 8.000–15.000 € pentru un site de prezentare. Echipe dedicate de dezvoltare și AI: de la 3.500 € pe lună, pe sprinturi de două săptămâni." : "For context: an in-house SEO specialist costs over €3,000 a month, and a full-service agency typically charges €8,000–15,000 for a business website. Dedicated development and AI teams: from €3,500 a month, in two-week sprints."}</p>
    </section>
    <Guarantees locale={locale} paper />
    <section className="shell section">
      <div className="meta">// FAQ</div>
      <h2 className="display" style={{ marginBottom: 40 }}>{ro ? "Despre bani, direct." : "About money, plainly."}</h2>
      <Faq items={pricingFaqs[locale]} />
    </section>
    <FinalCta locale={locale} title={ro ? "Vrei prețul exact pentru proiectul tău?" : "Want the exact price for your project?"} text={ro ? "Spune-ne ce ai nevoie. Primești oferta fixă, cu livrabile și termene, în 48 de ore după prima discuție." : "Tell us what you need. You get a fixed proposal, with deliverables and deadlines, within 48 hours of our first call."} button={ro ? "Cere oferta fixă" : "Get a fixed quote"} />
  </>;
}
