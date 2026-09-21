import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { posts, serviceKeys } from "@/lib/site";
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL || "https://bloc.ro";return locales.flatMap(locale=>["","/servicii","/despre","/blog","/contact","/confidentialitate","/termeni",...serviceKeys.map(s=>`/servicii/${s}`),...posts[locale].map(p=>`/blog/${p.slug}`)].map(path=>({url:`${base.replace(/\/$/,"")}/${locale}${path}`,lastModified:new Date()})))}
