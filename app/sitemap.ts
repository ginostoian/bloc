import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { posts, serviceKeys } from "@/lib/site";
import { siteUrl } from "@/lib/seo";

const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
  ["", 1, "weekly"], ["/servicii", 0.9, "monthly"], ["/preturi", 0.9, "monthly"], ["/audit", 0.9, "monthly"], ["/audit/duel", 0.8, "monthly"], ["/rezultate", 0.7, "monthly"],
  ["/despre", 0.6, "monthly"], ["/contact", 0.7, "yearly"], ["/blog", 0.7, "weekly"], ["/confidentialitate", 0.2, "yearly"], ["/termeni", 0.2, "yearly"]
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], lastModified = new Date()) =>
    locales.map(locale => ({ url: `${siteUrl}/${locale}${path}`, lastModified, changeFrequency, priority, alternates: { languages: { ro: `${siteUrl}/ro${path}`, en: `${siteUrl}/en${path}`, "x-default": `${siteUrl}/ro${path}` } } }));
  return [
    ...pages.flatMap(([p, pr, cf]) => entry(p, pr, cf)),
    ...serviceKeys.flatMap(s => entry(`/servicii/${s}`, 0.9, "monthly")),
    ...posts.ro.flatMap(p => entry(`/blog/${p.slug}`, 0.6, "yearly", new Date(p.updated || p.iso)))
  ];
}
