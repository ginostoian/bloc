import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";

export function Eyebrow({ children }: { children: ReactNode }) { return <div className="meta">{children}</div>; }

export function Accent({ text, accent }: { text: string; accent?: string }) {
  const parts = accent ? text.split(accent) : [text];
  return accent && parts.length > 1 ? <>{parts[0]}<em className="serif accent">{accent}</em>{parts.slice(1).join(accent)}</> : <>{text}</>;
}

export function Crumbs({ locale, items }: { locale: Locale; items: [string, string?][] }) {
  return <nav aria-label={locale === "ro" ? "Fir de navigare" : "Breadcrumb"} className="meta crumb"><Link href={`/${locale}`}>Bloc</Link>{items.map(([label, href]) => <span key={label} className="crumb-item"><span aria-hidden="true">/</span>{href ? <Link href={href}>{label}</Link> : <span aria-current="page" style={{ color: "var(--ink)" }}>{label}</span>}</span>)}</nav>;
}

export function PageIntro({ locale, crumbs, title, accent, text, children }: { locale: Locale; crumbs: [string, string?][]; title: string; accent?: string; text: string; children?: ReactNode }) {
  return <section className="shell section-tight"><Crumbs locale={locale} items={crumbs} /><h1 className="page-title"><Accent text={title} accent={accent} /></h1><p className="lead" style={{ marginTop: 32 }}>{text}</p>{children}</section>;
}

export function FinalCta({ locale, title, text, button, href }: { locale: Locale; title: string; text: string; button: string; href?: string }) {
  const ro = locale === "ro";
  return <section className="orange-section section"><div className="shell"><div className="meta">// {ro ? "Următorul pas" : "Next step"}</div><h2 className="display" style={{ maxWidth: 900 }}>{title}</h2><p className="lead" style={{ maxWidth: 620, margin: "28px 0" }}>{text}</p><div className="cta-row"><Link className="btn" href={href || `/${locale}/contact`}>{button} →</Link><Link className="btn btn-ghost-dark" href={`/${locale}/audit`}>{ro ? "Sau rulează auditul gratuit" : "Or run the free audit"}</Link></div><p className="meta" style={{ marginTop: 18 }}>{ro ? "Răspuns în 1 zi lucrătoare · Preț fix · Avansul înapoi după prima etapă" : "Reply within 1 business day · Fixed price · Deposit back after the first stage"}</p></div></section>;
}

export function Faq({ items }: { items: [string, string][] }) {
  return <div className="faq">{items.map(([q, a]) => <details key={q}><summary><h3 className="faq-q">{q}</h3><span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>;
}
