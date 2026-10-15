import Link from "next/link";

export default function NotFound() {
  return <section className="shell section"><div className="meta">// 404</div><h1 className="page-title">Pagina nu există. <em className="serif accent">Site-ul tău, da.</em></h1><p className="lead" style={{ marginTop: 28 }}>Linkul este greșit sau pagina a fost mutată. This page does not exist.</p><div className="cta-row" style={{ marginTop: 30 }}><Link className="btn" href="/ro">Acasă →</Link><Link className="btn btn-outline" href="/ro/audit">Audit gratuit</Link><Link className="btn btn-outline" href="/en">English</Link></div></section>;
}
