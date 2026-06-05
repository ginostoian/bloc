import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/primitives";
import { copy } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ro";
  const t = copy[locale].contactPage;

  return (
    <>
      <PageHeader chip={t.chip} title={t.title} text={t.text} />

      <section className="section">
        <div className="wrap grid items-start gap-8 min-[860px]:grid-cols-[1.3fr_.9fr]">
          <div className="nb-card p-[clamp(28px,4vw,44px)] shadow-nb-lg">
            <ContactForm locale={locale} />
          </div>

          <div>
            <div className="nb-card bg-ink p-8 text-cream">
              <h2 className="display text-[28px] text-cream">{t.direct}</h2>
              <ContactInfo icon="@" label="Email" value="salut@bloc.ro" href="mailto:salut@bloc.ro" />
              <ContactInfo icon="☏" label={t.phone.replace(" *", "")} value="+40 700 000 000" href="tel:+40700000000" />
              <div className="flex gap-4 border-t-2 border-white/10 py-5">
                <span className="grid h-[46px] w-[46px] shrink-0 place-items-center border-2 border-cream bg-orange font-display text-[22px] text-white">B</span>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-mono text-[#a39d93]">{t.office}</div>
                  <span className="text-[17px] font-semibold">Str. Memorandumului 12<br />Cluj-Napoca, România</span>
                </div>
              </div>
            </div>

            <div className="nb-card mt-6 bg-yellow p-7">
              <div className="font-display text-2xl uppercase">{t.schedule}</div>
              <div className="mt-3.5 flex justify-between border-b-2 border-ink py-2">
                <span className="font-semibold">{t.weekdays}</span>
                <span className="font-mono">09:00 – 18:00</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold">{t.weekend}</span>
                <span className="font-mono">{t.emergency}</span>
              </div>
              <p className="mt-3.5 text-sm text-[#5c4d10]">{t.response}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactInfo({ icon, label, value, href }: { icon: string; label: string; value: string; href: string }) {
  return (
    <div className="flex gap-4 border-b-2 border-white/10 py-5">
      <span className="grid h-[46px] w-[46px] shrink-0 place-items-center border-2 border-cream bg-orange font-display text-[22px] text-white">{icon}</span>
      <div>
        <div className="font-mono text-[11px] uppercase tracking-mono text-[#a39d93]">{label}</div>
        <a href={href} className="text-[17px] font-semibold text-cream no-underline">{value}</a>
      </div>
    </div>
  );
}
