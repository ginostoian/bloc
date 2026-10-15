import type { Check } from "./types";

const rank = (x: Check) => (x.status === "fail" ? 0 : x.status === "warn" ? 10 : 20) + (x.impact === "high" ? 0 : x.impact === "medium" ? 1 : 2);

export function sortByPriority(checks: Check[]) {
  return [...checks].sort((a, b) => rank(a) - rank(b));
}
