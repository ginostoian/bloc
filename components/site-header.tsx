"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/lib/content/common";

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false); const pathname = usePathname(); const ro = locale === "ro";
  const other = ro ? "en" : "ro"; const otherPath = pathname.replace(/^\/(ro|en)(?=\/|$)/, `/${other}`);
  const items = ui[locale].nav.map(([label, path]) => ({ label, href: `/${locale}${path}` }));
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  return <header className="nav"><a className="skip-link" href="#main">{ro ? "Sari la conținut" : "Skip to content"}</a><div className="shell nav-inner">
    <Link className="brand" href={`/${locale}`} aria-label={ro ? "Bloc, acasă" : "Bloc home"}><span className="brand-mark" />BLOC</Link>
    <nav className="nav-links" aria-label={ro ? "Navigație principală" : "Main navigation"}>{items.map(i => <Link key={i.href} href={i.href} aria-current={active(i.href) ? "page" : undefined}>{i.label}</Link>)}</nav>
    <div className="nav-actions"><Link className="lang-link" href={otherPath} hrefLang={other} aria-label={ro ? "Switch to English" : "Schimbă în română"}>{other.toUpperCase()}</Link><Link className="btn btn-light" href={`/${locale}/audit`}>{ui[locale].cta} →</Link><button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label={ro ? "Deschide meniul" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav">{open ? "×" : "☰"}</button></div>
  </div>{open ? <nav id="mobile-nav" className="mobile-nav" aria-label={ro ? "Navigație mobilă" : "Mobile navigation"}>{items.map(i => <Link key={i.href} href={i.href} onClick={() => setOpen(false)}>{i.label}</Link>)}<Link href={`/${locale}/audit`} onClick={() => setOpen(false)} className="accent">{ui[locale].cta} →</Link></nav> : null}</header>;
}
