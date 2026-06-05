import Link from "next/link";
import { notFound } from "next/navigation";
import { Chip, NbButton, Placeholder } from "@/components/primitives";
import { categoryLabels, posts, serviceColors } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) => posts[locale].map((post) => ({ locale, slug: post.slug })));
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const post = posts[locale].find((item) => item.slug === slug);
  if (!post) notFound();
  const related = posts[locale].filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="pt-12">
        <div className="wrap max-w-[820px]">
          <Link href={`/${locale}/blog`} className="mb-5 inline-block font-mono text-xs font-bold uppercase tracking-[0.04em] text-orange no-underline">
            ← Blog
          </Link>
          <div className="mb-5 flex gap-2.5">
            <Chip className={serviceColors[post.category]}>{categoryLabels[locale][post.category]}</Chip>
            <Chip>{locale === "ro" ? "Ghid" : "Guide"}</Chip>
          </div>
          <h1 className="display text-[clamp(38px,6vw,72px)]">{post.title}</h1>
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <span className={`grid h-12 w-12 place-items-center border-2 border-ink font-display text-[22px] ${serviceColors[post.category]}`}>{post.author.charAt(0)}</span>
            <div>
              <strong className="block">{post.author}</strong>
              <span className="font-mono text-xs text-[#6b655d]">{post.date} · {post.minutes}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-9">
        <div className="wrap max-w-[1000px]">
          <div className="nb-card overflow-hidden p-0">
            <Placeholder label={`${post.visual} · 1200×514`} className={`aspect-[21/9] ${serviceColors[post.category]}`} />
          </div>
        </div>
      </section>

      <section className="pb-20 pt-5">
        <div className="wrap grid max-w-[1000px] items-start gap-12 min-[860px]:grid-cols-[240px_1fr]">
          <aside className="top-24 min-[860px]:sticky">
            <div className="mb-3 font-mono text-xs uppercase tracking-mono text-[#6b655d]">{locale === "ro" ? "Cuprins" : "Contents"}</div>
            <nav>
              {post.body.filter((block) => block.type === "h2").map((block, index) => (
                <a key={block.text} href={`#s-${index}`} className="block border-b-2 border-black/10 py-2 font-semibold text-[#3a352f] no-underline hover:text-orange">
                  {index + 1}. {block.text}
                </a>
              ))}
            </nav>
            <NbButton href={`/${locale}/contact`} variant="primary" className="mt-6 w-full">
              {locale === "ro" ? "Vrei ajutor?" : "Need help?"} →
            </NbButton>
          </aside>

          <article className="article">
            {post.body.map((block, index) => {
              if (block.type === "p") return <p key={index}>{block.text}</p>;
              if (block.type === "h2") return <h2 key={index} id={`s-${post.body.slice(0, index).filter((item) => item.type === "h2").length}`}>{block.text}</h2>;
              if (block.type === "h3") return <h3 key={index}>{block.text}</h3>;
              if (block.type === "quote") return <blockquote key={index}>{block.text}</blockquote>;
              if (block.type === "callout") return <div key={index} className="my-8 border-3 border-ink bg-cream p-6 shadow-nb-sm"><p className="m-0">{block.text}</p></div>;
              if (block.type === "ul") return <ul key={index}>{block.items?.map((item) => <li key={item}>{item}</li>)}</ul>;
              return null;
            })}
          </article>
        </div>
      </section>

      <section className="section border-t-3 border-ink bg-cream">
        <div className="wrap">
          <h2 className="display mb-9 text-[clamp(32px,5vw,56px)]">{locale === "ro" ? "Citește mai departe" : "Read next"}</h2>
          <div className="grid gap-6 min-[620px]:grid-cols-2 min-[900px]:grid-cols-3">
            {related.map((item) => (
              <article key={item.slug} className="nb-card nb-lift overflow-hidden">
                <Link href={`/${locale}/blog/${item.slug}`} className="block text-inherit no-underline">
                  <Placeholder label="imagine" className={`aspect-[16/10] border-b-3 border-ink ${serviceColors[item.category]}`} />
                  <div className="p-5">
                    <Chip className={serviceColors[item.category]}>{categoryLabels[locale][item.category]}</Chip>
                    <h3 className="mt-3 font-display text-2xl uppercase leading-[1.05]">{item.title}</h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
