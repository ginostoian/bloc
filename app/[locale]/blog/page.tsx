import type { Metadata } from "next";
import { breadcrumbSchema, pageMetadata, siteUrl, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { BlogFilter } from "@/components/blog-filter";
import { FinalCta, PageIntro } from "@/components/ui";
import { isLocale, type Locale } from "@/lib/i18n";
import { posts } from "@/lib/site";

const meta = {
  ro: ["Blog: site-uri, SEO, căutare AI și automatizări | Bloc", "Articole practice despre site-uri care vând, SEO local, cum ajungi recomandat de ChatGPT și primele automatizări AI care merită făcute."],
  en: ["Blog: websites, SEO, AI search and automation | Bloc", "Practical articles on websites that sell, local SEO, getting recommended by ChatGPT and the first AI automations worth building."]
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro";
  return pageMetadata(locale, "/blog", meta[locale][0], meta[locale][1]);
}

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale: Locale = isLocale(raw) ? raw : "ro"; const ro = locale === "ro";
  const blog = { "@type": "Blog", "@id": `${siteUrl}/${locale}/blog#blog`, name: "Bloc Blog", inLanguage: locale, blogPost: posts[locale].map(p => ({ "@type": "BlogPosting", headline: p.title, url: `${siteUrl}/${locale}/blog/${p.slug}`, datePublished: p.iso })) };
  return <>
    <JsonLd locale={locale} nodes={[webPageSchema(locale, "/blog", meta[locale][0], meta[locale][1], "CollectionPage"), blog, breadcrumbSchema(locale, [["Blog", "/blog"]])]} />
    <PageIntro locale={locale} crumbs={[["Blog"]]} title={ro ? "Idei care aduc clienți." : "Ideas that bring customers."} accent={ro ? "clienți" : "customers"} text={ro ? "Web, SEO, căutare AI și automatizări, explicate direct. Fără sfaturi care sună bine și nu schimbă nimic." : "Web, SEO, AI search and automation, explained plainly. No advice that sounds good and changes nothing."} />
    <section className="shell section-tight" style={{ paddingTop: 0 }}><BlogFilter locale={locale} /></section>
    <FinalCta locale={locale} title={ro ? "Vrei să aplicăm ideile pe cazul tău?" : "Want us to apply these ideas to your business?"} text={ro ? "Spune-ne ce încerci să schimbi. Începem cu un diagnostic, nu cu o ofertă." : "Tell us what you want to change. We start with a diagnosis, not a sales pitch."} button={ro ? "Hai să discutăm" : "Let's talk"} />
  </>;
}
