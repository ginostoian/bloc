export type Status = "pass" | "warn" | "fail";
export type Category = "performance" | "seo" | "aeo" | "security" | "accessibility" | "trust" | "compliance";
export type Impact = "high" | "medium" | "low";
export type Localized = string | { ro: string; en: string };

export type Check = {
  id: string;
  category: Category;
  status: Status;
  impact: Impact;
  /** What we measured, shown next to the check. */
  value?: Localized;
};

export type AuditResult = {
  url: string;
  finalUrl: string;
  host: string;
  fetchedAt: string;
  scores: Record<Category, number> & { overall: number };
  metrics: {
    ttfbMs: number;
    htmlKb: number;
    pageWeightKb: number;
    sampledResources: number;
    requests: number;
    est4gSeconds: number;
    redirects: number;
    wordCount: number;
    thirdPartyDomains: number;
  };
  title: string;
  description: string;
  platform: string | null;
  schemaTypes: string[];
  analytics: string[];
  checks: Check[];
};

export const categories: Category[] = ["performance", "seo", "aeo", "trust", "compliance", "security", "accessibility"];

export const categoryWeights: Record<Category, number> = { performance: 22, seo: 20, aeo: 15, trust: 15, compliance: 12, security: 8, accessibility: 8 };
