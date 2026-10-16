import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { decodeShare } from "@/lib/audit/share";
import { gradeFor } from "@/lib/audit/copy";
import { pageMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { AuditStart } from "@/components/audit-tool";
import { Crumbs, FinalCta } from "@/components/ui";

type Params = { params: Promise<{ locale: string; token: string }> };

function describe(token: string, locale: Locale) {
  const p = decodeShare(token); if (!p) return null;
  const ro = locale === "ro";
  const title = p.b
    ? `${p.a.h} ${p.a.o} vs ${p.b.h} ${p.b.o} | ${ro ? "Duel de site-uri Bloc" : "Bloc head-to-head audit"}`
    : `${p.a.h}: ${p.a.o}/100 ${ro ? "la auditul de site Bloc" : "on the Bloc website audit"}`;
  const description = ro ? "Viteză, SEO, căutare AI, conformitate legală, securitate și încredere. Testează-ți și tu site-ul gratuit, în 30 de secunde." : "Speed, SEO, AI search, legal compliance, security and trust. Test your own site for free in 30 seconds.";
  return { p, title, description };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, token } = await params; const locale: Locale = isLocale(raw) ? raw : "ro";
  const d = describe(token, locale); if (!d) return {};
  const base = pageMetadata(locale, `/audit/scor/${token}`, d.title, d.description, { noIndex: true });
  const image = { url: `/api/audit/card/${token}?l=${locale}`, width: 1200, height: 630, alt: d.title };
  return { ...base, alternates: undefined, openGraph: { ...base.openGraph, images: [image] }, twitter: { card: "summary_large_image", title: d.title, description: d.description, images: [image.url] } };
}

export default async function SharedScore({ params }: Params) {
  const { locale: raw, token } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw; const ro = locale === "ro";
  const d = describe(token, locale); if (!d) notFound();
  const { p } = d;
  return <>
    <section className="shell section-tight">
      <Crumbs locale={locale} items={[[ro ? "Audit gratuit" : "Free audit", `/${locale}/audit`], [ro ? "Rezultat distribuit" : "Shared result"]]} />
      <h1 className="page-title" style={{ fontSize: "clamp(38px,6vw,96px)" }}>{p.b
        ? <>{p.a.h} <em className="serif accent">vs</em> {p.b.h}</>
        : <>{p.a.h}: <em className="serif accent">{p.a.o}/100</em></>}</h1>
      <p className="lead" style={{ marginTop: 24 }}>{p.b
        ? (ro ? `${p.a.o > p.b.o ? p.a.h : p.b.h} câștigă duelul, ${Math.max(p.a.o, p.b.o)} la ${Math.min(p.a.o, p.b.o)}. Măsurat pe viteză, SEO, căutare AI, conformitate legală, securitate și încredere.` : `${p.a.o > p.b.o ? p.a.h : p.b.h} wins, ${Math.max(p.a.o, p.b.o)} to ${Math.min(p.a.o, p.b.o)}. Measured on speed, SEO, AI search, legal compliance, security and trust.`)
        : (ro ? `Nota ${gradeFor(p.a.o)}. Măsurat pe viteză, SEO, căutare AI, conformitate legală, securitate și încredere.` : `Grade ${gradeFor(p.a.o)}. Measured on speed, SEO, AI search, legal compliance, security and trust.`)}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/api/audit/card/${token}?l=${locale}`} alt={d.title} width={1200} height={630} className="share-card" />
      <div className="share-next">
        <div><div className="meta accent">// {ro ? "Rândul tău" : "Your turn"}</div><h2 className="display-sm">{ro ? "Cât ia site-ul tău?" : "How does your site score?"}</h2><AuditStart locale={locale} compact /></div>
        <div><div className="meta accent">// {ro ? "Sau pune-i la încercare" : "Or put them to the test"}</div><h2 className="display-sm">{ro ? "Compară-ți site-ul cu al lor." : "Compare your site with theirs."}</h2><Link className="btn btn-outline" href={`/${locale}/audit/duel?b=${encodeURIComponent(p.b ? p.b.h : p.a.h)}`}>{ro ? "Începe duelul" : "Start the head-to-head"} →</Link></div>
      </div>
    </section>
    <FinalCta locale={locale} title={ro ? "Un scor nu repară nimic. Noi, da." : "A score fixes nothing. We do."} text={ro ? "Trimite-ne rezultatul și îți spunem ce am repara primul, cât durează și cât costă. Preț fix, în scris." : "Send us the result and we will tell you what we would fix first, how long it takes and what it costs. Fixed price, in writing."} button={ro ? "Programează discuția gratuită" : "Book the free call"} />
  </>;
}
