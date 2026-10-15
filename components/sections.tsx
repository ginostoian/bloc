import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { beliefs, comparison, guarantees, plans, platforms, projects, startSteps, stats, type Plan } from "@/lib/content/common";
import { groupNames, services, type ServiceGroup } from "@/lib/content/services";
import { Eyebrow } from "./ui";

export function StatStrip({ locale }: { locale: Locale }) {
  return <dl className="stat-strip">{stats[locale].map(([v, l]) => <div key={l}><dt className="sr-only">{l}</dt><dd><strong>{v}</strong><span className="meta">{l}</span></dd></div>)}</dl>;
}

export function PlatformRow({ locale }: { locale: Locale }) {
  return <div className="platform-row"><span className="meta">{locale === "ro" ? "Te facem găsit în" : "We get you found on"}</span><ul>{platforms.map(p => <li key={p}>{p}</li>)}</ul></div>;
}

export function Beliefs({ locale, title }: { locale: Locale; title?: string }) {
  const ro = locale === "ro";
  return <section className="shell section"><Eyebrow>// {ro ? "Ce credem" : "What we believe"}</Eyebrow><h2 className="display" style={{ maxWidth: 1000 }}>{title || (ro ? "Agențiile vând ore. Noi vindem rezultate." : "Agencies sell hours. We sell outcomes.")}</h2><div className="grid3" style={{ marginTop: 50 }}>{beliefs[locale].map(([t, d], i) => <div className="panel" key={t}><span className="number">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>;
}

export function Comparison({ locale }: { locale: Locale }) {
  const c = comparison[locale]; const ro = locale === "ro";
  return <section className="section rule" style={{ background: "var(--bg2)" }}><div className="shell"><Eyebrow>// {ro ? "Comparația cinstită" : "The honest comparison"}</Eyebrow><h2 className="display" style={{ maxWidth: 950 }}>{ro ? "Aceleași bani. Altă experiență." : "Same money. A different experience."}</h2><div className="table-wrap" style={{ marginTop: 45 }}><table className="compare"><caption className="sr-only">{ro ? "Bloc comparat cu o agenție clasică și un freelancer" : "Bloc compared with a traditional agency and a freelancer"}</caption><thead><tr>{c.cols.map((h, i) => <th key={i} scope="col" className={i === 3 ? "us" : undefined}>{h}</th>)}</tr></thead><tbody>{c.rows.map(r => <tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td><td className="us">{r[3]}</td></tr>)}</tbody></table></div></div></section>;
}

export function Guarantees({ locale, paper }: { locale: Locale; paper?: boolean }) {
  const ro = locale === "ro";
  return <section className={paper ? "paper section" : "shell section"}><div className={paper ? "shell" : undefined}><Eyebrow>// {ro ? "Riscul e al nostru" : "The risk is ours"}</Eyebrow><h2 className="display" style={{ maxWidth: 950 }}>{ro ? "Patru garanții. În scris, în contract." : "Four guarantees. In writing, in the contract."}</h2><div className="guarantee-grid" style={{ marginTop: 48 }}>{guarantees[locale].map(([t, d]) => <div className="guarantee" key={t}><span className="seal" aria-hidden="true">✓</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>;
}

export function StartSteps({ locale, title }: { locale: Locale; title?: string }) {
  const ro = locale === "ro";
  return <section className="shell section"><Eyebrow>// {ro ? "Cum începem" : "How a start works"}</Eyebrow><h2 className="display" style={{ maxWidth: 900, marginBottom: 48 }}>{title || (ro ? "De la primul mesaj la lucru, în mai puțin de o săptămână." : "From first message to work, in under a week.")}</h2><ol className="process-grid steps">{startSteps[locale].map(([when, t, d]) => <li className="panel" key={t}><span className="number">{when}</span><h3>{t}</h3><p>{d}</p></li>)}</ol></section>;
}

export const priceLabel = (locale: Locale, from: string, unit: string) => `${locale === "ro" ? "de la" : "from"} ${from}${/lun|month/.test(unit) ? (locale === "ro" ? "/lună" : "/mo") : ""}`;

export function ServiceGroups({ locale }: { locale: Locale }) {
  const groups: ServiceGroup[] = ["build", "found", "scale"];
  return <div className="service-groups">{groups.map(g => <div key={g} className="service-group"><div className="service-group-head"><h3>{groupNames[locale][g][0]}</h3><p>{groupNames[locale][g][1]}</p></div><div>{services[locale].filter(s => s.group === g).map(s => <Link className="service-row" key={s.slug} href={`/${locale}/servicii/${s.slug}`}><span className="number">{priceLabel(locale, s.price.from, s.price.unit)}</span><div><h4>{s.name}</h4><p>{s.short}</p></div><span className="row-arrow" aria-hidden="true">↗</span></Link>)}</div></div>)}</div>;
}

export function PlanCard({ plan, locale }: { plan: Plan; locale: Locale }) {
  const ro = locale === "ro";
  return <article className={`offer-card ${plan.featured ? "featured" : ""}`}>{plan.featured ? <div className="badge">{ro ? "Cel mai ales" : "Most chosen"}</div> : null}<div className="meta accent">{plan.name}</div><strong className="price">{plan.price}<span>{plan.unit}</span></strong><p>{plan.desc}</p><ul>{plan.points.map(p => <li key={p}>{p}</li>)}</ul><Link className={plan.featured ? "btn" : "btn btn-outline"} href={`/${locale}/servicii/${plan.service}`}>{ro ? "Vezi ce include" : "See what's included"} →</Link></article>;
}

export function PricingTeaser({ locale }: { locale: Locale }) {
  const ro = locale === "ro"; const p = plans[locale];
  return <section className="shell section"><Eyebrow>// {ro ? "Prețuri publice" : "Public pricing"}</Eyebrow><h2 className="display" style={{ maxWidth: 900 }}>{ro ? "Prețul e pe site. Nu într-un call de vânzări." : "The price is on the site. Not in a sales call."}</h2><p className="lead">{ro ? "O agenție full-service cere de obicei 8.000–15.000 € pentru un site de prezentare. La noi pornește de la 2.400 €, fix, cu texte, SEO și garanție incluse." : "A full-service agency typically charges €8,000–15,000 for a business website. Ours start at €2,400, fixed, with copy, SEO and a guarantee included."}</p><div className="grid3 pricing" style={{ marginTop: 48 }}>{[p.projects[0], p.projects[1], p.monthly[3]].map((plan, i) => <PlanCard key={plan.name} plan={{ ...plan, featured: i === 1 }} locale={locale} />)}</div><p style={{ marginTop: 28 }}><Link className="link-arrow" href={`/${locale}/preturi`}>{ro ? "Toate prețurile și planurile" : "All prices and plans"} →</Link></p></section>;
}

export function ProjectGrid({ locale, detailed }: { locale: Locale; detailed?: boolean }) {
  const ro = locale === "ro";
  return <div className="project-grid">{projects[locale].map(p => <article className="project-card" key={p.name}><a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`${p.name}: ${ro ? "vezi site-ul" : "view website"}`}><Image src={`/projects/${p.image}`} alt={`${ro ? "Captură site" : "Website screenshot"} ${p.name}`} width={1280} height={720} sizes="(max-width: 820px) 100vw, 50vw" className="project-image" /></a><div className="meta">{p.tags} · {p.sector}</div><h3>{p.name}</h3>{detailed ? <><p><strong className="ink">{ro ? "Provocarea: " : "The challenge: "}</strong>{p.challenge}</p><p><strong className="ink">{ro ? "Ce am construit: " : "What we built: "}</strong>{p.built}</p></> : <p>{p.text}</p>}<div className="project-bottom"><span className="meta">{p.domain}</span><a className="link-arrow" href={p.url} target="_blank" rel="noopener noreferrer">{ro ? "Vezi live" : "View live"} ↗</a></div></article>)}</div>;
}

export function FounderNote({ locale }: { locale: Locale }) {
  const ro = locale === "ro";
  return <aside className="founder"><div className="founder-mark" aria-hidden="true">G</div><div><p>{ro ? "„Fiecare mesaj trimis prin site ajunge la mine. Dacă te putem ajuta, îți spun cum și cât costă. Dacă nu, îți spun asta și îți recomand pe cineva care poate.”" : "\"Every message sent through this site reaches me. If we can help, I will tell you how and what it costs. If we cannot, I will say so and recommend someone who can.\""}</p><span className="meta">Gino Stoian · {ro ? "Fondator Bloc" : "Founder, Bloc"}</span></div></aside>;
}
