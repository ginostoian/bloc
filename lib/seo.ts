import type { Metadata } from "next";
import type { Locale } from "./i18n";
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://bloc.ro";
export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const urlPath = `/${locale}${path}`;
  return {
    metadataBase: new URL(base),
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: { ro: `/ro${path}`, en: `/en${path}`, "x-default": `/ro${path}` }
    },
    openGraph: { title, description, url: urlPath, type: "website", locale: locale === "ro" ? "ro_RO" : "en_GB" }
  };
}
