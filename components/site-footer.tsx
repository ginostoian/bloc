import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { services } from "@/lib/content/services";
import { ui } from "@/lib/content/common";
import { brand } from "@/lib/seo";
import { CookieSettingsButton } from "./cookie-consent";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = ui[locale]; const ro = locale === "ro";
  return <footer className="footer"><div className="shell footer-grid">
    <div><Link className="brand" href={`/${locale}`}><span className="brand-mark" />BLOC</Link><p className="body">{t.footer}</p><p className="body"><a href={`mailto:${brand.email}`}>{brand.email}</a><br />{ro ? "Răspuns în 1 zi lucrătoare" : "Reply within 1 business day"}</p><address className="body" style={{ fontStyle: "normal" }}>Cluj-Napoca, {ro ? "România" : "Romania"}</address></div>
    <div className="footer-col"><span className="meta">{ro ? "Servicii" : "Services"}</span>{services[locale].map(s => <Link key={s.slug} href={`/${locale}/servicii/${s.slug}`}>{s.name}</Link>)}</div>
    <div className="footer-col"><span className="meta">{ro ? "Companie" : "Company"}</span><Link href={`/${locale}`}>{ro ? "Acasă" : "Home"}</Link>{t.nav.map(([label, path]) => <Link key={path} href={`/${locale}${path}`}>{label}</Link>)}<Link href={`/${locale}/audit`}>{t.cta}</Link></div>
    <div className="footer-col"><span className="meta">Legal</span><Link href={`/${locale}/confidentialitate`}>{ro ? "Confidențialitate" : "Privacy"}</Link><Link href={`/${locale}/termeni`}>{ro ? "Termeni" : "Terms"}</Link><CookieSettingsButton locale={locale} /></div>
  </div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Bloc. {ro ? "Toate drepturile rezervate." : "All rights reserved."}</span><span>{t.tagline}</span></div></footer>;
}
