import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// AI search and assistant crawlers are explicitly welcome: being cited by them is part of what we sell.
const aiBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: ["/", "/api/audit/card/"], disallow: ["/api/", "/ro/audit/scor/", "/en/audit/scor/"] }, { userAgent: aiBots, allow: ["/", "/api/audit/card/"], disallow: ["/api/", "/ro/audit/scor/", "/en/audit/scor/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
