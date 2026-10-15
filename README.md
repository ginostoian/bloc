# Bloc website

Next.js App Router site with Romanian and English routes (`/ro`, `/en`). Marketing pages are statically generated; the audit tool and contact form run as Node.js API routes. Run `npm run dev` locally; use `npm run lint` and `npm run build` before deployment.

## Pages

| Route | Purpose |
| --- | --- |
| `/[locale]` | Home: offer, audit entry, services, calculator, results, beliefs, comparison, pricing, guarantees, process, FAQ |
| `/[locale]/servicii` | Services hub, grouped (build / get found / scale) |
| `/[locale]/servicii/[slug]` | One page per service (9): direct answer box, pains, deliverables, process, price, guarantee, fit / not fit, FAQ |
| `/[locale]/preturi` | Public pricing, project and monthly plans, payment FAQ |
| `/[locale]/rezultate` | Live projects with challenge / what we built |
| `/[locale]/audit` | Free website audit tool |
| `/[locale]/audit/duel` | Head-to-head audit: your site vs a competitor |
| `/[locale]/audit/scor/[token]` | Shareable result page (noindex) with a generated score card image |
| `/[locale]/despre`, `/contact`, `/blog`, legal pages | |
| `/llms.txt`, `/robots.txt`, `/sitemap.xml`, `/opengraph-image` | Search and AI crawler files |

Copy lives in `lib/content/services.ts` (services) and `lib/content/common.ts` (stats, guarantees, pricing, projects, FAQs, navigation). Blog posts are in `lib/site.ts`.

## Structured data

Every page outputs one JSON-LD `@graph` with `Organization` + `ProfessionalService` and `WebSite`, plus page-specific nodes: `WebPage`/`AboutPage`/`ContactPage`/`CollectionPage`, `Service` with `Offer` and `OfferCatalog`, `FAQPage`, `BreadcrumbList`, `BlogPosting`, `Person` (founder), `WebApplication` (audit tool). Validate with Google's Rich Results Test after deployment.

## Website audit tool

`POST /api/audit` fetches the submitted page server-side and runs 60+ checks across speed, SEO, AI search readiness, security, accessibility and trust (`lib/audit/run.ts`). The browser receives scores and the top three issues only. `POST /api/audit/report` takes name, email and consent, renders a branded PDF (`lib/audit/pdf.tsx`, fonts in `assets/fonts`), emails it to the lead, notifies the team with the scores and PDF attached, and returns the PDF for download.

- Requests go through `lib/audit/fetch.ts`, which blocks private, loopback and link-local addresses at DNS-resolution time and limits ports, redirects, size and time.
- Results are cached per URL for 30 minutes per server instance. Rate limits are per instance (8 audits / 10 min per IP; 5 reports / hour per IP, 3 / day per email). Put a shared store (for example Upstash Redis) in front before heavy paid traffic.
- Speed is measured from server response time, page weight (resources sampled with HEAD requests) and request count. The 4G figure is an estimate, not a Lighthouse score.
- **Legal compliance** is its own category: terms, privacy policy, cookie consent before trackers, company identification (CUI and trade register number for Romanian sites, company/VAT numbers elsewhere), the ANPC SAL link for `.ro` or Romanian-language sites, a warning for links to the EU ODR platform (closed July 2025), and returns and delivery pages when the site looks like a store. It checks that these elements are present, not that their content is correct, and the UI and PDF say it is not legal advice. Confirm the current ANPC requirements with a lawyer before promoting this check.
- **Score cards**: each audit and head-to-head returns a signed token. `/api/audit/card/[token]` renders a 1200×630 PNG for LinkedIn, WhatsApp and X previews, and `/[locale]/audit/scor/[token]` is the page people share. Tokens are HMAC-signed with `AUDIT_SIGNING_SECRET`, so scores cannot be forged under the Bloc brand. Without that variable in production, the share buttons are hidden.
- **Head-to-head**: `POST /api/audit/duel` audits two sites in parallel (counted as two audits for rate limiting) and returns both results plus the checks each one fails that the other passes.
- For local testing against `localhost`, set `AUDIT_ALLOW_PRIVATE_HOSTS=1` with `npm run dev`. It is ignored in production builds.

## Environment

| Variable | Use |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Final HTTPS domain, used for canonicals, hreflang, sitemap, schema and PDF links. Defaults to `https://bloc.ro`. |
| `RESEND_API_KEY` | Sends contact enquiries, audit reports and lead notifications. |
| `CONTACT_FROM_EMAIL` | Sender on a Resend-verified domain, for example `Gino de la Bloc <salut@bloc.ro>`. |
| `CONTACT_TO_EMAIL` | Team inbox for enquiries and audit leads. Also the reply-to on report emails. |
| `AUDIT_SIGNING_SECRET` | Long random string used to sign shareable score cards, for example from `openssl rand -base64 32`. Required in production for sharing. |

Without the Resend variables, the contact form falls back to a prepared `mailto:` and the audit report is offered as a download only (no email, no team notification).

The audit routes need the Node.js runtime and up to 60 seconds (`maxDuration` is set). On Vercel this works on all plans that allow 60 s functions.

## Before launch: claims to confirm

The copy was written to be specific and confident. Each of these is a business commitment or figure. Confirm it, or edit it in `lib/content/*`:

- **Figures:** 40+ sites and stores launched; 96 average mobile PageSpeed score; four new projects per month capacity.
- **Prices:** landing page €900, website €2,400, e-commerce €4,900, branding €1,800 (refresh €1,200), AI pilot €1,900 (+€290/month running), maintenance €149 / €290 / €490, local SEO €490 (+€190 per extra location), AEO €750, SEO €900, Growth €1,400, dedicated team from €3,500/month; 10% off a website with 3 months of SEO; payment split 40/40/20.
- **Timelines:** reply within 1 business day; fixed proposal 48 hours after the call; landing 10 business days, website 3–4 weeks, store 6–8 weeks, branding 3 weeks, AI pilot 3 weeks; maintenance response 4 business hours (2 on Business).
- **Guarantees:** deposit refunded after the first stage; 90+ mobile PageSpeed or free optimisation; first-month money back on SEO, local SEO and AEO (request within 7 days); AI pilot second instalment waived under 5 hours saved per week; copy guarantee on landing pages; directions guarantee on branding. These should also appear in your contract template.
- **Inclusions:** 30/60 days of post-launch support; up to 8 pages; up to 200 products; up to 8 articles a month; 5 SEO improvements a week; 50 questions tracked across 5 AI assistants; 6 brand templates; included maintenance hours roll over one month.
- **Market anchors:** agency €8,000–15,000 for a website; e-commerce agencies from €12,000; branding studios from €6,000; in-house SEO €3,000+/month; UK AEO agencies from £3,000/month.
- **People:** founder name and bio on the About page, the founder quote, and that the founder reads every message. Office hours Monday–Friday 9:00–18:00 EET.
- **Project descriptions:** the challenge / what-we-built text for Prim Vet, RawMina, Better Homes and MiniClinic. Ask each client before publishing, and add real numbers (enquiries, rankings, speed) where they agree.

Not included on purpose: customer testimonials, star ratings and `AggregateRating`/`Review` schema. Invented reviews are illegal in the EU and UK (Directive 2019/2161, DMCC Act 2024) and Google penalises self-serving review markup. Add real, attributed testimonials when you have them.

Legal: complete the company details (legal name, registration number, VAT number, registered address) on the privacy and terms pages, and have both reviewed.
