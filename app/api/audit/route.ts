import { NextRequest, NextResponse } from "next/server";
import { getAudit } from "@/lib/audit/cache";
import { AuditFetchError } from "@/lib/audit/fetch";
import { toTeaser } from "@/lib/audit/teaser";
import { clientIp, rateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

const reply = (status: number, error: string) => NextResponse.json({ error }, { status });

export async function POST(request: NextRequest) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return reply(403, "forbidden");
  if (rateLimited(`audit:${clientIp(request)}`, 8, 10 * 60 * 1000)) return reply(429, "rate_limited");
  let input: { url?: unknown; locale?: unknown };
  try { input = await request.json(); } catch { return reply(400, "invalid_payload"); }
  const url = typeof input.url === "string" ? input.url : "";
  const locale = input.locale === "en" ? "en" : "ro";
  try {
    const result = await getAudit(url);
    return NextResponse.json(toTeaser(result, locale));
  } catch (e) {
    if (e instanceof AuditFetchError) return reply(e.code === "invalid_url" || e.code === "blocked_host" ? 400 : 502, e.code);
    return reply(502, "network");
  }
}
