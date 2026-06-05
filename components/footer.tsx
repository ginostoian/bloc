import Link from "next/link";
import { copy, services } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <footer className="border-t-3 border-ink bg-ink text-cream">
      <div className="wrap py-16 pb-7">
        <div className="grid gap-8 min-[620px]:grid-cols-2 min-[980px]:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link href={`/${locale}`} className="mb-4 inline-flex items-center gap-2.5 text-cream no-underline">
              <span className="grid h-[38px] w-[38px] place-items-center border-3 border-ink bg-orange font-display text-[22px] text-white shadow-[3px_3px_0_#141210]">B</span>
              <span className="font-display text-2xl uppercase">Bloc</span>
            </Link>
            <p className="max-w-[300px] text-[15px] text-[#a39d93]">{t.footer.tagline}</p>
          </div>

          <FooterCol title={t.footer.menu}>
            <FooterLink href={`/${locale}`}>{t.nav.home}</FooterLink>
            <FooterLink href={`/${locale}/servicii`}>{t.nav.services}</FooterLink>
            <FooterLink href={`/${locale}/despre`}>{t.nav.about}</FooterLink>
            <FooterLink href={`/${locale}/blog`}>{t.nav.blog}</FooterLink>
            <FooterLink href={`/${locale}/contact`}>{t.nav.contact}</FooterLink>
          </FooterCol>

          <FooterCol title={t.footer.services}>
            {services[locale].slice(0, 4).map((service) => (
              <FooterLink key={service.key} href={`/${locale}/servicii#${service.key}`}>
                {service.title}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={t.footer.contact}>
            <FooterLink href="mailto:salut@bloc.ro">salut@bloc.ro</FooterLink>
            <FooterLink href="tel:+40700000000">+40 700 000 000</FooterLink>
            <span className="block text-[15px] text-[#a39d93]">Cluj-Napoca, România</span>
          </FooterCol>
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t-2 border-[#2c2820] pt-5 font-mono text-xs text-[#7c766d]">
          <span>{t.footer.rights}</span>
          <span>{t.footer.built}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3.5 font-mono text-xs uppercase tracking-mono text-[#7c766d]">{title}</div>
      <div className="grid gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block text-cream no-underline hover:text-orange">
      {children}
    </Link>
  );
}
