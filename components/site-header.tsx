"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/lib/site";
export function SiteHeader({locale}:{locale:Locale}){
 const [open,setOpen]=useState(false); const pathname=usePathname(); const other=locale==="ro"?"en":"ro"; const otherPath=pathname.replace(/^\/(ro|en)(?=\/|$)/,`/${other}`); const items=[{label:ui[locale].nav[0],href:`/${locale}/servicii`},{label:ui[locale].nav[1],href:`/${locale}/servicii/ai-automatizari`},{label:ui[locale].nav[2],href:`/${locale}/#rezultate`},{label:ui[locale].nav[3],href:`/${locale}/despre`},{label:ui[locale].nav[4],href:`/${locale}/blog`},{label:ui[locale].nav[5],href:`/${locale}/contact`}];
 return <header className="nav"><div className="shell nav-inner"><Link className="brand" href={`/${locale}`} aria-label="Bloc home"><span className="brand-mark"/>BLOC</Link><nav className="nav-links" aria-label={locale==="ro"?"Navigație principală":"Main navigation"}>{items.map(i=><Link key={i.href} href={i.href} aria-current={pathname===i.href?"page":undefined}>{i.label}</Link>)}</nav><div className="nav-actions"><Link className="lang-link" href={otherPath} aria-label={locale==="ro"?"Switch to English":"Schimbă în română"}>{other.toUpperCase()}</Link><Link className="btn btn-light" href={`/${locale}/contact`}>{ui[locale].cta} →</Link><button className="menu-button" type="button" onClick={()=>setOpen(!open)} aria-label={locale==="ro"?"Deschide meniul":"Open menu"} aria-expanded={open}>{open?"×":"☰"}</button></div></div>{open?<nav className="mobile-nav" aria-label={locale==="ro"?"Navigație mobilă":"Mobile navigation"}>{items.map(i=><Link key={i.href} href={i.href} onClick={()=>setOpen(false)}>{i.label}</Link>)}<Link href={`/${locale}/contact`} onClick={()=>setOpen(false)}>{ui[locale].cta} →</Link></nav>:null}</header>
}
