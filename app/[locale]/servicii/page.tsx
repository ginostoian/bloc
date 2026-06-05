import { FeatureList, NbButton, PageHeader, SectionTitle, Chip, Placeholder } from "@/components/primitives";
import { copy, packages, serviceColors, services } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ro";
  const t = copy[locale].servicesPage;

  return (
    <>
      <PageHeader chip={t.chip} title={t.title} text={t.text} />

      <section className="section">
        <div className="wrap grid gap-7">
          {services[locale].map((service, index) => {
            const flip = index % 2 === 1;
            return (
              <article id={service.key} key={service.key} className="nb-card grid overflow-hidden p-0 min-[860px]:grid-cols-2">
                {flip ? <Placeholder label={service.visual} className={cn("min-h-[320px] border-b-3 border-ink min-[860px]:border-b-0 min-[860px]:border-r-3", serviceColors[service.key])} /> : null}
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap items-center gap-3.5">
                    <span className="font-display text-3xl text-orange">{String(index + 1).padStart(2, "0")}</span>
                    <Chip className={serviceColors[service.key]}>{service.title}</Chip>
                  </div>
                  <h2 className="display mt-4 text-[clamp(32px,4vw,48px)]">{serviceTitle(service.title, locale)}</h2>
                  <p className="mb-5 mt-4 text-base leading-relaxed text-[#3a352f]">{service.lead}</p>
                  <FeatureList items={service.features} />
                </div>
                {!flip ? <Placeholder label={service.visual} className={cn("min-h-[320px] border-t-3 border-ink min-[860px]:border-l-3 min-[860px]:border-t-0", serviceColors[service.key])} /> : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="section bg-ink">
        <div className="wrap">
          <div className="mb-12 text-center">
            <SectionTitle eyebrow={t.packagesEyebrow} title={t.packagesTitle} dark centered />
            <p className="mx-auto mt-3.5 max-w-[520px] text-[17px] text-[#a39d93]">{t.packagesText}</p>
          </div>
          <div className="grid gap-6 min-[900px]:grid-cols-3">
            {packages[locale].map((item) => (
              <div key={item.name} className={cn("nb-card relative p-8", item.featured ? "bg-orange text-white shadow-nb-lg" : "bg-cream")}>
                {item.featured ? <Chip className="absolute right-6 top-[-16px] bg-yellow text-ink">{locale === "ro" ? "Cel mai ales" : "Most chosen"}</Chip> : null}
                <div className={cn("font-mono text-[13px] uppercase tracking-mono", item.featured ? "text-white/90" : "text-[#6b655d]")}>{item.name}</div>
                <div className="my-3">
                  <span className="font-display text-[52px] leading-none">{item.price}</span>
                  {!item.price.includes("Hai") && !item.price.includes("talk") ? <span className={cn(item.featured ? "text-white/85" : "text-[#6b655d]")}> {locale === "ro" ? "de la" : "from"}</span> : null}
                </div>
                <p className={cn("mb-5 text-[15px]", item.featured ? "text-white/90" : "text-[#5c564e]")}>{item.text}</p>
                <div className="mb-6">
                  <FeatureList items={item.features} light={item.featured} />
                </div>
                <NbButton href={`/${locale}/contact`} variant={item.featured ? "ink" : "default"} className="w-full">
                  {item.cta}
                </NbButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="nb-card bg-orange p-[clamp(40px,6vw,64px)] text-center text-white shadow-nb-lg">
            <h2 className="display text-[clamp(36px,6vw,72px)]">{t.finalTitle}</h2>
            <p className="mx-auto mb-7 mt-4 max-w-[480px] text-[19px] opacity-95">{t.finalText}</p>
            <NbButton href={`/${locale}/contact`} variant="ink" size="lg">
              {t.finalCta} →
            </NbButton>
          </div>
        </div>
      </section>
    </>
  );
}

function serviceTitle(title: string, locale: Locale) {
  const map: Record<string, string> = {
    "Web Development": locale === "ro" ? "Site-uri care\nmuncesc pe bune" : "Websites that\nactually work",
    "SEO & Conținut": "Te găsesc clienții,\nnu doar prietenii",
    "SEO & Content": "Customers find you,\nnot just friends",
    "AI Consulting": locale === "ro" ? "AI care economisește\ntimp, nu vorbe" : "AI that saves\ntime, not talk",
    "Branding & Design": locale === "ro" ? "Un brand care\nse ține minte" : "A brand people\nremember",
    "Mentenanță & Suport": "Dormi liniștit,\nne ocupăm noi",
    "Maintenance & Support": "Sleep well,\nwe handle it"
  };

  return map[title] ?? title;
}
