import type { Category, Impact, Localized, Status } from "./types";
import type { Locale } from "../i18n";

type Entry = { t: string; why: string; fix: string };
const c = (ro: Entry, en: Entry) => ({ ro, en });

export const tr = (v: Localized | undefined, locale: Locale) => (v === undefined ? "" : typeof v === "string" ? v : v[locale]);

export const categoryCopy: Record<Category, Record<Locale, { name: string; blurb: string }>> = {
  performance: { ro: { name: "Viteză", blurb: "Cât de repede vede vizitatorul ceva util." }, en: { name: "Speed", blurb: "How fast a visitor sees something useful." } },
  seo: { ro: { name: "SEO", blurb: "Cât de ușor te găsește și te înțelege Google." }, en: { name: "SEO", blurb: "How easily Google finds and understands you." } },
  aeo: { ro: { name: "Căutare AI", blurb: "Dacă ChatGPT, Perplexity și AI Overviews te pot cita." }, en: { name: "AI search", blurb: "Whether ChatGPT, Perplexity and AI Overviews can cite you." } },
  security: { ro: { name: "Securitate", blurb: "Semnalele care protejează vizitatorii și reputația." }, en: { name: "Security", blurb: "Signals that protect visitors and your reputation." } },
  accessibility: { ro: { name: "Accesibilitate", blurb: "Dacă oricine poate folosi site-ul, pe orice dispozitiv." }, en: { name: "Accessibility", blurb: "Whether anyone can use the site, on any device." } },
  compliance: { ro: { name: "Conformitate legală", blurb: "GDPR, ANPC, termeni și datele firmei. Riscul de amendă." }, en: { name: "Legal compliance", blurb: "GDPR, consumer law, terms and company details. Your fine risk." } },
  trust: { ro: { name: "Încredere & conversie", blurb: "Ce vede omul înainte să te contacteze." }, en: { name: "Trust & conversion", blurb: "What people see before they contact you." } }
};

export const statusCopy: Record<Status, Record<Locale, string>> = {
  pass: { ro: "Bine", en: "Good" },
  warn: { ro: "Atenție", en: "Improve" },
  fail: { ro: "Critic", en: "Critical" }
};

export const impactCopy: Record<Impact, Record<Locale, string>> = {
  high: { ro: "Impact mare", en: "High impact" },
  medium: { ro: "Impact mediu", en: "Medium impact" },
  low: { ro: "Impact mic", en: "Low impact" }
};

export function gradeFor(score: number) {
  return score >= 90 ? "A" : score >= 80 ? "B" : score >= 65 ? "C" : score >= 50 ? "D" : "E";
}

export function verdict(score: number, locale: Locale) {
  const ro = locale === "ro";
  if (score >= 85) return ro ? "Fundație solidă. Câștigurile rămase sunt fine, dar valorează bani." : "A solid foundation. The remaining gains are small, but they are worth money.";
  if (score >= 70) return ro ? "Funcționează, dar lasă clienți pe masă. Câteva reparații țintite schimbă vizibil rezultatul." : "It works, but it leaves customers on the table. A few targeted fixes will change the result visibly.";
  if (score >= 50) return ro ? "Site-ul te frânează. Vizitatorii, Google și AI-ul văd probleme pe care le poți repara în câteva săptămâni." : "Your site is holding you back. Visitors, Google and AI see problems you can fix within weeks.";
  return ro ? "Pierzi cereri în fiecare zi. Vestea bună: aproape tot ce am găsit se repară, iar ordinea e clară." : "You are losing enquiries every day. The good news: almost everything we found is fixable, in a clear order.";
}

export const checkCopy: Record<string, Record<Locale, Entry>> = {
  // Performance
  ttfb: c(
    { t: "Timpul până la primul byte", why: "Fiecare secundă de așteptare la server se adaugă înainte ca pagina să înceapă să apară.", fix: "Activează cache pe server sau un CDN și verifică hostingul. Ținta: sub 600 ms." },
    { t: "Time to first byte", why: "Every moment spent waiting on the server comes before the page even starts to appear.", fix: "Enable server caching or a CDN and review your hosting. Target: under 600 ms." }),
  load4g: c(
    { t: "Timp estimat de încărcare pe mobil (4G)", why: "Google a măsurat: 53% dintre vizitatorii de pe mobil pleacă dacă pagina durează peste 3 secunde.", fix: "Redu greutatea paginii, comprimă imaginile și amână scripturile care nu sunt necesare imediat." },
    { t: "Estimated mobile load time (4G)", why: "Google found that 53% of mobile visitors leave when a page takes longer than 3 seconds.", fix: "Cut page weight, compress images and defer scripts that are not needed straight away." }),
  weight: c(
    { t: "Greutatea totală a paginii", why: "Fiecare megabyte în plus înseamnă secunde în plus pe o conexiune mobilă și date consumate de client.", fix: "Comprimă imaginile, elimină scripturile nefolosite și încarcă fonturile doar în greutățile folosite. Ținta: sub 1,5 MB." },
    { t: "Total page weight", why: "Every extra megabyte means extra seconds on mobile and data your visitor pays for.", fix: "Compress images, remove unused scripts and load only the font weights you use. Target: under 1.5 MB." }),
  requests: c(
    { t: "Numărul de resurse încărcate", why: "Multe fișiere separate încetinesc randarea, mai ales pe telefoane mai vechi.", fix: "Combină și elimină scripturile și stilurile care nu aduc valoare. Ținta: sub 50 de resurse." },
    { t: "Number of resources", why: "Many separate files slow rendering down, especially on older phones.", fix: "Merge or remove scripts and styles that add no value. Target: under 50 resources." }),
  compression: c(
    { t: "Compresie text (Brotli / Gzip)", why: "Fără compresie, HTML-ul, CSS-ul și JavaScript-ul circulă de 3–5 ori mai greu decât e nevoie.", fix: "Activează Brotli sau Gzip pe server sau CDN. Durează câteva minute." },
    { t: "Text compression (Brotli / Gzip)", why: "Without compression, HTML, CSS and JavaScript travel 3 to 5 times heavier than needed.", fix: "Enable Brotli or Gzip on your server or CDN. It takes minutes." }),
  renderBlocking: c(
    { t: "Resurse care blochează afișarea", why: "Scripturile fără async/defer din <head> opresc browserul până se descarcă. Vizitatorul vede un ecran gol.", fix: "Adaugă defer la scripturi, încarcă CSS-ul critic inline și amână restul." },
    { t: "Render-blocking resources", why: "Scripts in <head> without async/defer stop the browser until they download. The visitor stares at a blank screen.", fix: "Add defer to scripts, inline critical CSS and postpone the rest." }),
  htmlSize: c(
    { t: "Dimensiunea HTML", why: "Un document HTML umflat (de obicei de la page builder) încetinește prima afișare.", fix: "Elimină markup-ul generat inutil și datele inline mari." },
    { t: "HTML size", why: "A bloated HTML document, usually from a page builder, slows the first paint.", fix: "Strip unnecessary generated markup and large inline data." }),
  imageFormats: c(
    { t: "Imagini în formate moderne", why: "WebP și AVIF sunt cu 25–50% mai ușoare decât JPEG și PNG, la aceeași calitate.", fix: "Servește imaginile în WebP/AVIF, automat prin CDN sau la încărcare." },
    { t: "Modern image formats", why: "WebP and AVIF are 25 to 50% lighter than JPEG and PNG at the same quality.", fix: "Serve images as WebP/AVIF, automatically through a CDN or at upload." }),
  lazyLoading: c(
    { t: "Încărcare amânată a imaginilor", why: "Imaginile de mai jos în pagină nu trebuie descărcate înainte ca omul să ajungă la ele.", fix: "Adaugă loading=\"lazy\" imaginilor de sub primul ecran." },
    { t: "Lazy-loaded images", why: "Images further down the page should not download before anyone scrolls to them.", fix: "Add loading=\"lazy\" to images below the first screen." }),
  imageDimensions: c(
    { t: "Dimensiuni declarate pentru imagini", why: "Fără width și height, conținutul sare în timpul încărcării (CLS), iar oamenii apasă pe lucrul greșit.", fix: "Declară width și height pe fiecare imagine." },
    { t: "Declared image dimensions", why: "Without width and height, content jumps while loading (CLS) and people tap the wrong thing.", fix: "Set width and height on every image." }),
  caching: c(
    { t: "Cache pentru fișiere statice", why: "Fără cache, vizitatorii care revin descarcă totul de la zero.", fix: "Setează Cache-Control cu max-age de cel puțin 30 de zile pentru JS, CSS, fonturi și imagini." },
    { t: "Static file caching", why: "Without caching, returning visitors download everything from scratch.", fix: "Set Cache-Control with max-age of at least 30 days for JS, CSS, fonts and images." }),
  thirdParty: c(
    { t: "Domenii terțe", why: "Fiecare serviciu extern adaugă o conexiune nouă, timp de încărcare și un risc pe care nu îl controlezi.", fix: "Păstrează doar scripturile externe care aduc bani sau date pe care le folosești." },
    { t: "Third-party domains", why: "Each external service adds a new connection, load time and a risk you do not control.", fix: "Keep only the external scripts that make money or produce data you actually use." }),
  redirects: c(
    { t: "Redirecționări până la pagină", why: "Fiecare redirecționare adaugă o călătorie completă până la server.", fix: "Trimite direct la adresa finală (https, cu sau fără www, o singură dată)." },
    { t: "Redirects before the page", why: "Each redirect adds a full round trip to the server.", fix: "Point straight to the final address (https, with or without www, once)." }),

  // SEO
  title: c(
    { t: "Titlul paginii", why: "Titlul e primul lucru citit în Google și în răspunsurile AI. Decide dacă primești click-ul.", fix: "Scrie un titlu de 30–60 de caractere: serviciul, beneficiul, numele firmei." },
    { t: "Page title", why: "The title is the first thing read in Google and AI answers. It decides whether you get the click.", fix: "Write a 30 to 60 character title: service, benefit, brand." }),
  metaDescription: c(
    { t: "Meta descrierea", why: "Descrierea e reclama ta gratuită în rezultatele căutării. Fără ea, Google alege un fragment la întâmplare.", fix: "Scrie 120–160 de caractere care spun ce primește clientul și ce trebuie să facă mai departe." },
    { t: "Meta description", why: "The description is your free ad in search results. Without one, Google picks a random snippet.", fix: "Write 120 to 160 characters stating what the customer gets and what to do next." }),
  h1: c(
    { t: "Un singur titlu principal (H1)", why: "H1 spune oamenilor și motoarelor de căutare despre ce e pagina. Zero sau mai multe H1 creează confuzie.", fix: "Folosește exact un H1 care numește clar oferta." },
    { t: "One main heading (H1)", why: "The H1 tells people and search engines what the page is about. None, or several, creates confusion.", fix: "Use exactly one H1 that names the offer clearly." }),
  headingOrder: c(
    { t: "Structura titlurilor", why: "O ierarhie H2/H3 logică ajută Google și AI-ul să extragă secțiunile ca răspunsuri.", fix: "Organizează conținutul în H2 pentru secțiuni și H3 pentru detalii, fără niveluri sărite." },
    { t: "Heading structure", why: "A logical H2/H3 hierarchy helps Google and AI lift sections out as answers.", fix: "Organise content with H2s for sections and H3s for detail, without skipping levels." }),
  canonical: c(
    { t: "URL canonic", why: "Fără canonic, versiunile duplicate ale paginii își împart autoritatea.", fix: "Adaugă <link rel=\"canonical\"> spre adresa preferată a fiecărei pagini." },
    { t: "Canonical URL", why: "Without a canonical, duplicate versions of a page split its authority.", fix: "Add <link rel=\"canonical\"> pointing to each page's preferred address." }),
  indexable: c(
    { t: "Pagina poate fi indexată", why: "O pagină cu noindex sau cu eroare nu apare în Google, oricât de bună ar fi.", fix: "Elimină noindex din meta robots sau din headerul X-Robots-Tag și repară eroarea HTTP." },
    { t: "Page can be indexed", why: "A page with noindex or an error never shows up in Google, however good it is.", fix: "Remove noindex from meta robots or the X-Robots-Tag header and fix the HTTP error." }),
  robotsTxt: c(
    { t: "Fișier robots.txt", why: "robots.txt le spune crawlerelor ce pot citi și unde e sitemap-ul.", fix: "Publică un robots.txt simplu care permite accesul și indică sitemap-ul." },
    { t: "robots.txt file", why: "robots.txt tells crawlers what they may read and where your sitemap lives.", fix: "Publish a simple robots.txt that allows access and points to the sitemap." }),
  sitemap: c(
    { t: "Sitemap XML", why: "Sitemap-ul este lista oficială a paginilor tale. Fără el, paginile noi pot aștepta săptămâni să fie descoperite.", fix: "Generează automat sitemap.xml și trimite-l în Google Search Console." },
    { t: "XML sitemap", why: "The sitemap is the official list of your pages. Without one, new pages can wait weeks to be found.", fix: "Generate sitemap.xml automatically and submit it in Google Search Console." }),
  openGraph: c(
    { t: "Previzualizare la distribuire (Open Graph)", why: "Când cineva îți trimite linkul pe WhatsApp, LinkedIn sau Facebook, imaginea și titlul decid dacă e deschis.", fix: "Adaugă og:title, og:description și og:image (1200×630) pe fiecare pagină." },
    { t: "Share previews (Open Graph)", why: "When someone shares your link on WhatsApp, LinkedIn or Facebook, the image and title decide whether it gets opened.", fix: "Add og:title, og:description and og:image (1200×630) to every page." }),
  langAttr: c(
    { t: "Limba declarată", why: "Atributul lang ajută Google să arate pagina publicului potrivit.", fix: "Setează <html lang=\"ro\"> sau limba corespunzătoare." },
    { t: "Declared language", why: "The lang attribute helps Google show the page to the right audience.", fix: "Set <html lang=\"en\"> or the matching language." }),
  mobileViewport: c(
    { t: "Configurare pentru mobil", why: "Google indexează versiunea de mobil. Fără viewport, pagina arată micșorată pe telefon.", fix: "Adaugă <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">." },
    { t: "Mobile configuration", why: "Google indexes the mobile version. Without a viewport, the page looks shrunk on phones.", fix: "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">." }),
  contentDepth: c(
    { t: "Cantitatea de conținut", why: "Paginile subțiri rareori câștigă poziții sau citări AI. Oamenii au nevoie de răspunsuri înainte să cumpere.", fix: "Răspunde explicit la întrebările clienților: preț, proces, termene, garanții. Ținta: peste 400 de cuvinte utile." },
    { t: "Content depth", why: "Thin pages rarely earn rankings or AI citations. People need answers before they buy.", fix: "Answer buyer questions explicitly: price, process, timing, guarantees. Target: 400+ useful words." }),
  internalLinks: c(
    { t: "Legături interne", why: "Linkurile interne distribuie autoritatea și arată drumul către paginile care vând.", fix: "Leagă fiecare pagină de serviciile, studiile de caz și articolele relevante." },
    { t: "Internal links", why: "Internal links spread authority and show the way to the pages that sell.", fix: "Link each page to relevant services, case studies and articles." }),
  favicon: c(
    { t: "Favicon", why: "Iconița apare lângă rezultatul tău în Google pe mobil. Lipsa ei te face să pari neîngrijit.", fix: "Adaugă un favicon SVG sau PNG de 48×48 sau mai mare." },
    { t: "Favicon", why: "The icon appears next to your result in mobile Google. Missing it looks careless.", fix: "Add an SVG or PNG favicon, 48×48 or larger." }),
  hreflang: c(
    { t: "Versiuni de limbă (hreflang)", why: "Fără hreflang, Google poate arăta versiunea în limba greșită.", fix: "Declară alternativele de limbă cu <link rel=\"alternate\" hreflang>." },
    { t: "Language versions (hreflang)", why: "Without hreflang, Google may show the wrong language version.", fix: "Declare language alternates with <link rel=\"alternate\" hreflang>." }),

  // AEO
  structuredData: c(
    { t: "Date structurate (Schema.org)", why: "Schema le spune explicit lui Google și asistenților AI cine ești, ce vinzi și la ce întrebări răspunzi.", fix: "Adaugă JSON-LD pentru Organization, WebSite, Service, FAQPage și BreadcrumbList." },
    { t: "Structured data (Schema.org)", why: "Schema tells Google and AI assistants explicitly who you are, what you sell and which questions you answer.", fix: "Add JSON-LD for Organization, WebSite, Service, FAQPage and BreadcrumbList." }),
  entitySchema: c(
    { t: "Identitatea firmei (Organization / LocalBusiness)", why: "AI-ul recomandă entități pe care le înțelege. Fără o definiție clară a firmei, ești doar text oarecare.", fix: "Adaugă schema Organization sau LocalBusiness cu nume, logo, adresă, contact și profiluri sociale." },
    { t: "Business identity (Organization / LocalBusiness)", why: "AI recommends entities it understands. Without a clear business definition, you are just more text.", fix: "Add Organization or LocalBusiness schema with name, logo, address, contact and social profiles." }),
  sameAs: c(
    { t: "Profiluri conectate (sameAs)", why: "sameAs leagă site-ul de LinkedIn, Google Business și alte profiluri. Asta confirmă că ești real.", fix: "Listează profilurile oficiale în proprietatea sameAs a schemei Organization." },
    { t: "Connected profiles (sameAs)", why: "sameAs links your site to LinkedIn, Google Business and other profiles, confirming you are real.", fix: "List official profiles in the sameAs property of your Organization schema." }),
  faqContent: c(
    { t: "Întrebări și răspunsuri", why: "ChatGPT, Perplexity și AI Overviews citează pagini care răspund direct la întrebări.", fix: "Adaugă o secțiune FAQ cu întrebările reale ale clienților și marchează-o cu schema FAQPage." },
    { t: "Questions and answers", why: "ChatGPT, Perplexity and AI Overviews cite pages that answer questions directly.", fix: "Add an FAQ section with real customer questions and mark it up with FAQPage schema." }),
  llmsTxt: c(
    { t: "Fișier llms.txt", why: "llms.txt e un rezumat curat al site-ului pentru modelele AI. Le arată ce pagini contează.", fix: "Publică /llms.txt cu o descriere a firmei și linkuri spre paginile cheie." },
    { t: "llms.txt file", why: "llms.txt is a clean summary of your site for AI models. It shows them which pages matter.", fix: "Publish /llms.txt with a company summary and links to key pages." }),
  aiCrawlers: c(
    { t: "Acces pentru crawlerele AI", why: "Dacă robots.txt blochează GPTBot, ClaudeBot sau PerplexityBot, acele asistente nu te pot recomanda.", fix: "Permite crawlerele AI de căutare în robots.txt, dacă nu ai un motiv clar să le blochezi." },
    { t: "AI crawler access", why: "If robots.txt blocks GPTBot, ClaudeBot or PerplexityBot, those assistants cannot recommend you.", fix: "Allow AI search crawlers in robots.txt unless you have a clear reason to block them." }),
  serverRendered: c(
    { t: "Conținut vizibil fără JavaScript", why: "Multe crawlere AI nu rulează JavaScript. Dacă textul apare doar după randare, pentru ele pagina e goală.", fix: "Folosește randare pe server sau generare statică pentru conținutul principal." },
    { t: "Content visible without JavaScript", why: "Many AI crawlers do not run JavaScript. If text only appears after rendering, the page is empty to them.", fix: "Use server rendering or static generation for the main content." }),
  scannableAnswers: c(
    { t: "Răspunsuri ușor de extras", why: "Listele și tabelele sunt formatele pe care AI-ul le citează cel mai des.", fix: "Pune pașii, prețurile și comparațiile în liste și tabele clare." },
    { t: "Easy-to-extract answers", why: "Lists and tables are the formats AI quotes most often.", fix: "Put steps, prices and comparisons in clear lists and tables." }),
  freshness: c(
    { t: "Semnale de actualitate", why: "Asistenții AI preferă sursele cu date de publicare și actualizare vizibile.", fix: "Afișează și marchează datePublished și dateModified pe articole și pagini importante." },
    { t: "Freshness signals", why: "AI assistants prefer sources that show publish and update dates.", fix: "Show and mark up datePublished and dateModified on articles and key pages." }),

  // Security
  https: c(
    { t: "Conexiune securizată (HTTPS)", why: "Browserele marchează site-urile HTTP ca „Nesigur”. Nimeni nu completează un formular după avertismentul ăsta.", fix: "Instalează un certificat SSL (gratuit cu Let's Encrypt) și forțează HTTPS." },
    { t: "Secure connection (HTTPS)", why: "Browsers label HTTP sites \"Not secure\". Nobody fills in a form after that warning.", fix: "Install an SSL certificate (free with Let's Encrypt) and force HTTPS." }),
  httpsRedirect: c(
    { t: "Redirecționare HTTP → HTTPS", why: "Dacă versiunea http rămâne accesibilă, ai pagini duplicate și vizitatori pe conexiune nesigură.", fix: "Redirecționează permanent (301) tot traficul http spre https." },
    { t: "HTTP → HTTPS redirect", why: "If the http version stays reachable, you have duplicate pages and visitors on an insecure connection.", fix: "Permanently (301) redirect all http traffic to https." }),
  hsts: c(
    { t: "HSTS", why: "HSTS obligă browserul să folosească mereu HTTPS și blochează atacurile de tip downgrade.", fix: "Adaugă headerul Strict-Transport-Security: max-age=31536000; includeSubDomains." },
    { t: "HSTS", why: "HSTS forces the browser to always use HTTPS and blocks downgrade attacks.", fix: "Add Strict-Transport-Security: max-age=31536000; includeSubDomains." }),
  csp: c(
    { t: "Content Security Policy", why: "CSP limitează ce scripturi pot rula și reduce dramatic riscul de injectare de cod.", fix: "Definește o politică CSP pornind de la sursele pe care le folosești efectiv." },
    { t: "Content Security Policy", why: "CSP limits which scripts can run and sharply reduces the risk of injected code.", fix: "Define a CSP based on the sources you actually use." }),
  nosniff: c(
    { t: "X-Content-Type-Options", why: "Împiedică browserul să interpreteze greșit fișierele ca scripturi.", fix: "Adaugă X-Content-Type-Options: nosniff." },
    { t: "X-Content-Type-Options", why: "Stops browsers from misreading files as scripts.", fix: "Add X-Content-Type-Options: nosniff." }),
  clickjacking: c(
    { t: "Protecție la clickjacking", why: "Fără ea, site-ul tău poate fi încadrat invizibil în altă pagină care fură clickuri.", fix: "Adaugă X-Frame-Options: SAMEORIGIN sau CSP frame-ancestors." },
    { t: "Clickjacking protection", why: "Without it, your site can be invisibly framed inside another page that steals clicks.", fix: "Add X-Frame-Options: SAMEORIGIN or CSP frame-ancestors." }),
  referrerPolicy: c(
    { t: "Referrer-Policy", why: "Controlează ce informații despre vizitator pleacă spre alte site-uri.", fix: "Adaugă Referrer-Policy: strict-origin-when-cross-origin." },
    { t: "Referrer-Policy", why: "Controls what visitor information leaks to other sites.", fix: "Add Referrer-Policy: strict-origin-when-cross-origin." }),
  mixedContent: c(
    { t: "Conținut mixt", why: "Resursele încărcate prin http pe o pagină https sunt blocate sau declanșează avertismente.", fix: "Schimbă toate resursele pe https." },
    { t: "Mixed content", why: "Resources loaded over http on an https page get blocked or trigger warnings.", fix: "Switch every resource to https." }),
  versionLeak: c(
    { t: "Versiunea serverului expusă", why: "Afișarea versiunii exacte de server sau PHP le arată atacatorilor ce vulnerabilități să încerce.", fix: "Ascunde versiunile din headerele Server și X-Powered-By." },
    { t: "Server version exposed", why: "Showing exact server or PHP versions tells attackers which vulnerabilities to try.", fix: "Hide versions in the Server and X-Powered-By headers." }),

  // Accessibility
  a11yLang: c(
    { t: "Limba pentru cititoare de ecran", why: "Fără lang, cititoarele de ecran pronunță textul cu reguli greșite.", fix: "Setează atributul lang pe elementul <html>." },
    { t: "Language for screen readers", why: "Without lang, screen readers pronounce text with the wrong rules.", fix: "Set the lang attribute on the <html> element." }),
  altText: c(
    { t: "Text alternativ pentru imagini", why: "Alt-ul descrie imaginea pentru nevăzători și pentru Google Images.", fix: "Adaugă alt descriptiv imaginilor de conținut și alt=\"\" celor decorative." },
    { t: "Image alt text", why: "Alt text describes images for blind visitors and for Google Images.", fix: "Add descriptive alt to content images and alt=\"\" to decorative ones." }),
  formLabels: c(
    { t: "Etichete pentru câmpuri", why: "Câmpurile fără etichetă sunt greu de completat, iar formularele greu de completat nu aduc cereri.", fix: "Leagă fiecare câmp de un <label> vizibil." },
    { t: "Form field labels", why: "Unlabelled fields are hard to fill in, and hard forms do not bring enquiries.", fix: "Connect every field to a visible <label>." }),
  linkNames: c(
    { t: "Linkuri fără text", why: "Un link fără nume e anunțat ca „link”. Nimeni nu știe unde duce.", fix: "Dă fiecărui link text vizibil sau aria-label." },
    { t: "Links without text", why: "A nameless link is announced as just \"link\". Nobody knows where it goes.", fix: "Give every link visible text or an aria-label." }),
  buttonNames: c(
    { t: "Butoane fără nume", why: "Butoanele doar cu iconiță sunt invizibile pentru tehnologiile asistive.", fix: "Adaugă aria-label butoanelor cu iconițe." },
    { t: "Buttons without names", why: "Icon-only buttons are invisible to assistive technology.", fix: "Add aria-label to icon buttons." }),
  zoom: c(
    { t: "Zoom permis pe mobil", why: "Blocarea zoom-ului îi exclude pe cei care au nevoie să mărească textul.", fix: "Elimină user-scalable=no și maximum-scale=1 din viewport." },
    { t: "Zoom allowed on mobile", why: "Blocking zoom excludes people who need larger text.", fix: "Remove user-scalable=no and maximum-scale=1 from the viewport." }),
  landmarks: c(
    { t: "Repere de navigare", why: "Elementele header, nav, main și footer permit sărirea rapidă la conținut.", fix: "Folosește elementele semantice HTML5 pentru structura paginii." },
    { t: "Navigation landmarks", why: "header, nav, main and footer elements let people jump straight to content.", fix: "Use semantic HTML5 elements for the page structure." }),

  // Legal compliance
  termsPage: c(
    { t: "Termeni și condiții", why: "Pentru vânzarea online către consumatori, termenii (comandă, plată, livrare, retur) sunt obligatorii. Fără ei, orice dispută pornește cu tine în dezavantaj.", fix: "Publică o pagină de termeni și condiții adaptată afacerii tale și leag-o din footer și din procesul de comandă." },
    { t: "Terms and conditions", why: "When selling online to consumers, terms covering orders, payment, delivery and returns are required. Without them, every dispute starts with you on the back foot.", fix: "Publish terms and conditions tailored to your business and link them from the footer and the checkout." }),
  anpcSal: c(
    { t: "Link ANPC SAL (soluționarea alternativă a litigiilor)", why: "Ordinul ANPC 449/2022 cere comercianților care vând online către consumatori să afișeze pictograma SAL cu link către ANPC. Lipsa ei poate atrage amenzi la un control.", fix: "Adaugă în footer pictograma ANPC SAL cu link spre anpc.ro/ce-este-sal, vizibilă pe fiecare pagină." },
    { t: "ANPC SAL link (Romanian alternative dispute resolution)", why: "ANPC Order 449/2022 requires businesses selling online to Romanian consumers to show the SAL pictogram linking to the consumer authority. Missing it can lead to fines during an inspection.", fix: "Add the ANPC SAL pictogram to your footer, linking to anpc.ro/ce-este-sal, on every page." }),
  odrOutdated: c(
    { t: "Link vechi către platforma SOL/ODR", why: "Platforma europeană de soluționare online a litigiilor (SOL/ODR) a fost închisă în iulie 2025. Un link mort spre ea arată că site-ul nu a mai fost verificat juridic.", fix: "Scoate pictograma și linkul SOL și păstrează linkul ANPC SAL. Verifică cu juristul tău textele legale actualizate." },
    { t: "Outdated link to the EU ODR platform", why: "The EU online dispute resolution (ODR) platform closed in July 2025. A dead link to it signals the site's legal pages have not been reviewed since.", fix: "Remove the ODR badge and link, keep any national ADR links, and have your legal texts reviewed." }),
  companyDetails: c(
    { t: "Datele de identificare ale firmei", why: "Legea comerțului electronic cere ca site-ul să afișeze denumirea, CUI-ul, numărul de la Registrul Comerțului și adresa. Sunt și un semnal puternic de încredere.", fix: "Afișează în footer denumirea firmei, CUI, Nr. Reg. Com. și sediul social." },
    { t: "Company identification details", why: "E-commerce law in the EU and UK requires a site to show the company name, registration number, VAT number where applicable and registered address. They are also a strong trust signal.", fix: "Show your legal company name, registration and VAT numbers and registered office in the footer." }),
  returnsPolicy: c(
    { t: "Politica de retur (dreptul de retragere de 14 zile)", why: "Consumatorii au dreptul să returneze produsele în 14 zile. Dacă nu îi informezi clar, termenul se poate prelungi până la 12 luni.", fix: "Publică o pagină de retur cu termenul de 14 zile, pașii și formularul de retragere și leag-o din footer și din pagina de produs." },
    { t: "Returns policy (14-day right of withdrawal)", why: "Consumers have a 14-day right to cancel. If you do not inform them clearly, that period can extend to 12 months.", fix: "Publish a returns page with the 14-day period, the steps and a withdrawal form, linked from the footer and product pages." }),
  deliveryInfo: c(
    { t: "Informații despre livrare", why: "Costul și termenul de livrare trebuie comunicate înainte de comandă. Surprizele la checkout sunt principalul motiv al coșurilor abandonate.", fix: "Adaugă o pagină de livrare cu costuri, termene și curieri și afișează pragul de livrare gratuită pe pagina de produs." },
    { t: "Delivery information", why: "Delivery costs and times must be shown before ordering. Surprises at checkout are the top reason for abandoned carts.", fix: "Add a delivery page with costs, times and carriers, and show any free-delivery threshold on product pages." }),

  // Trust
  contactVisible: c(
    { t: "Contact vizibil", why: "Un telefon și un email vizibile sunt cel mai simplu semnal că există oameni reali în spatele site-ului.", fix: "Afișează telefonul (link tel:) și emailul în header sau footer pe fiecare pagină." },
    { t: "Visible contact details", why: "A visible phone number and email are the simplest signal that real people stand behind the site.", fix: "Show your phone (tel: link) and email in the header or footer on every page." }),
  address: c(
    { t: "Adresă fizică", why: "O adresă reală crește încrederea și e esențială pentru SEO local.", fix: "Afișează adresa în footer și în schema LocalBusiness." },
    { t: "Physical address", why: "A real address builds trust and is essential for local SEO.", fix: "Show the address in the footer and in LocalBusiness schema." }),
  privacyPolicy: c(
    { t: "Politică de confidențialitate", why: "Obligatorie prin GDPR când colectezi date, și un semnal de seriozitate pentru oricine completează un formular.", fix: "Publică o politică de confidențialitate și leag-o din footer și din formulare." },
    { t: "Privacy policy", why: "Required under GDPR when you collect data, and a signal of seriousness to anyone filling in a form.", fix: "Publish a privacy policy and link it from the footer and your forms." }),
  ctas: c(
    { t: "Îndemnuri la acțiune", why: "Dacă omul nu vede clar ce să facă mai departe, nu face nimic.", fix: "Pune un îndemn principal clar în primul ecran și repetă-l după fiecare secțiune importantă." },
    { t: "Calls to action", why: "If people cannot see what to do next, they do nothing.", fix: "Put one clear primary call to action on the first screen and repeat it after each key section." }),
  leadCapture: c(
    { t: "Captare de cereri", why: "Un formular scurt sau o programare online transformă interesul în conversație pe loc.", fix: "Adaugă un formular cu 3–4 câmpuri sau un calendar de programări." },
    { t: "Lead capture", why: "A short form or online booking turns interest into a conversation on the spot.", fix: "Add a 3 to 4 field form or a booking calendar." }),
  socialProof: c(
    { t: "Dovezi sociale", why: "Oamenii au încredere în alți clienți mai mult decât în tine. Recenziile și studiile de caz scad riscul perceput.", fix: "Adaugă recenzii reale cu nume, rezultate măsurabile și logo-uri de clienți." },
    { t: "Social proof", why: "People trust other customers more than they trust you. Reviews and case studies lower perceived risk.", fix: "Add real reviews with names, measurable results and client logos." }),
  socialProfiles: c(
    { t: "Profiluri sociale legate", why: "Profilurile active confirmă că afacerea e vie și consolidează entitatea pentru AI.", fix: "Leagă profilurile LinkedIn, Facebook sau Instagram active din footer." },
    { t: "Linked social profiles", why: "Active profiles confirm the business is alive and strengthen your entity for AI.", fix: "Link your active LinkedIn, Facebook or Instagram profiles from the footer." }),
  analytics: c(
    { t: "Măsurare", why: "Fără analiză nu știi ce pagini aduc cereri și ce pagini le pierd.", fix: "Instalează GA4 sau o alternativă care respectă confidențialitatea și urmărește trimiterile de formular." },
    { t: "Measurement", why: "Without analytics you cannot tell which pages win enquiries and which lose them.", fix: "Install GA4 or a privacy-friendly alternative and track form submissions." }),
  cookieConsent: c(
    { t: "Consimțământ cookie", why: "În UE, trackerele de marketing și analiză au nevoie de acord prealabil. Lipsa lui e un risc legal și de imagine.", fix: "Adaugă un banner de consimțământ și încarcă trackerele doar după acord." },
    { t: "Cookie consent", why: "In the EU, marketing and analytics trackers need prior consent. Missing it is a legal and reputational risk.", fix: "Add a consent banner and load trackers only after consent." }),
  freshFooter: c(
    { t: "Anul din footer", why: "Un © vechi îi spune vizitatorului că nimeni nu mai are grijă de site.", fix: "Generează automat anul curent în footer." },
    { t: "Footer year", why: "An old © tells visitors that nobody looks after the site any more.", fix: "Generate the current year automatically in the footer." })
};
