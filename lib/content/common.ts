import type { Locale } from "../i18n";
import type { ServiceKey } from "./services";

type L<T> = Record<Locale, T>;

export const stats: L<[string, string][]> = {
  ro: [["40+", "Site-uri și magazine lansate"], ["96", "Scor mediu PageSpeed pe mobil"], ["1 zi", "Lucrătoare, timp maxim de răspuns"], ["0 €", "Auditul și prima discuție"]],
  en: [["40+", "Websites and stores launched"], ["96", "Average mobile PageSpeed score"], ["1 day", "Maximum reply time, in business days"], ["€0", "The audit and first call"]]
};

export const platforms = ["Google", "ChatGPT", "Perplexity", "Gemini", "Claude", "Copilot", "AI Overviews"];

export const beliefs: L<[string, string][]> = {
  ro: [
    ["Fără prezentări de 60 de slide-uri.", "Îți arătăm site-ul pe telefon, nu în PowerPoint. Primul link de test vine în a doua săptămână."],
    ["Preț fix, nu ore pontate.", "Știi suma înainte să începem. Dacă durează mai mult, e problema noastră, nu a ta."],
    ["Un da sau un nu sincer.", "Dacă nu te putem ajuta, îți spunem din prima și îți recomandăm pe cineva care poate."],
    ["Publicăm, nu recomandăm.", "Schimbările ajung pe site-ul tău în fiecare săptămână. Rapoartele fără acțiune nu valorează nimic."],
    ["Tot ce construim e al tău.", "Cod, domeniu, conturi și conținut, pe numele tău. Pleci oricând, cu tot."],
    ["Măsurăm în cereri, nu în complimente.", "Un site e reușit când îți aduce clienți. Orice altceva e decor."]
  ],
  en: [
    ["No 60-slide decks.", "We show you the site on your phone, not in PowerPoint. The first test link arrives in week two."],
    ["Fixed price, not billable hours.", "You know the number before we start. If it takes longer, that is our problem, not yours."],
    ["An honest yes or no.", "If we cannot help, we say so straight away and point you to someone who can."],
    ["We ship, not suggest.", "Changes reach your site every week. Reports without action are worth nothing."],
    ["Everything we build is yours.", "Code, domain, accounts and content, in your name. Leave any time and take it all."],
    ["Measured in enquiries, not compliments.", "A website succeeds when it brings you customers. Everything else is decoration."]
  ]
};

export const comparison: L<{ cols: [string, string, string, string]; rows: [string, string, string, string][] }> = {
  ro: {
    cols: ["", "Agenție clasică", "Freelancer", "Bloc"],
    rows: [
      ["Preț", "Estimare, apoi ore extra", "Mic, dar imprevizibil", "Fix, în scris, înainte să începem"],
      ["Termen", "2–4 luni", "Depinde de disponibilitate", "3–4 săptămâni, în contract"],
      ["Cine scrie textele", "Tu, de obicei", "Tu", "Noi, tu aprobi"],
      ["Viteză pe mobil", "Rareori măsurată", "Variabilă", "90+ garantat sau reparăm gratuit"],
      ["Gata pentru căutarea AI", "Rareori", "Rareori", "Din prima zi"],
      ["Cu cine vorbești", "Un account manager", "Cu el, când răspunde", "Direct cu oamenii care lucrează"],
      ["Dacă nu ești mulțumit", "Contract pe 12 luni", "Greu de recuperat", "Avansul returnat integral"]
    ]
  },
  en: {
    cols: ["", "Traditional agency", "Freelancer", "Bloc"],
    rows: [
      ["Price", "Estimate, then extra hours", "Low, but unpredictable", "Fixed, in writing, before we start"],
      ["Timeline", "2–4 months", "Depends on availability", "3–4 weeks, in the contract"],
      ["Who writes the copy", "Usually you", "You", "We do, you approve"],
      ["Mobile speed", "Rarely measured", "Varies", "90+ guaranteed or we fix it free"],
      ["Ready for AI search", "Rarely", "Rarely", "From day one"],
      ["Who you talk to", "An account manager", "Them, when they reply", "Directly with the people doing the work"],
      ["If you are not happy", "A 12-month contract", "Hard to recover", "Deposit refunded in full"]
    ]
  }
};

export const guarantees: L<[string, string][]> = {
  ro: [
    ["Avansul înapoi după prima etapă", "Vezi structura și primele texte. Dacă nu vrei să continuăm, primești avansul integral înapoi."],
    ["90+ pe mobil sau reparăm gratuit", "Fiecare site pe care îl lansăm trece de 90 în PageSpeed Insights pe mobil. Altfel, optimizăm pe banii noștri."],
    ["Banii înapoi după prima lună", "Pe SEO, SEO local și AEO: nu ești mulțumit după prima lună? Ceri banii în 7 zile și îi primești."],
    ["Răspuns în 1 zi lucrătoare", "La orice mesaj, de la prima întrebare până la ultima modificare."]
  ],
  en: [
    ["Deposit back after the first stage", "See the structure and first copy. If you do not want to continue, your deposit comes back in full."],
    ["90+ on mobile or we fix it free", "Every site we launch scores over 90 on mobile in PageSpeed Insights. Otherwise we optimise at our own cost."],
    ["Money back after the first month", "On SEO, local SEO and AEO: not happy after month one? Ask within 7 days and get it back."],
    ["A reply within 1 business day", "To every message, from the first question to the last change."]
  ]
};

export const startSteps: L<[string, string, string][]> = {
  ro: [
    ["În 1 zi lucrătoare", "Îți răspundem.", "Ne uităm pe site și pe întrebarea ta. Primești un da și ce ne trebuie sau un nu sincer."],
    ["În aceeași săptămână", "Discutăm 30 de minute.", "Fără prezentări. Îți spunem ce am construi primul, cât durează și cât costă."],
    ["La 48 de ore după discuție", "Primești oferta fixă.", "Livrabile, termene și preț, în scris. Nimic ascuns."],
    ["Din săptămâna următoare", "Lucrăm.", "Vezi progresul pe linkuri de test și ne scrii direct, nu prin tichete."]
  ],
  en: [
    ["Within 1 business day", "We reply.", "We look at your site and your question. You get a yes and what we need, or an honest no."],
    ["The same week", "We talk for 30 minutes.", "No pitch deck. We tell you what we would build first, how long it takes and what it costs."],
    ["48 hours after the call", "You get a fixed proposal.", "Deliverables, timelines and price, in writing. Nothing hidden."],
    ["From the next week", "We get to work.", "You follow progress on test links and message us directly, not through tickets."]
  ]
};

export type Plan = { name: string; price: string; unit: string; desc: string; points: string[]; service: ServiceKey; featured?: boolean };

export const plans: L<{ projects: Plan[]; monthly: Plan[] }> = {
  ro: {
    projects: [
      { name: "Landing page", price: "900 €", unit: "o dată", desc: "O pagină pentru o ofertă sau o campanie. Live în 10 zile lucrătoare.", points: ["Copy persuasiv", "Design și dezvoltare", "Măsurare completă", "Variantă de test A/B"], service: "landing-pages" },
      { name: "Site de prezentare", price: "2.400 €", unit: "o dată", desc: "Până la 8 pagini, texte incluse, gata pentru Google și AI. Live în 3–4 săptămâni.", points: ["Texte RO + EN", "Design pe măsură", "SEO tehnic și schema", "90+ PageSpeed garantat"], service: "web-development", featured: true },
      { name: "Magazin online", price: "4.900 €", unit: "o dată", desc: "Până la 200 de produse, plăți, facturare și curierat. Live în 6–8 săptămâni.", points: ["Checkout pe o pagină", "Integrări RO incluse", "SEO pentru produse", "60 de zile de suport"], service: "magazine-online" },
      { name: "Branding", price: "1.800 €", unit: "o dată", desc: "Poziționare, identitate completă și ghid de brand. Gata în 3 săptămâni.", points: ["Mesaje și voce", "Logo și identitate", "6 șabloane", "Toate fișierele sursă"], service: "branding-design" },
      { name: "Pilot AI", price: "1.900 €", unit: "o dată", desc: "O automatizare în producție în 3 săptămâni, cu economie de timp măsurată.", points: ["Audit de procese", "Integrare cu ce ai", "Control uman", "Garanția celor 5 ore"], service: "ai-automatizari" }
    ],
    monthly: [
      { name: "Îngrijire", price: "149 €", unit: "/ lună", desc: "Site sigur, rapid și mereu online.", points: ["Actualizări și backup zilnic", "Monitorizare 24/7", "Răspuns în 4 ore lucrătoare"], service: "mentenanta" },
      { name: "SEO local", price: "490 €", unit: "/ lună", desc: "Primele trei rezultate în Google Maps.", points: ["Google Business Profile", "Sistem de recenzii", "Pagini locale"], service: "seo-local" },
      { name: "SEO", price: "900 €", unit: "/ lună", desc: "5 îmbunătățiri publicate pe săptămână.", points: ["Până la 8 articole pe lună", "Reparații tehnice", "Raport în fiecare luni"], service: "seo" },
      { name: "Creștere", price: "1.400 €", unit: "/ lună", desc: "SEO + căutare AI, într-un singur plan.", points: ["Tot ce include SEO", "Monitorizare în 5 asistenți AI", "Optimizare de conversie lunară"], service: "aeo-geo", featured: true }
    ]
  },
  en: {
    projects: [
      { name: "Landing page", price: "€900", unit: "one-off", desc: "One page for one offer or campaign. Live in 10 business days.", points: ["Persuasive copy", "Design and build", "Full tracking", "A/B test variant"], service: "landing-pages" },
      { name: "Business website", price: "€2,400", unit: "one-off", desc: "Up to 8 pages, copy included, ready for Google and AI. Live in 3–4 weeks.", points: ["Copy in EN + RO", "Custom design", "Technical SEO and schema", "90+ PageSpeed guaranteed"], service: "web-development", featured: true },
      { name: "Online store", price: "€4,900", unit: "one-off", desc: "Up to 200 products, payments, invoicing and shipping. Live in 6–8 weeks.", points: ["One-page checkout", "Integrations included", "Product SEO", "60 days of support"], service: "magazine-online" },
      { name: "Branding", price: "€1,800", unit: "one-off", desc: "Positioning, a complete identity and a brand guide. Ready in 3 weeks.", points: ["Messaging and voice", "Logo and identity", "6 templates", "Every source file"], service: "branding-design" },
      { name: "AI pilot", price: "€1,900", unit: "one-off", desc: "One automation in production in 3 weeks, with time saved measured.", points: ["Process audit", "Works with your tools", "Human sign-off", "The 5-hour guarantee"], service: "ai-automatizari" }
    ],
    monthly: [
      { name: "Care", price: "€149", unit: "/ month", desc: "A secure, fast site that stays online.", points: ["Updates and daily backups", "24/7 monitoring", "4 business-hour response"], service: "mentenanta" },
      { name: "Local SEO", price: "€490", unit: "/ month", desc: "The top three on Google Maps.", points: ["Google Business Profile", "Review system", "Local pages"], service: "seo-local" },
      { name: "SEO", price: "€900", unit: "/ month", desc: "5 improvements shipped every week.", points: ["Up to 8 articles a month", "Technical fixes", "A report every Monday"], service: "seo" },
      { name: "Growth", price: "€1,400", unit: "/ month", desc: "SEO + AI search, in one plan.", points: ["Everything in SEO", "Tracking across 5 AI assistants", "Monthly conversion optimisation"], service: "aeo-geo", featured: true }
    ]
  }
};

export type Project = { image: string; name: string; domain: string; url: string; tags: string; sector: string; challenge: string; built: string; text: string };

export const projects: L<Project[]> = {
  ro: [
    { image: "primvet.jpg", name: "Prim Vet", domain: "primvet.ro", url: "https://www.primvet.ro/", tags: "Web · SEO local", sector: "Clinică veterinară", challenge: "Stăpânii de animale căutau urgent un program, o adresă și un telefon, iar vechiul site îi făcea să caute.", built: "Un site construit în jurul celor trei întrebări urgente, cu programare și traseu la un tap distanță și pagini locale pentru fiecare serviciu.", text: "Experiență veterinară prezentată prin trasee scurte către programare și cabinet." },
    { image: "rawmina.jpg", name: "RawMina", domain: "rawmina.com", url: "https://www.rawmina.com/", tags: "Branding · E-commerce", sector: "Brand de produse naturale", challenge: "Un produs de calitate, fără o identitate care să-l diferențieze pe raft sau pe Instagram.", built: "Identitate vizuală caldă, fotografie de produs și un magazin online în care fiecare produs își spune povestea.", text: "Un univers vizual cald și un catalog care pune produsele în valoare." },
    { image: "bhstudio.jpg", name: "Better Homes", domain: "bhstudio.co.uk", url: "https://bhstudio.co.uk/", tags: "Web · SEO · UK", sector: "Renovări, Marea Britanie", challenge: "Proprietarii britanici voiau să știe cât costă înainte să sune, iar concurența ascundea prețurile.", built: "Ghiduri de cost transparente și studii de caz care răspund la întrebarea de preț și aduc cereri deja calificate.", text: "Ghiduri de cost și studii de caz așezate în jurul deciziei proprietarului." },
    { image: "miniclinic.jpg", name: "MiniClinic", domain: "miniclinic-theta.vercel.app", url: "https://miniclinic-theta.vercel.app/", tags: "Web · SEO local", sector: "Clinică pediatrică", challenge: "Părinții îngrijorați nu citesc liste de servicii. Caută răspunsul la întrebarea lor, rapid.", built: "Servicii organizate după întrebările părinților, cu răspunsuri clare și programare imediată.", text: "Serviciile clinicii organizate după întrebările părinților." }
  ],
  en: [
    { image: "primvet.jpg", name: "Prim Vet", domain: "primvet.ro", url: "https://www.primvet.ro/", tags: "Web · Local SEO", sector: "Veterinary clinic", challenge: "Pet owners urgently needed opening hours, an address and a phone number, and the old site made them hunt.", built: "A site built around those three urgent questions, with booking and directions one tap away and local pages for every service.", text: "Veterinary expertise presented through clear paths to appointments and the clinic." },
    { image: "rawmina.jpg", name: "RawMina", domain: "rawmina.com", url: "https://www.rawmina.com/", tags: "Branding · E-commerce", sector: "Natural products brand", challenge: "A quality product with no identity to set it apart on the shelf or on Instagram.", built: "A warm visual identity, product photography and an online store where every product tells its story.", text: "A warm visual world and a product catalogue designed to make the offer clear." },
    { image: "bhstudio.jpg", name: "Better Homes", domain: "bhstudio.co.uk", url: "https://bhstudio.co.uk/", tags: "Web · SEO · UK", sector: "Home renovation, UK", challenge: "UK homeowners wanted to know the cost before calling, and competitors hid their prices.", built: "Transparent cost guides and case studies that answer the price question and bring in pre-qualified enquiries.", text: "Cost guides and case studies built around the homeowner's decision." },
    { image: "miniclinic.jpg", name: "MiniClinic", domain: "miniclinic-theta.vercel.app", url: "https://miniclinic-theta.vercel.app/", tags: "Web · Local SEO", sector: "Paediatric clinic", challenge: "Worried parents do not read service lists. They look for the answer to their question, fast.", built: "Services organised around parents' questions, with clear answers and instant booking.", text: "Clinic services organised around parents' questions." }
  ]
};

export const homeFaqs: L<[string, string][]> = {
  ro: [
    ["Cât costă un site făcut de Bloc?", "Un landing page pornește de la 900 €, un site de prezentare de la 2.400 €, iar un magazin online de la 4.900 €. Primești prețul final, fix, în scris, înainte să începem."],
    ["Cât durează?", "Un landing page: 10 zile lucrătoare. Un site de prezentare: 3–4 săptămâni. Un magazin online: 6–8 săptămâni. Termenele sunt trecute în contract."],
    ["Ce se întâmplă dacă nu sunt mulțumit?", "După prima etapă vezi structura și primele texte. Dacă nu vrei să continuăm, îți returnăm avansul integral. Pe serviciile lunare poți cere banii înapoi după prima lună."],
    ["Trebuie să știu exact ce îmi trebuie?", "Nu. Spune-ne ce vinzi și unde pierzi clienți sau timp. În 30 de minute stabilim împreună ce merită construit primul."],
    ["Al cui este site-ul după lansare?", "Al tău, integral: cod, domeniu, găzduire, conturi și conținut. Nu te legăm de noi."],
    ["Lucrați doar cu firme din România?", "Lucrăm cu firme din România, Marea Britanie și restul Europei, în română și engleză. Totul se face remote, cu întâlniri video."],
    ["Ce înseamnă că site-ul e pregătit pentru căutarea AI?", "Că asistenți ca ChatGPT, Perplexity și Google AI Overviews îl pot citi, înțelege și cita: conținut randat pe server, date structurate, răspunsuri directe și fișier llms.txt."],
    ["Cu cine vorbesc în timpul proiectului?", "Direct cu oamenii care lucrează la proiect. Fără account manageri și fără tichete. Răspundem în maximum o zi lucrătoare."]
  ],
  en: [
    ["How much does a Bloc website cost?", "Landing pages start at €900, business websites at €2,400 and online stores at €4,900. You get the final fixed price in writing before we start."],
    ["How long does it take?", "A landing page: 10 business days. A business website: 3–4 weeks. An online store: 6–8 weeks. Timelines are written into the contract."],
    ["What if I am not happy?", "After the first stage you see the structure and first copy. If you do not want to continue, we refund your deposit in full. On monthly services you can ask for your money back after month one."],
    ["Do I need to know exactly what I need?", "No. Tell us what you sell and where you lose customers or time. In 30 minutes we agree what is worth building first."],
    ["Who owns the site after launch?", "You do, entirely: code, domain, hosting, accounts and content. We do not lock you in."],
    ["Do you only work with Romanian businesses?", "We work with businesses in Romania, the UK and across Europe, in English and Romanian. Everything is remote, with video calls."],
    ["What does ready for AI search mean?", "That assistants like ChatGPT, Perplexity and Google AI Overviews can read, understand and cite your site: server-rendered content, structured data, direct answers and an llms.txt file."],
    ["Who do I talk to during the project?", "Directly with the people doing the work. No account managers, no tickets. We reply within one business day."]
  ]
};

export const pricingFaqs: L<[string, string][]> = {
  ro: [
    ["De ce prețuri fixe?", "Pentru că tu planifici un buget, nu un risc. Dacă un proiect durează mai mult decât am estimat, costul este al nostru."],
    ["Ce nu este inclus în preț?", "Domeniul, abonamentele platformelor (de exemplu Shopify), licențele de imagini premium și costurile de reclame. Le plătești direct furnizorilor, fără adaos."],
    ["Cum se plătește?", "Proiectele: 40% avans, 40% la aprobarea designului, 20% la lansare. Serviciile lunare: la începutul fiecărei luni, fără contract pe termen lung."],
    ["Emiteți factură?", "Da, factură fiscală pentru fiecare plată, în lei sau euro, pentru firme din România și din UE."],
    ["Pot combina servicii?", "Da. Un site nou plus 3 luni de SEO primește 10% reducere la proiect."],
    ["De ce sunteți mai ieftini decât o agenție mare?", "Pentru că nu plătim birouri de prestigiu, account manageri sau prezentări. Folosim AI și unelte proprii ca să livrăm mai repede, iar economia ajunge la tine."]
  ],
  en: [
    ["Why fixed prices?", "Because you plan a budget, not a risk. If a project takes longer than we estimated, that cost is ours."],
    ["What is not included?", "Your domain, platform subscriptions (for example Shopify), premium image licences and ad spend. You pay those providers directly, with no markup."],
    ["How do payments work?", "Projects: 40% deposit, 40% on design approval, 20% at launch. Monthly services: at the start of each month, no long-term contract."],
    ["Do you issue invoices?", "Yes, a proper invoice for every payment, in EUR or RON, for businesses in Romania, the UK and the EU."],
    ["Can I combine services?", "Yes. A new website plus 3 months of SEO gets 10% off the project."],
    ["Why are you cheaper than a big agency?", "We do not pay for prestige offices, account managers or pitch decks. We use AI and our own tools to deliver faster, and the savings reach you."]
  ]
};

export const ui = {
  ro: {
    nav: [["Servicii", "/servicii"], ["Prețuri", "/preturi"], ["Rezultate", "/rezultate"], ["Despre", "/despre"], ["Blog", "/blog"], ["Contact", "/contact"]] as [string, string][],
    cta: "Audit gratuit", read: "Citește articolul",
    categories: { all: "Toate", web: "Web", seo: "SEO", ai: "AI" },
    footer: "Site-uri, SEO, căutare AI și automatizări pentru afaceri care vor clienți, nu complimente. Cluj-Napoca, pentru România, UK și Europa.",
    tagline: "Construim, nu promitem."
  },
  en: {
    nav: [["Services", "/servicii"], ["Pricing", "/preturi"], ["Results", "/rezultate"], ["About", "/despre"], ["Blog", "/blog"], ["Contact", "/contact"]] as [string, string][],
    cta: "Free audit", read: "Read article",
    categories: { all: "All", web: "Web", seo: "SEO", ai: "AI" },
    footer: "Websites, SEO, AI search and automation for businesses that want customers, not compliments. Based in Cluj-Napoca, working across Romania, the UK and Europe.",
    tagline: "We build, not promise."
  }
};
