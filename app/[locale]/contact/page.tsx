import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, brand, pageMetadata, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { ContactForm } from "@/components/contact-form";
import { FounderNote } from "@/components/sections";
import { PageIntro } from "@/components/ui";
import { isLocale, type Locale } from "@/lib/i18n";
import { startSteps } from "@/lib/content/common";

const meta = {
  ro: ["Contact: răspundem în 1 zi lucrătoare | Bloc", "Scrie-ne despre site, SEO, căutare AI, automatizări sau branding. Răspunde direct omul care lucrează la proiect, în maximum o zi lucrătoare."],
  en: ["Contact: we reply within 1 business day | Bloc", "Message us about websites, SEO, AI search, automation or branding. The person who will work on your project replies within one business day."]
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro";
  return pageMetadata(locale, "/contact", meta[locale][0], meta[locale][1]);
}

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro"; const ro = locale === "ro";
  return <>
    <JsonLd locale={locale} nodes={[webPageSchema(locale, "/contact", meta[locale][0], meta[locale][1], "ContactPage"), breadcrumbSchema(locale, [["Contact", "/contact"]])]} />
    <PageIntro locale={locale} crumbs={[["Contact"]]} title={ro ? "Începe cu o propoziție." : "Start with one sentence."} accent={ro ? "o propoziție" : "one sentence"} text={ro ? "Nu ai nevoie de un brief perfect. Spune-ne ce vinzi și ce nu merge. Durează un minut și e aproape tot ce ne trebuie ca să-ți dăm un răspuns util." : "You do not need a perfect brief. Tell us what you sell and what is not working. It takes a minute and it is almost everything we need to give you a useful answer."} />
    <section className="shell section-tight split" style={{ paddingTop: 0 }}>
      <ContactForm locale={locale} />
      <aside>
        <div className="panel alt">
          <div className="meta accent">{ro ? "Ce urmează" : "What happens next"}</div>
          <ol className="next-list">{startSteps[locale].slice(0, 3).map(([when, t, d]) => <li key={t}><span className="meta">{when}</span><strong>{t}</strong><p className="body">{d}</p></li>)}</ol>
        </div>
        <div className="panel">
          <div className="meta">{ro ? "Direct" : "Directly"}</div>
          <p className="body"><a className="ink" href={`mailto:${brand.email}`}>{brand.email}</a></p>
          <p className="body">Cluj-Napoca · {ro ? "România" : "Romania"} · {ro ? "Lucrăm remote cu clienți din RO, UK și UE" : "Working remotely with clients in RO, the UK and the EU"}</p>
          <p className="body">{ro ? "Luni–Vineri, 9:00–18:00 (EET)" : "Monday–Friday, 9:00–18:00 (EET)"}</p>
        </div>
        <div className="panel">
          <div className="meta">{ro ? "Nu ești gata să vorbești?" : "Not ready to talk yet?"}</div>
          <p className="body">{ro ? "Rulează auditul gratuit și vezi în 30 de secunde unde pierde site-ul tău clienți." : "Run the free audit and see in 30 seconds where your site loses customers."}</p>
          <Link className="link-arrow" href={`/${locale}/audit`}>{ro ? "Audit gratuit" : "Free audit"} →</Link>
        </div>
      </aside>
    </section>
    <section className="shell section-tight"><FounderNote locale={locale} /></section>
  </>;
}
