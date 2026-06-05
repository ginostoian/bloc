import { NbButton, PageHeader, Placeholder, SectionTitle } from "@/components/primitives";
import { copy, team, values } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ro";
  const t = copy[locale].aboutPage;
  const stats = locale === "ro"
    ? [["8", "ani pe piață"], ["120+", "proiecte livrate"], ["9", "oameni în echipă"], ["40+", "orașe acoperite"]]
    : [["8", "years"], ["120+", "projects shipped"], ["9", "team members"], ["40+", "cities covered"]];

  return (
    <>
      <PageHeader chip={t.chip} title={t.title} text={t.text} />

      <section className="section">
        <div className="wrap grid items-center gap-12 min-[860px]:grid-cols-2">
          <div className="nb-card overflow-hidden p-0">
            <Placeholder label={locale === "ro" ? "foto · echipa Bloc" : "photo · Bloc team"} className="aspect-[4/5] bg-yellow" />
          </div>
          <div>
            <SectionTitle eyebrow={t.storyEyebrow} title={t.storyTitle} />
            <div className="mt-5 grid gap-4 text-[17px] leading-relaxed text-[#3a352f]">
              {t.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section border-y-3 border-ink bg-lilac">
        <div className="wrap">
          <SectionTitle eyebrow={t.valuesEyebrow} title={t.valuesTitle} />
          <div className="mt-12 grid gap-6 min-[900px]:grid-cols-3">
            {values[locale].map((item, index) => (
              <div key={item.title} className={cn("nb-card nb-lift p-7", index === 1 && "bg-orange text-white")}>
                <span className={cn("font-display text-[44px]", index === 1 ? "text-white" : "text-orange")}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-[26px] uppercase">{item.title}</h3>
                <p className={cn("mt-2 text-[15px]", index === 1 ? "text-white/90" : "text-[#5c564e]")}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink">
        <div className="wrap">
          <div className="grid border-3 border-cream min-[460px]:grid-cols-2 min-[980px]:grid-cols-4">
            {stats.map(([value, label], index) => (
              <div key={label} className={cn("border-b-3 border-cream p-7 min-[980px]:border-b-0 min-[980px]:border-r-3", index === stats.length - 1 && "border-b-0 min-[980px]:border-r-0")}>
                <div className="font-display text-[clamp(44px,5vw,68px)] leading-none text-orange">{value}</div>
                <div className="mt-2 font-mono text-[13px] uppercase tracking-mono text-cream">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow={t.teamEyebrow} title={t.teamTitle} />
            <NbButton href={`/${locale}/contact`}>{t.teamCta} →</NbButton>
          </div>
          <div className="grid gap-6 min-[620px]:grid-cols-2 min-[980px]:grid-cols-4">
            {team[locale].map((person) => (
              <article key={person.name} className="nb-card nb-lift overflow-hidden p-0">
                <Placeholder label="foto" className={cn("aspect-square border-b-3 border-ink", person.color)} />
                <div className="p-[18px]">
                  <h3 className="font-display text-[22px] uppercase">{person.name}</h3>
                  <p className="mt-1 font-mono text-xs text-[#6b655d]">{person.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="nb-card bg-ink p-[clamp(40px,6vw,72px)] text-center text-cream shadow-nb-lg">
            <h2 className="display text-[clamp(40px,7vw,84px)]">{t.finalTitle}</h2>
            <p className="mx-auto mb-7 mt-4 max-w-[500px] text-[19px] text-[#cfc9bf]">{t.finalText}</p>
            <NbButton href={`/${locale}/contact`} variant="primary" size="lg">
              {t.finalCta} →
            </NbButton>
          </div>
        </div>
      </section>
    </>
  );
}
