import Link from "next/link";
import type { Metadata } from "next";
import { faqSchema, pageMetadata, webPageSchema } from "@/lib/seo";
import { ConversionCalculator } from "@/components/conversion-calculator";
import { AuditStart } from "@/components/audit-tool";
import { JsonLd } from "@/components/json-ld";
import { Beliefs, Comparison, FounderNote, Guarantees, PlatformRow, PricingTeaser, ProjectGrid, ServiceGroups, StartSteps, StatStrip } from "@/components/sections";
import { Eyebrow, Faq, FinalCta } from "@/components/ui";
import { isLocale, type Locale } from "@/lib/i18n";
import { homeFaqs } from "@/lib/content/common";

const meta = {
  ro: ["Bloc | Site-uri, SEO și căutare AI care aduc clienți", "Construim site-uri rapide, SEO și optimizare pentru ChatGPT și AI Overviews, cu preț fix și garanție. Site de la 2.400 €, live în 3–4 săptămâni. Audit gratuit în 30 de secunde."],
  en: ["Bloc | Websites, SEO and AI search that bring customers", "We build fast websites, SEO and optimisation for ChatGPT and AI Overviews, with fixed prices and a guarantee. Websites from €2,400, live in 3–4 weeks. Free audit in 30 seconds."]
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro";
  return pageMetadata(locale, "", meta[locale][0], meta[locale][1]);
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro"; const ro = locale === "ro";
  return <>
    <JsonLd locale={locale} nodes={[webPageSchema(locale, "", meta[locale][0], meta[locale][1]), faqSchema(homeFaqs[locale])]} />

    <section className="shell hero">
      <div className="meta live-dot">{ro ? "Web · SEO · Căutare AI · Automatizări" : "Web · SEO · AI search · Automation"}</div>
      <h1 className="hero-title">{ro ? <>Fii găsit. Fii ales. <em className="serif accent">Fii sunat.</em></> : <>Get found. Get chosen. <em className="serif accent">Get the call.</em></>}</h1>
      <div className="split hero-split">
        <div>
          <p className="lead" style={{ margin: 0 }}>{ro ? "Construim site-uri rapide care spun clar ce vinzi, apoi te ducem acolo unde întreabă clienții: în Google, ChatGPT, Perplexity și AI Overviews. Preț fix, termene în contract și avansul înapoi dacă nu ești mulțumit după prima etapă." : "We build fast websites that say clearly what you sell, then put you where buyers ask: Google, ChatGPT, Perplexity and AI Overviews. Fixed prices, deadlines in the contract and your deposit back if you are not happy after the first stage."}</p>
          <p className="body" style={{ marginTop: 18 }}>{ro ? "Pentru firme de servicii, clinici, magazine online și B2B din România, UK și Europa." : "For service businesses, clinics, online stores and B2B firms across Romania, the UK and Europe."}</p>
        </div>
        <div>
          <div className="meta" style={{ marginBottom: 10 }}>{ro ? "Vezi în 30 de secunde ce te costă site-ul actual" : "See in 30 seconds what your current site is costing you"}</div>
          <AuditStart locale={locale} />
          <p className="meta" style={{ marginTop: 12 }}>{ro ? "Gratuit · 60+ verificări · Raport PDF pe email" : "Free · 60+ checks · PDF report by email"}</p>
          <p className="body" style={{ marginTop: 16, fontSize: 15 }}>{ro ? "Preferi să vorbești cu un om?" : "Rather talk to a person?"} <Link className="link-arrow" href={`/${locale}/contact`}>{ro ? "Scrie-ne direct" : "Message us directly"} →</Link></p>
        </div>
      </div>
      <StatStrip locale={locale} />
    </section>

    <section className="shell"><PlatformRow locale={locale} /></section>

    <section className="shell section">
      <Eyebrow>// {ro ? "Trei lucruri pe care agențiile nu ți le spun" : "Three things agencies will not tell you"}</Eyebrow>
      <h2 className="display" style={{ maxWidth: "17ch" }}>{ro ? <>Ai un site. Dar ai <em className="serif">clienți</em> de pe el?</> : <>You have a site. Does it bring <em className="serif">customers</em>?</>}</h2>
      <div className="grid3" style={{ marginTop: "clamp(38px,6vw,76px)" }}>{(ro ? [
        ["Redesign-ul nu e o strategie.", "Un site mai frumos, cu aceleași argumente în aceeași ordine, aduce aceleași rezultate. Problema e aproape mereu mesajul, nu culoarea."],
        ["Clienții tăi întreabă AI-ul.", "Tot mai mulți cumpărători cer o recomandare de la ChatGPT înainte să caute pe Google. Dacă AI-ul nu te cunoaște, nu te recomandă."],
        ["Fiecare secundă te costă.", "Peste jumătate din vizitatorii de pe mobil pleacă dacă pagina durează peste 3 secunde. Plătești reclame pentru oameni care nu văd niciodată oferta."]
      ] : [
        ["A redesign is not a strategy.", "A prettier site with the same arguments in the same order brings the same results. The problem is almost always the message, not the colours."],
        ["Your buyers ask AI.", "More and more buyers ask ChatGPT for a recommendation before they search Google. If AI does not know you, it will not recommend you."],
        ["Every second costs you.", "More than half of mobile visitors leave when a page takes over 3 seconds. You pay for ads that people never see the offer behind."]
      ]).map(([t, d], i) => <div className="panel" key={t}><span className="number">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
    </section>

    <section className="shell section" style={{ paddingTop: 0 }}>
      <Eyebrow>// {ro ? "Ce facem" : "What we do"}</Eyebrow>
      <h2 className="display" style={{ maxWidth: 900 }}>{ro ? "Nouă servicii. Un singur scop: mai mulți clienți." : "Nine services. One goal: more customers."}</h2>
      <p className="lead">{ro ? "Construim site-ul, îl facem găsit și îl ținem în formă. Alegi doar piesele care rezolvă problema ta. Fiecare are preț public." : "We build the site, get it found and keep it in shape. You only pick the pieces that solve your problem. Every one has a public price."}</p>
      <div style={{ marginTop: 45 }}><ServiceGroups locale={locale} /></div>
    </section>

    <ConversionCalculator locale={locale} />

    <section id="rezultate" className="section">
      <div className="shell">
        <Eyebrow>// {ro ? "Rezultate" : "Results"}</Eyebrow>
        <h2 className="display" style={{ maxWidth: 950 }}>{ro ? <>Site-uri live, nu <em className="serif">mockup-uri</em> pe Dribbble.</> : <>Live sites, not <em className="serif">mockups</em> on Dribbble.</>}</h2>
        <p className="lead">{ro ? "Deschide-le pe telefon. Așa arată munca noastră în lumea reală, nu într-o prezentare." : "Open them on your phone. This is what our work looks like in the real world, not in a pitch deck."}</p>
        <div style={{ marginTop: 50 }}><ProjectGrid locale={locale} /></div>
        <p style={{ marginTop: 28 }}><Link className="link-arrow" href={`/${locale}/rezultate`}>{ro ? "Vezi poveștile din spatele proiectelor" : "See the stories behind the projects"} →</Link></p>
      </div>
    </section>

    <Beliefs locale={locale} />
    <Comparison locale={locale} />
    <PricingTeaser locale={locale} />
    <Guarantees locale={locale} paper />
    <StartSteps locale={locale} />

    <section className="shell section" style={{ paddingTop: 0 }}><FounderNote locale={locale} /></section>

    <section className="shell section" style={{ paddingTop: 0 }}>
      <Eyebrow>// FAQ</Eyebrow>
      <h2 className="display" style={{ marginBottom: 45 }}>{ro ? "Răspunsuri pe șleau." : "Straight answers."}</h2>
      <Faq items={homeFaqs[locale]} />
    </section>

    <FinalCta locale={locale} title={ro ? "Hai să vedem ce te costă site-ul actual." : "Let's see what your current site is costing you."} text={ro ? "Trimite-ne adresa și două rânduri despre ce vinzi. În maximum o zi lucrătoare îți spunem ce am repara primul, cât durează și cât costă." : "Send us your URL and two lines about what you sell. Within one business day we will tell you what we would fix first, how long it takes and what it costs."} button={ro ? "Programează discuția gratuită" : "Book the free call"} />
  </>;
}
