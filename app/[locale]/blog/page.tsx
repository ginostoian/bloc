import Link from "next/link";
import { Chip, NbButton, PageHeader, Placeholder } from "@/components/primitives";
import { categoryLabels, copy, posts, serviceColors } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ro";
  const t = copy[locale].blogPage;
  const allPosts = posts[locale];
  const featured = allPosts[0];

  return (
    <>
      <PageHeader chip={t.chip} title={t.title} text={t.text} />

      <section className="section pb-0">
        <div className="wrap">
          <Link href={`/${locale}/blog/${featured.slug}`} className="nb-card nb-lift grid overflow-hidden text-inherit no-underline min-[860px]:grid-cols-[1.1fr_.9fr]">
            <Placeholder label={featured.visual} className="min-h-[300px] border-b-3 border-ink bg-green min-[860px]:border-b-0 min-[860px]:border-r-3" />
            <div className="flex flex-col justify-center p-[clamp(28px,4vw,44px)]">
              <div className="mb-4 flex flex-wrap gap-2.5">
                <Chip className="bg-orange text-white">★ {t.featured}</Chip>
                <Chip className={serviceColors[featured.category]}>{categoryLabels[locale][featured.category]}</Chip>
              </div>
              <h2 className="display text-[clamp(30px,3.6vw,48px)]">{featured.title}</h2>
              <p className="my-5 text-[17px] leading-relaxed text-[#3a352f]">{featured.excerpt}</p>
              <div className="font-mono text-xs uppercase tracking-[0.04em] text-[#6b655d]">
                {featured.date} · {featured.minutes} · {featured.author}
              </div>
              <span className="nb-btn nb-btn-primary mt-6 self-start">{t.readArticle} →</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
            <h2 className="display text-[clamp(30px,4vw,52px)]">{t.allArticles}</h2>
            <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#6b655d]">{allPosts.length} {t.count}</span>
          </div>
          <div className="grid gap-6 min-[620px]:grid-cols-2 min-[900px]:grid-cols-3">
            {allPosts.map((post) => (
              <article key={post.slug} className="nb-card nb-lift overflow-hidden">
                <Link href={`/${locale}/blog/${post.slug}`} className="block text-inherit no-underline">
                  <Placeholder label={post.visual} className={`aspect-[16/10] border-b-3 border-ink ${serviceColors[post.category]}`} />
                  <div className="p-5">
                    <Chip className={serviceColors[post.category]}>{categoryLabels[locale][post.category]}</Chip>
                    <h3 className="mt-3 font-display text-[25px] uppercase leading-[1.05]">{post.title}</h3>
                    <p className="my-3 text-[15px] text-[#5c564e]">{post.excerpt}</p>
                    <div className="font-mono text-xs uppercase tracking-[0.04em] text-[#6b655d]">{post.date} · {post.minutes}</div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y-3 border-ink bg-orange text-white">
        <div className="wrap max-w-[820px] text-center">
          <h2 className="display text-[clamp(36px,6vw,72px)]">{t.newsletterTitle}</h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[19px] opacity-95">{t.newsletterText}</p>
          <form className="mx-auto mt-7 flex max-w-[540px] flex-wrap justify-center gap-3.5">
            <input className="field min-w-[240px] flex-1" type="email" placeholder={locale === "ro" ? "adresa@email.ro" : "email@company.com"} aria-label="Email" />
            <NbButton variant="ink" size="lg" type="submit">{locale === "ro" ? "Mă abonez" : "Subscribe"} →</NbButton>
          </form>
        </div>
      </section>
    </>
  );
}
