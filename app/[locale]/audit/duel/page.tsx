import type { Metadata } from "next";
import { breadcrumbSchema, faqSchema, orgRef, pageMetadata, siteUrl, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { DuelTool } from "@/components/duel-tool";
import { Crumbs, Faq, FinalCta } from "@/components/ui";
import { isLocale, type Locale } from "@/lib/i18n";

const meta = {
  ro: ["Compară-ți site-ul cu concurența: duel gratuit de site-uri | Bloc", "Pune site-ul tău față în față cu al unui concurent: viteză, SEO, căutare AI, conformitate legală, securitate și încredere. Vezi exact unde te bate și unde îl bați."],
  en: ["Compare your website with a competitor: free head-to-head audit | Bloc", "Put your site head-to-head with a competitor's: speed, SEO, AI search, legal compliance, security and trust. See exactly where they beat you and where you win."]
};

const faqs: Record<Locale, [string, string][]> = {
  ro: [
    ["Află concurentul că i-am analizat site-ul?", "Nu. Citim doar pagina publică, exact ca un vizitator sau ca Google. Nu trimitem nimic și nu lăsăm urme în afara unei vizite obișnuite."],
    ["Ce compară duelul?", "Aceleași peste 60 de verificări pentru ambele site-uri: viteză, SEO, pregătire pentru căutarea AI, conformitate legală (GDPR, ANPC, termeni), securitate, accesibilitate și semnale de încredere."],
    ["Pot compara cu mai mulți concurenți?", "Da, rulează duelul de mai multe ori. Pentru o analiză completă a pieței tale, cu 5–10 concurenți și recomandări, scrie-ne."]
  ],
  en: [
    ["Will my competitor know I audited their site?", "No. We only read the public page, exactly like a visitor or Google. Nothing is sent and nothing is left behind beyond an ordinary visit."],
    ["What does the head-to-head compare?", "The same 60+ checks for both sites: speed, SEO, AI search readiness, legal compliance (GDPR, consumer law, terms), security, accessibility and trust signals."],
    ["Can I compare against several competitors?", "Yes, run it as many times as you like. For a full market analysis with 5–10 competitors and recommendations, message us."]
  ]
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro";
  return pageMetadata(locale, "/audit/duel", meta[locale][0], meta[locale][1]);
}

export default async function DuelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro"; const ro = locale === "ro";
  const app = { "@type": "WebApplication", name: ro ? "Duel de site-uri Bloc" : "Bloc head-to-head website audit", url: `${siteUrl}/${locale}/audit/duel`, applicationCategory: "BusinessApplication", operatingSystem: "Web", isAccessibleForFree: true, offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" }, provider: orgRef };
  return <>
    <JsonLd locale={locale} nodes={[webPageSchema(locale, "/audit/duel", meta[locale][0], meta[locale][1]), app, faqSchema(faqs[locale]), breadcrumbSchema(locale, [[ro ? "Audit gratuit" : "Free audit", "/audit"], [ro ? "Duel" : "Head-to-head", "/audit/duel"]])]} />
    <section className="shell section-tight">
      <Crumbs locale={locale} items={[[ro ? "Audit gratuit" : "Free audit", `/${locale}/audit`], [ro ? "Duel" : "Head-to-head"]]} />
      <h1 className="page-title">{ro ? <>Tu vs. <em className="serif accent">concurența</em>.</> : <>You vs. <em className="serif accent">the competition</em>.</>}</h1>
      <p className="lead" style={{ marginTop: 28 }}>{ro ? "Clienții tăi compară. Fă-o și tu, înaintea lor. Pune site-ul tău față în față cu al celui mai bun concurent și vezi, verificare cu verificare, unde câștigă el clientul pe care l-ai fi putut avea tu." : "Your customers compare. Do it before they do. Put your site head-to-head with your strongest competitor and see, check by check, where they win the customer you could have had."}</p>
      <div style={{ marginTop: 40 }}><DuelTool locale={locale} /></div>
    </section>
    <section className="shell section">
      <div className="meta">// FAQ</div>
      <h2 className="display" style={{ marginBottom: 40 }}>{ro ? "Despre duel." : "About the head-to-head."}</h2>
      <Faq items={faqs[locale]} />
    </section>
    <FinalCta locale={locale} title={ro ? "Vrei să știi cum îl depășești?" : "Want to know how to overtake them?"} text={ro ? "Trimite-ne ambele site-uri. În maximum o zi lucrătoare îți spunem ce am schimba primul ca să treci în față, cât durează și cât costă." : "Send us both sites. Within one business day we will tell you what we would change first to take the lead, how long it takes and what it costs."} button={ro ? "Programează discuția gratuită" : "Book the free call"} />
  </>;
}
