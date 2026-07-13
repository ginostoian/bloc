"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { categoryLabels, projects, serviceColors, type CategoryKey } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Chip } from "./primitives";

const categories: Array<CategoryKey | "all"> = ["all", "web", "seo", "branding"];

export function PortfolioFilter({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<CategoryKey | "all">("all");
  const items = useMemo(() => {
    return projects[locale].filter((project) => active === "all" || project.cats.includes(active));
  }, [active, locale]);
  const allLabel = locale === "ro" ? "Toate" : "All";
  const labels = locale === "ro"
    ? { challenge: "Provocarea", solution: "Soluția", outcome: "Rezultatul", visit: "Vezi site-ul live" }
    : { challenge: "Challenge", solution: "Solution", outcome: "Outcome", visit: "Visit live website" };

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

      <div className="grid gap-7 min-[900px]:grid-cols-2">
        {items.map((project) => (
          <article key={project.title} className="nb-card nb-lift flex h-full flex-col overflow-hidden">
            <a href={project.url} target="_blank" rel="noreferrer" className="group relative block aspect-video overflow-hidden border-b-3 border-ink bg-ink">
              <Image
                src={project.image}
                alt={`${project.title} — ${project.domain}`}
                width={1280}
                height={720}
                sizes="(min-width: 900px) 50vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]"
              />
              <span className="absolute bottom-3 right-3 border-2 border-ink bg-yellow px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.06em] shadow-[3px_3px_0_#141210]">
                {project.domain} ↗
              </span>
            </a>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="mb-3 flex flex-wrap gap-2">
                {project.cats.map((cat) => (
                  <Chip key={cat} className={serviceColors[cat]}>{categoryLabels[locale][cat]}</Chip>
                ))}
              </div>
              <h3 className="font-display text-[32px] uppercase leading-none">{project.title}</h3>
              <p className="mt-2 text-[16px] font-medium leading-normal text-[#3a352f]">{project.text}</p>

              <dl className="my-5 grid gap-3 border-y-2 border-ink py-4 text-[14px] leading-normal">
                <div>
                  <dt className="font-mono text-[11px] font-bold uppercase tracking-mono text-orange">{labels.challenge}</dt>
                  <dd className="mt-1 text-[#5c564e]">{project.challenge}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] font-bold uppercase tracking-mono text-orange">{labels.solution}</dt>
                  <dd className="mt-1 text-[#5c564e]">{project.solution}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] font-bold uppercase tracking-mono text-orange">{labels.outcome}</dt>
                  <dd className="mt-1 text-[#5c564e]">{project.outcome}</dd>
                </div>
              </dl>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="block font-display text-[34px] leading-none text-orange">{project.metric}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-[#6b655d]">{project.metricLabel}</span>
                </div>
                <a href={project.url} target="_blank" rel="noreferrer" className="nb-btn px-4 py-2.5 text-sm">
                  {labels.visit} ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
