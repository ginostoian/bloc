"use client";

import { useState } from "react";
import { copy, services } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { NbButton } from "./primitives";

export function ContactForm({ locale }: { locale: Locale }) {
  const [sent, setSent] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const t = copy[locale].contactPage;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      {sent ? (
        <div className="py-7 text-center">
          <div className="mx-auto mb-4 grid h-[72px] w-[72px] place-items-center border-3 border-ink bg-green font-display text-[40px] text-white shadow-nb-sm">✓</div>
          <h2 className="display text-4xl">{t.successTitle}</h2>
          <p className="mx-auto mt-2.5 max-w-[360px] text-[#5c564e]">{t.successText}</p>
        </div>
      ) : (
        <>
          <h2 className="display mb-1.5 text-3xl">{t.formTitle}</h2>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.06em] text-[#6b655d]">{t.formMeta}</p>

          <label className="label">{t.need}</label>
          <div className="mb-6 flex flex-wrap gap-2.5">
            {services[locale].map((service) => {
              const on = selected.includes(service.key);
              return (
                <button
                  key={service.key}
                  type="button"
                  onClick={() => setSelected((value) => (on ? value.filter((item) => item !== service.key) : [...value, service.key]))}
                  className={cn("border-3 border-ink bg-paper px-4 py-2.5 font-mono text-[13px] font-bold shadow-[3px_3px_0_#141210] transition-[transform,box-shadow,background] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#141210]", on && "bg-orange text-white")}
                >
                  {service.title}
                </button>
              );
            })}
          </div>

          <div className="mb-4 grid gap-4 min-[620px]:grid-cols-2">
            <Field label={t.name} required placeholder={locale === "ro" ? "Ion Popescu" : "Alex Smith"} />
            <Field label={t.company} placeholder={locale === "ro" ? "Numele afacerii" : "Company name"} />
          </div>
          <div className="mb-4 grid gap-4 min-[620px]:grid-cols-2">
            <Field label={t.email} required type="email" placeholder={locale === "ro" ? "adresa@email.ro" : "email@company.com"} />
            <Field label={t.phone} type="tel" placeholder="+40 700 000 000" />
          </div>
          <div className="mb-4">
            <label className="label">{t.budget}</label>
            <select className="field">
              <option>{locale === "ro" ? "Sub 1.000€" : "Under €1,000"}</option>
              <option>1.000€ – 3.000€</option>
              <option>3.000€ – 7.000€</option>
              <option>{locale === "ro" ? "Peste 7.000€" : "Over €7,000"}</option>
              <option>{locale === "ro" ? "Nu sunt sigur(ă) încă" : "Not sure yet"}</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="label">{t.message}</label>
            <textarea className="field min-h-[150px]" required placeholder={locale === "ro" ? "Spune-ne pe scurt ce vrei să obții..." : "Tell us briefly what you want to achieve..."} />
          </div>
          <NbButton type="submit" variant="primary" size="lg" className="w-full">
            {t.submit} →
          </NbButton>
        </>
      )}
    </form>
  );
}

function Field({ label, type = "text", placeholder, required = false }: { label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input className="field" type={type} placeholder={placeholder} required={required} />
    </div>
  );
}
