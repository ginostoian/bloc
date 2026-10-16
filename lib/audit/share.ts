import { createHmac, timingSafeEqual } from "node:crypto";
import { categories, type AuditResult, type Category } from "./types";

/** A compact, signed snapshot of one audit (or two, for a head-to-head) that can live in a public URL. */
export type ShareSite = { h: string; o: number; c: number[] };
export type SharePayload = { a: ShareSite; b?: ShareSite; t: number };

const secret = () => process.env.AUDIT_SIGNING_SECRET || (process.env.NODE_ENV !== "production" ? "bloc-dev-only-secret" : "");
export const sharingEnabled = () => !!secret();

const sign = (data: string) => createHmac("sha256", secret()).update(data).digest("base64url").slice(0, 22);

export function toShareSite(r: AuditResult): ShareSite {
  return { h: r.host, o: r.scores.overall, c: categories.map(c => r.scores[c]) };
}

export function encodeShare(payload: SharePayload): string | null {
  if (!sharingEnabled()) return null;
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data)}`;
}

export function decodeShare(token: string): SharePayload | null {
  if (!sharingEnabled() || token.length > 1200) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = Buffer.from(sign(data)), given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const p = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as SharePayload;
    const valid = (s?: ShareSite) => !!s && typeof s.h === "string" && s.h.length < 120 && Number.isFinite(s.o) && Array.isArray(s.c) && s.c.length === categories.length;
    return valid(p.a) && (p.b === undefined || valid(p.b)) ? p : null;
  } catch { return null; }
}

export const scoreOf = (s: ShareSite, c: Category) => s.c[categories.indexOf(c)];
