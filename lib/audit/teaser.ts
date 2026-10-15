import type { Locale } from "../i18n";
import { checkCopy, tr, verdict } from "./copy";
import { sortByPriority } from "./priority";
import type { AuditResult } from "./types";
import { encodeShare, toShareSite } from "./share";

/** The free, on-screen part of the report. Fixes stay in the PDF. */
export function toTeaser(r: AuditResult, locale: Locale) {
  const issues = sortByPriority(r.checks.filter(c => c.status !== "pass"));
  return {
    host: r.host,
    finalUrl: r.finalUrl,
    scores: r.scores,
    metrics: r.metrics,
    platform: r.platform,
    verdict: verdict(r.scores.overall, locale),
    counts: { total: r.checks.length, fail: r.checks.filter(c => c.status === "fail").length, warn: r.checks.filter(c => c.status === "warn").length },
    top: issues.slice(0, 3).map(c => ({ id: c.id, category: c.category, status: c.status, title: checkCopy[c.id]?.[locale].t || c.id, why: checkCopy[c.id]?.[locale].why || "", value: tr(c.value, locale) })),
    share: encodeShare({ a: toShareSite(r), t: Date.now() }),
    locked: issues.slice(3).map(c => ({ id: c.id, category: c.category, status: c.status, title: checkCopy[c.id]?.[locale].t || c.id }))
  };
}
export type Teaser = ReturnType<typeof toTeaser>;
