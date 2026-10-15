export type Status = "pass" | "warn" | "fail";
export type Category = "performance" | "seo" | "aeo" | "security" | "accessibility" | "trust";
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

export const categories: Category[] = ["performance", "seo", "aeo", "security", "accessibility", "trust"];

export const categoryWeights: Record<Category, number> = { performance: 25, seo: 22, aeo: 15, security: 10, accessibility: 10, trust: 18 };
