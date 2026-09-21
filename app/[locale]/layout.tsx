import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsent } from "@/components/cookie-consent";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";
import { pageMetadata } from "@/lib/seo";
export function generateStaticParams(){return locales.map(locale=>({locale}))}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;return pageMetadata(locale==="en"?"en":"ro","",locale==="en"?"Bloc — Web, AI and SEO":"Bloc — Web, AI și SEO",locale==="en"?"Web, AI and SEO for businesses that want qualified enquiries.":"Web, AI și SEO pentru afaceri care vor cereri relevante.")}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <html lang={locale}><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/></head><body><SiteHeader locale={locale}/><main>{children}</main><SiteFooter locale={locale}/><CookieConsent locale={locale}/></body></html>}
