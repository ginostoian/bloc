import type { Metadata } from "next";
import { breadcrumbSchema, faqSchema, orgRef, pageMetadata, siteUrl, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { AuditTool } from "@/components/audit-tool";
import { Crumbs, Faq, FinalCta } from "@/components/ui";
import { isLocale, type Locale } from "@/lib/i18n";

const meta = {
  ro: ["Audit gratuit de site: viteză, SEO și căutare AI în 30 de secunde | Bloc", "Verifică gratuit viteza, SEO-ul, pregătirea pentru ChatGPT și AI Overviews, securitatea și semnalele de încredere ale site-ului tău. 60+ verificări și raport PDF pe email."],
  en: ["Free website audit: speed, SEO and AI search in 30 seconds | Bloc", "Check your site's speed, SEO, readiness for ChatGPT and AI Overviews, security and trust signals for free. 60+ checks and a PDF report by email."]
};

const faqs: Record<Locale, [string, string][]> = {
  ro: [
    ["Ce verifică auditul?", "Peste 60 de puncte în șase categorii: viteză (timp de răspuns, greutate, imagini, cache), SEO (titluri, meta, structură, sitemap), căutare AI (schema, llms.txt, acces pentru crawlerele AI, FAQ), securitate (HTTPS și headere), accesibilitate și semnale de încredere și conversie."],
    ["Este cu adevărat gratuit?", "Da. Vezi scorurile și primele trei probleme imediat. Pentru raportul complet în PDF, cu toate soluțiile, îți cerem doar numele și emailul."],
    ["Cât de precis este?", "Măsurăm pagina principală așa cum o primesc Google și crawlerele AI. Viteza pe 4G este o estimare din timpul de răspuns și greutatea paginii. Pentru Core Web Vitals din teren, folosește și PageSpeed Insights."],
    ["Ce faceți cu datele mele?", "Folosim numele și emailul ca să-ți trimitem raportul și să te contactăm o singură dată despre rezultate. Nu le vindem și nu le adăugăm în newslettere fără acordul tău."]
  ],
  en: [
    ["What does the audit check?", "Over 60 points across six categories: speed (response time, weight, images, caching), SEO (titles, meta, structure, sitemap), AI search (schema, llms.txt, AI crawler access, FAQs), security (HTTPS and headers), accessibility, and trust and conversion signals."],
    ["Is it really free?", "Yes. You see your scores and top three issues straight away. For the full PDF report with every fix, we only ask for your name and email."],
    ["How accurate is it?", "We measure your home page the way Google and AI crawlers receive it. The 4G load time is an estimate based on response time and page weight. For field Core Web Vitals, also check PageSpeed Insights."],
    ["What do you do with my details?", "We use your name and email to send the report and contact you once about the results. We never sell them or add you to newsletters without consent."]
  ]
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro";
  return pageMetadata(locale, "/audit", meta[locale][0], meta[locale][1]);
}

export default async function Audit({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro"; const ro = locale === "ro";
  const app = { "@type": "WebApplication", name: ro ? "Audit gratuit de site Bloc" : "Bloc free website audit", url: `${siteUrl}/${locale}/audit`, applicationCategory: "BusinessApplication", operatingSystem: "Web", isAccessibleForFree: true, offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" }, provider: orgRef, featureList: ro ? ["Viteză și greutate pagină", "SEO tehnic", "Pregătire pentru căutarea AI", "Securitate", "Accesibilitate", "Încredere și conversie", "Raport PDF"] : ["Speed and page weight", "Technical SEO", "AI search readiness", "Security", "Accessibility", "Trust and conversion", "PDF report"] };
  return <>
    <JsonLd locale={locale} nodes={[webPageSchema(locale, "/audit", meta[locale][0], meta[locale][1]), app, faqSchema(faqs[locale]), breadcrumbSchema(locale, [[ro ? "Audit gratuit" : "Free audit", "/audit"]])]} />
    <section className="shell section-tight">
      <Crumbs locale={locale} items={[[ro ? "Audit gratuit" : "Free audit"]]} />
      <h1 className="page-title">{ro ? <>Cum te văd clienții, Google și <em className="serif accent">AI-ul</em>.</> : <>How customers, Google and <em className="serif accent">AI</em> see you.</>}</h1>
      <p className="lead" style={{ marginTop: 28 }}>{ro ? "Introdu adresa site-ului. În 30 de secunde afli cât de repede se încarcă, ce înțelege Google, dacă ChatGPT te poate cita și ce îi face pe vizitatori să plece. Fără cont, fără card." : "Enter your website address. In 30 seconds you will know how fast it loads, what Google understands, whether ChatGPT can cite you and what makes visitors leave. No account, no card."}</p>
      <div style={{ marginTop: 40 }}><AuditTool locale={locale} /></div>
    </section>
    <section className="shell section">
      <div className="meta">// {ro ? "Ce verificăm" : "What we check"}</div>
      <div className="grid3" style={{ marginTop: 30 }}>{(ro ? [
        ["Viteză", "Timp de răspuns, greutate, imagini moderne, cache, scripturi care blochează afișarea."], ["SEO", "Titlu, meta descriere, H1, sitemap, canonic, conținut, legături interne."], ["Căutare AI", "Schema.org, entitate, FAQ, llms.txt și accesul GPTBot, ClaudeBot și PerplexityBot."], ["Securitate", "HTTPS, HSTS, CSP, protecție la clickjacking și conținut mixt."], ["Accesibilitate", "Text alternativ, etichete, nume pentru linkuri și butoane, zoom."], ["Încredere & conversie", "Contact vizibil, adresă, dovezi sociale, îndemnuri, măsurare și GDPR."]
      ] : [
        ["Speed", "Response time, weight, modern images, caching, render-blocking scripts."], ["SEO", "Title, meta description, H1, sitemap, canonical, content, internal links."], ["AI search", "Schema.org, entity, FAQs, llms.txt and access for GPTBot, ClaudeBot and PerplexityBot."], ["Security", "HTTPS, HSTS, CSP, clickjacking protection and mixed content."], ["Accessibility", "Alt text, labels, link and button names, zoom."], ["Trust & conversion", "Visible contact, address, social proof, calls to action, analytics and GDPR."]
      ]).map(([t, d], i) => <div className="panel" key={t}><span className="number">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
    </section>
    <section className="shell section" style={{ paddingTop: 0 }}>
      <div className="meta">// FAQ</div>
      <h2 className="display" style={{ marginBottom: 40 }}>{ro ? "Despre audit." : "About the audit."}</h2>
      <Faq items={faqs[locale]} />
    </section>
    <FinalCta locale={locale} title={ro ? "Ai raportul. Vrei și reparațiile?" : "Got the report. Want the fixes?"} text={ro ? "Trimite-ne raportul și îți spunem ce am repara primul, cât durează și cât costă. Preț fix, în scris." : "Send us the report and we will tell you what we would fix first, how long it takes and what it costs. Fixed price, in writing."} button={ro ? "Programează discuția gratuită" : "Book the free call"} />
  </>;
}
