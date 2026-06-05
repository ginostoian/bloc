"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Accordion({ items }: { items: ReadonlyArray<{ q: string; a: string }> }) {
  const [open, setOpen] = useState(0);

  return (
    <div>
      {items.map((item, index) => (
        <div key={item.q} className="mt-3.5 border-3 border-ink bg-paper shadow-nb-sm first:mt-0">
          <button
            type="button"
            onClick={() => setOpen((value) => (value === index ? -1 : index))}
            className="flex w-full items-center justify-between gap-4 bg-transparent px-5 py-5 text-left font-display text-[22px] uppercase text-ink"
          >
            {item.q}
            <span
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center border-2 border-ink font-sans text-[22px] font-bold transition-transform",
                open === index ? "rotate-45 bg-orange text-white" : "bg-yellow text-ink"
              )}
            >
              +
            </span>
          </button>
          <div className={cn("grid transition-[grid-template-rows] duration-200", open === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
            <div className="overflow-hidden">
              <p className="m-0 px-5 pb-5 leading-relaxed text-[#3a352f]">{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
