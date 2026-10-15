import type { NextRequest } from "next/server";

// Best-effort, per-instance limiter. Put a shared store (e.g. Upstash) in front for heavy paid traffic.
const buckets = new Map<string, number[]>();

export function clientIp(request: NextRequest) {
  return (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
}

export function rateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter(t => now - t < windowMs);
  if (hits.length >= limit) { buckets.set(key, hits); return true; }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) for (const [k, v] of buckets) if (!v.some(t => now - t < windowMs)) buckets.delete(k);
  return false;
}
