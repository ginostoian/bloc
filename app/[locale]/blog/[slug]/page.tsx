import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumbSchema, brand, orgRef, pageMetadata, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { AuditStart } from "@/components/audit-tool";
import { Crumbs, FinalCta } from "@/components/ui";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { posts, ui } from "@/lib/site";

export function generateStaticParams() { return locales.flatMap(locale => posts[locale].map(post => ({ locale, slug: post.slug }))); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params; const locale: Locale = isLocale(raw) ? raw : "ro";
  const p = posts[locale].find(x => x.slug === slug);
  return p ? pageMetadata(locale, `/blog/${slug}`, `${p.title} | Bloc`, p.excerpt, { type: "article", publishedTime: p.iso }) : {};
}

export default async function Article({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw; const ro = locale === "ro";
  const p = posts[locale].find(x => x.slug === slug); if (!p) notFound();
  const url = `${siteUrl}/${locale}/blog/${p.slug}`;
  const article = { "@type": "BlogPosting", "@id": `${url}#article`, headline: p.title, description: p.excerpt, url, mainEntityOfPage: url, datePublished: p.iso, dateModified: p.updated || p.iso, inLanguage: locale, image: `${siteUrl}/opengraph-image`, author: { "@type": "Person", name: brand.founder, url: `${siteUrl}/${locale}/despre` }, publisher: orgRef, articleSection: ui[locale].categories[p.category], wordCount: p.sections.reduce((n, s) => n + s.paragraphs.join(" ").split(/\s+/).length, 0) };
  const others = posts[locale].filter(x => x.slug !== p.slug).slice(0, 3);
  return <>
    <JsonLd locale={locale} nodes={[article, breadcrumbSchema(locale, [["Blog", "/blog"], [p.title, `/blog/${p.slug}`]])]} />
    <article className="shell section-tight">
      <Crumbs locale={locale} items={[["Blog", `/${locale}/blog`], [ui[locale].categories[p.category]]]} />
      <h1 className="page-title" style={{ maxWidth: 1100 }}>{p.title}</h1>
      <p className="lead" style={{ marginTop: 32 }}>{p.excerpt}</p>
      <div className="meta" style={{ margin: "32px 0 50px" }}>{brand.founder} · <time dateTime={p.iso}>{p.date}</time> · {p.read}</div>
      <div className="article-body">{p.sections.map(s => <section key={s.title}><h2>{s.title}</h2>{s.paragraphs.map(par => <p key={par}>{par}</p>)}{s.bullets ? <ul>{s.bullets.map(b => <li key={b}>{b}</li>)}</ul> : null}</section>)}</div>
      <div className="audit-band" style={{ marginTop: 60 }}><div><div className="meta accent">// {ro ? "Verifică-ți site-ul" : "Check your site"}</div><h2 className="display-sm">{ro ? "Vezi în 30 de secunde ce aplici deja și ce lipsește." : "See in 30 seconds what you already do and what is missing."}</h2></div><AuditStart locale={locale} compact /></div>
      <Link className="link-arrow" href={`/${locale}/blog`} style={{ display: "inline-block", marginTop: 50 }}>← {ro ? "Toate articolele" : "All articles"}</Link>
    </article>
    {others.length ? <section className="shell section-tight"><div className="meta">// {ro ? "Citește și" : "Read next"}</div><div className="grid3" style={{ marginTop: 24 }}>{others.map(o => <Link className="post-card" key={o.slug} href={`/${locale}/blog/${o.slug}`}><div className="meta accent">// {ui[locale].categories[o.category]} · {o.read}</div><h3>{o.title}</h3><p>{o.excerpt}</p><span className="link-arrow">{ui[locale].read} →</span></Link>)}</div></section> : null}
    <FinalCta locale={locale} title={ro ? "Ce ai schimba la afacerea ta?" : "What would you change in your business?"} text={ro ? "Aplicăm ideile pe problema ta concretă. Răspundem în maximum o zi lucrătoare." : "We apply these ideas to your real challenge. We reply within one business day."} button={ro ? "Scrie-ne" : "Write to us"} />
  </>;
}
