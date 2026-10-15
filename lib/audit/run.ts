import { parse, type HTMLElement } from "node-html-parser";
import { normalizeUrl, safeFetch, tryFetch, type FetchResult } from "./fetch";
import { categories, categoryWeights, type AuditResult, type Category, type Check, type Impact, type Localized, type Status } from "./types";

const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended"];
const kb = (bytes: number) => Math.round(bytes / 1024);
const L = (ro: string, en: string): Localized => ({ ro, en });

async function pool<T, R>(items: T[], size: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, async () => {
    while (next < items.length) { const i = next++; out[i] = await fn(items[i]); }
  }));
  return out;
}

/** Parses robots.txt into groups and answers whether a bot may crawl "/". */
function robotsAllows(robots: string, bot: string): boolean {
  const lines = robots.split(/\r?\n/).map(l => l.replace(/#.*/, "").trim()).filter(Boolean);
  const groups: { agents: string[]; rules: { allow: boolean; path: string }[] }[] = [];
  let current: (typeof groups)[number] | null = null;
  let lastWasAgent = false;
  for (const line of lines) {
    const [rawKey, ...rest] = line.split(":");
    const key = rawKey.trim().toLowerCase(), value = rest.join(":").trim();
    if (key === "user-agent") {
      if (!current || !lastWasAgent) { current = { agents: [], rules: [] }; groups.push(current); }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else {
      lastWasAgent = false;
      if (current && (key === "allow" || key === "disallow")) current.rules.push({ allow: key === "allow", path: value });
    }
  }
  const group = groups.find(g => g.agents.includes(bot.toLowerCase())) || groups.find(g => g.agents.includes("*"));
  if (!group) return true;
  const matches = group.rules.filter(r => r.path && "/".startsWith(r.path.replace(/\*$/, "")));
  if (!matches.length) return true;
  matches.sort((a, b) => b.path.length - a.path.length || Number(b.allow) - Number(a.allow));
  return matches[0].allow;
}

function detectPlatform(html: string, headers: Record<string, string>): string | null {
  const h = html.slice(0, 400_000);
  if (/wp-content|wp-includes/i.test(h)) return "WordPress";
  if (/cdn\.shopify\.com|Shopify\.theme/i.test(h)) return "Shopify";
  if (/static\.wixstatic\.com|wix\.com/i.test(h)) return "Wix";
  if (/squarespace/i.test(h)) return "Squarespace";
  if (/webflow/i.test(h)) return "Webflow";
  if (/framerusercontent|framer\.com/i.test(h)) return "Framer";
  if (/__NEXT_DATA__|\/_next\//.test(h)) return "Next.js";
  if (/___gatsby/.test(h)) return "Gatsby";
  if (/\/_nuxt\//.test(h)) return "Nuxt";
  if (/Joomla/i.test(h)) return "Joomla";
  if (/PrestaShop/i.test(h)) return "PrestaShop";
  if (/woocommerce/i.test(h)) return "WooCommerce";
  if (headers["x-powered-by"]) return headers["x-powered-by"].split(/[\s/]/)[0];
  return null;
}

function detectAnalytics(html: string): string[] {
  const found: string[] = [];
  const add = (re: RegExp, name: string) => { if (re.test(html) && !found.includes(name)) found.push(name); };
  add(/googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]+/, "Google Tag Manager");
  add(/gtag\(|googletagmanager\.com\/gtag|G-[A-Z0-9]{6,}/, "Google Analytics 4");
  add(/connect\.facebook\.net|fbq\(/, "Meta Pixel");
  add(/static\.hotjar\.com|hotjar/i, "Hotjar");
  add(/clarity\.ms/, "Microsoft Clarity");
  add(/plausible\.io/, "Plausible");
  add(/analytics\.tiktok\.com/, "TikTok Pixel");
  add(/snap\.licdn\.com/, "LinkedIn Insight");
  return found;
}

function collectSchemaTypes(root: HTMLElement): { types: string[]; nodes: Record<string, unknown>[]; invalid: number } {
  const types = new Set<string>();
  const nodes: Record<string, unknown>[] = [];
  let invalid = 0;
  const visit = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    const t = obj["@type"];
    if (typeof t === "string") types.add(t); else if (Array.isArray(t)) t.forEach(x => typeof x === "string" && types.add(x));
    if (t) nodes.push(obj);
    for (const v of Object.values(obj)) if (v && typeof v === "object") visit(v);
  };
  for (const s of root.querySelectorAll('script[type="application/ld+json"]')) {
    try { visit(JSON.parse(s.text)); } catch { invalid++; }
  }
  // Microdata counts too.
  for (const el of root.querySelectorAll("[itemtype]")) {
    const m = (el.getAttribute("itemtype") || "").match(/schema\.org\/(\w+)/);
    if (m) types.add(m[1]);
  }
  return { types: [...types], nodes, invalid };
}

export async function runAudit(input: string): Promise<AuditResult> {
  const startUrl = normalizeUrl(input);
  const page = await safeFetch(startUrl, { maxBytes: 5_000_000, timeoutMs: 15_000 });
  const final = new URL(page.url);
  const html = page.body.toString("utf8");
  const root = parse(html, { comment: false, blockTextElements: { script: true, style: true, noscript: true } });
  const origin = final.origin;
  const head = root.querySelector("head");
  const checks: Check[] = [];
  const add = (id: string, category: Category, status: Status, impact: Impact, value?: Localized) => checks.push({ id, category, status, impact, value });

  // ---- Side requests, in parallel ----
  const httpVariant = new URL(final.toString()); httpVariant.protocol = "http:";
  const [robotsRes, llmsRes, httpRes] = await Promise.all([
    tryFetch(`${origin}/robots.txt`, { maxBytes: 300_000, timeoutMs: 6000 }),
    tryFetch(`${origin}/llms.txt`, { maxBytes: 300_000, timeoutMs: 6000 }),
    final.protocol === "https:" ? tryFetch(httpVariant, { method: "HEAD", timeoutMs: 6000, maxRedirects: 2 }) : Promise.resolve(null)
  ]);
  const robots = robotsRes && robotsRes.status === 200 && !/<html/i.test(robotsRes.body.toString("utf8", 0, 500)) ? robotsRes.body.toString("utf8") : null;
  const sitemapFromRobots = robots?.match(/^\s*sitemap:\s*(\S+)/im)?.[1];
  const sitemapRes = await tryFetch(sitemapFromRobots || `${origin}/sitemap.xml`, { maxBytes: 3_000_000, timeoutMs: 6000 });
  const sitemapOk = !!sitemapRes && sitemapRes.status === 200 && /<(urlset|sitemapindex)/i.test(sitemapRes.body.toString("utf8", 0, 5000));

  // ---- Resources ----
  const abs = (u?: string | null) => { if (!u) return null; try { const x = new URL(u.trim(), final); return /^https?:$/.test(x.protocol) ? x : null; } catch { return null; } };
  const scripts = root.querySelectorAll("script[src]");
  const styles = root.querySelectorAll('link[rel~="stylesheet"]');
  const images = root.querySelectorAll("img");
  const resourceUrls = new Map<string, "script" | "style" | "image" | "font">();
  scripts.forEach(s => { const u = abs(s.getAttribute("src")); if (u) resourceUrls.set(u.toString(), "script"); });
  styles.forEach(s => { const u = abs(s.getAttribute("href")); if (u) resourceUrls.set(u.toString(), "style"); });
  images.forEach(img => {
    const src = img.getAttribute("src") || img.getAttribute("data-src") || (img.getAttribute("srcset") || "").split(",")[0]?.trim().split(/\s+/)[0];
    const u = src && !src.startsWith("data:") ? abs(src) : null; if (u) resourceUrls.set(u.toString(), "image");
  });
  root.querySelectorAll('link[rel="preload"][as="font"]').forEach(f => { const u = abs(f.getAttribute("href")); if (u) resourceUrls.set(u.toString(), "font"); });
  const resources = [...resourceUrls.entries()];
  const sample = resources.slice(0, 40);
  const sampled = await pool(sample, 8, async ([u]) => {
    const r = await tryFetch(u, { method: "HEAD", timeoutMs: 5000, maxRedirects: 3 });
    if (r && r.transferBytes > 0) return r;
    return tryFetch(u, { timeoutMs: 6000, maxBytes: 4_000_000, maxRedirects: 3 });
  });
  const okSamples = sampled.filter((r): r is FetchResult => !!r && r.status < 400);
  const sampledBytes = okSamples.reduce((s, r) => s + r.transferBytes, 0);
  // Extrapolate unsampled resources with the sampled average.
  const avg = okSamples.length ? sampledBytes / okSamples.length : 0;
  const pageWeight = page.transferBytes + sampledBytes + Math.max(0, resources.length - sample.length) * avg;
  const thirdParty = new Set(resources.map(([u]) => new URL(u).hostname).filter(h => h !== final.hostname && !h.endsWith(`.${final.hostname.replace(/^www\./, "")}`)));

  // ---- PERFORMANCE ----
  const ttfb = Math.round(page.ttfbMs);
  add("ttfb", "performance", ttfb < 600 ? "pass" : ttfb < 1200 ? "warn" : "fail", "high", `${ttfb} ms`);
  const est4g = Math.round((page.ttfbMs / 1000 + 0.6 + pageWeight / (1.2 * 1024 * 1024) + Math.min(resources.length, 60) * 0.015) * 10) / 10;
  add("load4g", "performance", est4g <= 2.5 ? "pass" : est4g <= 4 ? "warn" : "fail", "high", `≈ ${est4g} s`);
  add("weight", "performance", pageWeight < 1.6e6 ? "pass" : pageWeight < 3.2e6 ? "warn" : "fail", "high", `${(pageWeight / 1048576).toFixed(2)} MB`);
  add("requests", "performance", resources.length < 50 ? "pass" : resources.length < 100 ? "warn" : "fail", "medium", `${resources.length}`);
  const enc = page.headers["content-encoding"] || "";
  add("compression", "performance", /br|gzip|deflate|zstd/i.test(enc) ? "pass" : page.body.length < 2048 ? "warn" : "fail", "medium", enc ? enc : L("lipsă", "none"));
  const blockingScripts = (head?.querySelectorAll("script[src]") || []).filter(s => !s.hasAttribute("async") && !s.hasAttribute("defer") && s.getAttribute("type") !== "module").length;
  add("renderBlocking", "performance", blockingScripts === 0 && styles.length <= 4 ? "pass" : blockingScripts <= 2 && styles.length <= 8 ? "warn" : "fail", "medium", L(`${blockingScripts} scripturi, ${styles.length} CSS`, `${blockingScripts} scripts, ${styles.length} CSS`));
  add("htmlSize", "performance", page.body.length < 150_000 ? "pass" : page.body.length < 500_000 ? "warn" : "fail", "low", `${kb(page.body.length)} KB`);
  const imgUrls = resources.filter(([, t]) => t === "image").map(([u]) => u);
  const pictureSources = root.querySelectorAll("picture source").map(s => s.getAttribute("type") || s.getAttribute("srcset") || "");
  const modern = imgUrls.filter(u => /\.(webp|avif)(\?|$)/i.test(u) || /[?&](fm|format|auto)=(webp|avif|format)/i.test(u) || /_next\/image|cdn-cgi\/image|imagekit|cloudinary|imgix/i.test(u)).length + pictureSources.filter(s => /webp|avif/i.test(s)).length;
  if (imgUrls.length) add("imageFormats", "performance", modern / imgUrls.length >= 0.6 ? "pass" : modern / imgUrls.length >= 0.25 ? "warn" : "fail", "medium", `${Math.min(100, Math.round(modern / imgUrls.length * 100))}% WebP/AVIF`);
  if (images.length > 3) {
    const lazy = images.slice(2).filter(i => i.getAttribute("loading") === "lazy" || i.hasAttribute("data-src")).length;
    const ratio = lazy / (images.length - 2);
    add("lazyLoading", "performance", ratio >= 0.7 ? "pass" : ratio >= 0.3 ? "warn" : "fail", "medium", `${Math.round(ratio * 100)}%`);
  }
  if (images.length) {
    const sized = images.filter(i => i.getAttribute("width") && i.getAttribute("height")).length;
    add("imageDimensions", "performance", sized / images.length >= 0.8 ? "pass" : sized / images.length >= 0.4 ? "warn" : "fail", "low", `${sized}/${images.length}`);
  }
  const staticSamples = okSamples.filter(r => /\.(js|css|woff2?|png|jpe?g|webp|avif|svg)(\?|$)/i.test(r.url));
  if (staticSamples.length) {
    const cached = staticSamples.filter(r => { const m = (r.headers["cache-control"] || "").match(/max-age=(\d+)/); return (m && Number(m[1]) >= 604800) || /immutable/.test(r.headers["cache-control"] || ""); }).length;
    add("caching", "performance", cached / staticSamples.length >= 0.7 ? "pass" : cached / staticSamples.length >= 0.3 ? "warn" : "fail", "medium", `${Math.round(cached / staticSamples.length * 100)}%`);
  }
  add("thirdParty", "performance", thirdParty.size <= 5 ? "pass" : thirdParty.size <= 10 ? "warn" : "fail", "low", `${thirdParty.size}`);
  add("redirects", "performance", page.redirects.length <= 1 ? "pass" : page.redirects.length === 2 ? "warn" : "fail", "low", `${page.redirects.length}`);

  // ---- SEO ----
  const title = (root.querySelector("title")?.text || "").replace(/\s+/g, " ").trim();
  const metaContent = (sel: string) => (root.querySelector(sel)?.getAttribute("content") || "").trim();
  const description = metaContent('meta[name="description" i]') || metaContent('meta[name="Description"]');
  add("title", "seo", !title ? "fail" : title.length >= 25 && title.length <= 65 ? "pass" : "warn", "high", title ? L(`${title.length} caractere`, `${title.length} characters`) : L("lipsă", "missing"));
  add("metaDescription", "seo", !description ? "fail" : description.length >= 70 && description.length <= 165 ? "pass" : "warn", "high", description ? L(`${description.length} caractere`, `${description.length} characters`) : L("lipsă", "missing"));
  const h1s = root.querySelectorAll("h1");
  add("h1", "seo", h1s.length === 1 ? "pass" : h1s.length === 0 ? "fail" : "warn", "high", `${h1s.length} × H1`);
  const headings = root.querySelectorAll("h1,h2,h3,h4,h5,h6").map(h => Number(h.tagName[1]));
  const skipped = headings.some((lvl, i) => i > 0 && lvl - headings[i - 1] > 1);
  add("headingOrder", "seo", headings.length >= 3 && !skipped ? "pass" : headings.length < 3 ? "warn" : "warn", "low", L(`${headings.length} titluri`, `${headings.length} headings`));
  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute("href");
  add("canonical", "seo", canonical ? "pass" : "warn", "medium", canonical ? L("prezent", "present") : L("lipsă", "missing"));
  const robotsMeta = metaContent('meta[name="robots" i]').toLowerCase();
  const xRobots = (page.headers["x-robots-tag"] || "").toLowerCase();
  add("indexable", "seo", /noindex/.test(robotsMeta + xRobots) || page.status >= 400 ? "fail" : "pass", "high", /noindex/.test(robotsMeta + xRobots) ? "noindex" : `HTTP ${page.status}`);
  add("robotsTxt", "seo", robots ? "pass" : "warn", "low", robots ? L("găsit", "found") : L("lipsă", "missing"));
  add("sitemap", "seo", sitemapOk ? "pass" : "fail", "medium", sitemapOk ? L("găsit", "found") : L("lipsă", "missing"));
  const ogTitle = metaContent('meta[property="og:title"]'), ogImage = metaContent('meta[property="og:image"]'), ogDesc = metaContent('meta[property="og:description"]');
  const ogCount = [ogTitle, ogImage, ogDesc].filter(Boolean).length;
  add("openGraph", "seo", ogCount === 3 ? "pass" : ogCount > 0 ? "warn" : "fail", "low", `${ogCount}/3`);
  const lang = root.querySelector("html")?.getAttribute("lang");
  add("langAttr", "seo", lang ? "pass" : "warn", "low", lang || L("lipsă", "missing"));
  const viewport = metaContent('meta[name="viewport"]');
  add("mobileViewport", "seo", /width=device-width/.test(viewport) ? "pass" : "fail", "high", viewport ? "device-width" : L("lipsă", "missing"));
  const bodyText = (root.querySelector("body")?.structuredText || "").replace(/\s+/g, " ").trim();
  const wordCount = bodyText ? bodyText.split(" ").filter(w => /\p{L}/u.test(w)).length : 0;
  add("contentDepth", "seo", wordCount >= 400 ? "pass" : wordCount >= 200 ? "warn" : "fail", "medium", L(`${wordCount} cuvinte`, `${wordCount} words`));
  const links = root.querySelectorAll("a[href]");
  const internal = links.filter(a => { const u = abs(a.getAttribute("href")); return u && u.hostname === final.hostname; }).length;
  add("internalLinks", "seo", internal >= 10 ? "pass" : internal >= 4 ? "warn" : "fail", "medium", `${internal}`);
  const favicon = root.querySelector('link[rel~="icon"]') || root.querySelector('link[rel="shortcut icon"]');
  add("favicon", "seo", favicon ? "pass" : "warn", "low", favicon ? L("prezent", "present") : L("lipsă", "missing"));
  const hreflang = root.querySelectorAll('link[rel="alternate"][hreflang]').length;
  if (hreflang || /\/(en|ro|de|fr)(\/|$)/.test(final.pathname)) add("hreflang", "seo", hreflang >= 2 ? "pass" : "warn", "low", `${hreflang}`);

  // ---- AEO / AI search ----
  const schema = collectSchemaTypes(root);
  const hasOrg = schema.types.some(t => /Organization|LocalBusiness|Corporation|ProfessionalService|Store|Restaurant|MedicalBusiness|Dentist|LegalService|Person/i.test(t));
  add("structuredData", "aeo", schema.types.length >= 2 && !schema.invalid ? "pass" : schema.types.length ? "warn" : "fail", "high", schema.types.length ? schema.types.slice(0, 6).join(", ") : L("lipsă", "none"));
  add("entitySchema", "aeo", hasOrg ? "pass" : "fail", "high", hasOrg ? L("prezent", "present") : L("lipsă", "missing"));
  const sameAs = schema.nodes.some(n => n.sameAs && (Array.isArray(n.sameAs) ? n.sameAs.length : true));
  add("sameAs", "aeo", sameAs ? "pass" : "warn", "medium", sameAs ? L("prezent", "present") : L("lipsă", "missing"));
  const questionHeadings = root.querySelectorAll("h2,h3,h4,summary,dt").filter(h => /\?\s*$/.test(h.text.trim())).length;
  const hasFaqSchema = schema.types.some(t => /FAQPage|QAPage/i.test(t));
  add("faqContent", "aeo", questionHeadings >= 3 && hasFaqSchema ? "pass" : questionHeadings >= 3 || hasFaqSchema ? "warn" : "fail", "high", L(`${questionHeadings} întrebări${hasFaqSchema ? " + FAQPage" : ""}`, `${questionHeadings} questions${hasFaqSchema ? " + FAQPage" : ""}`));
  const llmsOk = !!llmsRes && llmsRes.status === 200 && !/<html/i.test(llmsRes.body.toString("utf8", 0, 500)) && llmsRes.body.length > 20;
  add("llmsTxt", "aeo", llmsOk ? "pass" : "warn", "low", llmsOk ? L("găsit", "found") : L("lipsă", "missing"));
  const blockedBots = robots ? AI_BOTS.filter(b => !robotsAllows(robots, b)) : [];
  add("aiCrawlers", "aeo", blockedBots.length === 0 ? "pass" : blockedBots.length <= 2 ? "warn" : "fail", "high", blockedBots.length ? L(`blocați: ${blockedBots.join(", ")}`, `blocked: ${blockedBots.join(", ")}`) : L("toți permiși", "all allowed"));
  const scriptHeavy = wordCount < 80 && scripts.length > 3;
  add("serverRendered", "aeo", scriptHeavy ? "fail" : wordCount < 200 ? "warn" : "pass", "high", L(`${wordCount} cuvinte în HTML`, `${wordCount} words in HTML`));
  const lists = root.querySelectorAll("ul li, ol li, table").length;
  add("scannableAnswers", "aeo", lists >= 8 ? "pass" : lists >= 3 ? "warn" : "fail", "low", `${lists}`);
  const hasDates = !!root.querySelector('time[datetime]') || schema.nodes.some(n => n.datePublished || n.dateModified) || !!metaContent('meta[property="article:modified_time"]');
  add("freshness", "aeo", hasDates ? "pass" : "warn", "low", hasDates ? L("prezente", "present") : L("lipsă", "missing"));

  // ---- SECURITY ----
  const isHttps = final.protocol === "https:";
  add("https", "security", isHttps ? "pass" : "fail", "high", isHttps ? "HTTPS" : "HTTP");
  if (isHttps) {
    const forced = !httpRes || httpRes.url.startsWith("https://") || httpRes.redirects.length > 0;
    add("httpsRedirect", "security", forced ? "pass" : "fail", "medium", forced ? "301 → HTTPS" : L("lipsă", "missing"));
  }
  const H = page.headers;
  add("hsts", "security", H["strict-transport-security"] ? "pass" : "warn", "medium", H["strict-transport-security"] ? L("activ", "enabled") : L("lipsă", "missing"));
  add("csp", "security", H["content-security-policy"] ? "pass" : "warn", "medium", H["content-security-policy"] ? L("activ", "enabled") : L("lipsă", "missing"));
  add("nosniff", "security", /nosniff/i.test(H["x-content-type-options"] || "") ? "pass" : "warn", "low", H["x-content-type-options"] || L("lipsă", "missing"));
  const frame = H["x-frame-options"] || (/frame-ancestors/i.test(H["content-security-policy"] || "") ? "frame-ancestors" : "");
  add("clickjacking", "security", frame ? "pass" : "warn", "low", frame || L("lipsă", "missing"));
  add("referrerPolicy", "security", H["referrer-policy"] ? "pass" : "warn", "low", H["referrer-policy"] || L("lipsă", "missing"));
  const mixed = isHttps ? resources.filter(([u]) => u.startsWith("http://")).length : 0;
  add("mixedContent", "security", mixed ? "fail" : "pass", "high", `${mixed}`);
  const leak = [H["server"], H["x-powered-by"]].filter(v => v && /\d/.test(v)).join(" · ");
  add("versionLeak", "security", leak ? "warn" : "pass", "low", leak || L("ascuns", "hidden"));

  // ---- ACCESSIBILITY ----
  add("a11yLang", "accessibility", lang ? "pass" : "fail", "medium", lang || L("lipsă", "missing"));
  if (images.length) {
    const withAlt = images.filter(i => i.hasAttribute("alt")).length;
    add("altText", "accessibility", withAlt / images.length >= 0.95 ? "pass" : withAlt / images.length >= 0.7 ? "warn" : "fail", "high", `${withAlt}/${images.length}`);
  }
  const inputs = root.querySelectorAll("input:not([type=hidden]):not([type=submit]):not([type=button]), select, textarea").filter(i => !/position:\s*absolute|display:\s*none/i.test(i.getAttribute("style") || "") && i.getAttribute("tabindex") !== "-1");
  if (inputs.length) {
    const labelled = inputs.filter(i => {
      const id = i.getAttribute("id");
      return i.getAttribute("aria-label") || i.getAttribute("aria-labelledby") || i.getAttribute("title") || (id && root.querySelector(`label[for="${id.replace(/"/g, "")}"]`)) || i.closest("label");
    }).length;
    add("formLabels", "accessibility", labelled === inputs.length ? "pass" : labelled / inputs.length >= 0.6 ? "warn" : "fail", "medium", `${labelled}/${inputs.length}`);
  }
  const emptyLinks = links.filter(a => !a.text.trim() && !a.getAttribute("aria-label") && !a.getAttribute("title") && !a.querySelector("img[alt]:not([alt=''])") && !a.querySelector("[aria-label]")).length;
  add("linkNames", "accessibility", emptyLinks === 0 ? "pass" : emptyLinks <= 3 ? "warn" : "fail", "medium", `${emptyLinks}`);
  const buttons = root.querySelectorAll("button");
  const emptyButtons = buttons.filter(b => !b.text.trim() && !b.getAttribute("aria-label") && !b.getAttribute("title")).length;
  if (buttons.length) add("buttonNames", "accessibility", emptyButtons === 0 ? "pass" : emptyButtons <= 2 ? "warn" : "fail", "medium", `${emptyButtons}`);
  const zoomBlocked = /user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?(\s|,|$)/i.test(viewport);
  add("zoom", "accessibility", zoomBlocked ? "fail" : "pass", "medium", zoomBlocked ? L("blocat", "blocked") : L("permis", "allowed"));
  const landmarks = ["main", "nav", "header", "footer"].filter(t => root.querySelector(t) || root.querySelector(`[role="${t === "header" ? "banner" : t === "footer" ? "contentinfo" : t === "nav" ? "navigation" : t}"]`)).length;
  add("landmarks", "accessibility", landmarks >= 3 ? "pass" : landmarks >= 1 ? "warn" : "fail", "low", `${landmarks}/4`);

  // ---- TRUST & CONVERSION ----
  const lower = html.toLowerCase();
  const textLower = bodyText.toLowerCase();
  const hasPhone = !!root.querySelector('a[href^="tel:"]') || /(\+?\d[\d\s().-]{8,}\d)/.test(bodyText) && /tel|phone|telefon|call|sună/i.test(bodyText);
  const hasEmail = !!root.querySelector('a[href^="mailto:"]') || /[\w.+-]+@[\w-]+\.[\w.]+/.test(bodyText);
  add("contactVisible", "trust", hasPhone && hasEmail ? "pass" : hasPhone || hasEmail ? "warn" : "fail", "high", [hasPhone ? L("telefon", "phone") : null, hasEmail ? "email" : null].filter(Boolean).length ? L([hasPhone && "telefon", hasEmail && "email"].filter(Boolean).join(" + "), [hasPhone && "phone", hasEmail && "email"].filter(Boolean).join(" + ")) : L("lipsă", "missing"));
  const hasAddress = schema.nodes.some(n => n.address) || /(str\.|strada|bulevardul|bd\.|street|road|avenue|suite|nr\.\s*\d|\b\d{5,6}\b.*(românia|romania|uk|united kingdom))/i.test(bodyText);
  add("address", "trust", hasAddress ? "pass" : "warn", "medium", hasAddress ? L("prezentă", "present") : L("lipsă", "missing"));
  const privacy = links.some(a => /privacy|confidential|gdpr|cookie|date-personale|politica/i.test((a.getAttribute("href") || "") + " " + a.text));
  add("privacyPolicy", "compliance", privacy ? "pass" : "fail", "medium", privacy ? L("găsită", "found") : L("lipsă", "missing"));
  const ctaRe = /(contact|book|get|start|request|quote|call|buy|order|try|demo|schedul|programea|cere|solicit|comand|cumpăr|sună|rezerv|începe|ofert|abon|sign up|înscrie)/i;
  const ctas = [...root.querySelectorAll("a, button")].filter(el => ctaRe.test(el.text.trim()) && el.text.trim().length < 40).length;
  add("ctas", "trust", ctas >= 3 ? "pass" : ctas >= 1 ? "warn" : "fail", "high", `${ctas}`);
  const forms = root.querySelectorAll("form").length;
  const bookingWidget = /calendly|cal\.com|hubspot.*meetings|tidycal|acuityscheduling|booksy|setmore/i.test(lower);
  add("leadCapture", "trust", forms > 0 || bookingWidget ? "pass" : "warn", "medium", forms ? L(`${forms} formular(e)`, `${forms} form(s)`) : bookingWidget ? L("calendar online", "booking widget") : L("lipsă", "none"));
  const proof = schema.types.some(t => /Review|AggregateRating/i.test(t)) || /(testimonial|review|recenzi|părerea clienților|ce spun clienții|what (our )?clients say|★|trustpilot|google reviews|case stud|studii de caz)/i.test(textLower + lower.slice(0, 200000));
  add("socialProof", "trust", proof ? "pass" : "fail", "high", proof ? L("prezentă", "present") : L("lipsă", "missing"));
  const socials = links.filter(a => /(facebook|instagram|linkedin|youtube|tiktok|x\.com|twitter)\.com/i.test(a.getAttribute("href") || "")).length;
  add("socialProfiles", "trust", socials >= 2 ? "pass" : socials === 1 ? "warn" : "warn", "low", `${socials}`);
  const analytics = detectAnalytics(html);
  add("analytics", "trust", analytics.length ? "pass" : "warn", "medium", analytics.length ? analytics.join(", ") : L("nedetectat", "not detected"));
  const consent = /cookiebot|onetrust|cookieyes|complianz|iubenda|cookie-?consent|cookie-?banner|cookie-?notice|usercentrics|termly|axeptio|klaro/i.test(lower);
  const trackers = analytics.filter(a => a !== "Plausible").length > 0;
  add("cookieConsent", "compliance", !trackers || consent ? "pass" : "warn", "medium", consent ? L("detectat", "detected") : trackers ? L("trackere fără banner detectat", "trackers without a detected banner") : L("fără trackere", "no trackers"));
  const years = [...bodyText.matchAll(/(?:©|copyright)\s*(?:\d{4}\s*[-–]\s*)?(\d{4})/gi)].map(m => Number(m[1]));
  const thisYear = new Date().getFullYear();
  if (years.length) add("freshFooter", "trust", Math.max(...years) >= thisYear - 1 ? "pass" : "warn", "low", `© ${Math.max(...years)}`);

  // ---- LEGAL COMPLIANCE ----
  const romanian = /\.ro$/i.test(final.hostname) || (lang || "").toLowerCase().startsWith("ro");
  const isStore = ["Shopify", "WooCommerce", "PrestaShop"].includes(detectPlatform(html, page.headers) || "") || schema.types.some(t => /^(Product|Offer|ProductGroup)$/i.test(t)) ||
    /add[-_ ]?to[-_ ]?cart|adaug[aă] [îi]n co[sș]|co[sș]ul meu|cos de cumparaturi|\/cart\b|\/checkout\b|\/cos\b/i.test(lower.slice(0, 400_000));
  const linkText = (a: HTMLElement) => `${a.getAttribute("href") || ""} ${a.text} ${a.querySelector("img")?.getAttribute("alt") || ""}`;
  const hasLink = (re: RegExp) => links.some(a => re.test(linkText(a)));
  const terms = hasLink(/termeni|terms|conditii|condiții|conditions|\bt&c\b|agb\b/i);
  add("termsPage", "compliance", terms ? "pass" : isStore ? "fail" : "warn", isStore ? "high" : "medium", terms ? L("găsiți", "found") : L("lipsă", "missing"));
  if (romanian) {
    const anpcLinks = links.filter(a => /anpc\.ro/i.test(a.getAttribute("href") || ""));
    const sal = anpcLinks.some(a => /sal/i.test(linkText(a)));
    add("anpcSal", "compliance", sal ? "pass" : anpcLinks.length ? "warn" : isStore ? "fail" : "warn", isStore ? "high" : "medium", sal ? L("link ANPC SAL găsit", "ANPC SAL link found") : anpcLinks.length ? L("link ANPC fără SAL", "ANPC link without SAL") : L("lipsă", "missing"));
  }
  if (hasLink(/ec\.europa\.eu\/consumers\/odr/i)) add("odrOutdated", "compliance", "warn", "low", L("link spre platforma SOL/ODR închisă", "link to the closed ODR platform"));
  const cui = /\b(CUI|CIF|C\.U\.I\.?|cod (unic de înregistrare|fiscal))\s*[:.]?\s*(RO)?\s*\d{4,10}\b|\bRO\s?\d{6,10}\b/i.test(bodyText);
  const regCom = /\bJ\s?\d{1,2}\s*\/\s*\d{1,7}\s*\/\s*\d{4}\b|\bJ\d{4}\d{6,}[A-Z0-9]*\b|nr\.? (de )?(ordine|înregistrare) (în|la) registrul comer/i.test(bodyText);
  const foreignId = /(company (no|number|registration)|registered in (england|scotland|wales|ireland)|registered office|vat (no|number|reg)|reg(istration)?\.? no|handelsregister|kvk|siren|siret|ust-?id)/i.test(bodyText);
  const idCount = romanian ? Number(cui) + Number(regCom) : Number(foreignId);
  add("companyDetails", "compliance", romanian ? (idCount === 2 ? "pass" : idCount === 1 ? "warn" : "fail") : (foreignId ? "pass" : "warn"), "medium",
    romanian ? L([cui && "CUI", regCom && "Nr. Reg. Com."].filter(Boolean).join(" + ") || "lipsă", [cui && "Tax ID (CUI)", regCom && "Trade register no."].filter(Boolean).join(" + ") || "missing") : foreignId ? L("găsite", "found") : L("lipsă", "missing"));
  if (isStore) {
    const returns = hasLink(/retur|return|refund|rambursa|retragere|withdraw/i) || /drept(ul)? de retragere|14 zile|right of withdrawal|14[- ]day return/i.test(bodyText);
    add("returnsPolicy", "compliance", returns ? "pass" : "fail", "high", returns ? L("găsită", "found") : L("lipsă", "missing"));
    const delivery = hasLink(/livrare|shipping|delivery|transport/i);
    add("deliveryInfo", "compliance", delivery ? "pass" : "warn", "medium", delivery ? L("găsite", "found") : L("lipsă", "missing"));
  }

  // ---- Scores ----
  const factor: Record<Status, number> = { pass: 1, warn: 0.5, fail: 0 };
  const impactWeight: Record<Impact, number> = { high: 3, medium: 2, low: 1 };
  const scores = Object.fromEntries(categories.map(c => {
    const list = checks.filter(x => x.category === c);
    const total = list.reduce((s, x) => s + impactWeight[x.impact], 0);
    const got = list.reduce((s, x) => s + impactWeight[x.impact] * factor[x.status], 0);
    return [c, total ? Math.round(got / total * 100) : 100];
  })) as Record<Category, number>;
  const weightSum = categories.reduce((s, c) => s + categoryWeights[c], 0);
  const overall = Math.round(categories.reduce((s, c) => s + scores[c] * categoryWeights[c], 0) / weightSum);

  return {
    url: startUrl.toString(),
    finalUrl: final.toString(),
    host: final.hostname.replace(/^www\./, ""),
    fetchedAt: new Date().toISOString(),
    scores: { ...scores, overall },
    metrics: {
      ttfbMs: ttfb,
      htmlKb: kb(page.body.length),
      pageWeightKb: kb(pageWeight),
      sampledResources: okSamples.length,
      requests: resources.length + 1,
      est4gSeconds: est4g,
      redirects: page.redirects.length,
      wordCount,
      thirdPartyDomains: thirdParty.size
    },
    title: title.slice(0, 160),
    description: description.slice(0, 300),
    platform: detectPlatform(html, page.headers),
    schemaTypes: schema.types.slice(0, 20),
    analytics,
    checks
  };
}
