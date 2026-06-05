import type { Locale } from "./i18n";

export type ServiceKey = "web" | "seo" | "ai" | "branding" | "maintenance";
export type CategoryKey = "web" | "seo" | "ai" | "branding";

export const serviceColors: Record<ServiceKey | CategoryKey, string> = {
  web: "bg-yellow text-ink",
  seo: "bg-green text-white",
  ai: "bg-blue text-white",
  branding: "bg-pink text-ink",
  maintenance: "bg-lilac text-ink"
};

export const categoryLabels: Record<Locale, Record<CategoryKey, string>> = {
  ro: {
    web: "Web",
    seo: "SEO",
    ai: "AI",
    branding: "Branding"
  },
  en: {
    web: "Web",
    seo: "SEO",
    ai: "AI",
    branding: "Branding"
  }
};

export const copy = {
  ro: {
    meta: {
      title: "Bloc — Web · AI · SEO pentru afaceri din România",
      description: "Bloc construiește site-uri, optimizare SEO și soluții AI pentru afaceri din România. Construim, nu promitem."
    },
    nav: {
      home: "Acasă",
      services: "Servicii",
      about: "Despre",
      blog: "Blog",
      contact: "Contact",
      cta: "Cere ofertă"
    },
    footer: {
      tagline: "Web, AI și SEO pentru afaceri care vor să crească. Construim, nu promitem.",
      menu: "Meniu",
      services: "Servicii",
      contact: "Contact",
      rights: "© 2026 Bloc SRL. Toate drepturile rezervate.",
      built: "Construit cu Next.js · Tailwind · shadcn-ready"
    },
    home: {
      heroChip: "Agenție Web · AI · SEO — din România",
      heroTitleA: "Construim,",
      heroTitleB: "nu",
      heroTitleAccent: "promitem.",
      heroText: "Site-uri, SEO și automatizări AI pentru small business-uri din România. Fără jargon, fără cuvinte mari — doar lucruri care îți aduc clienți.",
      heroCta: "Hai să discutăm",
      heroSecondary: "Vezi proiecte",
      stats: [
        ["120+", "proiecte livrate"],
        ["4.9/5", "satisfacție clienți"],
        ["din 2018", "pe piață"]
      ],
      cardMetric: "+180% trafic",
      cardMeta: "în 6 luni · client e-commerce",
      aiBadge: "AI Agent live",
      aiMetric: "−40% timp pe suport",
      marquee: ["Web Development", "SEO", "AI Consulting", "Branding", "Mentenanță"],
      statsStrip: [
        ["120+", "proiecte livrate"],
        ["+180%", "creștere trafic medie"],
        ["98%", "clienți care revin"],
        ["14 zile", "de la brief la lansare*"]
      ],
      statsNote: "* pentru pachetul Landing — proiectele complexe au alt termen",
      servicesEyebrow: "// Ce facem",
      servicesTitle: "Cinci moduri în care\nîți creștem afacerea",
      allServices: "Toate serviciile",
      processEyebrow: "// Cum lucrăm",
      processTitle: "Proces simplu.\nZero surprize.",
      process: [
        ["Descoperire", "Înțelegem afacerea, clienții și obiectivele tale. Un call, întrebări bune, fără formulare interminabile."],
        ["Strategie", "Propunem un plan clar: ce construim, în ce ordine și ce rezultate urmărim. Tu aprobi, noi pornim."],
        ["Build", "Design și dezvoltare în sprinturi scurte. Vezi progresul live și dai feedback pe parcurs."],
        ["Lansare & creștere", "Lansăm, măsurăm și optimizăm. Nu dispărem după go-live — abia atunci începe partea bună."]
      ],
      portfolioEyebrow: "// Proiecte",
      portfolioTitle: "Rezultate, nu mockup-uri",
      testimonialsEyebrow: "// Ce spun clienții",
      testimonialsTitle: "Nu ne credeți pe cuvânt",
      faqEyebrow: "// Întrebări frecvente",
      faqTitle: "Răspunsuri pe șleau",
      newsletterTitle: "Primește 1 idee bună\npe săptămână",
      newsletterText: "Tactici scurte de web, SEO și AI. Fără spam.",
      newsletterPlaceholder: "adresa@email.ro",
      newsletterCta: "Mă abonez",
      newsletterSuccess: "Gata! Ești pe listă."
    },
    servicesPage: {
      chip: "Servicii",
      title: "Tot ce-ți trebuie\nca să crești online",
      text: "De la prima linie de cod la prima pagină în Google. Lucrăm cap-coadă sau punctual, exact pe nevoia ta.",
      packagesEyebrow: "// Pachete",
      packagesTitle: "Prețuri fără ghicit",
      packagesText: "Puncte de pornire orientative. Oferta finală o primești după un call de 30 de minute.",
      finalTitle: "Nu știi ce ți se potrivește?",
      finalText: "Spune-ne ce vrei să obții. Îți recomandăm sincer ce ai nevoie — și ce nu.",
      finalCta: "Cere o recomandare"
    },
    aboutPage: {
      chip: "Despre noi",
      title: "Oameni reali,\ncod care livrează",
      text: "Suntem o echipă mică din Cluj care lucrează cu afaceri mici din toată România. Fără agenție pompoasă, fără promisiuni goale — doar treabă bine făcută.",
      storyEyebrow: "// Povestea noastră",
      storyTitle: "Am pornit dintr-o frustrare",
      story: [
        "În 2018 ne-am săturat să vedem afaceri bune cu site-uri proaste — lente, scumpe și imposibil de administrat. Ne-am zis că se poate altfel.",
        "Așa s-a născut Bloc: o echipă care vorbește pe limba ta, construiește lucruri care chiar funcționează și rămâne alături de tine după lansare.",
        "Astăzi, peste 120 de afaceri din România cresc cu site-uri, SEO și AI construite de noi. Și abia începem."
      ],
      valuesEyebrow: "// Principiile noastre",
      valuesTitle: "În ce credem",
      teamEyebrow: "// Echipa",
      teamTitle: "Oamenii din spate",
      teamCta: "Vrei în echipă?",
      finalTitle: "Hai să ne cunoaștem",
      finalText: "Un call scurt, o cafea virtuală și o discuție sinceră despre afacerea ta.",
      finalCta: "Programează un call"
    },
    blogPage: {
      chip: "Blog",
      title: "Idei care\naduc clienți",
      text: "Tactici de web, SEO și AI explicate pe înțelesul tuturor. Le citești în 5 minute, le aplici azi.",
      featured: "Recomandat",
      readArticle: "Citește articolul",
      allArticles: "Toate articolele",
      count: "articole",
      newsletterTitle: "Nu rata niciun articol",
      newsletterText: "O idee bună pe săptămână, direct în inbox. Fără spam, te dezabonezi oricând."
    },
    contactPage: {
      chip: "Contact",
      title: "Hai să construim\nceva împreună",
      text: "Completează formularul sau scrie-ne direct. Răspundem în maxim o zi lucrătoare — promis.",
      formTitle: "Spune-ne despre proiect",
      formMeta: "Câmpurile cu * sunt obligatorii",
      need: "De ce ai nevoie?",
      name: "Nume *",
      company: "Firmă",
      email: "Email *",
      phone: "Telefon",
      budget: "Buget orientativ",
      message: "Mesaj *",
      submit: "Trimite mesajul",
      successTitle: "Mesaj trimis!",
      successText: "Mulțumim! Revenim la tine în maxim o zi lucrătoare.",
      direct: "Sau direct",
      office: "Birou",
      schedule: "Program",
      weekdays: "Luni – Vineri",
      weekend: "Weekend",
      emergency: "Doar urgențe",
      response: "Răspundem la mesaje în maxim o zi lucrătoare."
    }
  },
  en: {
    meta: {
      title: "Bloc — Web · AI · SEO for growth-minded businesses",
      description: "Bloc builds websites, SEO systems, and practical AI automations. We build, not promise."
    },
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      blog: "Blog",
      contact: "Contact",
      cta: "Request quote"
    },
    footer: {
      tagline: "Web, AI, and SEO for businesses that want to grow. We build, not promise.",
      menu: "Menu",
      services: "Services",
      contact: "Contact",
      rights: "© 2026 Bloc SRL. All rights reserved.",
      built: "Built with Next.js · Tailwind · shadcn-ready"
    },
    home: {
      heroChip: "Web · AI · SEO agency — based in Romania",
      heroTitleA: "We build,",
      heroTitleB: "not",
      heroTitleAccent: "promise.",
      heroText: "Websites, SEO, and AI automations for small and mid-sized businesses. No jargon, no big words — just work that brings customers.",
      heroCta: "Let's talk",
      heroSecondary: "See projects",
      stats: [
        ["120+", "projects shipped"],
        ["4.9/5", "client satisfaction"],
        ["since 2018", "in business"]
      ],
      cardMetric: "+180% traffic",
      cardMeta: "in 6 months · e-commerce client",
      aiBadge: "AI Agent live",
      aiMetric: "−40% support time",
      marquee: ["Web Development", "SEO", "AI Consulting", "Branding", "Maintenance"],
      statsStrip: [
        ["120+", "projects shipped"],
        ["+180%", "average traffic growth"],
        ["98%", "returning clients"],
        ["14 days", "from brief to launch*"]
      ],
      statsNote: "* for Landing package — complex projects have custom timelines",
      servicesEyebrow: "// What we do",
      servicesTitle: "Five ways we\ngrow your business",
      allServices: "All services",
      processEyebrow: "// How we work",
      processTitle: "Simple process.\nNo surprises.",
      process: [
        ["Discovery", "We understand your business, customers, and goals. One call, good questions, no endless forms."],
        ["Strategy", "We propose a clear plan: what we build, in what order, and what results we track."],
        ["Build", "Design and development in short sprints. You see progress live and give feedback along the way."],
        ["Launch & growth", "We launch, measure, and optimize. We do not disappear after go-live."]
      ],
      portfolioEyebrow: "// Projects",
      portfolioTitle: "Results, not mockups",
      testimonialsEyebrow: "// Client words",
      testimonialsTitle: "Don't take our word for it",
      faqEyebrow: "// FAQ",
      faqTitle: "Straight answers",
      newsletterTitle: "Get 1 sharp idea\nevery week",
      newsletterText: "Short tactics for web, SEO, and AI. No spam.",
      newsletterPlaceholder: "email@company.com",
      newsletterCta: "Subscribe",
      newsletterSuccess: "Done. You're on the list."
    },
    servicesPage: {
      chip: "Services",
      title: "Everything you need\nto grow online",
      text: "From the first line of code to the first page on Google. We work end to end or on the exact piece you need.",
      packagesEyebrow: "// Packages",
      packagesTitle: "Pricing without guessing",
      packagesText: "Starting points. The final offer comes after a 30-minute call.",
      finalTitle: "Not sure what fits?",
      finalText: "Tell us what you want to achieve. We'll recommend what you need — and what you don't.",
      finalCta: "Ask for a recommendation"
    },
    aboutPage: {
      chip: "About us",
      title: "Real people,\ncode that delivers",
      text: "We are a small team from Cluj working with businesses in Romania and abroad. No bloated agency theater, no empty promises — just solid work.",
      storyEyebrow: "// Our story",
      storyTitle: "We started from frustration",
      story: [
        "In 2018 we got tired of seeing good businesses with slow, expensive websites that were painful to manage.",
        "Bloc came from that: a team that speaks clearly, builds things that work, and stays close after launch.",
        "Today, over 120 businesses grow with websites, SEO, and AI systems built by us. We are just getting started."
      ],
      valuesEyebrow: "// Our principles",
      valuesTitle: "What we believe",
      teamEyebrow: "// Team",
      teamTitle: "The people behind it",
      teamCta: "Want to join?",
      finalTitle: "Let's meet",
      finalText: "A short call and an honest conversation about your business.",
      finalCta: "Book a call"
    },
    blogPage: {
      chip: "Blog",
      title: "Ideas that\nbring customers",
      text: "Web, SEO, and AI tactics explained plainly. Read them in 5 minutes, apply them today.",
      featured: "Featured",
      readArticle: "Read article",
      allArticles: "All articles",
      count: "articles",
      newsletterTitle: "Don't miss an article",
      newsletterText: "One useful idea per week, straight to your inbox. No spam."
    },
    contactPage: {
      chip: "Contact",
      title: "Let's build\nsomething together",
      text: "Fill out the form or write directly. We reply within one business day.",
      formTitle: "Tell us about the project",
      formMeta: "Fields marked * are required",
      need: "What do you need?",
      name: "Name *",
      company: "Company",
      email: "Email *",
      phone: "Phone",
      budget: "Estimated budget",
      message: "Message *",
      submit: "Send message",
      successTitle: "Message sent!",
      successText: "Thanks. We'll get back within one business day.",
      direct: "Direct contact",
      office: "Office",
      schedule: "Schedule",
      weekdays: "Monday – Friday",
      weekend: "Weekend",
      emergency: "Emergencies only",
      response: "We reply within one business day."
    }
  }
} as const;

export const services: Record<Locale, Array<{
  key: ServiceKey;
  title: string;
  short: string;
  lead: string;
  features: string[];
  visual: string;
}>> = {
  ro: [
    {
      key: "web",
      title: "Web Development",
      short: "Site-uri și magazine online rapide, pe Next.js & Tailwind. Cod curat, SEO-ready, ușor de administrat.",
      lead: "Construim pe Next.js și Tailwind — rapid, sigur și ușor de administrat. Fără template-uri obosite, fără cod care se strică la prima actualizare.",
      features: ["Landing pages & site-uri de prezentare", "Magazine online (e-commerce)", "Aplicații web custom & dashboards", "Performanță, SEO tehnic & accesibilitate"],
      visual: "mockup · site Next.js"
    },
    {
      key: "seo",
      title: "SEO & Conținut",
      short: "Ajungi pe prima pagină în Google pentru cuvintele care îți aduc clienți. Audit, optimizare, conținut.",
      lead: "Optimizăm site-ul ca să apari în Google exact când cineva caută ce vinzi tu. Audit, plan, execuție și rapoarte pe înțelesul tuturor.",
      features: ["Audit SEO tehnic complet", "Cercetare cuvinte-cheie & strategie", "SEO local (Google Business Profile)", "Conținut optimizat & link building"],
      visual: "grafic · creștere trafic"
    },
    {
      key: "ai",
      title: "AI Consulting",
      short: "Automatizări, chatboți și agenți AI care îți scad timpul pierdut și costurile pe suport și operațiuni.",
      lead: "Găsim unde pierzi timp și bani și automatizăm acolo. Chatboți, agenți AI și fluxuri inteligente, montate pe procesele tale reale.",
      features: ["Chatbot & agenți AI pe site", "Automatizări pentru operațiuni & vânzări", "Procesare documente & generare conținut", "Training pentru echipa ta"],
      visual: "diagramă · flux automatizare"
    },
    {
      key: "branding",
      title: "Branding & Design",
      short: "Identitate vizuală cu personalitate: logo, culori, tipografie și un sistem care te face memorabil.",
      lead: "Îți construim o identitate cu personalitate — de la logo la un sistem vizual complet pe care îl folosești peste tot, coerent.",
      features: ["Logo & identitate vizuală", "Paletă, tipografie & sistem de design", "Materiale & social media kit", "Ghid de brand"],
      visual: "moodboard · identitate vizuală"
    },
    {
      key: "maintenance",
      title: "Mentenanță & Suport",
      short: "Update-uri, backup, securitate și un om real care răspunde. Site-ul tău rămâne rapid și sigur.",
      lead: "Update-uri, backup, securitate și un om real care răspunde. Site-ul tău rămâne rapid, sigur și mereu funcțional.",
      features: ["Update-uri & backup automat", "Monitorizare securitate & uptime", "Modificări lunare incluse", "Suport prioritar cu om dedicat"],
      visual: "panou · status & uptime"
    }
  ],
  en: [
    {
      key: "web",
      title: "Web Development",
      short: "Fast websites and online stores built with Next.js & Tailwind. Clean code, SEO-ready, easy to manage.",
      lead: "We build with Next.js and Tailwind — fast, stable, and easy to manage. No tired templates, no fragile code.",
      features: ["Landing pages & company websites", "Online stores (e-commerce)", "Custom web apps & dashboards", "Performance, technical SEO & accessibility"],
      visual: "mockup · Next.js website"
    },
    {
      key: "seo",
      title: "SEO & Content",
      short: "Get found for searches that bring customers. Audit, optimization, content, and reporting.",
      lead: "We optimize your website so you show up when customers search for what you sell. Audit, plan, execution, and plain-language reports.",
      features: ["Full technical SEO audit", "Keyword research & strategy", "Local SEO (Google Business Profile)", "Optimized content & link building"],
      visual: "chart · traffic growth"
    },
    {
      key: "ai",
      title: "AI Consulting",
      short: "Automations, chatbots, and AI agents that reduce wasted time and support costs.",
      lead: "We find where you lose time and money, then automate that point. Chatbots, AI agents, and smart workflows wired into your real process.",
      features: ["Website chatbots & AI agents", "Operations and sales automations", "Document processing & content generation", "Training for your team"],
      visual: "diagram · automation flow"
    },
    {
      key: "branding",
      title: "Branding & Design",
      short: "A sharp visual identity: logo, colors, typography, and a system people remember.",
      lead: "We build an identity with personality — from logo to a complete visual system you can use everywhere.",
      features: ["Logo & visual identity", "Palette, typography & design system", "Materials & social media kit", "Brand guide"],
      visual: "moodboard · visual identity"
    },
    {
      key: "maintenance",
      title: "Maintenance & Support",
      short: "Updates, backups, security, and a real person who replies. Your site stays fast and safe.",
      lead: "Updates, backups, security, and a real person who replies. Your site stays fast, safe, and functional.",
      features: ["Updates & automatic backup", "Security and uptime monitoring", "Monthly edits included", "Priority support with a dedicated person"],
      visual: "panel · status & uptime"
    }
  ]
};

export const projects: Record<Locale, Array<{
  title: string;
  cats: CategoryKey[];
  text: string;
  metric: string;
  metricLabel: string;
  color: string;
  visual: string;
}>> = {
  ro: [
    { title: "Florăria Mioara", cats: ["web", "seo"], text: "Magazin online + SEO local. Comenzi online de la zero.", metric: "+240%", metricLabel: "comenzi online", color: "bg-yellow", visual: "screenshot · Florăria Mioara" },
    { title: "ContaPlus", cats: ["ai", "web"], text: "Agent AI pentru întrebări contabile. Suport non-stop.", metric: "−40%", metricLabel: "timp pe suport", color: "bg-blue", visual: "screenshot · ContaPlus" },
    { title: "Cafea Bună", cats: ["branding", "web"], text: "Rebranding complet + site de prezentare pentru o prăjitorie.", metric: "3x", metricLabel: "cereri colaborare", color: "bg-pink", visual: "screenshot · Cafea Bună" },
    { title: "Clinica DrZâmbet", cats: ["seo"], text: "SEO local pentru o clinică stomatologică din Cluj.", metric: "Top 3", metricLabel: "Google local", color: "bg-green", visual: "screenshot · DrZâmbet" },
    { title: "MobilaPro", cats: ["web", "ai"], text: "Configurator de mobilă cu recomandări AI și ofertă instant.", metric: "+65%", metricLabel: "cereri de ofertă", color: "bg-lilac", visual: "screenshot · MobilaPro" },
    { title: "Verde Bistro", cats: ["branding"], text: "Identitate vizuală nouă pentru un bistro vegetarian.", metric: "+90%", metricLabel: "recunoaștere brand", color: "bg-cream", visual: "screenshot · Verde Bistro" }
  ],
  en: [
    { title: "Mioara Flowers", cats: ["web", "seo"], text: "Online store + local SEO. Online orders from zero.", metric: "+240%", metricLabel: "online orders", color: "bg-yellow", visual: "screenshot · Mioara Flowers" },
    { title: "ContaPlus", cats: ["ai", "web"], text: "AI agent for accounting questions. Non-stop support.", metric: "−40%", metricLabel: "support time", color: "bg-blue", visual: "screenshot · ContaPlus" },
    { title: "Cafea Bună", cats: ["branding", "web"], text: "Full rebrand + presentation website for a coffee roaster.", metric: "3x", metricLabel: "partner requests", color: "bg-pink", visual: "screenshot · Cafea Bună" },
    { title: "DrZambet Clinic", cats: ["seo"], text: "Local SEO for a dental clinic in Cluj.", metric: "Top 3", metricLabel: "local Google", color: "bg-green", visual: "screenshot · DrZambet" },
    { title: "MobilaPro", cats: ["web", "ai"], text: "Furniture configurator with AI recommendations and instant quotes.", metric: "+65%", metricLabel: "quote requests", color: "bg-lilac", visual: "screenshot · MobilaPro" },
    { title: "Verde Bistro", cats: ["branding"], text: "New visual identity for a vegetarian bistro.", metric: "+90%", metricLabel: "brand recall", color: "bg-cream", visual: "screenshot · Verde Bistro" }
  ]
};

export const testimonials: Record<Locale, Array<{ quote: string; name: string; company: string; color: string; initial: string }>> = {
  ro: [
    { quote: "Au înțeles în 20 de minute ce alții n-au priceput în luni. Site nou, comenzi duble.", name: "Mioara P.", company: "Florăria Mioara", color: "bg-yellow", initial: "M" },
    { quote: "Agentul AI ne răspunde clienților și noaptea. Echipa de suport respiră.", name: "Andrei T.", company: "ContaPlus", color: "bg-blue text-white", initial: "A" },
    { quote: "Oameni cu care se poate vorbi pe limba omului. Fără termeni pompoși, doar rezultate.", name: "Raluca D.", company: "Clinica DrZâmbet", color: "bg-green text-white", initial: "R" }
  ],
  en: [
    { quote: "They understood in 20 minutes what others missed for months. New site, double the orders.", name: "Mioara P.", company: "Mioara Flowers", color: "bg-yellow", initial: "M" },
    { quote: "The AI agent replies to customers at night. Our support team finally has breathing room.", name: "Andrei T.", company: "ContaPlus", color: "bg-blue text-white", initial: "A" },
    { quote: "People you can actually talk to. No inflated terms, just results we can see.", name: "Raluca D.", company: "DrZambet Clinic", color: "bg-green text-white", initial: "R" }
  ]
};

export const faqs: Record<Locale, Array<{ q: string; a: string }>> = {
  ro: [
    { q: "Cât costă un site?", a: "Depinde de ce ai nevoie. Un landing page pornește de la ~600€, un magazin online de la ~2000€. La primul call îți dăm un interval clar." },
    { q: "În cât timp e gata?", a: "Un landing simplu în 2 săptămâni. Un site de prezentare în 3–4 săptămâni. Proiectele complexe între 6 și 10 săptămâni." },
    { q: "Pot să-mi administrez singur site-ul?", a: "Da. Construim totul ușor de editat și îți facem un mic training. Dacă nu vrei să te atingi de el, avem mentenanță." },
    { q: "Ce înseamnă AI Consulting?", a: "Găsim unde pierzi timp și bani în operațiuni și rezolvăm cu automatizări sau agenți AI. Fără hype, doar economie de timp." }
  ],
  en: [
    { q: "How much does a website cost?", a: "It depends on the scope. A landing page starts around €600, while online stores start around €2000. We give a clear range after the first call." },
    { q: "How long does it take?", a: "A simple landing page takes about 2 weeks. A company website takes 3–4 weeks. Complex builds usually take 6–10 weeks." },
    { q: "Can I manage the site myself?", a: "Yes. We build it to be editable and include training. If you prefer not to touch it, we can maintain it." },
    { q: "What does AI Consulting mean?", a: "We find where your team loses time and solve it with automations or AI agents. No hype, just saved hours." }
  ]
};

export const packages: Record<Locale, Array<{ name: string; price: string; text: string; features: string[]; featured?: boolean; cta: string }>> = {
  ro: [
    { name: "Start", price: "600€", text: "Pentru cei la început de drum care vor o prezență online curată.", features: ["Landing page pe Next.js", "Design neobrutalist custom", "SEO de bază & formular", "Lansare în 2 săptămâni"], cta: "Aleg Start" },
    { name: "Creștere", price: "1900€", text: "Site complet + SEO ca să începi să aduci clienți, nu doar vizite.", features: ["Site multi-pagină sau e-commerce", "SEO tehnic & strategie conținut", "Integrare AI (chatbot)", "3 luni de optimizare"], featured: true, cta: "Aleg Creștere" },
    { name: "Pe măsură", price: "Hai să vorbim", text: "Proiecte mari, AI complex sau o colaborare pe termen lung.", features: ["Soluții AI & automatizări custom", "Echipă dedicată proiectului", "Mentenanță & suport prioritar", "SLA & raportare lunară"], cta: "Discutăm" }
  ],
  en: [
    { name: "Start", price: "€600", text: "For early-stage teams that need a clean online presence.", features: ["Next.js landing page", "Custom neobrutalist design", "Basic SEO & form", "Launch in 2 weeks"], cta: "Choose Start" },
    { name: "Growth", price: "€1900", text: "Full website + SEO so you can bring customers, not just visits.", features: ["Multi-page site or e-commerce", "Technical SEO & content strategy", "AI integration (chatbot)", "3 months of optimization"], featured: true, cta: "Choose Growth" },
    { name: "Custom", price: "Let's talk", text: "Large builds, complex AI, or long-term collaboration.", features: ["Custom AI & automations", "Dedicated project team", "Priority maintenance & support", "SLA & monthly reporting"], cta: "Discuss" }
  ]
};

export const values: Record<Locale, Array<{ title: string; text: string }>> = {
  ro: [
    { title: "Sinceritate", text: "Îți spunem dacă nu te putem ajuta. Și dacă nu ai nevoie de ceva, nu ți-l vindem." },
    { title: "Rezultate", text: "Un site frumos care nu aduce clienți e doar artă scumpă. Noi măsurăm impactul." },
    { title: "Simplitate", text: "Fără jargon, fără pași inutili. Lucruri complexe, explicate pe înțelesul tuturor." }
  ],
  en: [
    { title: "Honesty", text: "We tell you when we cannot help. And if you do not need something, we will not sell it." },
    { title: "Results", text: "A pretty website that does not bring customers is expensive art. We measure impact." },
    { title: "Simplicity", text: "No jargon, no needless steps. Complex things explained clearly." }
  ]
};

export const team: Record<Locale, Array<{ name: string; role: string; color: string }>> = {
  ro: [
    { name: "Vlad Munteanu", role: "Founder & Web Lead", color: "bg-yellow" },
    { name: "Ioana Pavel", role: "SEO & Conținut", color: "bg-blue text-white" },
    { name: "Radu Stan", role: "AI & Automatizări", color: "bg-green text-white" },
    { name: "Dana Iliescu", role: "Design & Branding", color: "bg-pink" }
  ],
  en: [
    { name: "Vlad Munteanu", role: "Founder & Web Lead", color: "bg-yellow" },
    { name: "Ioana Pavel", role: "SEO & Content", color: "bg-blue text-white" },
    { name: "Radu Stan", role: "AI & Automation", color: "bg-green text-white" },
    { name: "Dana Iliescu", role: "Design & Branding", color: "bg-pink" }
  ]
};

export const posts: Record<Locale, Array<{
  slug: string;
  title: string;
  excerpt: string;
  category: CategoryKey;
  date: string;
  minutes: string;
  author: string;
  visual: string;
  body: Array<{ type: "p" | "h2" | "h3" | "ul" | "quote" | "callout"; text?: string; items?: string[] }>;
}>> = {
  ro: [
    {
      slug: "seo-local-90-zile",
      title: "Cum ajungi pe prima pagină în Google, local, în 90 de zile",
      excerpt: "Un ghid pas cu pas pentru afaceri locale care vor să fie găsite de clienții din oraș.",
      category: "seo",
      date: "14 Mai 2026",
      minutes: "8 min",
      author: "Ioana Pavel",
      visual: "imagine articol · SEO local",
      body: [
        { type: "p", text: "Dacă ai o afacere locală — cabinet, restaurant, magazin sau service — clienții te caută pe Google chiar acum. Întrebarea e: te găsesc pe tine sau pe concurență?" },
        { type: "h2", text: "Ce înseamnă SEO local" },
        { type: "p", text: "SEO local înseamnă să apari atunci când cineva caută un serviciu lângă mine sau într-un oraș anume. Google afișează rezultate cu hartă și afaceri evidențiate. Acolo vrei să fii." },
        { type: "h2", text: "Profilul Google Business e fundația" },
        { type: "ul", items: ["Nume, adresă și telefon identice peste tot online", "Categorie corectă și cât mai specifică", "Program actualizat", "Fotografii reale, adăugate constant", "Descriere clară cu serviciile principale"] },
        { type: "quote", text: "Un profil complet primește mult mai multe click-uri decât unul gol." },
        { type: "h2", text: "Planul pe 90 de zile" },
        { type: "h3", text: "Luna 1 — Fundația" },
        { type: "p", text: "Optimizezi profilul Google Business, corectezi datele de contact peste tot și începi să ceri primele recenzii." },
        { type: "h3", text: "Luna 2 — Conținutul" },
        { type: "p", text: "Creezi pagini dedicate pentru serviciile principale și optimizezi textele cu cuvintele-cheie locale identificate." },
        { type: "callout", text: "SEO local = profil complet + cuvinte-cheie pe limba clientului + recenzii constante." }
      ]
    },
    {
      slug: "ai-business-sarcini",
      title: "5 sarcini pe care AI le poate prelua azi",
      excerpt: "Automatizări simple care îți eliberează ore în fiecare săptămână.",
      category: "ai",
      date: "2 Mai 2026",
      minutes: "6 min",
      author: "Radu Stan",
      visual: "imagine · AI în business",
      body: [
        { type: "p", text: "AI-ul devine util când îl legi de o sarcină repetitivă, nu când îl tratezi ca pe magie." },
        { type: "h2", text: "Unde merită început" },
        { type: "ul", items: ["Răspunsuri la întrebări repetitive", "Rezumat emailuri și documente", "Calificare lead-uri", "Generare drafturi de ofertă", "Raportare săptămânală"] },
        { type: "callout", text: "Începe cu un proces mic, măsurabil, apoi extinde." }
      ]
    },
    {
      slug: "viteza-site-next-js",
      title: "De ce viteza site-ului îți costă clienți",
      excerpt: "Cum un site lent îți alungă vizitatorii și ce poți face concret.",
      category: "web",
      date: "24 Apr 2026",
      minutes: "5 min",
      author: "Vlad Munteanu",
      visual: "imagine · viteză site",
      body: [
        { type: "p", text: "Viteza nu este un detaliu tehnic. Este primul moment în care un client decide dacă are răbdare cu tine." },
        { type: "h2", text: "Ce reparăm de obicei" },
        { type: "ul", items: ["Imagini prea mari", "Scripturi inutile", "Hosting slab", "Lipsă cache", "Layout instabil pe mobil"] },
        { type: "quote", text: "Un site rapid vinde înainte să apuci să explici de ce e bun." }
      ]
    }
  ],
  en: [
    {
      slug: "local-seo-90-days",
      title: "How to reach page one on local Google in 90 days",
      excerpt: "A practical guide for local businesses that want customers to find them.",
      category: "seo",
      date: "May 14, 2026",
      minutes: "8 min",
      author: "Ioana Pavel",
      visual: "article image · local SEO",
      body: [
        { type: "p", text: "If you run a local business, customers are already searching on Google. The question is whether they find you or your competitor." },
        { type: "h2", text: "What local SEO means" },
        { type: "p", text: "Local SEO helps you appear when people search near me services or services in a specific city." },
        { type: "h2", text: "Google Business is the foundation" },
        { type: "ul", items: ["Consistent name, address, and phone", "Correct and specific category", "Updated opening hours", "Real photos added consistently", "Clear service description"] },
        { type: "quote", text: "A complete profile earns far more clicks than an empty one." },
        { type: "h2", text: "The 90-day plan" },
        { type: "h3", text: "Month 1 — Foundation" },
        { type: "p", text: "Optimize Google Business, correct contact data everywhere, and start collecting reviews." },
        { type: "h3", text: "Month 2 — Content" },
        { type: "p", text: "Create dedicated pages for core services and optimize them around local search language." },
        { type: "callout", text: "Local SEO = complete profile + customer-language keywords + steady reviews." }
      ]
    },
    {
      slug: "ai-business-tasks",
      title: "5 tasks AI can take over today",
      excerpt: "Simple automations that give your team hours back every week.",
      category: "ai",
      date: "May 2, 2026",
      minutes: "6 min",
      author: "Radu Stan",
      visual: "image · AI in business",
      body: [
        { type: "p", text: "AI becomes useful when it is tied to a repeated task, not when it is treated like magic." },
        { type: "h2", text: "Where to start" },
        { type: "ul", items: ["Repeated support questions", "Email and document summaries", "Lead qualification", "Proposal drafts", "Weekly reporting"] },
        { type: "callout", text: "Start with a small measurable process, then expand." }
      ]
    },
    {
      slug: "site-speed-next-js",
      title: "Why website speed costs you customers",
      excerpt: "How a slow site pushes visitors away and what you can fix.",
      category: "web",
      date: "Apr 24, 2026",
      minutes: "5 min",
      author: "Vlad Munteanu",
      visual: "image · site speed",
      body: [
        { type: "p", text: "Speed is not a technical detail. It is the first moment when a customer decides if they have patience for you." },
        { type: "h2", text: "What we usually fix" },
        { type: "ul", items: ["Oversized images", "Unneeded scripts", "Weak hosting", "Missing cache", "Unstable mobile layout"] },
        { type: "quote", text: "A fast website sells before you explain why it is good." }
      ]
    }
  ]
};
