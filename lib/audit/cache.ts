import { runAudit } from "./run";
import { normalizeUrl } from "./fetch";
import type { AuditResult } from "./types";

const TTL = 30 * 60 * 1000;
const cache = new Map<string, { at: number; result: Promise<AuditResult> }>();

/** Runs an audit, reusing a recent result for the same URL (also de-duplicates concurrent runs). */
export function getAudit(input: string): Promise<AuditResult> {
  const key = normalizeUrl(input).toString();
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.result;
  const result = runAudit(key);
  cache.set(key, { at: Date.now(), result });
  result.catch(() => cache.delete(key));
  if (cache.size > 300) cache.delete(cache.keys().next().value!);
  return result;
}
