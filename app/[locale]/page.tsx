import Link from "next/link";
import Image from "next/image";
import { Accordion } from "@/components/accordion";
import { PortfolioFilter } from "@/components/filters";
import { Chip, NbButton, SectionTitle } from "@/components/primitives";
import { copy, faqs, services } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ro";
  const t = copy[locale].home;

  return (
    <>
      <section className="page-grid relative overflow-hidden">
        <div className="absolute right-[8%] top-[90px] z-0 hidden h-[120px] w-[120px] rotate-12 border-3 border-ink bg-yellow shadow-nb md:block" />
        <div className="absolute bottom-[60px] left-[6%] z-0 hidden h-[70px] w-[70px] rounded-full border-3 border-ink bg-blue shadow-nb-sm md:block" />
        <div className="wrap relative z-10 py-20 md:py-[84px]">
          <div className="grid items-center gap-12 min-[860px]:grid-cols-[1.15fr_.85fr]">
            <div>
              <Chip>
                <span className="h-2 w-2 rounded-full bg-green" />
                {t.heroChip}
              </Chip>
              <h1 className="display mt-6 text-[clamp(48px,8.5vw,108px)]">
                {t.heroTitleA}
                <br />
                {t.heroTitleB} <span className="text-orange">{t.heroTitleAccent}</span>
              </h1>
              <p className="mt-6 max-w-[520px] text-xl leading-normal text-[#3a352f]">{t.heroText}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <NbButton href={`/${locale}/contact`} variant="primary" size="lg">
                  {t.heroCta} →
                </NbButton>
                <NbButton href="#portofoliu" size="lg">
                  {t.heroSecondary}
                </NbButton>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                {t.stats.map(([value, label], index) => (
                  <div key={label} className="contents">
                    {index > 0 ? <div className="hidden h-9 w-0.5 bg-ink sm:block" /> : null}
                    <div className="font-mono text-[13px] uppercase tracking-[0.06em]">
                      <strong className="block font-display text-[22px] normal-case">{value}</strong>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="nb-card overflow-hidden p-0">
                <a href="https://www.rawmina.com/" target="_blank" rel="noreferrer" className="block overflow-hidden border-b-3 border-ink">
                  <Image
                    src="/projects/rawmina.png"
                    alt={locale === "ro" ? "RawMina — proiect e-commerce live" : "RawMina — live e-commerce project"}
                    width={1280}
                    height={720}
                    priority
                    sizes="(min-width: 860px) 38vw, 100vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </a>
                <div className="flex items-center justify-between gap-3 p-[18px]">
                  <div>
                    <div className="font-display text-2xl">{t.cardMetric}</div>
                    <div className="font-mono text-xs text-[#6b655d]">{t.cardMeta}</div>
                  </div>
                  <Chip className="bg-green text-white">SEO ↑</Chip>
                </div>
              </div>
              <div className="nb-card nb-lift absolute bottom-[-26px] left-[-26px] max-w-[210px] bg-orange p-4 text-white max-sm:relative max-sm:bottom-auto max-sm:left-auto max-sm:mt-4">
                <div className="font-mono text-[11px] uppercase tracking-mono opacity-90">{t.aiBadge}</div>
                <div className="mt-1 font-display text-[22px] leading-none">{t.aiMetric}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={t.marquee} />

      <section className="section bg-ink">
        <div className="wrap">
          <div className="grid border-3 border-cream min-[460px]:grid-cols-2 min-[980px]:grid-cols-4">
            {t.statsStrip.map(([value, label], index) => (
              <div key={label} className={cn("border-b-3 border-cream p-7 min-[980px]:border-b-0 min-[980px]:border-r-3", index === t.statsStrip.length - 1 && "border-b-0 min-[980px]:border-r-0")}>
                <div className="font-display text-[clamp(48px,6vw,76px)] leading-none text-orange">{value}</div>
                <div className="mt-2 font-mono text-[13px] uppercase tracking-mono text-cream">{label}</div>
              </div>
            ))}
          </div>
          <p className="mt-3.5 font-mono text-xs text-[#8a857d]">{t.statsNote}</p>
        </div>
      </section>

      <section id="servicii" className="section">
        <div className="wrap">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow={t.servicesEyebrow} title={t.servicesTitle} />
            <NbButton href={`/${locale}/servicii`}>{t.allServices} →</NbButton>
          </div>
          <div className="overflow-hidden border-3 border-ink bg-paper shadow-nb">
            {services[locale].map((service, index) => (
              <Link
                href={`/${locale}/servicii#${service.key}`}
                key={service.key}
                className="group grid grid-cols-[64px_1fr_auto] items-center gap-5 border-b-3 border-ink p-7 text-inherit no-underline transition-colors last:border-b-0 hover:bg-orange hover:text-white max-sm:grid-cols-[1fr_auto]"
              >
                <span className="font-display text-[34px] text-orange group-hover:text-white max-sm:hidden">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-3xl uppercase">{service.title}</h3>
                  <p className="mt-1.5 max-w-[560px] text-[#5c564e] group-hover:text-white/90">{service.short}</p>
                </div>
                <span className="font-display text-[34px]">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y-3 border-ink bg-lilac">
        <div className="wrap">
          <SectionTitle eyebrow={t.processEyebrow} title={t.processTitle} />
          <div className="mt-12 grid gap-5 min-[620px]:grid-cols-2 min-[980px]:grid-cols-4">
            {t.process.map(([title, text], index) => (
              <div key={title} className={cn("nb-card nb-lift p-6", index === 3 && "bg-orange text-white")}>
                <span className={cn("font-display text-[46px]", index === 3 ? "text-white" : "text-orange")}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-2xl uppercase">{title}</h3>
                <p className={cn("mt-2 text-[15px]", index === 3 ? "text-white/90" : "text-[#5c564e]")}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portofoliu" className="section">
        <div className="wrap">
          <div className="mb-8">
            <SectionTitle eyebrow={t.portfolioEyebrow} title={t.portfolioTitle} />
          </div>
          <PortfolioFilter locale={locale} />
        </div>
      </section>

      <section className="section border-t-3 border-ink bg-ink text-cream">
        <div className="wrap max-w-[900px]">
          <div className="mb-12">
            <SectionTitle eyebrow={t.faqEyebrow} title={t.faqTitle} centered dark />
          </div>
          <Accordion items={faqs[locale]} />
        </div>
      </section>

      <section className="section border-y-3 border-ink bg-orange text-white">
        <div className="wrap max-w-[820px] text-center">
          <h2 className="display whitespace-pre-line text-[clamp(40px,6.5vw,80px)] leading-[1.14]">{t.newsletterTitle}</h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[19px] opacity-95">{t.newsletterText}</p>
          <form className="mx-auto mt-7 flex max-w-[540px] flex-wrap justify-center gap-3.5">
            <input className="field min-w-[240px] flex-1" type="email" placeholder={t.newsletterPlaceholder} aria-label="Email" />
            <NbButton variant="ink" size="lg" type="submit">{t.newsletterCta} →</NbButton>
          </form>
        </div>
      </section>
    </>
  );
}

function Marquee({ items }: { items: readonly string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <span className="dot">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
