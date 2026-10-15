import { organizationSchema, websiteSchema } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

/** Renders a JSON-LD @graph. The organisation and website nodes are always included so every page links to the same entity. */
export function JsonLd({ locale, nodes }: { locale: Locale; nodes: object[] }) {
  const data = { "@context": "https://schema.org", "@graph": [organizationSchema(locale), websiteSchema(locale), ...nodes] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
