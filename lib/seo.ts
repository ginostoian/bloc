import type { Metadata } from "next";
import type { Locale } from "./i18n";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://bloc.ro").replace(/\/$/, "");
export const brand = {
  name: "Bloc",
  email: "salut@bloc.ro",
  founder: "Gino Stoian",
  city: "Cluj-Napoca",
  region: "Cluj",
  country: "RO",
  areaServed: ["RO", "GB", "DE", "AT", "NL", "IE", "EU"]
};

export function pageMetadata(locale: Locale, path: string, title: string, description: string, opts: { type?: "website" | "article"; publishedTime?: string; noIndex?: boolean } = {}): Metadata {
  const urlPath = `/${locale}${path}`;
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: { ro: `/ro${path}`, en: `/en${path}`, "x-default": `/ro${path}` }
    },
    openGraph: {
      title, description, url: urlPath, siteName: "Bloc", type: opts.type || "website", locale: locale === "ro" ? "ro_RO" : "en_GB",
      alternateLocale: locale === "ro" ? "en_GB" : "ro_RO",
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {})
    },
    twitter: { card: "summary_large_image", title, description },
    robots: opts.noIndex ? { index: false, follow: true } : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
  };
}

// ---------- JSON-LD ----------
const orgId = `${siteUrl}/#organization`;
const siteId = `${siteUrl}/#website`;

export function organizationSchema(locale: Locale) {
  const ro = locale === "ro";
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": orgId,
    name: brand.name,
    url: siteUrl,
    logo: { "@type": "ImageObject", url: `${siteUrl}/icon.svg` },
    image: `${siteUrl}/opengraph-image`,
    email: brand.email,
    description: ro
      ? "Bloc construiește site-uri rapide, SEO, optimizare pentru căutarea AI și automatizări AI pentru afaceri din România, Marea Britanie și Europa. Preț fix, termene scrise și garanție pe prima etapă."
      : "Bloc builds fast websites, SEO, AI search optimisation and AI automation for businesses in Romania, the UK and Europe. Fixed prices, written timelines and a first-stage guarantee.",
    slogan: ro ? "Construim, nu promitem." : "We build, not promise.",
    founder: { "@type": "Person", name: brand.founder, jobTitle: "Founder" },
    address: { "@type": "PostalAddress", addressLocality: brand.city, addressRegion: brand.region, addressCountry: brand.country },
    areaServed: brand.areaServed.map(c => ({ "@type": c === "EU" ? "Place" : "Country", name: c })),
    knowsLanguage: ["ro", "en"],
    priceRange: "€€",
    contactPoint: { "@type": "ContactPoint", contactType: "sales", email: brand.email, availableLanguage: ["Romanian", "English"] },
    knowsAbout: ["Web development", "Next.js", "Search engine optimisation", "Answer engine optimisation", "Generative engine optimisation", "Local SEO", "E-commerce", "Conversion rate optimisation", "AI automation", "Branding"]
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": siteId,
    url: siteUrl,
    name: "Bloc",
    inLanguage: locale,
    publisher: { "@id": orgId }
  };
}

export function breadcrumbSchema(locale: Locale, items: [string, string][]) {
  const ro = locale === "ro";
  const all: [string, string][] = [[ro ? "Acasă" : "Home", ""], ...items];
  return {
    "@type": "BreadcrumbList",
    itemListElement: all.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${siteUrl}/${locale}${path}` }))
  };
}

export function faqSchema(items: [string, string][]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }))
  };
}

export function webPageSchema(locale: Locale, path: string, name: string, description: string, type = "WebPage") {
  return {
    "@type": type,
    "@id": `${siteUrl}/${locale}${path}#webpage`,
    url: `${siteUrl}/${locale}${path}`,
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": siteId },
    about: { "@id": orgId },
    publisher: { "@id": orgId }
  };
}

export const orgRef = { "@id": orgId };
