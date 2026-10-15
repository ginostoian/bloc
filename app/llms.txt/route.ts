import { services } from "@/lib/content/services";
import { plans } from "@/lib/content/common";
import { posts } from "@/lib/site";
import { brand, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const en = services.en;
  const body = [
    "# Bloc",
    "",
    "> Bloc is a web studio in Cluj-Napoca, Romania, serving businesses in Romania, the UK and Europe. It builds fast websites, online stores and landing pages, and provides SEO, local SEO, AI search optimisation (AEO/GEO), AI automation, branding and website maintenance. Prices are public and fixed, timelines are written into contracts, and every project has a first-stage money-back guarantee.",
    "",
    `- Contact: ${brand.email} (reply within 1 business day)`,
    `- Founder: ${brand.founder}`,
    "- Languages: Romanian (/ro) and English (/en)",
    "",
    "## Services",
    ...en.map(s => `- [${s.name}](${siteUrl}/en/servicii/${s.slug}): ${s.short} From ${s.price.from} per ${s.price.unit}, ${s.price.timeline}.`),
    "",
    "## Pricing",
    ...[...plans.en.projects, ...plans.en.monthly].map(p => `- ${p.name}: ${p.price} ${p.unit}. ${p.desc}`),
    `- Full pricing: ${siteUrl}/en/preturi`,
    "",
    "## Guarantees",
    "- Deposit refunded in full if the client does not want to continue after the first stage of a project.",
    "- Every launched website scores 90+ on mobile in PageSpeed Insights, or Bloc optimises it at no cost.",
    "- SEO, local SEO and AEO plans: money back after the first month on request within 7 days.",
    "",
    "## Tools",
    `- [Free website audit](${siteUrl}/en/audit): 60+ checks across speed, SEO, AI search readiness, security, accessibility and trust, with a PDF report.`,
    "",
    "## Articles",
    ...posts.en.map(p => `- [${p.title}](${siteUrl}/en/blog/${p.slug}): ${p.excerpt}`),
    "",
    "## Optional",
    `- [About](${siteUrl}/en/despre)`,
    `- [Results](${siteUrl}/en/rezultate)`,
    `- [Romanian version](${siteUrl}/ro)`
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
