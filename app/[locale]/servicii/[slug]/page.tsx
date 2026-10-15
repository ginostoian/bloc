import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumbSchema, faqSchema, orgRef, pageMetadata, siteUrl, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { AuditStart } from "@/components/audit-tool";
import { FounderNote, StartSteps, priceLabel } from "@/components/sections";
import { Accent, Crumbs, Faq, FinalCta } from "@/components/ui";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getService, serviceKeys, services } from "@/lib/content/services";

export function generateStaticParams() { return locales.flatMap(locale => serviceKeys.map(slug => ({ locale, slug }))); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params; const locale: Locale = isLocale(raw) ? raw : "ro";
  const s = getService(locale, slug);
  return s ? pageMetadata(locale, `/servicii/${slug}`, s.metaTitle, s.metaDescription) : {};
}

const priceNumber = (from: string) => Number(from.replace(/[^\d]/g, ""));

export default async function ServiceDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw; const ro = locale === "ro";
  const s = getService(locale, slug); if (!s) notFound();
  const path = `/servicii/${s.slug}`;
  const servicesLabel = ro ? "Servicii" : "Services";
  const recurring = /lun|month/.test(s.price.unit);

  const serviceNode = {
    "@type": "Service",
    "@id": `${siteUrl}/${locale}${path}#service`,
    name: s.name,
    serviceType: s.name,
    description: s.answer[1],
    url: `${siteUrl}/${locale}${path}`,
    provider: orgRef,
    areaServed: ["RO", "GB", "EU"],
    audience: { "@type": "BusinessAudience", name: s.fit.join("; ") },
    offers: {
      "@type": "Offer",
      price: priceNumber(s.price.from),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/${locale}${path}`,
      description: s.price.note,
      ...(recurring ? { priceSpecification: { "@type": "UnitPriceSpecification", price: priceNumber(s.price.from), priceCurrency: "EUR", unitCode: "MON", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } } } : {})
    },
    hasOfferCatalog: { "@type": "OfferCatalog", name: ro ? "Ce include" : "What is included", itemListElement: s.deliverables.map(([n, d]) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n, description: d } })) }
  };

  return <>
    <JsonLd locale={locale} nodes={[webPageSchema(locale, path, s.metaTitle, s.metaDescription), serviceNode, faqSchema(s.faqs), breadcrumbSchema(locale, [[servicesLabel, "/servicii"], [s.name, path]])]} />

    <section className="shell section-tight">
      <Crumbs locale={locale} items={[[servicesLabel, `/${locale}/servicii`], [s.name]]} />
      <div className="meta accent" style={{ marginTop: 26 }}>// {s.name}</div>
      <h1 className="page-title" style={{ marginTop: 14 }}><Accent text={s.headline} accent={s.accent} /></h1>
      <div className="split" style={{ marginTop: 36, alignItems: "end" }}>
        <p className="lead" style={{ margin: 0 }}>{s.intro}</p>
        <div className="price-chip">
          <div><span className="meta">{ro ? "De la" : "From"}</span><strong>{s.price.from}</strong><span className="meta">/ {s.price.unit}</span></div>
          <div><span className="meta">{ro ? "Termen" : "Timeline"}</span><strong className="small">{s.price.timeline}</strong></div>
          <Link className="btn" href={`/${locale}/contact?topic=${s.slug}`}>{ro ? "Cere oferta fixă" : "Get a fixed quote"} →</Link>
        </div>
      </div>
      <dl className="stat-strip three">{s.stats.map(([v, l]) => <div key={l}><dt className="sr-only">{l}</dt><dd><strong>{v}</strong><span className="meta">{l}</span></dd></div>)}</dl>
    </section>

    <section className="shell section-tight" style={{ paddingTop: 0 }}>
      <div className="answer-box">
        <h2>{s.answer[0]}</h2>
        <p>{s.answer[1]}</p>
      </div>
    </section>

    <section className="shell section">
      <div className="meta">// {ro ? "Problema" : "The problem"}</div>
      <h2 className="display" style={{ maxWidth: 900 }}>{ro ? "Sună cunoscut?" : "Sound familiar?"}</h2>
      <div className="grid3" style={{ marginTop: 45 }}>{s.pains.map(([t, d], i) => <div className="panel" key={t}><span className="number">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
      <div className="panel alt outcome"><div className="meta accent">// {ro ? "Ce schimbăm" : "What changes"}</div><p>{s.outcome}</p></div>
    </section>

    <section className="paper section">
      <div className="shell">
        <div className="meta">// {ro ? "Ce primești" : "What you get"}</div>
        <h2 className="display" style={{ maxWidth: 930 }}>{ro ? "Știi exact ce primești înainte să plătești." : "Know exactly what you get before you pay."}</h2>
        <div className="grid3" style={{ marginTop: 50 }}>{s.deliverables.map(([t, d], i) => <div className="panel" key={t}><span className="number">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
      </div>
    </section>

    <section className="shell section">
      <div className="meta">// {ro ? "Cum lucrăm" : "How we work"}</div>
      <h2 className="display" style={{ marginBottom: 45, maxWidth: 900 }}>{ro ? "Pași clari. Termene scrise." : "Clear steps. Written deadlines."}</h2>
      <ol className="process-grid steps">{s.process.map(([when, t, d]) => <li className="panel" key={t}><span className="number">{when}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
    </section>

    <section className="section rule" style={{ background: "var(--bg2)" }}>
      <div className="shell split">
        <div>
          <div className="meta">// {ro ? "Preț" : "Price"}</div>
          <h2 className="display-sm" style={{ margin: "18px 0" }}>{s.price.from} <span className="muted">/ {s.price.unit}</span></h2>
          <p className="lead">{s.price.note}</p>
          <p className="body anchor-note">{s.price.anchor}</p>
          <div className="cta-row" style={{ marginTop: 26 }}><Link className="btn" href={`/${locale}/contact?topic=${s.slug}`}>{ro ? "Cere oferta fixă" : "Get a fixed quote"} →</Link><Link className="btn btn-outline" href={`/${locale}/preturi`}>{ro ? "Toate prețurile" : "All pricing"}</Link></div>
        </div>
        <div className="guarantee big"><span className="seal" aria-hidden="true">✓</span><div className="meta accent">{ro ? "Garanție" : "Guarantee"}</div><h3>{s.guarantee[0]}</h3><p>{s.guarantee[1]}</p></div>
      </div>
    </section>

    <section className="shell section">
      <div className="split">
        <div><div className="meta">// {ro ? "Potrivit pentru" : "A good fit for"}</div><ul className="check-list yes">{s.fit.map(f => <li key={f}>{f}</li>)}</ul></div>
        <div><div className="meta">// {ro ? "Nu e pentru tine dacă" : "Not for you if"}</div><ul className="check-list no">{s.notFit.map(f => <li key={f}>{f}</li>)}</ul><p className="body" style={{ marginTop: 18 }}>{ro ? "Preferăm să-ți spunem asta acum decât după avans." : "We would rather tell you now than after a deposit."}</p></div>
      </div>
    </section>

    <section className="shell section" style={{ paddingTop: 0 }}>
      <div className="audit-band"><div><div className="meta accent">// {ro ? "Nu știi de unde să începi?" : "Not sure where to start?"}</div><h2 className="display-sm">{ro ? "Află în 30 de secunde unde pierde site-ul tău clienți." : "Find out in 30 seconds where your site loses customers."}</h2></div><AuditStart locale={locale} compact /></div>
    </section>

    <StartSteps locale={locale} title={ro ? "Primul pas e un mesaj. Restul îl facem noi." : "The first step is a message. We handle the rest."} />

    <section className="shell section" style={{ paddingTop: 0 }}>
      <div className="meta">// FAQ</div>
      <h2 className="display" style={{ marginBottom: 40 }}>{ro ? "Întrebările pe care le-ai pune oricum." : "The questions you would ask anyway."}</h2>
      <Faq items={s.faqs} />
    </section>

    <section className="shell section" style={{ paddingTop: 0 }}><FounderNote locale={locale} /></section>

    <section className="shell section" style={{ paddingTop: 0 }}>
      <div className="meta">// {ro ? "Merge bine împreună cu" : "Pairs well with"}</div>
      <div style={{ marginTop: 20, borderTop: "1px solid var(--line)" }}>{s.related.map(r => services[locale].find(x => x.slug === r)!).map(r => <Link className="service-row" key={r.slug} href={`/${locale}/servicii/${r.slug}`}><span className="number">{priceLabel(locale, r.price.from, r.price.unit)}</span><div><h4>{r.name}</h4><p>{r.short}</p></div><span className="row-arrow" aria-hidden="true">↗</span></Link>)}</div>
    </section>

    <FinalCta locale={locale} title={ro ? "Spune-ne ce vrei să schimbi." : "Tell us what needs to change."} text={ro ? "Primești în maximum o zi lucrătoare un răspuns concret: dacă te putem ajuta, cum, în cât timp și cât costă." : "Within one business day you get a concrete answer: whether we can help, how, how long it takes and what it costs."} button={ro ? "Cere oferta fixă" : "Get a fixed quote"} href={`/${locale}/contact?topic=${s.slug}`} />
  </>;
}
