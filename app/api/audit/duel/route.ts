import { NextRequest, NextResponse } from "next/server";
import { getAudit } from "@/lib/audit/cache";
import { AuditFetchError, normalizeUrl } from "@/lib/audit/fetch";
import { toTeaser } from "@/lib/audit/teaser";
import { checkCopy } from "@/lib/audit/copy";
import { encodeShare, toShareSite } from "@/lib/audit/share";
import { sortByPriority } from "@/lib/audit/priority";
import { clientIp, rateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

const reply = (status: number, error: string, side?: "a" | "b") => NextResponse.json({ error, side }, { status });

export async function POST(request: NextRequest) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return reply(403, "forbidden");
  const ip = clientIp(request);
  if (rateLimited(`audit:${ip}`, 8, 10 * 60 * 1000) || rateLimited(`audit:${ip}`, 8, 10 * 60 * 1000)) return reply(429, "rate_limited");
  let input: { a?: unknown; b?: unknown; locale?: unknown };
  try { input = await request.json(); } catch { return reply(400, "invalid_payload"); }
  const locale = input.locale === "en" ? "en" : "ro";
  const urls = [input.a, input.b].map(u => (typeof u === "string" ? u : ""));
  for (const [i, u] of urls.entries()) { try { normalizeUrl(u); } catch { return reply(400, "invalid_url", i ? "b" : "a"); } }
  if (normalizeUrl(urls[0]).hostname.replace(/^www\./, "") === normalizeUrl(urls[1]).hostname.replace(/^www\./, "")) return reply(400, "same_site");

  const [ra, rb] = await Promise.allSettled(urls.map(u => getAudit(u)));
  for (const [i, r] of [ra, rb].entries()) if (r.status === "rejected") {
    const e = r.reason;
    return reply(e instanceof AuditFetchError && (e.code === "invalid_url" || e.code === "blocked_host") ? 400 : 502, e instanceof AuditFetchError ? e.code : "network", i ? "b" : "a");
  }
  const a = (ra as PromiseFulfilledResult<Awaited<ReturnType<typeof getAudit>>>).value;
  const b = (rb as PromiseFulfilledResult<Awaited<ReturnType<typeof getAudit>>>).value;
  const bPassing = new Set(b.checks.filter(c => c.status === "pass").map(c => c.id));
  const aPassing = new Set(a.checks.filter(c => c.status === "pass").map(c => c.id));
  const gap = (from: typeof a, other: Set<string>) => sortByPriority(from.checks.filter(c => c.status !== "pass" && other.has(c.id))).map(c => ({ id: c.id, category: c.category, status: c.status, title: checkCopy[c.id]?.[locale].t || c.id }));
  return NextResponse.json({
    a: toTeaser(a, locale),
    b: toTeaser(b, locale),
    aBehind: gap(a, bPassing),
    bBehind: gap(b, aPassing),
    share: encodeShare({ a: toShareSite(a), b: toShareSite(b), t: Date.now() })
  });
}
