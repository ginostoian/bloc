import type { Metadata } from "next";
import { breadcrumbSchema, brand, orgRef, pageMetadata, siteUrl, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { Beliefs, Guarantees, StatStrip } from "@/components/sections";
import { FinalCta, PageIntro } from "@/components/ui";
import { isLocale, type Locale } from "@/lib/i18n";

const meta = {
  ro: ["Despre Bloc: construim, nu promitem", "Bloc este un studio din Cluj-Napoca care construiește site-uri, SEO, căutare AI și automatizări pentru afaceri din România, UK și Europa. Preț fix, termene scrise, garanții reale."],
  en: ["About Bloc: we build, not promise", "Bloc is a Cluj-Napoca studio building websites, SEO, AI search and automation for businesses in Romania, the UK and Europe. Fixed prices, written deadlines, real guarantees."]
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro";
  return pageMetadata(locale, "/despre", meta[locale][0], meta[locale][1]);
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro"; const ro = locale === "ro";
  const founder = { "@type": "Person", "@id": `${siteUrl}/#founder`, name: brand.founder, jobTitle: ro ? "Fondator" : "Founder", worksFor: orgRef, knowsAbout: ["Web development", "SEO", "AI search optimisation", "AI automation"] };
  const truths = ro ? [
    ["Clienții nu mai caută doar pe Google.", "Întreabă ChatGPT, Perplexity și asistenții din telefon. Afacerile care nu apar în aceste răspunsuri vor pierde clienți fără să afle de ce."],
    ["Un site e un vânzător, nu o broșură.", "Lucrează non-stop. Fie aduce cereri, fie te costă bani. Nu există variantă neutră."],
    ["AI-ul face munca mai rapidă, nu mai ieftină în calitate.", "Folosim AI peste tot unde ne face mai rapizi. Fiecare rând de cod și fiecare text sunt verificate de un om."],
    ["Afacerile mici merită aceeași calitate ca marile branduri.", "Fără bugete de 15.000 € și fără să aștepte patru luni."]
  ] : [
    ["Buyers no longer search only on Google.", "They ask ChatGPT, Perplexity and the assistant on their phone. Businesses missing from those answers will lose customers without knowing why."],
    ["A website is a salesperson, not a brochure.", "It works around the clock. It either brings enquiries or costs you money. There is no neutral option."],
    ["AI makes work faster, not cheaper in quality.", "We use AI everywhere it makes us faster. Every line of code and every piece of copy is checked by a person."],
    ["Small businesses deserve the same quality as big brands.", "Without €15,000 budgets and without waiting four months."]
  ];
  return <>
    <JsonLd locale={locale} nodes={[webPageSchema(locale, "/despre", meta[locale][0], meta[locale][1], "AboutPage"), founder, breadcrumbSchema(locale, [[ro ? "Despre" : "About", "/despre"]])]} />
    <PageIntro locale={locale} crumbs={[[ro ? "Despre" : "About"]]} title={ro ? "Construim, nu promitem." : "We build, not promise."} accent={ro ? "Construim" : "build"} text={ro ? "Bloc există pentru afacerile care au nevoie de un partener care înțelege vânzarea, nu doar codul. Suntem un studio mic din Cluj-Napoca, cu clienți în România, Marea Britanie și Europa. Lucrăm direct, repede și cu prețul pe masă." : "Bloc exists for businesses that need a partner who understands selling, not just code. We are a small studio in Cluj-Napoca with clients in Romania, the UK and Europe. We work directly, quickly and with the price on the table."}>
      <StatStrip locale={locale} />
    </PageIntro>

    <section className="paper section"><div className="shell">
      <div className="meta">// {ro ? "Misiunea" : "The mission"}</div>
      <h2 className="display" style={{ maxWidth: 1100 }}>{ro ? "Să facem ca afacerile bune să fie găsite, înțelese și alese, în Google și în era AI." : "To make good businesses found, understood and chosen, on Google and in the age of AI."}</h2>
      <ol className="truths">{truths.map(([t, d], i) => <li key={t}><span className="number">0{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></li>)}</ol>
    </div></section>

    <section className="shell section">
      <div className="split">
        <div>
          <div className="meta">// {ro ? "Cine conduce" : "Who leads"}</div>
          <h2 className="display-sm" style={{ margin: "18px 0" }}>{brand.founder}</h2>
          <div className="meta accent">{ro ? "Fondator" : "Founder"}</div>
        </div>
        <div>
          <p className="lead">{ro ? "Gino a fondat Bloc după ani în care a văzut aceeași poveste: afaceri bune, cu site-uri care nu le reprezentau și agenții care vindeau ore, nu rezultate. A construit studioul în jurul unei idei simple: preț fix, termene scrise și o garanție care pune riscul pe noi." : "Gino founded Bloc after years of seeing the same story: good businesses with websites that did not represent them, and agencies selling hours instead of results. He built the studio around one simple idea: fixed prices, written deadlines and a guarantee that puts the risk on us."}</p>
          <p className="body" style={{ marginTop: 18 }}>{ro ? "Coordonează personal fiecare proiect, de la prima discuție la lansare. Echipa de designeri, developeri și specialiști SEO lucrează în sprinturi scurte, cu AI ca accelerator și cu un om care verifică totul." : "He personally oversees every project, from the first call to launch. The team of designers, developers and SEO specialists works in short sprints, with AI as an accelerator and a person checking everything."}</p>
          <p className="body" style={{ marginTop: 18 }}>{ro ? "Scrie-i direct:" : "Write to him directly:"} <a className="accent" href={`mailto:${brand.email}`}>{brand.email}</a></p>
        </div>
      </div>
    </section>

    <Beliefs locale={locale} title={ro ? "Șase reguli pe care nu le negociem." : "Six rules we do not negotiate."} />
    <Guarantees locale={locale} paper />
    <FinalCta locale={locale} title={ro ? "Hai să vedem cum gândim pe cazul tău." : "See how we think about your case."} text={ro ? "Trimite-ne site-ul și provocarea. În maximum o zi lucrătoare primești un răspuns concret, nu o prezentare." : "Send your website and your challenge. Within one business day you get a concrete answer, not a pitch deck."} button={ro ? "Scrie-ne" : "Write to us"} />
  </>;
}
