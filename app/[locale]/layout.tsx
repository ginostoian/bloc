import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsent } from "@/components/cookie-consent";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";
import { pageMetadata } from "@/lib/seo";
export function generateStaticParams(){return locales.map(locale=>({locale}))}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;return {...pageMetadata(locale==="en"?"en":"ro","",locale==="en"?"Bloc | Websites, SEO and AI search":"Bloc | Site-uri, SEO și căutare AI",locale==="en"?"Websites, SEO, AI search and automation for businesses that want customers.":"Site-uri, SEO, căutare AI și automatizări pentru afaceri care vor clienți."),applicationName:"Bloc",authors:[{name:"Bloc"}],creator:"Bloc",formatDetection:{telephone:false}}}
export const viewport:Viewport={themeColor:"#0b0a09",colorScheme:"dark"};
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <html lang={locale}><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/></head><body><SiteHeader locale={locale}/><main id="main">{children}</main><SiteFooter locale={locale}/><CookieConsent locale={locale}/></body></html>}
