"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { copy } from "@/lib/content";
import { Locale, otherLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { NbButton } from "./primitives";

const navItems = [
  { href: "", key: "home" },
  { href: "servicii", key: "services" },
  { href: "despre", key: "about" },
  { href: "blog", key: "blog" },
  { href: "contact", key: "contact" }
] as const;

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = copy[locale].nav;
  const alt = otherLocale(locale);
  const altHref = useMemo(() => {
    const parts = pathname.split("/");
    parts[1] = alt;
    return parts.join("/") || `/${alt}`;
  }, [alt, pathname]);

  return (
    <header className="sticky top-0 z-[60] border-b-3 border-ink bg-cream">
      <div className="wrap flex h-[72px] items-center justify-between">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2.5 text-ink no-underline">
          <span className="grid h-[38px] w-[38px] place-items-center border-3 border-ink bg-orange font-display text-[22px] text-white shadow-[3px_3px_0_#141210]">B</span>
          <span className="font-display text-2xl uppercase">Bloc</span>
        </Link>

        <nav className="hidden items-center gap-1 min-[920px]:flex">
          {navItems.map((item) => {
            const href = `/${locale}${item.href ? `/${item.href}` : ""}`;
            const active = item.href === "" ? pathname === `/${locale}` : pathname.startsWith(href);
            return (
              <Link
                key={item.key}
                href={href}
                className={cn(
                  "border-2 border-transparent px-3.5 py-2 text-[15px] font-semibold text-ink no-underline transition-colors hover:border-ink hover:bg-paper",
                  active && "border-ink bg-ink text-white hover:bg-ink hover:text-white"
                )}
              >
                {t[item.key]}
              </Link>
            );
          })}
          <Link href={altHref} className="ml-2 border-2 border-ink bg-paper px-3 py-2 font-mono text-xs font-bold uppercase tracking-mono text-ink no-underline hover:bg-yellow">
            {alt.toUpperCase()}
          </Link>
          <NbButton href={`/${locale}/contact`} variant="primary" className="ml-1">
            {t.cta} →
          </NbButton>
        </nav>

        <div className="flex items-center gap-2 min-[920px]:hidden">
          <Link href={altHref} className="border-2 border-ink bg-paper px-3 py-2 font-mono text-xs font-bold uppercase text-ink no-underline">
            {alt.toUpperCase()}
          </Link>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid h-[46px] w-[46px] place-items-center border-3 border-ink bg-paper shadow-nb-sm"
          >
            <span className="relative block h-[3px] w-[22px] bg-ink before:absolute before:left-0 before:top-[-7px] before:h-[3px] before:w-[22px] before:bg-ink before:content-[''] after:absolute after:left-0 after:top-[7px] after:h-[3px] after:w-[22px] after:bg-ink after:content-['']" />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t-2 border-ink bg-cream min-[920px]:hidden">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href ? `/${item.href}` : ""}`}
              onClick={() => setOpen(false)}
              className="block border-b-2 border-ink px-6 py-4 font-display text-2xl uppercase text-ink no-underline"
            >
              {t[item.key]}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
