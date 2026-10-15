"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import type { Teaser } from "@/lib/audit/teaser";
import type { Category } from "@/lib/audit/types";

const catNames: Record<Locale, Record<Category, string>> = {
  ro: { performance: "Viteză", seo: "SEO", aeo: "Căutare AI", security: "Securitate", accessibility: "Accesibilitate", trust: "Încredere" },
  en: { performance: "Speed", seo: "SEO", aeo: "AI search", security: "Security", accessibility: "Accessibility", trust: "Trust" }
};
const order: Category[] = ["performance", "seo", "aeo", "trust", "security", "accessibility"];
const tone = (s: number) => (s >= 80 ? "good" : s >= 55 ? "ok" : "bad");

/** Compact URL field used in heroes: sends people to the audit page, which runs straight away. */
export function AuditStart({ locale, compact }: { locale: Locale; compact?: boolean }) {
  const router = useRouter(); const ro = locale === "ro";
  return <form className={`audit-start ${compact ? "compact" : ""}`} onSubmit={e => { e.preventDefault(); const v = String(new FormData(e.currentTarget).get("url") || "").trim(); if (v) router.push(`/${locale}/audit?url=${encodeURIComponent(v)}`); }}>
    <label className="sr-only" htmlFor={`audit-url-${compact ? "c" : "h"}`}>{ro ? "Adresa site-ului tău" : "Your website address"}</label>
    <input id={`audit-url-${compact ? "c" : "h"}`} name="url" inputMode="url" autoComplete="url" placeholder={ro ? "firmata.ro" : "yourcompany.com"} required />
    <button className="btn" type="submit">{ro ? "Analizează gratuit" : "Audit my site"} →</button>
  </form>;
}

function Ring({ score, size = 168 }: { score: number; size?: number }) {
  const r = size / 2 - 9, c = 2 * Math.PI * r;
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={`ring ${tone(score)}`} role="img" aria-label={`${score}/100`}><circle cx={size / 2} cy={size / 2} r={r} className="ring-track" /><circle cx={size / 2} cy={size / 2} r={r} className="ring-value" strokeDasharray={`${(score / 100) * c} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} /><text x="50%" y="50%" dominantBaseline="central" textAnchor="middle">{score}</text></svg>;
}

export function AuditTool({ locale }: { locale: Locale }) {
  const ro = locale === "ro";
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [data, setData] = useState<Teaser | null>(null);
  const [step, setStep] = useState(0);
  const [lead, setLead] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [leadError, setLeadError] = useState("");
  const [pdf, setPdf] = useState<{ href: string; name: string; emailed: boolean } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const steps = ro
    ? ["Ne conectăm la site", "Măsurăm viteza și greutatea paginii", "Citim ce vede Google", "Verificăm accesul crawlerelor AI", "Căutăm semnale de încredere", "Calculăm scorurile"]
    : ["Connecting to your site", "Measuring speed and page weight", "Reading what Google sees", "Checking AI crawler access", "Looking for trust signals", "Calculating scores"];

  async function run(target: string) {
    if (!target.trim()) return;
    setState("running"); setError(""); setData(null); setStep(0); setLead("idle"); setPdf(null);
    const timer = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 2200);
    try {
      const res = await fetch("/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: target, locale }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "network");
      setData(json); setState("done");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch (e) {
      const code = (e as Error).message;
      setError(code === "invalid_url" ? (ro ? "Adresa nu pare validă. Încearcă de forma firmata.ro." : "That address does not look valid. Try something like yourcompany.com.")
        : code === "blocked_host" ? (ro ? "Putem analiza doar site-uri publice." : "We can only audit public websites.")
        : code === "rate_limited" ? (ro ? "Ai rulat multe audituri la rând. Mai încearcă în câteva minute." : "You have run several audits in a row. Try again in a few minutes.")
        : code === "timeout" ? (ro ? "Site-ul a răspuns prea greu (peste 15 secunde). Asta e deja o problemă de rezolvat." : "The site took too long to respond (over 15 seconds). That is already a problem worth fixing.")
        : (ro ? "Nu am putut accesa site-ul. Verifică adresa sau încearcă din nou." : "We could not reach the site. Check the address or try again."));
      setState("error");
    } finally { clearInterval(timer); }
  }

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("url");
    if (q) { setUrl(q); run(q); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestReport(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLead("sending"); setLeadError("");
    try {
      const res = await fetch("/api/audit/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: data?.finalUrl || url, locale, name: f.get("name"), email: f.get("email"), company: f.get("company"), consent: f.get("consent") === "on", website: f.get("website") }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      if (json.pdf) {
        const bytes = Uint8Array.from(atob(json.pdf), ch => ch.charCodeAt(0));
        setPdf({ href: URL.createObjectURL(new Blob([bytes], { type: "application/pdf" })), name: json.filename, emailed: json.emailed });
      }
      setLead("sent");
    } catch (err) {
      setLeadError((err as Error).message === "rate_limited" ? (ro ? "Ai cerut deja câteva rapoarte azi. Scrie-ne și ți-l trimitem manual." : "You have already requested several reports today. Email us and we will send it manually.") : (ro ? "Verifică numele, emailul și acordul, apoi încearcă din nou." : "Check your name, email and consent, then try again."));
      setLead("error");
    }
  }

  return <div className="audit">
    <form className="audit-form" onSubmit={e => { e.preventDefault(); run(url); }}>
      <label htmlFor="audit-url" className="meta">{ro ? "Adresa site-ului" : "Website address"}</label>
      <div className="audit-field"><input id="audit-url" value={url} onChange={e => setUrl(e.target.value)} inputMode="url" autoComplete="url" placeholder={ro ? "firmata.ro" : "yourcompany.com"} required /><button className="btn" type="submit" disabled={state === "running"}>{state === "running" ? (ro ? "Analizăm…" : "Auditing…") : (ro ? "Analizează gratuit" : "Audit my site")} →</button></div>
      <p className="meta">{ro ? "60+ verificări · ~30 de secunde · fără cont, fără card" : "60+ checks · ~30 seconds · no account, no card"}</p>
    </form>

    {state === "running" ? <div className="audit-progress" role="status" aria-live="polite"><ol>{steps.map((s, i) => <li key={s} className={i < step ? "done" : i === step ? "active" : ""}><span aria-hidden="true">{i < step ? "✓" : i === step ? "●" : "○"}</span>{s}</li>)}</ol></div> : null}
    {state === "error" ? <p role="alert" className="audit-error">{error}</p> : null}

    {data ? <div className="audit-result" ref={resultRef}>
      <div className="audit-head">
        <Ring score={data.scores.overall} />
        <div>
          <div className="meta">{ro ? "Scor general pentru" : "Overall score for"} <span className="ink">{data.host}</span></div>
          <h2 className="verdict">{data.verdict}</h2>
          <p className="body">{ro ? `Am rulat ${data.counts.total} de verificări. ${data.counts.fail} sunt critice și ${data.counts.warn} pot fi îmbunătățite.` : `We ran ${data.counts.total} checks. ${data.counts.fail} are critical and ${data.counts.warn} can be improved.`}</p>
        </div>
      </div>
      <div className="cat-grid">{order.map(c => <div key={c} className={`cat ${tone(data.scores[c])}`}><span className="meta">{catNames[locale][c]}</span><strong>{data.scores[c]}</strong><div className="bar"><i style={{ width: `${data.scores[c]}%` }} /></div></div>)}</div>
      <dl className="metric-row">
        <div><dt className="meta">{ro ? "Răspuns server" : "Server response"}</dt><dd>{data.metrics.ttfbMs} ms</dd></div>
        <div><dt className="meta">{ro ? "Încărcare 4G (est.)" : "4G load (est.)"}</dt><dd>{data.metrics.est4gSeconds} s</dd></div>
        <div><dt className="meta">{ro ? "Greutate pagină" : "Page weight"}</dt><dd>{(data.metrics.pageWeightKb / 1024).toFixed(2)} MB</dd></div>
        <div><dt className="meta">{ro ? "Platformă" : "Platform"}</dt><dd>{data.platform || "—"}</dd></div>
      </dl>

      <h3 className="audit-sub">{ro ? "Primele 3 probleme, în ordinea impactului" : "Top 3 issues, by impact"}</h3>
      <ol className="issue-list">{data.top.map(t => <li key={t.id} className={t.status}><span className="pill">{t.status === "fail" ? (ro ? "Critic" : "Critical") : (ro ? "Atenție" : "Improve")}</span><div><strong>{t.title}</strong> <span className="meta">· {t.value}</span><p>{t.why}</p></div></li>)}</ol>

      <div className="gate">
        <div className="locked" aria-hidden="true">{data.locked.slice(0, 8).map(l => <div key={l.id} className={l.status}><span className="pill">{l.status === "fail" ? (ro ? "Critic" : "Critical") : (ro ? "Atenție" : "Improve")}</span>{l.title}<span className="fake-fix" /></div>)}</div>
        <div className="gate-card">
          {lead === "sent" ? <div role="status">
            <div className="meta accent">{ro ? "Raport gata" : "Report ready"}</div>
            <h3>{pdf?.emailed ? (ro ? "Verifică-ți inboxul." : "Check your inbox.") : (ro ? "Raportul tău e gata." : "Your report is ready.")}</h3>
            <p className="body">{pdf?.emailed ? (ro ? "Ți-am trimis raportul PDF pe email. Dacă nu apare în câteva minute, verifică folderul Spam sau descarcă-l de aici." : "We have emailed you the PDF report. If it does not arrive within a few minutes, check your spam folder or download it here.") : (ro ? "Descarcă raportul PDF mai jos. Îți scriem în maximum o zi lucrătoare cu primii pași." : "Download your PDF report below. We will be in touch within one business day with first steps.")}</p>
            {pdf ? <a className="btn" href={pdf.href} download={pdf.name}>{ro ? "Descarcă PDF-ul" : "Download the PDF"} ↓</a> : null}
            <p className="body" style={{ marginTop: 16 }}><Link className="link-arrow" href={`/${locale}/contact?topic=roast&site=${encodeURIComponent(data.host)}`}>{ro ? "Vreau să le reparați voi" : "I want you to fix them"} →</Link></p>
          </div> : <form onSubmit={requestReport}>
            <div className="meta accent">{ro ? `Încă ${data.locked.length} probleme + soluțiile` : `${data.locked.length} more issues + the fixes`}</div>
            <h3>{ro ? "Primește raportul complet, în PDF." : "Get the full report as a PDF."}</h3>
            <p className="body">{ro ? "Toate cele 60+ verificări, ce înseamnă fiecare și cum se repară, în ordinea priorității. Gratuit." : "All 60+ checks, what each one means and how to fix it, in priority order. Free."}</p>
            <label className="field-line"><span>{ro ? "Nume *" : "Name *"}</span><input name="name" required autoComplete="name" maxLength={120} /></label>
            <label className="field-line"><span>{ro ? "Email *" : "Email *"}</span><input name="email" type="email" required autoComplete="email" maxLength={254} /></label>
            <label className="field-line"><span>{ro ? "Firmă (opțional)" : "Company (optional)"}</span><input name="company" autoComplete="organization" maxLength={160} /></label>
            <label className="consent-row"><input name="consent" type="checkbox" required /><span>{ro ? "Sunt de acord să primesc raportul pe email și să fiu contactat o dată despre rezultate. " : "I agree to receive the report by email and to be contacted once about the results. "}<Link className="accent" href={`/${locale}/confidentialitate`}>{ro ? "Confidențialitate" : "Privacy"}</Link></span></label>
            <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
            {leadError ? <p role="alert" className="accent">{leadError}</p> : null}
            <button className="btn" type="submit" disabled={lead === "sending"}>{lead === "sending" ? (ro ? "Generăm raportul…" : "Generating your report…") : (ro ? "Trimite-mi raportul" : "Send me the report")} →</button>
            <p className="meta" style={{ marginTop: 12 }}>{ro ? "Fără spam. Un singur email de follow-up." : "No spam. One follow-up email, that is it."}</p>
          </form>}
        </div>
      </div>
    </div> : null}
  </div>;
}
