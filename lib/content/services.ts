import type { Locale } from "../i18n";

export const serviceKeys = ["web-development", "magazine-online", "landing-pages", "seo", "seo-local", "aeo-geo", "ai-automatizari", "branding-design", "mentenanta"] as const;
export type ServiceKey = (typeof serviceKeys)[number];
export type ServiceGroup = "build" | "found" | "scale";

export type Service = {
  slug: ServiceKey;
  group: ServiceGroup;
  name: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  accent: string;
  intro: string;
  /** Direct, quotable answer for AI search and featured snippets. */
  answer: [string, string];
  stats: [string, string][];
  pains: [string, string][];
  outcome: string;
  deliverables: [string, string][];
  process: [string, string, string][];
  price: { from: string; unit: string; timeline: string; note: string; anchor: string };
  guarantee: [string, string];
  fit: string[];
  notFit: string[];
  faqs: [string, string][];
  related: ServiceKey[];
};

export const groupNames: Record<Locale, Record<ServiceGroup, [string, string]>> = {
  ro: { build: ["Construim", "Site-uri care transformă vizitele în cereri."], found: ["Te facem găsit", "În Google și în răspunsurile AI."], scale: ["Creștem și îngrijim", "Mai puțină muncă manuală. Un brand de care îți amintești. Un site care nu se strică."] },
  en: { build: ["We build", "Websites that turn visits into enquiries."], found: ["We get you found", "On Google and in AI answers."], scale: ["We scale and look after it", "Less manual work. A brand people remember. A site that does not break."] }
};

const ro: Service[] = [
  {
    slug: "web-development", group: "build", name: "Site-uri de prezentare",
    short: "Site-uri rapide care explică oferta în 5 secunde și cer acțiunea corectă.",
    metaTitle: "Dezvoltare site de prezentare, preț fix, lansare în 3–4 săptămâni | Bloc",
    metaDescription: "Site-uri de prezentare rapide (90+ PageSpeed), scrise să vândă și optimizate pentru Google și AI. Preț fix de la 2.400 €, lansare în 3–4 săptămâni, garanție pe prima etapă.",
    headline: "Un site care vinde înainte să impresioneze.", accent: "vinde",
    intro: "Vizitatorul decide în cinci secunde dacă rămâne. Construim site-uri care spun imediat ce faci, pentru cine și de ce tu, apoi duc omul la un singur pas următor clar. Rapide pe orice telefon, gata pentru Google și pentru asistenții AI.",
    answer: ["Ce primești de la un site de prezentare făcut de Bloc?", "Un site rapid, construit în Next.js, cu texte scrise pentru cereri de ofertă, structură SEO, date structurate pentru Google și AI, formulare care ajung în inboxul tău și măsurare configurată. Prețul începe de la 2.400 €, fix, iar lansarea durează 3–4 săptămâni."],
    stats: [["90+", "Scor PageSpeed pe mobil, garantat la lansare"], ["3–4 săpt.", "De la brief la site live"], ["100%", "Codul și conturile sunt ale tale"]],
    pains: [["Arată bine, dar nu sună nimeni.", "Un site frumos care nu spune clar ce primește clientul este o broșură scumpă."], ["Se încarcă greu pe telefon.", "Peste jumătate din vizitatori pleacă dacă pagina durează mai mult de trei secunde."], ["Nu-l poți modifica fără programator.", "Fiecare schimbare mică devine un tichet, o factură și o săptămână de așteptare."]],
    outcome: "Un site care răspunde la întrebările clientului înainte să le pună și îl duce, fără ocolișuri, la conversația de vânzare.",
    deliverables: [["Mesaj și structură", "Pornim de la întrebările reale ale clienților tăi. Fiecare pagină are un rol și un singur îndemn principal."], ["Texte care vând", "Scriem noi copy-ul, în română și engleză. Tu aprobi, nu scrii de la zero."], ["Design pe măsură", "Fără teme cumpărate. Un sistem vizual al tău, gândit întâi pentru telefon."], ["Dezvoltare Next.js", "Viteză de top, securitate și costuri de găzduire aproape zero."], ["SEO tehnic și schema", "Metadate, sitemap, date structurate, hreflang și pregătire pentru căutarea AI din prima zi."], ["Formulare și măsurare", "Cereri direct în inbox, evenimente de conversie în GA4 și banner de consimțământ conform GDPR."]],
    process: [["Ziua 1", "Discuția de pornire", "60 de minute despre ofertă, clienți și obiecții. Pleci cu un plan scris."], ["Săptămâna 1", "Structură și texte", "Primești harta site-ului și textele pentru paginile principale."], ["Săptămâna 2–3", "Design și dezvoltare", "Vezi site-ul pe un link de test, pe telefonul tău, nu în prezentări."], ["Săptămâna 4", "Lansare și verificare", "Testăm viteza, formularele și indexarea, apoi lansăm. Te învățăm să editezi."]],
    price: { from: "2.400 €", unit: "proiect", timeline: "3–4 săptămâni", note: "Include până la 8 pagini, texte RO + EN, SEO tehnic și 30 de zile de suport după lansare.", anchor: "O agenție full-service cere de obicei 8.000–15.000 € pentru același rezultat." },
    guarantee: ["Garanția primei etape", "După ce vezi structura și primele texte, dacă nu vrei să continuăm, îți returnăm avansul integral. Fără întrebări."],
    fit: ["Firme de servicii care vor mai multe cereri de ofertă", "Clinici, cabinete și studiouri care vor programări", "Afaceri B2B care trebuie să pară la fel de serioase ca prețul lor"],
    notFit: ["Proiecte care au nevoie doar de o pagină de vizită (alege un landing page)", "Cine vrea cel mai ieftin site posibil"],
    faqs: [["Cât costă un site de prezentare?", "Prețul pornește de la 2.400 € pentru până la 8 pagini, cu texte, design, dezvoltare, SEO tehnic și 30 de zile de suport. Primești prețul final, fix, în scris, înainte să începem."], ["Cât durează?", "3–4 săptămâni de la discuția de pornire până la lansare, dacă primim feedbackul în maximum două zile lucrătoare la fiecare etapă."], ["Cine scrie textele?", "Noi. Pornim de la discuția cu tine și de la întrebările clienților tăi. Tu verifici și aprobi."], ["Pot modifica singur site-ul?", "Da. Configurăm un mod simplu de editare pentru textele, imaginile și articolele pe care le schimbi des și îți arătăm cum funcționează."], ["Al cui este site-ul?", "Al tău, integral. Codul, domeniul, găzduirea și conturile de analiză sunt pe numele tău."], ["Ce se întâmplă dacă scorul de viteză e sub 90?", "Optimizăm gratuit până trece de 90 pe mobil în PageSpeed Insights, pentru paginile pe care le-am construit."]],
    related: ["landing-pages", "seo", "mentenanta"]
  },
  {
    slug: "magazine-online", group: "build", name: "Magazine online",
    short: "Magazine online rapide, cu checkout simplu și pagini de produs care conving.",
    metaTitle: "Magazin online la cheie, rapid și optimizat pentru conversie | Bloc",
    metaDescription: "Construim magazine online pe Shopify sau Next.js: checkout simplu, pagini de produs care vând, plăți, facturare și curierat integrate. De la 4.900 €, lansare în 6–8 săptămâni.",
    headline: "Mai puține coșuri abandonate. Mai multe comenzi.", accent: "comenzi",
    intro: "Clientul tău e la un click de a cumpăra și la un click de a pleca. Construim magazine în care produsul se înțelege repede, încrederea apare la momentul potrivit și checkout-ul nu are niciun pas în plus.",
    answer: ["Ce include un magazin online făcut de Bloc?", "Strategie de catalog, design pentru mobil, pagini de produs scrise să convingă, checkout optimizat, plăți cu cardul, facturare automată, integrare cu curierii, SEO pentru produse și categorii și măsurare a vânzărilor. De la 4.900 €, lansare în 6–8 săptămâni, pe Shopify sau Next.js."],
    stats: [["6–8 săpt.", "De la brief la primele comenzi"], ["1 pagină", "Checkout, fără conturi obligatorii"], ["0 €", "Comision Bloc pe vânzările tale"]],
    pains: [["Trafic, dar fără comenzi.", "Pagini de produs fără răspunsuri la întrebările cumpărătorului îl trimit la concurență."], ["Checkout lung și complicat.", "Fiecare câmp în plus și fiecare cont obligatoriu taie din vânzări."], ["Lucru manual după fiecare comandă.", "Facturi, AWB-uri și stocuri introduse de mână consumă ore pe zi."]],
    outcome: "Un magazin care vinde singur, chiar și când tu dormi, și care nu te îngroapă în muncă după fiecare comandă.",
    deliverables: [["Arhitectura catalogului", "Categorii, filtre și variante gândite după cum caută clienții tăi."], ["Pagini de produs care conving", "Beneficii, dimensiuni, livrare, retur și recenzii, exact unde apar întrebările."], ["Checkout fără fricțiune", "O singură pagină, plată rapidă cu cardul, Apple Pay și Google Pay."], ["Integrări", "Plăți, facturare (SmartBill, Oblio), curieri (Sameday, FAN, Cargus), feed-uri și email marketing."], ["SEO pentru e-commerce", "Schema Product, URL-uri curate, conținut de categorie și pagini care apar în Google Shopping."], ["Măsurare vânzări", "GA4 e-commerce și Meta Pixel cu consimțământ: vezi exact ce aduce bani."]],
    process: [["Săptămâna 1", "Strategie și catalog", "Stabilim structura, platforma potrivită și integrările necesare."], ["Săptămâna 2–4", "Design și pagini cheie", "Homepage, categorie, produs și checkout, testate pe telefon."], ["Săptămâna 5–7", "Dezvoltare și integrări", "Import produse, plăți, facturare, curierat și comenzi de test."], ["Săptămâna 8", "Lansare", "Verificăm fiecare flux de la coș la factură, apoi pornim vânzările."]],
    price: { from: "4.900 €", unit: "proiect", timeline: "6–8 săptămâni", note: "Include până la 200 de produse importate, integrări de plată, facturare și curierat și 60 de zile de suport.", anchor: "Agențiile de e-commerce pornesc de obicei de la 12.000 € pentru același set de integrări." },
    guarantee: ["Garanția primei etape", "După strategia de catalog și designul paginilor cheie, dacă nu vrei să continuăm, îți returnăm avansul integral."],
    fit: ["Branduri care vând deja pe Instagram sau marketplace-uri și vor canal propriu", "Magazine existente cu trafic, dar cu rată de conversie mică", "Producători care vând direct către clienți"],
    notFit: ["Cataloage cu zeci de mii de produse și ERP complex (îți recomandăm un partener specializat)", "Dropshipping fără produs sau brand propriu"],
    faqs: [["Shopify sau magazin custom?", "Shopify pentru majoritatea magazinelor: rapid de lansat și ușor de administrat. Next.js când ai nevoie de viteză maximă, conținut bogat sau logică de preț specială. Îți recomandăm varianta potrivită după prima discuție."], ["Cât costă un magazin online?", "De la 4.900 €, preț fix, pentru până la 200 de produse și integrările standard. Abonamentul platformei și comisioanele procesatorului de plăți se plătesc separat, direct furnizorilor."], ["Integrați facturarea și curierii din România?", "Da: SmartBill, Oblio, FGO, Sameday, FAN Courier, Cargus, DPD, plus Netopia, Stripe și euplătesc."], ["Puteți muta magazinul meu existent?", "Da. Migrăm produsele, clienții și comenzile, iar redirecționările păstrează pozițiile din Google."], ["Luați comision din vânzări?", "Nu. Plătești proiectul o singură dată. Vânzările sunt integral ale tale."], ["Ce se întâmplă după lansare?", "Ai 60 de zile de suport inclus. Apoi poți alege mentenanța lunară sau planul de creștere."]],
    related: ["seo", "branding-design", "mentenanta"]
  },
  {
    slug: "landing-pages", group: "build", name: "Landing pages",
    short: "O pagină, o ofertă, un singur scop: conversie. Live în 10 zile lucrătoare.",
    metaTitle: "Landing page care convertește, live în 10 zile, de la 900 € | Bloc",
    metaDescription: "Landing pages pentru campanii Google și Meta, lansări și oferte: copy persuasiv, viteză maximă, testare A/B. De la 900 €, live în 10 zile lucrătoare.",
    headline: "Plătești pentru click-uri. Asigură-te că devin clienți.", accent: "clienți",
    intro: "Trimiți trafic plătit pe homepage? Pierzi bani la fiecare click. Un landing page are un singur mesaj, potrivit cu reclama, și un singur buton. Așa transformi bugetul de reclame în cereri, nu în vizite.",
    answer: ["Ce este un landing page și când ai nevoie de unul?", "Un landing page este o pagină construită pentru o singură ofertă și o singură acțiune, de obicei pentru trafic din reclame. Ai nevoie de unul când promovezi un serviciu, o lansare sau o ofertă limitată. La Bloc costă de la 900 € și e live în 10 zile lucrătoare."],
    stats: [["10 zile", "Lucrătoare, de la brief la pagină live"], ["1", "Mesaj, o ofertă, un buton"], ["A/B", "Testare de titluri inclusă"]],
    pains: [["Reclamele duc spre homepage.", "Vizitatorul trebuie să caute singur oferta și, de cele mai multe ori, nu o caută."], ["Mesajul nu se potrivește cu reclama.", "Când pagina spune altceva decât anunțul, omul pleacă în trei secunde."], ["Nu știi ce funcționează.", "Fără măsurare și teste, optimizezi pe ghicite."]],
    outcome: "O pagină care continuă exact promisiunea din reclamă și transformă un procent mai mare din fiecare euro cheltuit în cereri.",
    deliverables: [["Copy persuasiv", "Titlu, beneficii, obiecții, dovezi și îndemn, scrise pentru publicul campaniei."], ["Design focusat", "Nimic care distrage. Ochiul ajunge acolo unde trebuie."], ["Viteză maximă", "Sub o secundă și jumătate pe 4G. Fiecare secundă în plus scade conversia."], ["Formular sau programare", "Cereri direct în inbox, CRM sau calendar."], ["Măsurare completă", "GA4, Meta Pixel și Google Ads conversion, cu consimțământ."], ["Variantă de test A/B", "Două titluri, ca să afli ce convertește mai bine."]],
    process: [["Ziua 1", "Brief de 30 de minute", "Oferta, publicul, campania și obiecțiile principale."], ["Ziua 3", "Copy", "Primești textul complet pentru aprobare."], ["Ziua 7", "Design și dezvoltare", "Vezi pagina live pe un link de test."], ["Ziua 10", "Lansare", "Conectăm măsurarea și pornim campania."]],
    price: { from: "900 €", unit: "pagină", timeline: "10 zile lucrătoare", note: "Include copy, design, dezvoltare, măsurare și o variantă de test A/B.", anchor: "Un singur client în plus din campanie acoperă de obicei costul paginii." },
    guarantee: ["Garanția de copy", "Dacă textul nu te convinge după două runde de revizie, îți returnăm avansul integral."],
    fit: ["Campanii Google Ads și Meta Ads", "Lansări de produse, webinare și oferte sezoniere", "Servicii care au nevoie de cereri rapid"],
    notFit: ["Afaceri care au nevoie de un site complet cu mai multe servicii"],
    faqs: [["Cât costă un landing page?", "De la 900 €, preț fix, cu copy, design, dezvoltare, măsurare și o variantă de test A/B."], ["În cât timp e gata?", "În 10 zile lucrătoare de la brief, dacă primim aprobarea textului în maximum două zile."], ["Îl pot folosi pe domeniul meu?", "Da, pe domeniul principal sau pe un subdomeniu, de exemplu oferta.firmata.ro."], ["Faceți și campaniile de reclame?", "Construim pagina și măsurarea. Pentru administrarea campaniilor colaborăm cu specialiști în Ads pe care îi recomandăm."], ["Cum aflu dacă pagina funcționează?", "Primești un raport la 30 de zile cu vizite, conversii și rezultatul testului A/B."]],
    related: ["web-development", "branding-design", "ai-automatizari"]
  },
  {
    slug: "seo", group: "found", name: "SEO",
    short: "Mai mulți clienți din Google, pe căutările care chiar aduc bani.",
    metaTitle: "Servicii SEO cu rezultate măsurabile, un singur plan lunar | Bloc",
    metaDescription: "SEO făcut pentru tine: cercetare, conținut, optimizare tehnică și linkuri. 5 îmbunătățiri publicate în fiecare săptămână, raport în fiecare luni. 900 €/lună, garanție în prima lună.",
    headline: "Traficul care nu cumpără e doar o cifră frumoasă.", accent: "cumpără",
    intro: "Nu vindem rapoarte cu grafice care urcă. Găsim căutările pe care le fac oamenii gata să cumpere, apoi construim și reparăm pagini până când tu ești răspunsul. În fiecare săptămână publicăm schimbări reale pe site-ul tău, nu doar recomandări.",
    answer: ["Ce face Bloc pentru SEO în fiecare lună?", "Cercetăm ce caută clienții tăi, scriem până la 8 articole și pagini noi, reparăm peste 40 de probleme pe paginile existente, construim linkuri relevante și verificăm indexarea. Publicăm 5 îmbunătățiri pe săptămână și trimitem un raport în fiecare luni. Prețul este 900 € pe lună."],
    stats: [["5 / săpt.", "Îmbunătățiri publicate pe site-ul tău"], ["Luni", "Raport scurt cu ce s-a mișcat"], ["0", "Contracte pe 12 luni. Pleci oricând."]],
    pains: [["Ești pe pagina 2.", "Acolo nu ajunge aproape nimeni. Primele trei rezultate iau majoritatea click-urilor."], ["Ai plătit SEO și ai primit un PDF.", "Recomandările care nu ajung pe site nu schimbă nimic."], ["Traficul vine, cererile nu.", "Când optimizezi pentru căutări informaționale, atragi cititori, nu cumpărători."]],
    outcome: "Pagini care apar când clientul caută ce vinzi și care îl conving să te aleagă.",
    deliverables: [["Cercetare de cuvinte cheie", "Ce caută cumpărătorii tăi, cât valorează fiecare căutare și cine o câștigă acum."], ["Hartă de conținut", "Fiecare pagină primește căutările ei, ca să nu concureze între ele."], ["Articole și pagini noi", "Până la 8 pe lună, mai bune decât ce e acum pe primul loc."], ["Pagini de comparație", "„X vs Y” și „alternative la X”, pentru momentul în care clientul alege."], ["Optimizare tehnică", "Viteză, indexare, legături interne, date structurate și erori, reparate direct."], ["Linkuri și mențiuni", "Directoare relevante, parteneri și presă de nișă. Fără ferme de linkuri."]],
    process: [["Săptămâna 1", "Audit și acces", "Search Console, Analytics și site. Găsim ce te ține pe loc."], ["Săptămâna 2", "Plan pe 90 de zile", "Ce reparăm, ce scriem și în ce ordine, după impactul comercial."], ["În fiecare săptămână", "5 îmbunătățiri publicate", "Fiecare verificată de un om înainte să ajungă live."], ["În fiecare luni", "Raport", "Poziții, click-uri, cereri și ce urmează. Pe o pagină."]],
    price: { from: "900 €", unit: "lună", timeline: "primele rezultate în 60–90 de zile", note: "Un singur plan. Fără setup fee, fără contract pe termen lung.", anchor: "Un specialist SEO angajat costă peste 3.000 € pe lună, înainte de conținut și linkuri." },
    guarantee: ["Garanția primei luni", "Dacă după prima lună nu ești mulțumit de ce am livrat, cere banii înapoi în 7 zile. Îi returnăm integral."],
    fit: ["Firme de servicii și B2B cu clienți care caută activ soluții", "Magazine online care vor mai puțină dependență de reclame", "Site-uri cu trafic stagnant de peste 6 luni"],
    notFit: ["Afaceri care au nevoie de vânzări săptămâna viitoare (începe cu reclame și un landing page)", "Cine caută garanții de locul 1"],
    faqs: [["În cât timp apar rezultatele SEO?", "Primele mișcări apar de obicei în 4–8 săptămâni pentru pagini reparate și în 60–90 de zile pentru conținut nou. Depinde de vechimea domeniului, de concurență și de punctul de plecare."], ["Garantați locul 1 în Google?", "Nu, și nimeni nu poate garanta onest asta. Garantăm munca: 5 îmbunătățiri publicate pe săptămână și banii înapoi după prima lună dacă nu ești mulțumit."], ["Cât costă SEO?", "900 € pe lună, un singur plan, fără setup fee și fără contract pe termen lung."], ["Scrieți voi conținutul?", "Da. Scriem, edităm și publicăm. Tu verifici doar faptele specifice afacerii tale."], ["SEO-ul include și căutarea AI?", "Planul SEO include fundația tehnică pentru AI. Pentru monitorizarea și optimizarea activă a mențiunilor în ChatGPT, Perplexity și Gemini, alege planul AEO sau planul Creștere, care le combină."], ["Ce acces vă trebuie?", "Google Search Console, Google Analytics și acces de editor la site. Îți trimitem o listă scurtă, cu pași."]],
    related: ["aeo-geo", "seo-local", "web-development"]
  },
  {
    slug: "seo-local", group: "found", name: "SEO local",
    short: "Primul în Google Maps când cineva din orașul tău caută ce oferi.",
    metaTitle: "SEO local și Google Business Profile pentru afaceri locale | Bloc",
    metaDescription: "Apari în primele 3 rezultate din Google Maps: optimizare Google Business Profile, recenzii, pagini locale și citări. 490 €/lună, fără contract pe termen lung.",
    headline: "Când cineva caută „lângă mine”, trebuie să fii tu.", accent: "tu",
    intro: "Clientul local e cel mai valoros: caută acum, e aproape și e gata să sune. Te ducem în primele trei rezultate din Google Maps și ne asigurăm că, ajuns la tine, nu mai are motive să caute în altă parte.",
    answer: ["Ce înseamnă SEO local?", "SEO local înseamnă optimizarea prezenței tale pentru căutările cu intenție geografică, de exemplu „dentist Cluj” sau „service auto lângă mine”. Include Google Business Profile, recenzii, pagini locale pe site, citări consecvente și schema LocalBusiness. La Bloc costă 490 € pe lună."],
    stats: [["Top 3", "Ținta în Google Maps pentru căutările principale"], ["4 / lună", "Postări pe Google Business Profile"], ["30 zile", "Până la primele mișcări vizibile"]],
    pains: [["Concurenții apar în hartă, tu nu.", "Primele trei rezultate din Maps iau marea majoritate a apelurilor."], ["Ai puține recenzii sau vechi.", "Oamenii aleg firma cu mai multe recenzii recente, chiar dacă e mai scumpă."], ["Datele tale diferă de la un site la altul.", "Adrese și telefoane diferite îl încurcă pe Google și scad încrederea."]],
    outcome: "Mai multe apeluri, programări și vizite din zona ta, fără să plătești pentru fiecare click.",
    deliverables: [["Google Business Profile complet", "Categorii, servicii, produse, fotografii, întrebări și răspunsuri."], ["Sistem de recenzii", "Un flux simplu prin care clienții mulțumiți lasă recenzii, plus răspunsuri pentru fiecare."], ["Pagini locale pe site", "Pentru fiecare oraș sau cartier important, cu conținut real, nu copiat."], ["Citări consecvente", "Nume, adresă și telefon identice în directoarele care contează."], ["Schema LocalBusiness", "Program, zonă deservită, servicii și coordonate, marcate pentru Google și AI."], ["Raport lunar de apeluri", "Apeluri, cereri de traseu și click-uri spre site, direct din profil."]],
    process: [["Săptămâna 1", "Audit local", "Profil, recenzii, citări și concurenții din hartă."], ["Săptămâna 2", "Reparații", "Profil complet, date corectate, schema adăugată."], ["Lunar", "Postări și recenzii", "4 postări, răspunsuri la recenzii și pagini locale noi."], ["Lunar", "Raport", "Poziții în hartă, apeluri și ce urmează."]],
    price: { from: "490 €", unit: "lună", timeline: "primele mișcări în 30 de zile", note: "Pentru o locație. Fiecare locație în plus: 190 €/lună.", anchor: "Un singur client nou pe lună acoperă de obicei abonamentul." },
    guarantee: ["Garanția primei luni", "Dacă după prima lună nu ești mulțumit, cere banii înapoi în 7 zile. Îi returnăm integral."],
    fit: ["Clinici, cabinete stomatologice și veterinare", "Service-uri, saloane, restaurante și studiouri", "Firme de construcții și instalații care lucrează într-o zonă"],
    notFit: ["Afaceri exclusiv online, fără zonă deservită"],
    faqs: [["Cât durează să apar în Google Maps?", "Primele mișcări apar în 30–60 de zile. Primele trei poziții pe căutările competitive cer de obicei 3–6 luni de lucru consecvent."], ["Cât costă SEO local?", "490 € pe lună pentru o locație, plus 190 € pentru fiecare locație în plus. Fără contract pe termen lung."], ["Cumpărați recenzii?", "Niciodată. Recenziile false încalcă regulile Google și legea. Construim un sistem prin care clienții reali lasă recenzii ușor."], ["Pot face SEO local fără adresă fizică?", "Da, ca afacere cu zonă deservită, dacă mergi la clienți. Adresa poate rămâne ascunsă în profil."], ["Lucrați și în afara Clujului?", "Da, în toată România și în Marea Britanie. Totul se face online."]],
    related: ["seo", "aeo-geo", "web-development"]
  },
  {
    slug: "aeo-geo", group: "found", name: "Optimizare pentru căutarea AI (AEO / GEO)",
    short: "Fă-l pe ChatGPT, Perplexity și Google AI Overviews să te recomande.",
    metaTitle: "AEO și GEO: apari în ChatGPT, Perplexity și AI Overviews | Bloc",
    metaDescription: "Optimizare pentru motoarele de răspuns AI: monitorizăm ce spune ChatGPT, Perplexity, Gemini și Claude despre domeniul tău și facem să fii recomandat, cu link. 750 €/lună.",
    headline: "Clienții nu mai caută. Întreabă. Asigură-te că AI-ul răspunde cu tine.", accent: "tine",
    intro: "Tot mai mulți oameni întreabă ChatGPT „care e cel mai bun…” în loc să caute pe Google. Răspunsul conține două-trei nume. Dacă nu ești unul dintre ele, nu exiști pentru acel client. Te facem citabil, apoi urmărim fiecare răspuns până când ești recomandat.",
    answer: ["Ce este AEO sau GEO?", "AEO (Answer Engine Optimization) și GEO (Generative Engine Optimization) înseamnă optimizarea site-ului și a prezenței online astfel încât asistenții AI, ca ChatGPT, Perplexity, Gemini, Claude și Google AI Overviews, să te menționeze și să te citeze cu link când oamenii întreabă despre domeniul tău."],
    stats: [["5", "Asistenți AI monitorizați săptămânal"], ["50", "Întrebări urmărite pentru domeniul tău"], ["Lunar", "Raport de vizibilitate AI"]],
    pains: [["AI-ul recomandă concurenții.", "Și o face cu încredere, fără să te pomenească."], ["Informațiile despre tine sunt greșite.", "Prețuri vechi, servicii pe care nu le mai oferi sau confuzii cu alte firme."], ["Site-ul nu poate fi citit de crawlerele AI.", "Conținut randat doar în JavaScript, robots.txt restrictiv sau lipsa datelor structurate."]],
    outcome: "Un nume pe care asistenții AI îl înțeleg, îl verifică și îl recomandă, cu link spre site-ul tău.",
    deliverables: [["Audit de vizibilitate AI", "Întrebăm ChatGPT, Perplexity, Gemini, Claude și Copilot despre domeniul tău și notăm cine apare."], ["Fundație tehnică", "llms.txt, acces pentru crawlerele AI, randare pe server și schema completă."], ["Conținut citabil", "Răspunsuri directe, definiții, tabele și comparații, formatele pe care AI-ul le citează."], ["Entitate consolidată", "Profiluri, directoare și mențiuni consecvente, ca AI-ul să fie sigur cine ești."], ["Corecturi de fapte", "Prețuri, servicii și date corecte peste tot unde ești citat."], ["Monitorizare săptămânală", "50 de întrebări urmărite, cu evoluția mențiunilor și a citărilor."]],
    process: [["Săptămâna 1", "Audit AI", "Ce spun azi asistenții despre tine și concurenți."], ["Săptămâna 2–3", "Fundație", "Reparăm tot ce împiedică citarea: tehnic, schema și conținut."], ["Lunar", "Conținut și mențiuni", "Pagini noi, răspunsuri și surse externe care te confirmă."], ["Lunar", "Raport", "Mențiuni, citări și poziția față de concurenți."]],
    price: { from: "750 €", unit: "lună", timeline: "primele mențiuni în 30–60 de zile", note: "Combinat cu SEO în planul Creștere: 1.400 €/lună.", anchor: "Puține agenții din România oferă azi monitorizare AI. Cele din UK pornesc de la 3.000 £ pe lună." },
    guarantee: ["Garanția primei luni", "Dacă după prima lună nu ești mulțumit, cere banii înapoi în 7 zile. Îi returnăm integral."],
    fit: ["Firme B2B, SaaS și servicii profesionale", "Branduri pe care clienții le compară înainte să cumpere", "Afaceri deja vizibile în Google care vor să nu piardă teren"],
    notFit: ["Site-uri noi fără conținut (începe cu un site și SEO)"],
    faqs: [["Ce diferență este între SEO și AEO?", "SEO te duce în lista de rezultate Google. AEO te face parte din răspunsul pe care îl dă un asistent AI. Folosesc multe semnale comune, dar AEO pune accent pe răspunsuri directe, date structurate, entitate clară și mențiuni externe."], ["Poți garanta că ChatGPT mă va recomanda?", "Nu. Nimeni nu controlează răspunsurile unui model AI. Garantăm munca, monitorizarea săptămânală și banii înapoi după prima lună dacă nu ești mulțumit."], ["Cum măsurați vizibilitatea în AI?", "Punem săptămânal aceleași 50 de întrebări relevante în ChatGPT, Perplexity, Gemini, Claude și Copilot și notăm dacă apari, cum și cu ce link."], ["Ce este llms.txt?", "Un fișier text la rădăcina site-ului care le rezumă modelelor AI cine ești și ce pagini contează. E un semnal nou, ieftin de implementat."], ["Cât costă AEO?", "750 € pe lună separat sau 1.400 € pe lună în planul Creștere, împreună cu SEO."]],
    related: ["seo", "seo-local", "web-development"]
  },
  {
    slug: "ai-automatizari", group: "scale", name: "AI & Automatizări",
    short: "Agenți AI și automatizări care îți dau înapoi ore din fiecare săptămână.",
    metaTitle: "Automatizări AI și agenți pentru IMM-uri, pilot în 3 săptămâni | Bloc",
    metaDescription: "Automatizăm munca repetitivă cu AI: răspunsuri la cereri, oferte, documente, CRM și raportare. Pilot de la 1.900 € în 3 săptămâni, cu economie de timp măsurată.",
    headline: "Nu ai nevoie de AI. Ai nevoie de orele tale înapoi.", accent: "orele",
    intro: "Fără strategii de șase luni și fără prezentări de 200 de slide-uri. Alegem o singură operațiune care se repetă și te costă timp, o automatizăm în trei săptămâni și măsurăm câte ore îți dă înapoi. Abia apoi extindem.",
    answer: ["Ce poate automatiza Bloc cu AI?", "Răspunsuri la cereri și emailuri, calificarea leadurilor, pregătirea ofertelor, extragerea datelor din documente și facturi, actualizarea CRM-ului, rapoarte și asistenți interni care răspund din documentele firmei. Începem cu un pilot de 3 săptămâni, de la 1.900 €, cu timpul economisit măsurat."],
    stats: [["3 săpt.", "Până la primul flux în producție"], ["10+ ore", "Economisite pe săptămână, ținta unui pilot"], ["100%", "Control uman acolo unde contează"]],
    pains: [["Aceleași date copiate de trei ori.", "Din email în tabel, din tabel în CRM, din CRM în factură."], ["Cererile așteaptă răspuns până a doua zi.", "Clientul care așteaptă are timp să întrebe și concurența."], ["Ai încercat ChatGPT și s-a oprit acolo.", "Fără integrare în fluxul real, AI-ul rămâne o jucărie."]],
    outcome: "Un flux care lucrează în fundal, folosit zilnic de echipă și măsurat în ore câștigate.",
    deliverables: [["Audit de procese", "Găsim operațiunile care costă cel mai mult timp și calculăm cât valorează automatizarea."], ["Agent pentru cereri", "Citește cererea, o califică, pregătește răspunsul și îl lasă unui om pentru aprobare."], ["Documente și oferte", "Extragere de date, generare de oferte și contracte din șabloanele tale."], ["Integrare cu ce ai deja", "Gmail, Outlook, Google Sheets, HubSpot, Pipedrive, SmartBill, Notion și sute de alte aplicații."], ["Asistent intern", "Răspunde echipei din procedurile și documentele firmei, cu sursa citată."], ["Măsurare și documentație", "Ore economisite, erori evitate și un ghid scurt pentru echipă."]],
    process: [["Săptămâna 1", "Audit și alegere", "Alegem un singur proces, măsurăm cât durează azi."], ["Săptămâna 2", "Prototip", "Flux funcțional pe date reale, testat cu echipa ta."], ["Săptămâna 3", "Producție", "Integrat, cu verificări și control uman."], ["Luna 2", "Măsurare", "Comparăm orele economisite cu punctul de plecare și decidem împreună dacă extindem."]],
    price: { from: "1.900 €", unit: "pilot", timeline: "3 săptămâni", note: "Rularea și mentenanța fluxurilor: de la 290 €/lună, plus costul API-urilor AI, de obicei sub 50 €/lună.", anchor: "Un angajat care face aceeași muncă manual costă peste 1.500 € pe lună." },
    guarantee: ["Garanția pilotului", "Dacă pilotul nu economisește cel puțin 5 ore pe săptămână, nu plătești a doua tranșă."],
    fit: ["Echipe de 5–100 de oameni cu procese repetitive", "Firme care primesc multe cereri și răspund manual", "Departamente care lucrează mult cu documente"],
    notFit: ["Procese care apar de câteva ori pe an", "Decizii care nu pot fi verificate de un om"],
    faqs: [["Trebuie să schimbăm sistemele pe care le folosim?", "Nu. Ne integrăm cu instrumentele pe care le folosești deja, de la Gmail la CRM și programul de facturare."], ["Poate greși AI-ul?", "Da. De aceea fiecare flux are verificări automate și puncte în care un om aprobă, mai ales înainte ca ceva să ajungă la client."], ["Ce se întâmplă cu datele noastre?", "Folosim furnizori cu servere în UE sau cu acorduri GDPR și opțiunea ca datele să nu fie folosite pentru antrenare. Totul este documentat înainte de implementare."], ["Cât costă o automatizare AI?", "Pilotul pornește de la 1.900 €, preț fix. Rularea ulterioară costă de la 290 € pe lună plus costul API-urilor, de obicei sub 50 €."], ["Ce garanție am?", "Dacă pilotul nu economisește cel puțin 5 ore pe săptămână, nu plătești a doua tranșă."]],
    related: ["landing-pages", "web-development", "mentenanta"]
  },
  {
    slug: "branding-design", group: "scale", name: "Branding & Design",
    short: "Un brand care se ține minte și justifică prețul.",
    metaTitle: "Branding și identitate vizuală pentru afaceri care vor să iasă din mulțime | Bloc",
    metaDescription: "Poziționare, mesaje, nume, logo și identitate vizuală aplicabilă pe site, social media și materiale. De la 1.800 €, gata în 3 săptămâni.",
    headline: "Dacă arăți ca toți ceilalți, ești comparat după preț.", accent: "preț",
    intro: "Un brand bun spune repede cui te adresezi, de ce contează și ce te face diferit. Când clientul înțelege asta în câteva secunde, nu te mai compară după preț. Îi dăm acestei idei o voce și o formă pe care oamenii le recunosc.",
    answer: ["Ce include un proiect de branding la Bloc?", "Poziționare și mesaje cheie, voce de brand, logo, paletă de culori, tipografie, sistem de design pentru digital și aplicații pentru site, social media și materiale de vânzare. De la 1.800 €, gata în 3 săptămâni."],
    stats: [["3 săpt.", "De la interviu la identitate completă"], ["2", "Direcții creative, nu zece variante"], ["1 ghid", "Clar, folosibil de oricine din echipă"]],
    pains: [["Oferta sună generic.", "Când spui ce spun toți, clientul nu are alt reper decât prețul."], ["Fiecare material arată altfel.", "Lipsa consecvenței transmite lipsă de grijă."], ["Logo-ul a fost făcut în grabă.", "Și nu mai reprezintă afacerea pe care ai construit-o."]],
    outcome: "O poziționare clară și o identitate coerentă care fac alegerea ușoară pentru clientul potrivit și te scot din competiția de preț.",
    deliverables: [["Poziționare", "Publicul, promisiunea și diferența ta, într-o singură frază pe care o poți repeta."], ["Mesaje și voce", "Ce spui, cum spui și ce nu spui niciodată."], ["Logo și identitate", "Logo, culori, tipografie, iconografie și reguli de folosire."], ["Sistem de design digital", "Componente gata de folosit pe site și în aplicații."], ["Aplicații", "Șabloane pentru social media, prezentări, oferte și semnături de email."], ["Ghid de brand", "Un document scurt pe care oricine din echipă îl poate aplica."]],
    process: [["Săptămâna 1", "Interviuri și piață", "Vorbim cu tine și cu 2–3 clienți. Analizăm concurența."], ["Săptămâna 2", "Două direcții", "Poziționare, mesaje și două direcții vizuale argumentate."], ["Săptămâna 3", "Rafinare și aplicare", "Dezvoltăm direcția aleasă și o aplicăm pe materialele care vând."], ["Livrare", "Ghid și fișiere", "Toate fișierele sursă, în toate formatele, sunt ale tale."]],
    price: { from: "1.800 €", unit: "proiect", timeline: "3 săptămâni", note: "Include poziționare, identitate completă, 6 șabloane și ghidul de brand.", anchor: "Studiourile de branding pornesc de obicei de la 6.000 € pentru același pachet." },
    guarantee: ["Garanția direcțiilor", "Dacă niciuna dintre cele două direcții nu ți se potrivește după o rundă de revizie, îți returnăm avansul integral."],
    fit: ["Afaceri noi care vor să pornească serios", "Firme care au crescut și au depășit imaginea veche", "Servicii premium care trebuie să-și justifice prețul"],
    notFit: ["Cine vrea doar un logo rapid, fără strategie"],
    faqs: [["Primesc doar un logo?", "Nu. Un logo fără mesaj și reguli de folosire rezolvă prea puțin. Primești poziționare, identitate completă, șabloane și ghid."], ["Puteți lucra cu identitatea existentă?", "Da. Păstrăm ce e recunoscut și reparăm ce împiedică mesajul. Un refresh pornește de la 1.200 €."], ["Câte variante de logo primesc?", "Două direcții complete și argumentate. Zece variante fără idee în spate încurcă alegerea."], ["Ale cui sunt drepturile?", "Ale tale. Primești toate fișierele sursă și drepturile de autor patrimoniale, prin contract."]],
    related: ["web-development", "magazine-online", "landing-pages"]
  },
  {
    slug: "mentenanta", group: "scale", name: "Mentenanță & Suport",
    short: "Site-ul rămâne rapid, sigur și online. Tu nu te mai gândești la el.",
    metaTitle: "Mentenanță site web: actualizări, backup, securitate și suport | Bloc",
    metaDescription: "Mentenanță lunară pentru site-uri și magazine online: actualizări, backup zilnic, monitorizare 24/7, securitate și modificări incluse. De la 149 €/lună, răspuns în 4 ore lucrătoare.",
    headline: "Lansarea nu e finalul. E momentul când începi să înveți.", accent: "înveți",
    intro: "Un site nesupravegheat se strică încet: un plugin vechi, un formular care nu mai trimite, un certificat expirat. Îl monitorizăm non-stop, îl actualizăm și îl îmbunătățim lunar, ca să nu afli de la un client că ceva nu merge.",
    answer: ["Ce include mentenanța de site la Bloc?", "Actualizări de securitate, backup zilnic, monitorizare 24/7 a disponibilității, verificarea formularelor, rapoarte de viteză și modificări de conținut incluse în fiecare lună. Pornește de la 149 € pe lună, cu răspuns în 4 ore lucrătoare."],
    stats: [["24/7", "Monitorizare disponibilitate"], ["4 ore", "Timp de răspuns în zilele lucrătoare"], ["Zilnic", "Backup automat, păstrat 30 de zile"]],
    pains: [["Formularul nu mai trimite de o lună.", "Și nimeni nu a observat. Cererile s-au pierdut."], ["Ai fost spart.", "Pluginurile neactualizate sunt cea mai comună cale de atac."], ["Programatorul nu mai răspunde.", "Și nu ai acces la tot ce îți trebuie."]],
    outcome: "Un site îngrijit, mereu online și o listă clară de îmbunătățiri care îl fac mai bun în fiecare lună.",
    deliverables: [["Actualizări și securitate", "Platformă, pluginuri și dependențe, testate înainte să ajungă live."], ["Backup zilnic", "Păstrat 30 de zile, cu restaurare testată."], ["Monitorizare 24/7", "Aflăm înaintea ta dacă site-ul cade."], ["Verificare formulare", "Testăm lunar că fiecare cerere ajunge la tine."], ["Modificări incluse", "Între 1 și 6 ore pe lună, în funcție de plan."], ["Raport lunar", "Viteză, securitate, disponibilitate și recomandări."]],
    process: [["Ziua 1", "Preluare", "Audit tehnic, acces, backup inițial și monitorizare."], ["Săptămâna 1", "Reparații urgente", "Securitate, actualizări critice și formulare."], ["Lunar", "Îngrijire", "Actualizări, verificări și modificările cerute."], ["Lunar", "Raport", "Ce am făcut și ce recomandăm mai departe."]],
    price: { from: "149 €", unit: "lună", timeline: "activ din prima zi", note: "Esențial 149 €, Profesional 290 € (3 ore incluse), Business 490 € (6 ore incluse, răspuns în 2 ore).", anchor: "O singură zi de site căzut sau de formular stricat costă de obicei mai mult decât un an de mentenanță." },
    guarantee: ["Fără contract pe termen lung", "Abonament lunar, anulabil oricând cu 30 de zile preaviz. Primești toate accesele și backup-urile."],
    fit: ["Site-uri WordPress, Shopify, Webflow și Next.js", "Magazine online unde fiecare oră offline costă", "Firme fără programator intern"],
    notFit: ["Aplicații custom complexe fără documentație (le evaluăm separat)"],
    faqs: [["Preluați și site-uri pe care nu le-ați făcut voi?", "Da, după un audit tehnic inițial gratuit. Îți spunem sincer dacă site-ul merită întreținut sau refăcut."], ["Ce înseamnă ore incluse?", "Timp pentru modificări de conținut, pagini noi mici sau îmbunătățiri. Orele nefolosite se reportează o lună."], ["Cât de repede răspundeți?", "În 4 ore lucrătoare pe planurile Esențial și Profesional și în 2 ore pe planul Business. Problemele critice au prioritate."], ["Cât costă mentenanța unui site?", "De la 149 € pe lună. Planul Profesional, cu 3 ore incluse, costă 290 € pe lună."]],
    related: ["web-development", "magazine-online", "seo"]
  }
];

const en: Service[] = [
  {
    slug: "web-development", group: "build", name: "Websites",
    short: "Fast websites that explain your offer in five seconds and ask for the right action.",
    metaTitle: "Business website development, fixed price, live in 3–4 weeks | Bloc",
    metaDescription: "Fast business websites (90+ PageSpeed), written to sell and built for Google and AI search. Fixed price from €2,400, live in 3–4 weeks, with a first-stage guarantee.",
    headline: "A website that sells before it impresses.", accent: "sells",
    intro: "Visitors decide in five seconds whether to stay. We build websites that say straight away what you do, who it is for and why you, then lead people to one clear next step. Fast on any phone, ready for Google and for AI assistants.",
    answer: ["What do you get with a Bloc website?", "A fast Next.js website with copy written for enquiries, an SEO-ready structure, structured data for Google and AI, forms that land in your inbox and measurement set up. Prices start at €2,400, fixed, and launch takes 3–4 weeks."],
    stats: [["90+", "Mobile PageSpeed score, guaranteed at launch"], ["3–4 wks", "From brief to live site"], ["100%", "The code and accounts are yours"]],
    pains: [["It looks good, but nobody calls.", "A beautiful site that does not say what the customer gets is an expensive brochure."], ["It is slow on phones.", "More than half of visitors leave when a page takes longer than three seconds."], ["You cannot change it without a developer.", "Every small change becomes a ticket, an invoice and a week of waiting."]],
    outcome: "A website that answers buyers' questions before they ask and takes them, without detours, to a sales conversation.",
    deliverables: [["Message and structure", "We start from your customers' real questions. Every page has one job and one main call to action."], ["Copy that sells", "We write it, in English and Romanian. You approve instead of starting from a blank page."], ["Custom design", "No bought themes. A visual system of your own, designed for phones first."], ["Next.js development", "Top speed, solid security and near-zero hosting costs."], ["Technical SEO and schema", "Metadata, sitemap, structured data, hreflang and AI search readiness from day one."], ["Forms and measurement", "Enquiries straight to your inbox, GA4 conversion events and a GDPR-compliant consent banner."]],
    process: [["Day 1", "Kick-off call", "60 minutes on your offer, customers and objections. You leave with a written plan."], ["Week 1", "Structure and copy", "You get the sitemap and copy for the key pages."], ["Weeks 2–3", "Design and build", "You see the site on a test link, on your own phone, not in slides."], ["Week 4", "Launch and checks", "We test speed, forms and indexing, then go live. We show you how to edit."]],
    price: { from: "€2,400", unit: "project", timeline: "3–4 weeks", note: "Includes up to 8 pages, copy in EN + RO, technical SEO and 30 days of post-launch support.", anchor: "A full-service agency typically charges €8,000–15,000 for the same outcome." },
    guarantee: ["First-stage guarantee", "Once you have seen the structure and first copy, if you do not want to continue, we refund your deposit in full. No questions asked."],
    fit: ["Service businesses that want more enquiries", "Clinics, practices and studios that want bookings", "B2B firms that need to look as serious as their prices"],
    notFit: ["Projects that only need a one-page presence (choose a landing page)", "Anyone looking for the cheapest possible site"],
    faqs: [["How much does a business website cost?", "From €2,400 for up to 8 pages, including copy, design, development, technical SEO and 30 days of support. You get the final fixed price in writing before we start."], ["How long does it take?", "3–4 weeks from kick-off to launch, as long as we receive feedback within two business days at each stage."], ["Who writes the copy?", "We do. We work from our conversation and your customers' questions. You review and approve."], ["Can I edit the site myself?", "Yes. We set up simple editing for the text, images and articles you change often and show you how it works."], ["Who owns the website?", "You do, entirely. Code, domain, hosting and analytics accounts are in your name."], ["What if the speed score is below 90?", "We optimise for free until it passes 90 on mobile in PageSpeed Insights, for the pages we built."]],
    related: ["landing-pages", "seo", "mentenanta"]
  },
  {
    slug: "magazine-online", group: "build", name: "E-commerce stores",
    short: "Fast online stores with a simple checkout and product pages that convince.",
    metaTitle: "E-commerce store development built for conversion | Bloc",
    metaDescription: "We build Shopify and Next.js stores: simple checkout, product pages that sell, payments, invoicing and shipping integrated. From €4,900, live in 6–8 weeks.",
    headline: "Fewer abandoned carts. More orders.", accent: "orders",
    intro: "Your customer is one click from buying and one click from leaving. We build stores where the product is understood fast, trust shows up at the right moment and checkout has no extra step.",
    answer: ["What does a Bloc e-commerce store include?", "Catalogue strategy, mobile-first design, product pages written to convince, an optimised checkout, card payments, automatic invoicing, courier integration, product and category SEO, and sales tracking. From €4,900, live in 6–8 weeks, on Shopify or Next.js."],
    stats: [["6–8 wks", "From brief to first orders"], ["1 page", "Checkout, no forced accounts"], ["€0", "Bloc commission on your sales"]],
    pains: [["Traffic, but no orders.", "Product pages that leave buyer questions unanswered send people to competitors."], ["A long, complicated checkout.", "Every extra field and every forced account cuts sales."], ["Manual work after every order.", "Invoices, shipping labels and stock typed in by hand eat hours a day."]],
    outcome: "A store that sells while you sleep and does not bury you in admin after every order.",
    deliverables: [["Catalogue architecture", "Categories, filters and variants designed around how your customers search."], ["Product pages that convince", "Benefits, sizing, delivery, returns and reviews, exactly where questions come up."], ["Frictionless checkout", "One page, fast card payment, Apple Pay and Google Pay."], ["Integrations", "Payments, invoicing, couriers, product feeds and email marketing."], ["E-commerce SEO", "Product schema, clean URLs, category content and Google Shopping-ready pages."], ["Sales tracking", "GA4 e-commerce and Meta Pixel with consent: see exactly what makes money."]],
    process: [["Week 1", "Strategy and catalogue", "We define structure, the right platform and integrations."], ["Weeks 2–4", "Design and key pages", "Home, category, product and checkout, tested on phones."], ["Weeks 5–7", "Build and integrations", "Product import, payments, invoicing, shipping and test orders."], ["Week 8", "Launch", "We check every flow from cart to invoice, then start selling."]],
    price: { from: "€4,900", unit: "project", timeline: "6–8 weeks", note: "Includes up to 200 imported products, payment, invoicing and shipping integrations and 60 days of support.", anchor: "E-commerce agencies typically start at €12,000 for the same integrations." },
    guarantee: ["First-stage guarantee", "After the catalogue strategy and key page designs, if you do not want to continue, we refund your deposit in full."],
    fit: ["Brands already selling on Instagram or marketplaces that want their own channel", "Existing stores with traffic but a low conversion rate", "Makers selling direct to consumers"],
    notFit: ["Catalogues of tens of thousands of products with a complex ERP (we will recommend a specialist partner)", "Dropshipping without your own product or brand"],
    faqs: [["Shopify or custom?", "Shopify for most stores: quick to launch and easy to run. Next.js when you need maximum speed, rich content or custom pricing logic. We recommend the right option after the first call."], ["How much does an online store cost?", "From €4,900, fixed, for up to 200 products and standard integrations. Platform subscriptions and payment processing fees are paid separately, directly to those providers."], ["Can you migrate my existing store?", "Yes. We move products, customers and orders, and redirects protect your Google rankings."], ["Do you take a commission on sales?", "No. You pay for the project once. Your sales are entirely yours."], ["What happens after launch?", "You get 60 days of included support. Then you can choose monthly maintenance or the growth plan."]],
    related: ["seo", "branding-design", "mentenanta"]
  },
  {
    slug: "landing-pages", group: "build", name: "Landing pages",
    short: "One page, one offer, one goal: conversion. Live in 10 business days.",
    metaTitle: "High-converting landing pages, live in 10 days, from €900 | Bloc",
    metaDescription: "Landing pages for Google and Meta campaigns, launches and offers: persuasive copy, top speed, A/B testing. From €900, live in 10 business days.",
    headline: "You pay for clicks. Make sure they become customers.", accent: "customers",
    intro: "Sending paid traffic to your homepage? You lose money on every click. A landing page has one message that matches the ad and one button. That is how ad spend turns into enquiries instead of visits.",
    answer: ["What is a landing page and when do you need one?", "A landing page is built for a single offer and a single action, usually for ad traffic. You need one when you promote a service, a launch or a limited offer. At Bloc it costs from €900 and goes live in 10 business days."],
    stats: [["10 days", "Business days from brief to live page"], ["1", "Message, one offer, one button"], ["A/B", "Headline testing included"]],
    pains: [["Ads point to the homepage.", "Visitors have to hunt for the offer, and most of them will not."], ["The page does not match the ad.", "When the page says something different from the ad, people leave in three seconds."], ["You do not know what works.", "Without tracking and tests, you optimise by guesswork."]],
    outcome: "A page that continues the exact promise of the ad and turns more of every euro you spend into enquiries.",
    deliverables: [["Persuasive copy", "Headline, benefits, objections, proof and call to action, written for the campaign audience."], ["Focused design", "Nothing that distracts. The eye lands where it should."], ["Top speed", "Under one and a half seconds on 4G. Every extra second lowers conversion."], ["Form or booking", "Enquiries straight to your inbox, CRM or calendar."], ["Full tracking", "GA4, Meta Pixel and Google Ads conversions, with consent."], ["A/B test variant", "Two headlines, so you learn what converts better."]],
    process: [["Day 1", "30-minute brief", "Offer, audience, campaign and main objections."], ["Day 3", "Copy", "You get the full copy for approval."], ["Day 7", "Design and build", "You see the page live on a test link."], ["Day 10", "Launch", "We connect tracking and the campaign goes live."]],
    price: { from: "€900", unit: "page", timeline: "10 business days", note: "Includes copy, design, development, tracking and one A/B test variant.", anchor: "A single extra customer from the campaign usually covers the cost of the page." },
    guarantee: ["Copy guarantee", "If the copy does not convince you after two rounds of revisions, we refund your deposit in full."],
    fit: ["Google Ads and Meta Ads campaigns", "Product launches, webinars and seasonal offers", "Services that need enquiries fast"],
    notFit: ["Businesses that need a full multi-service website"],
    faqs: [["How much does a landing page cost?", "From €900, fixed, including copy, design, development, tracking and one A/B variant."], ["How fast is it ready?", "Within 10 business days of the brief, if copy approval comes within two days."], ["Can it run on my domain?", "Yes, on your main domain or a subdomain such as offer.yourcompany.com."], ["Do you run the ad campaigns too?", "We build the page and the tracking. For campaign management we work with Ads specialists we can recommend."], ["How will I know if it works?", "You get a 30-day report with visits, conversions and the A/B test result."]],
    related: ["web-development", "branding-design", "ai-automatizari"]
  },
  {
    slug: "seo", group: "found", name: "SEO",
    short: "More customers from Google, on the searches that actually make money.",
    metaTitle: "SEO services with measurable results, one monthly plan | Bloc",
    metaDescription: "SEO done for you: research, content, technical fixes and links. 5 improvements shipped every week, a report every Monday. €900/month with a first-month money-back guarantee.",
    headline: "Traffic that never buys is just a pretty number.", accent: "buys",
    intro: "We do not sell reports with rising charts. We find the searches people make when they are ready to buy, then build and fix pages until you are the answer. Every week we ship real changes to your site, not just recommendations.",
    answer: ["What does Bloc do for SEO each month?", "We research what your customers search for, write up to 8 new articles and pages, fix 40+ issues on existing pages, earn relevant links and check indexing. We ship 5 improvements a week and send a report every Monday. The price is €900 a month."],
    stats: [["5 / week", "Improvements shipped to your site"], ["Monday", "A short report on what moved"], ["0", "12-month contracts. Leave any time."]],
    pains: [["You are on page two.", "Almost nobody goes there. The top three results take most of the clicks."], ["You paid for SEO and got a PDF.", "Recommendations that never reach your site change nothing."], ["Traffic comes, enquiries do not.", "Optimise for informational searches and you attract readers, not buyers."]],
    outcome: "Pages that show up when customers search for what you sell, and convince them to choose you.",
    deliverables: [["Keyword research", "What your buyers search for, what each search is worth and who wins it today."], ["Content map", "Every page gets its own searches, so pages never compete with each other."], ["New articles and pages", "Up to 8 a month, better than what currently ranks first."], ["Comparison pages", "\"X vs Y\" and \"alternatives to X\", for the moment a buyer chooses."], ["Technical fixes", "Speed, indexing, internal links, structured data and errors, fixed directly."], ["Links and mentions", "Relevant directories, partners and niche press. No link farms."]],
    process: [["Week 1", "Audit and access", "Search Console, Analytics and your site. We find what holds you back."], ["Week 2", "90-day plan", "What we fix, what we write and in what order, ranked by commercial impact."], ["Every week", "5 improvements shipped", "Each one checked by a person before it goes live."], ["Every Monday", "Report", "Rankings, clicks, enquiries and what comes next. On one page."]],
    price: { from: "€900", unit: "month", timeline: "first results in 60–90 days", note: "One plan. No setup fee, no long-term contract.", anchor: "An in-house SEO specialist costs over €3,000 a month, before content and links." },
    guarantee: ["First-month guarantee", "If you are not happy with what we delivered in the first month, ask for your money back within 7 days. We refund it in full."],
    fit: ["Service and B2B firms whose customers actively search for solutions", "Online stores that want to depend less on ads", "Sites whose traffic has stalled for 6+ months"],
    notFit: ["Businesses that need sales next week (start with ads and a landing page)", "Anyone looking for a number-one ranking guarantee"],
    faqs: [["How long does SEO take to work?", "First movement usually appears within 4–8 weeks for fixed pages and 60–90 days for new content. It depends on domain age, competition and your starting point."], ["Do you guarantee first place on Google?", "No, and nobody can honestly promise that. We guarantee the work: 5 improvements shipped a week and your money back after the first month if you are not happy."], ["How much does SEO cost?", "€900 a month, one plan, no setup fee and no long-term contract."], ["Do you write the content?", "Yes. We write, edit and publish. You only check facts specific to your business."], ["Does SEO cover AI search?", "The SEO plan includes the technical foundation for AI. For active tracking and optimisation of mentions in ChatGPT, Perplexity and Gemini, choose the AEO plan or the Growth plan that combines both."], ["What access do you need?", "Google Search Console, Google Analytics and editor access to your site. We send a short checklist."]],
    related: ["aeo-geo", "seo-local", "web-development"]
  },
  {
    slug: "seo-local", group: "found", name: "Local SEO",
    short: "First on Google Maps when someone nearby searches for what you offer.",
    metaTitle: "Local SEO and Google Business Profile management | Bloc",
    metaDescription: "Get into Google's local top 3: Google Business Profile optimisation, reviews, local pages and citations. €490/month, no long-term contract.",
    headline: "When someone searches \"near me\", it should be you.", accent: "you",
    intro: "Local customers are the most valuable: they search now, they are close and they are ready to call. We get you into the top three results on Google Maps and make sure that, once they find you, they have no reason to look elsewhere.",
    answer: ["What is local SEO?", "Local SEO means optimising your presence for searches with geographic intent, such as \"dentist Cluj\" or \"plumber near me\". It covers Google Business Profile, reviews, local pages on your site, consistent citations and LocalBusiness schema. At Bloc it costs €490 a month."],
    stats: [["Top 3", "Our target on Google Maps for your main searches"], ["4 / month", "Google Business Profile posts"], ["30 days", "To the first visible movement"]],
    pains: [["Competitors show on the map, you do not.", "The top three Maps results take the large majority of calls."], ["You have few or old reviews.", "People pick the business with more recent reviews, even when it costs more."], ["Your details differ from site to site.", "Mismatched addresses and phone numbers confuse Google and erode trust."]],
    outcome: "More calls, bookings and visits from your area, without paying for every click.",
    deliverables: [["Complete Google Business Profile", "Categories, services, products, photos, questions and answers."], ["Review system", "A simple flow for happy customers to leave reviews, plus a reply to every one."], ["Local pages on your site", "For each key town or area, with real content, not copies."], ["Consistent citations", "Identical name, address and phone in the directories that matter."], ["LocalBusiness schema", "Hours, service area, services and coordinates, marked up for Google and AI."], ["Monthly calls report", "Calls, direction requests and website clicks from your profile."]],
    process: [["Week 1", "Local audit", "Profile, reviews, citations and competitors on the map."], ["Week 2", "Fixes", "Complete profile, corrected details, schema added."], ["Monthly", "Posts and reviews", "4 posts, review replies and new local pages."], ["Monthly", "Report", "Map rankings, calls and what comes next."]],
    price: { from: "€490", unit: "month", timeline: "first movement in 30 days", note: "For one location. Each extra location: €190/month.", anchor: "One new customer a month usually covers the subscription." },
    guarantee: ["First-month guarantee", "If you are not happy after the first month, ask for your money back within 7 days. We refund it in full."],
    fit: ["Clinics, dental and veterinary practices", "Garages, salons, restaurants and studios", "Trades and contractors serving an area"],
    notFit: ["Online-only businesses with no service area"],
    faqs: [["How long does it take to show up on Google Maps?", "First movement appears within 30–60 days. Top three positions on competitive searches usually take 3–6 months of consistent work."], ["How much does local SEO cost?", "€490 a month for one location, plus €190 for each extra location. No long-term contract."], ["Do you buy reviews?", "Never. Fake reviews break Google's rules and the law. We build a system that makes it easy for real customers to leave reviews."], ["Can I do local SEO without a physical address?", "Yes, as a service-area business if you travel to customers. Your address can stay hidden on the profile."], ["Do you work outside Romania?", "Yes, across Romania and the UK. Everything is done remotely."]],
    related: ["seo", "aeo-geo", "web-development"]
  },
  {
    slug: "aeo-geo", group: "found", name: "AI search optimisation (AEO / GEO)",
    short: "Get ChatGPT, Perplexity and Google AI Overviews to recommend you.",
    metaTitle: "AEO and GEO: get recommended by ChatGPT, Perplexity and AI Overviews | Bloc",
    metaDescription: "Answer engine optimisation: we track what ChatGPT, Perplexity, Gemini and Claude say about your market and work until they recommend you, with a link. €750/month.",
    headline: "Buyers no longer search. They ask. Make sure AI answers with you.", accent: "you",
    intro: "More and more people ask ChatGPT \"what is the best…\" instead of searching Google. The answer names two or three businesses. If you are not one of them, you do not exist for that buyer. We make you citable, then track every answer until you are recommended.",
    answer: ["What is AEO or GEO?", "AEO (answer engine optimisation) and GEO (generative engine optimisation) mean optimising your website and online presence so AI assistants such as ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews mention you and cite you with a link when people ask about your field."],
    stats: [["5", "AI assistants tracked every week"], ["50", "Questions tracked for your market"], ["Monthly", "AI visibility report"]],
    pains: [["AI recommends your competitors.", "Confidently, and without mentioning you."], ["What AI says about you is wrong.", "Old prices, services you no longer offer or mix-ups with other companies."], ["AI crawlers cannot read your site.", "JavaScript-only content, a restrictive robots.txt or missing structured data."]],
    outcome: "A name AI assistants understand, can verify and recommend, with a link to your site.",
    deliverables: [["AI visibility audit", "We ask ChatGPT, Perplexity, Gemini, Claude and Copilot about your field and record who appears."], ["Technical foundation", "llms.txt, AI crawler access, server rendering and complete schema."], ["Citable content", "Direct answers, definitions, tables and comparisons, the formats AI quotes."], ["A consolidated entity", "Consistent profiles, directories and mentions, so AI is sure who you are."], ["Fact corrections", "Correct prices, services and details everywhere you are quoted."], ["Weekly tracking", "50 questions tracked, with how your mentions and citations change."]],
    process: [["Week 1", "AI audit", "What assistants say today about you and your competitors."], ["Weeks 2–3", "Foundation", "We fix everything that blocks citation: technical, schema and content."], ["Monthly", "Content and mentions", "New pages, answers and outside sources that confirm you."], ["Monthly", "Report", "Mentions, citations and where you stand against competitors."]],
    price: { from: "€750", unit: "month", timeline: "first mentions in 30–60 days", note: "Combined with SEO in the Growth plan: €1,400/month.", anchor: "UK agencies offering AI search tracking typically start at £3,000 a month." },
    guarantee: ["First-month guarantee", "If you are not happy after the first month, ask for your money back within 7 days. We refund it in full."],
    fit: ["B2B, SaaS and professional services firms", "Brands buyers compare before purchasing", "Businesses already visible on Google that want to keep their ground"],
    notFit: ["New sites with no content (start with a website and SEO)"],
    faqs: [["What is the difference between SEO and AEO?", "SEO gets you into Google's list of results. AEO makes you part of the answer an AI assistant gives. They share many signals, but AEO focuses on direct answers, structured data, a clear entity and outside mentions."], ["Can you guarantee ChatGPT will recommend me?", "No. Nobody controls what an AI model says. We guarantee the work, weekly tracking and your money back after the first month if you are not happy."], ["How do you measure AI visibility?", "Every week we put the same 50 relevant questions to ChatGPT, Perplexity, Gemini, Claude and Copilot and record whether you appear, how and with which link."], ["What is llms.txt?", "A text file at the root of your site that summarises for AI models who you are and which pages matter. It is a new signal and cheap to implement."], ["How much does AEO cost?", "€750 a month on its own, or €1,400 a month in the Growth plan together with SEO."]],
    related: ["seo", "seo-local", "web-development"]
  },
  {
    slug: "ai-automatizari", group: "scale", name: "AI & Automation",
    short: "AI agents and automations that give you back hours every week.",
    metaTitle: "AI automation and agents for SMEs, pilot in 3 weeks | Bloc",
    metaDescription: "We automate repetitive work with AI: enquiry replies, proposals, documents, CRM updates and reporting. Pilot from €1,900 in 3 weeks, with time saved measured.",
    headline: "You do not need AI. You need your hours back.", accent: "hours",
    intro: "No six-month strategy. No 200-slide decks. We pick one repetitive task that costs you time, automate it in three weeks and measure how many hours it gives back. Only then do we expand.",
    answer: ["What can Bloc automate with AI?", "Replies to enquiries and emails, lead qualification, proposal drafting, data extraction from documents and invoices, CRM updates, reports and internal assistants that answer from company documents. We start with a 3-week pilot from €1,900, with time saved measured."],
    stats: [["3 wks", "To the first workflow in production"], ["10+ hrs", "Saved per week, the target for a pilot"], ["100%", "Human control where it matters"]],
    pains: [["The same data copied three times.", "From email to sheet, from sheet to CRM, from CRM to invoice."], ["Enquiries wait until tomorrow for a reply.", "A customer who waits has time to ask your competitors."], ["You tried ChatGPT and it stopped there.", "Without integration into real work, AI stays a toy."]],
    outcome: "A workflow running in the background, used daily by your team and measured in hours won back.",
    deliverables: [["Process audit", "We find the tasks that cost the most time and calculate what automating them is worth."], ["Enquiry agent", "Reads the enquiry, qualifies it, drafts the reply and leaves it for a person to approve."], ["Documents and proposals", "Data extraction and proposal or contract generation from your templates."], ["Works with what you have", "Gmail, Outlook, Google Sheets, HubSpot, Pipedrive, Notion and hundreds of other apps."], ["Internal assistant", "Answers your team from company procedures and documents, citing the source."], ["Measurement and docs", "Hours saved, errors avoided and a short guide for the team."]],
    process: [["Week 1", "Audit and pick", "We choose one process and measure how long it takes today."], ["Week 2", "Prototype", "A working flow on real data, tested with your team."], ["Week 3", "Production", "Integrated, with checks and human sign-off."], ["Month 2", "Measure", "We compare hours saved against the baseline and decide together whether to expand."]],
    price: { from: "€1,900", unit: "pilot", timeline: "3 weeks", note: "Running and maintaining workflows: from €290/month, plus AI API costs, usually under €50/month.", anchor: "An employee doing the same work by hand costs over €1,500 a month." },
    guarantee: ["Pilot guarantee", "If the pilot does not save at least 5 hours a week, you do not pay the second instalment."],
    fit: ["Teams of 5–100 people with repetitive processes", "Businesses that get many enquiries and answer by hand", "Departments that work heavily with documents"],
    notFit: ["Processes that happen a few times a year", "Decisions a person cannot check"],
    faqs: [["Do we need to replace our systems?", "No. We integrate with the tools you already use, from Gmail to your CRM and invoicing software."], ["Can AI make mistakes?", "Yes. That is why every workflow has automatic checks and points where a person approves, especially before anything reaches a customer."], ["What happens to our data?", "We use providers with EU servers or GDPR agreements and the option to keep your data out of model training. Everything is documented before implementation."], ["How much does an AI automation cost?", "Pilots start at €1,900, fixed. Running costs start at €290 a month plus API costs, usually under €50."], ["What guarantee do I get?", "If the pilot does not save at least 5 hours a week, you do not pay the second instalment."]],
    related: ["landing-pages", "web-development", "mentenanta"]
  },
  {
    slug: "branding-design", group: "scale", name: "Branding & Design",
    short: "A brand people remember, and one that justifies your price.",
    metaTitle: "Branding and visual identity for businesses that want to stand out | Bloc",
    metaDescription: "Positioning, messaging, logo and a visual identity you can actually apply to your website, social media and sales materials. From €1,800, ready in 3 weeks.",
    headline: "If you look like everyone else, price decides.", accent: "price",
    intro: "A good brand quickly says who you serve, why it matters and what makes you different. When buyers get that in seconds, they stop comparing on price. We give that idea a voice and a form people recognise.",
    answer: ["What does a Bloc branding project include?", "Positioning and key messages, brand voice, logo, colour palette, typography, a digital design system and applications for your website, social media and sales materials. From €1,800, ready in 3 weeks."],
    stats: [["3 wks", "From interview to complete identity"], ["2", "Creative directions, not ten variations"], ["1 guide", "Clear enough for anyone on your team"]],
    pains: [["Your offer sounds generic.", "When you say what everyone says, buyers have nothing to compare but price."], ["Every material looks different.", "Inconsistency signals carelessness."], ["The logo was made in a hurry.", "And it no longer represents the business you built."]],
    outcome: "Clear positioning and a coherent identity that make the choice easy for the right customer and take you out of price competition.",
    deliverables: [["Positioning", "Your audience, promise and difference, in one sentence you can repeat."], ["Messaging and voice", "What you say, how you say it and what you never say."], ["Logo and identity", "Logo, colours, typography, iconography and usage rules."], ["Digital design system", "Ready-to-use components for your website and apps."], ["Applications", "Templates for social media, presentations, proposals and email signatures."], ["Brand guide", "A short document anyone on your team can apply."]],
    process: [["Week 1", "Interviews and market", "We talk to you and 2–3 customers and review competitors."], ["Week 2", "Two directions", "Positioning, messaging and two reasoned visual directions."], ["Week 3", "Refine and apply", "We develop your chosen direction and apply it where sales happen."], ["Delivery", "Guide and files", "All source files, in every format, are yours."]],
    price: { from: "€1,800", unit: "project", timeline: "3 weeks", note: "Includes positioning, a complete identity, 6 templates and the brand guide.", anchor: "Branding studios typically start at €6,000 for the same package." },
    guarantee: ["Directions guarantee", "If neither of the two directions works for you after one round of revisions, we refund your deposit in full."],
    fit: ["New businesses that want to start properly", "Companies that have outgrown their old image", "Premium services that need to justify their price"],
    notFit: ["Anyone who only wants a quick logo with no strategy"],
    faqs: [["Do I just get a logo?", "No. A logo without a message or usage rules does too little. You get positioning, a complete identity, templates and a guide."], ["Can you work with our existing identity?", "Yes. We keep what is recognisable and fix what gets in the way. A refresh starts at €1,200."], ["How many logo options do I get?", "Two complete, reasoned directions. Ten variations without an idea behind them only make choosing harder."], ["Who owns the rights?", "You do. You get every source file and the economic copyright, by contract."]],
    related: ["web-development", "magazine-online", "landing-pages"]
  },
  {
    slug: "mentenanta", group: "scale", name: "Maintenance & Support",
    short: "Your site stays fast, secure and online. You stop thinking about it.",
    metaTitle: "Website maintenance: updates, backups, security and support | Bloc",
    metaDescription: "Monthly care for websites and online stores: updates, daily backups, 24/7 monitoring, security and included changes. From €149/month, 4 business-hour response.",
    headline: "Launch is not the end. It is when you start learning.", accent: "learning",
    intro: "An unattended site breaks slowly: an outdated plugin, a form that stops sending, an expired certificate. We monitor it around the clock, update it and improve it monthly, so you never hear from a customer that something is broken.",
    answer: ["What does Bloc website maintenance include?", "Security updates, daily backups, 24/7 uptime monitoring, form checks, speed reports and content changes included every month. From €149 a month, with a response within 4 business hours."],
    stats: [["24/7", "Uptime monitoring"], ["4 hours", "Response time on business days"], ["Daily", "Automatic backups, kept for 30 days"]],
    pains: [["Your form stopped sending a month ago.", "Nobody noticed. The enquiries are gone."], ["You got hacked.", "Outdated plugins are the most common way in."], ["Your developer stopped replying.", "And you do not have access to everything you need."]],
    outcome: "A well-kept site that is always online, plus a clear list of improvements that make it better every month.",
    deliverables: [["Updates and security", "Platform, plugins and dependencies, tested before going live."], ["Daily backups", "Kept for 30 days, with tested restores."], ["24/7 monitoring", "We know before you do if the site goes down."], ["Form checks", "We test monthly that every enquiry reaches you."], ["Included changes", "Between 1 and 6 hours a month, depending on the plan."], ["Monthly report", "Speed, security, uptime and recommendations."]],
    process: [["Day 1", "Handover", "Technical audit, access, first backup and monitoring."], ["Week 1", "Urgent fixes", "Security, critical updates and forms."], ["Monthly", "Care", "Updates, checks and the changes you ask for."], ["Monthly", "Report", "What we did and what we recommend next."]],
    price: { from: "€149", unit: "month", timeline: "active from day one", note: "Essential €149, Professional €290 (3 hours included), Business €490 (6 hours included, 2-hour response).", anchor: "A single day of downtime or a broken form usually costs more than a year of maintenance." },
    guarantee: ["No long-term contract", "Monthly subscription, cancel any time with 30 days' notice. You keep every login and backup."],
    fit: ["WordPress, Shopify, Webflow and Next.js sites", "Online stores where every hour offline costs money", "Companies without an in-house developer"],
    notFit: ["Complex custom applications with no documentation (we assess these separately)"],
    faqs: [["Do you take over sites you did not build?", "Yes, after a free initial technical audit. We tell you honestly whether the site is worth maintaining or rebuilding."], ["What are included hours?", "Time for content changes, small new pages or improvements. Unused hours roll over for one month."], ["How fast do you respond?", "Within 4 business hours on Essential and Professional and within 2 hours on Business. Critical issues come first."], ["How much does website maintenance cost?", "From €149 a month. The Professional plan with 3 hours included costs €290 a month."]],
    related: ["web-development", "magazine-online", "seo"]
  }
];

export const services: Record<Locale, Service[]> = { ro, en };
export const getService = (locale: Locale, slug: string) => services[locale].find(s => s.slug === slug);
