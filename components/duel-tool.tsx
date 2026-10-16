"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Teaser } from "@/lib/audit/teaser";
import type { Category, Status } from "@/lib/audit/types";
import { Ring, ShareBar, catNames, order, tone } from "./audit-tool";

type Gap = { id: string; category: Category; status: Status; title: string };
type Duel = { a: Teaser; b: Teaser; aBehind: Gap[]; bBehind: Gap[]; share: string | null };

export function DuelTool({ locale }: { locale: Locale }) {
  const ro = locale === "ro";
  const [a, setA] = useState(""), [b, setB] = useState("");
  const [state, setState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [data, setData] = useState<Duel | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  async function run(x: string, y: string) {
    if (!x.trim() || !y.trim()) return;
    setState("running"); setError(""); setData(null);
    try {
      const res = await fetch("/api/audit/duel", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ a: x, b: y, locale }) });
      const json = await res.json();
      if (!res.ok) throw Object.assign(new Error(json.error || "network"), { side: json.side });
      setData(json); setState("done");
      setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch (e) {
      const { message: code, side } = e as Error & { side?: "a" | "b" };
      const who = side === "b" ? (ro ? "site-ul concurentului" : "the competitor's site") : (ro ? "site-ul tău" : "your site");
      setError(code === "same_site" ? (ro ? "Ai introdus același site de două ori." : "You entered the same site twice.")
        : code === "rate_limited" ? (ro ? "Prea multe analize la rând. Mai încearcă în câteva minute." : "Too many audits in a row. Try again in a few minutes.")
        : code === "invalid_url" || code === "blocked_host" ? (ro ? `Adresa pentru ${who} nu pare validă.` : `The address for ${who} does not look valid.`)
        : (ro ? `Nu am putut accesa ${who}. Verifică adresa și încearcă din nou.` : `We could not reach ${who}. Check the address and try again.`));
      setState("error");
    }
  }

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const qa = q.get("a") || "", qb = q.get("b") || "";
    setA(qa); setB(qb);
    if (qa && qb) run(qa, qb);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const diff = data ? data.a.scores.overall - data.b.scores.overall : 0;
  const metrics = data ? [
    [ro ? "Răspuns server" : "Server response", data.a.metrics.ttfbMs, data.b.metrics.ttfbMs, " ms", "low"],
    [ro ? "Încărcare 4G (est.)" : "4G load (est.)", data.a.metrics.est4gSeconds, data.b.metrics.est4gSeconds, " s", "low"],
    [ro ? "Greutate pagină" : "Page weight", data.a.metrics.pageWeightKb, data.b.metrics.pageWeightKb, " KB", "low"],
    [ro ? "Cuvinte în HTML" : "Words in HTML", data.a.metrics.wordCount, data.b.metrics.wordCount, "", "high"]
  ] as [string, number, number, string, "low" | "high"][] : [];

  return <div className="duel">
    <form className="duel-form" onSubmit={e => { e.preventDefault(); run(a, b); }}>
      <label><span className="meta">{ro ? "Site-ul tău" : "Your site"}</span><input value={a} onChange={e => setA(e.target.value)} placeholder={ro ? "firmata.ro" : "yourcompany.com"} inputMode="url" required /></label>
      <span className="vs" aria-hidden="true">vs</span>
      <label><span className="meta">{ro ? "Concurentul" : "Competitor"}</span><input value={b} onChange={e => setB(e.target.value)} placeholder={ro ? "concurent.ro" : "competitor.com"} inputMode="url" required /></label>
      <button className="btn" type="submit" disabled={state === "running"}>{state === "running" ? (ro ? "Analizăm ambele site-uri…" : "Auditing both sites…") : (ro ? "Începe duelul" : "Start the head-to-head")} →</button>
    </form>
    <p className="meta" style={{ marginTop: 12 }}>{ro ? "Aceleași 60+ verificări pentru ambele · ~40 de secunde · gratuit" : "The same 60+ checks for both · ~40 seconds · free"}</p>
    {state === "running" ? <p role="status" className="duel-running"><span aria-hidden="true">●</span> {ro ? "Măsurăm viteza, SEO-ul, căutarea AI, conformitatea legală și încrederea pentru ambele site-uri…" : "Measuring speed, SEO, AI search, legal compliance and trust for both sites…"}</p> : null}
    {state === "error" ? <p role="alert" className="audit-error">{error}</p> : null}

    {data ? <div className="duel-result" ref={ref}>
      <h2 className="verdict" style={{ maxWidth: "none" }}>{diff === 0 ? (ro ? "Egalitate perfectă. Diferența o fac detaliile de mai jos." : "A dead heat. The details below make the difference.")
        : diff > 0 ? (ro ? `Câștigi cu ${diff} puncte. Iată unde mai poți crește avantajul.` : `You win by ${diff} points. Here is where to widen the gap.`)
        : (ro ? `${data.b.host} te bate cu ${-diff} puncte. Vestea bună: aproape tot se poate recupera.` : `${data.b.host} beats you by ${-diff} points. The good news: almost all of it is recoverable.`)}</h2>

      <div className="duel-head">
        <div className={diff >= 0 ? "winner" : ""}><Ring score={data.a.scores.overall} size={150} /><strong>{data.a.host}</strong><span className="meta">{ro ? "Site-ul tău" : "Your site"}</span></div>
        <span className="vs big" aria-hidden="true">vs</span>
        <div className={diff <= 0 ? "winner" : ""}><Ring score={data.b.scores.overall} size={150} /><strong>{data.b.host}</strong><span className="meta">{ro ? "Concurentul" : "Competitor"}</span></div>
      </div>

      <table className="duel-table">
        <caption className="sr-only">{ro ? "Scoruri pe categorii" : "Scores by category"}</caption>
        <thead><tr><th scope="col">{data.a.host}</th><th scope="col">{ro ? "Categorie" : "Category"}</th><th scope="col">{data.b.host}</th></tr></thead>
        <tbody>{order.map(c => { const x = data.a.scores[c], y = data.b.scores[c]; return <tr key={c}>
          <td className={x > y ? "win" : ""}><div className={`dbar left ${tone(x)}`}><i style={{ width: `${x}%` }} /></div><strong>{x}</strong></td>
          <th scope="row">{catNames[locale][c]}</th>
          <td className={y > x ? "win" : ""}><strong>{y}</strong><div className={`dbar ${tone(y)}`}><i style={{ width: `${y}%` }} /></div></td>
        </tr>; })}
        {metrics.map(([label, x, y, unit, better]) => { const aWins = better === "low" ? x < y : x > y, bWins = better === "low" ? y < x : y > x; return <tr key={label} className="metric">
          <td className={aWins ? "win" : ""}><strong>{x}{unit}</strong></td><th scope="row">{label}</th><td className={bWins ? "win" : ""}><strong>{y}{unit}</strong></td>
        </tr>; })}</tbody>
      </table>

      <div className="duel-gaps">
        <div><h3>{ro ? `Unde te bate ${data.b.host}` : `Where ${data.b.host} beats you`}</h3>{data.aBehind.length ? <ul>{data.aBehind.slice(0, 8).map(g => <li key={g.id} className={g.status}><span className="pill">{catNames[locale][g.category]}</span>{g.title}</li>)}</ul> : <p className="body">{ro ? "Nicăieri. Nu există verificare la care el să treacă și tu nu." : "Nowhere. There is no check they pass and you fail."}</p>}</div>
        <div><h3>{ro ? `Unde îl bați pe ${data.b.host}` : `Where you beat ${data.b.host}`}</h3>{data.bBehind.length ? <ul>{data.bBehind.slice(0, 8).map(g => <li key={g.id} className="pass"><span className="pill">{catNames[locale][g.category]}</span>{g.title}</li>)}</ul> : <p className="body">{ro ? "Deocamdată nicăieri. Aici intervenim noi." : "Nowhere yet. That is where we come in."}</p>}</div>
      </div>

      {data.share ? <ShareBar token={data.share} locale={locale} text={ro ? `${data.a.host} ${data.a.scores.overall} vs ${data.b.host} ${data.b.scores.overall} în duelul de site-uri Bloc.` : `${data.a.host} ${data.a.scores.overall} vs ${data.b.host} ${data.b.scores.overall} in the Bloc head-to-head audit.`} /> : null}

      <div className="audit-band" style={{ marginTop: 40 }}>
        <div><div className="meta accent">// {ro ? "Următorul pas" : "Next step"}</div><h2 className="display-sm">{diff < 0 ? (ro ? "Recuperează diferența. Apoi depășește-l." : "Close the gap. Then overtake them.") : (ro ? "Păstrează avansul. Concurența nu stă pe loc." : "Keep the lead. Your competitors will not stand still.")}</h2></div>
        <div className="cta-row"><Link className="btn" href={`/${locale}/audit?url=${encodeURIComponent(data.a.host)}`}>{ro ? "Raportul complet PDF pentru site-ul meu" : "Full PDF report for my site"} →</Link><Link className="btn btn-outline" href={`/${locale}/contact?topic=roast&site=${encodeURIComponent(data.a.host)}`}>{ro ? "Vreau să-l depășesc" : "Help me overtake them"}</Link></div>
      </div>
    </div> : null}
  </div>;
}
