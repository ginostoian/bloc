"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { copy, serviceColors, services } from "@/lib/content";
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
  const [servicesOpen, setServicesOpen] = useState(false);
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
            if (item.key === "services") {
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={href}
                    onClick={() => setServicesOpen(false)}
                    onFocus={() => setServicesOpen(true)}
                    className={cn(
                      "inline-flex items-center gap-1 border-2 px-3.5 py-2 text-[15px] font-semibold no-underline transition-colors",
                      active
                        ? "border-ink bg-ink text-white hover:bg-ink hover:text-white"
                        : "border-transparent bg-transparent text-ink hover:border-ink hover:bg-paper"
                    )}
                  >
                    {t[item.key]} <span className="font-mono text-[11px]">↓</span>
                  </Link>

                  {servicesOpen ? (
                    <div className="absolute left-0 top-full z-50 w-[380px] pt-2.5">
                      <div className="border-3 border-ink bg-paper shadow-nb">
                        <div className="border-b-2 border-ink bg-cream px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-mono text-[#6b655d]">
                          {locale === "ro" ? "Alege serviciul" : "Choose service"}
                        </div>
                        <div>
                          {services[locale].map((service, index) => (
                            <Link
                              key={service.key}
                              href={`/${locale}/servicii#${service.key}`}
                              onClick={() => setServicesOpen(false)}
                              className="group grid grid-cols-[42px_1fr] gap-3 border-b-2 border-ink px-4 py-3 text-ink no-underline transition-colors last:border-b-0 hover:bg-orange hover:text-white"
                            >
                              <span className={cn("grid h-8 w-8 place-items-center border-2 border-ink font-display text-[18px]", serviceColors[service.key])}>
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span>
                                <span className="block font-display text-xl uppercase leading-tight">{service.title}</span>
                                <span className="mt-0.5 block text-[13px] leading-snug text-[#5c564e] group-hover:text-white/90">
                                  {service.short}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            }
            return (
              <Link
                key={item.key}
                href={href}
                className={cn(
                  "border-2 px-3.5 py-2 text-[15px] font-semibold no-underline transition-colors",
                  active
                    ? "border-ink bg-ink text-white hover:bg-ink hover:text-white"
                    : "border-transparent bg-transparent text-ink hover:border-ink hover:bg-paper"
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
          {navItems.map((item) => {
            const href = `/${locale}${item.href ? `/${item.href}` : ""}`;
            if (item.key === "services") {
              return (
                <div key={item.key} className="border-b-2 border-ink">
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-4 font-display text-2xl uppercase text-ink no-underline"
                  >
                    {t[item.key]}
                  </Link>
                  <div className="border-t-2 border-ink bg-paper">
                    {services[locale].map((service) => (
                      <Link
                        key={service.key}
                        href={`/${locale}/servicii#${service.key}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 border-b-2 border-ink px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.06em] text-ink no-underline last:border-b-0"
                      >
                        <span className={cn("h-3 w-3 border-2 border-ink", serviceColors[service.key])} />
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.key}
                href={href}
                onClick={() => setOpen(false)}
                className="block border-b-2 border-ink px-6 py-4 font-display text-2xl uppercase text-ink no-underline"
              >
                {t[item.key]}
              </Link>
            );
          })}
        </div>
      ) : null}
    </header>
  );
}
