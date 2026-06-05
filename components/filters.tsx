"use client";

import { useMemo, useState } from "react";
import { categoryLabels, projects, serviceColors, type CategoryKey } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Chip, Placeholder } from "./primitives";

const categories: Array<CategoryKey | "all"> = ["all", "web", "seo", "ai", "branding"];

export function PortfolioFilter({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<CategoryKey | "all">("all");
  const items = useMemo(() => {
    return projects[locale].filter((project) => active === "all" || project.cats.includes(active));
  }, [active, locale]);
  const allLabel = locale === "ro" ? "Toate" : "All";

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={cn(
              "border-3 border-ink px-[18px] py-2.5 font-mono text-[13px] font-bold uppercase tracking-[0.06em] shadow-[3px_3px_0_#141210] transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#141210]",
              active === cat ? "bg-ink text-white" : "bg-paper text-ink"
            )}
          >
            {cat === "all" ? allLabel : categoryLabels[locale][cat]}
          </button>
        ))}
      </div>

      <div className="grid gap-6 min-[620px]:grid-cols-2 min-[900px]:grid-cols-3">
        {items.map((project) => (
          <article key={project.title} className="nb-card nb-lift overflow-hidden">
            <Placeholder label={project.visual} className={cn("aspect-[16/11] border-b-3 border-ink", project.color)} />
            <div className="p-5">
              <div className="mb-2.5 flex flex-wrap gap-2">
                {project.cats.map((cat) => (
                  <Chip key={cat} className={serviceColors[cat]}>
                    {categoryLabels[locale][cat]}
                  </Chip>
                ))}
              </div>
              <h3 className="font-display text-2xl uppercase">{project.title}</h3>
              <p className="mb-3.5 mt-1.5 text-[15px] text-[#5c564e]">{project.text}</p>
              <div className="flex justify-between border-t-2 border-ink pt-3">
                <span className="font-display text-[28px] text-orange">{project.metric}</span>
                <span className="self-end font-mono text-xs text-[#6b655d]">{project.metricLabel}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
