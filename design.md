# Bloc — Ghid de Design

> Sistem de design neobrutalist pentru website-ul Bloc (Web · AI · SEO).
> Acest document descrie **toate** alegerile de design. Cu el, oricine poate continua construcția site-ului coerent — în HTML/CSS sau transpus în **Next.js + Tailwind + shadcn**.

---

## 1. Filozofia vizuală

**Neobrutalism**: îndrăzneț, sincer, fără ornamente inutile. Reflectă tonul brandului — *„Construim, nu promitem."*

Principii care ghidează fiecare decizie:

- **Borduri groase, negre, vizibile** — totul are contur.
- **Umbre dure (hard shadows)**, fără blur — offset solid negru.
- **Tipografie masivă, condensată** — titlurile țipă, nu șoptesc.
- **Culori plate**, fără gradienți. Contrast mare.
- **Mișcare „mecanică"** — la hover, elementele se deplasează și umbra se schimbă brusc, nu lin.
- **Zero slop**: fără emoji decorativ, fără gradienți AI, fără carduri moi cu colțuri rotunjite.

Colțurile sunt **drepte** (border-radius: 0) peste tot, cu o singură excepție: punctele/indicatorii circulari mici (ex. bulina de status verde).

---

## 2. Culori

Toate culorile sunt definite ca variabile CSS în `:root` (vezi `assets/nb.css`).

### Paleta de bază

| Token | HEX | Folosire |
|---|---|---|
| `--cream` | `#FFFDF6` | Fundal principal al paginilor (alb cald, NU alb pur) |
| `--paper` | `#FFFFFF` | Fundal carduri, butoane, câmpuri formular |
| `--ink` | `#141210` | Text, borduri, umbre, secțiuni întunecate (negru cald) |
| `--orange` | `#FF5C00` | **Accent principal** — CTA, accente titluri, hover |
| `--orange-deep` | `#E04E00` | Variantă închisă a portocaliului (stări active) |

### Culori secundare (accente plate)

Folosite **cu măsură**, pentru ritm vizual — chips de categorie, carduri portofoliu, fundaluri de secțiune. Niciodată două accente tari lipite fără negru între ele.

| Token | HEX | Folosire tipică |
|---|---|---|
| `--yellow` | `#FFD23F` | Carduri accent, iconițe acordeon, blockquote, evidențieri |
| `--blue` | `#2D5BFF` | Categoria/serviciul AI |
| `--green` | `#16A56B` | Categoria/serviciul SEO |
| `--lilac` | `#C9B8FF` | Fundal secțiune „Proces", carduri |
| `--pink` | `#FF7DB0` | Categoria/serviciul Branding |

### Maparea serviciu → culoare (consecventă în tot site-ul)

- **Web Development** → galben (`--yellow`)
- **SEO** → verde (`--green`)
- **AI Consulting** → albastru (`--blue`)
- **Branding** → roz (`--pink`)
- **Mentenanță** → lila (`--lilac`)

### Culori de text

| Folosire | Valoare |
|---|---|
| Text principal | `--ink` (`#141210`) |
| Text secundar / paragrafe pe crem | `#3a352f` |
| Text descrieri carduri | `#5c564e` |
| Text mut / meta (mono) | `#6b655d` |
| Text pe fundal întunecat | `--cream` / `#cfc9bf` / `#a39d93` |
| Text mut pe întunecat (footer) | `#7c766d` |

### Reguli de contrast

- Text portocaliu (`--orange`) **doar** pe crem, alb sau negru — niciodată pe galben/verde/albastru.
- Pe `--orange` ca fundal → text alb.
- Pe `--yellow` / `--lilac` / `--pink` → text negru (`--ink`).
- Pe `--blue` / `--green` / `--ink` → text alb.

---

## 3. Tipografie

Trei familii, încărcate de la Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
```

### Familiile

| Rol | Font | Clasă utilitară | Caracter |
|---|---|---|---|
| **Display / titluri** | `Anton` | `.font-display`, `.display` | Masiv, condensat, UPPERCASE |
| **Corp / UI** | `Space Grotesk` (400–700) | (default pe `body`) | Lizibil, geometric, cald |
| **Mono / etichete** | `Space Mono` (400/700) | `.font-mono` | Tehnic, „cod", uppercase pentru micro-text |

> Fallback-uri: Anton → `"Arial Narrow", sans-serif`; Space Grotesk → `system-ui, sans-serif`; Space Mono → `ui-monospace, monospace`.

### Clasa `.display` (titluri mari)

```css
font-family: "Anton";
font-weight: 400;          /* Anton are o singură grosime */
line-height: 0.92;         /* foarte strâns */
letter-spacing: -0.01em;
text-transform: uppercase;
```

### Scara tipografică (folosește `clamp()` pentru responsive)

| Element | Dimensiune | Notă |
|---|---|---|
| Hero H1 | `clamp(48px, 8.5vw, 108px)` | Anton |
| H1 pagini interioare | `clamp(48px, 9vw, 116px)` | Anton |
| H2 secțiuni | `clamp(40px, 6vw, 72px)` | Anton |
| H2 articol | `clamp(28px, 3.4vw, 40px)` | Anton |
| Titlu card | `24–30px` | Anton |
| Paragraf intro / lead | `20–21px`, `line-height 1.5–1.6` | Space Grotesk |
| Corp text | `16–18px`, `line-height 1.6–1.72` | Space Grotesk |
| Corp articol | `18px`, `line-height 1.72` | Space Grotesk |
| `.eyebrow` (supratitlu) | `12px`, uppercase, `letter-spacing 0.14em` | Space Mono 700 |
| Meta / micro | `11–13px`, uppercase, `letter-spacing 0.04–0.08em` | Space Mono |

### `.eyebrow` — supratitlul mono

Mic text portocaliu deasupra titlurilor de secțiune, în stil de comentariu de cod:

```html
<span class="eyebrow text-orange">// Ce facem</span>
```

> Regulă de minim: pe slide-uri/secțiuni mari nimic sub **24px** pentru text de citit; mono-eticheta de 11–13px e doar pentru micro-context.

---

## 4. Spațiere

Sistem bazat pe multipli de ~4px, dar aplicat pragmatic.

### Secțiuni

```css
.section { padding: 96px 0; }            /* desktop */
@media (max-width: 640px) {
  .section { padding: 64px 0; }          /* mobil */
}
```

### Container

```css
.wrap {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;   /* important: evită overflow orizontal */
}
```

Lățimi de conținut îngustat:
- Articole / text lung: `max-width: 820px` (header) → `1000px` (cu cuprins lateral)
- Secțiuni centrate (newsletter, FAQ): `max-width: 820–900px`

### Scara de spațiere uzuală

| Folosire | Valoare |
|---|---|
| Gap între carduri în grilă | `24px` |
| Gap între butoane / chips | `10–16px` |
| Padding card standard | `26–32px` |
| Padding card mare / CTA | `clamp(40px, 6vw, 72px)` |
| Padding buton | `14px 24px` (normal) · `18px 30px` (`--lg`) |
| Margine titlu → paragraf | `12–26px` |
| Margine secțiune titlu → conținut | `48px` |

### Grile

Toate layout-urile multi-coloană folosesc **CSS Grid cu `gap`** (niciodată margini pe siblings inline):

- Servicii/portofoliu/echipă: `grid-template-columns: repeat(3, 1fr); gap: 24px;`
- Statistici: `repeat(4, 1fr)` cu borduri interioare
- Hero / split-uri: `grid-template-columns: 1.15fr .85fr; gap: 48px;`
- Articol cu cuprins: `grid-template-columns: 240px 1fr; gap: 48px;`

> La mobil, aceste grile trebuie să treacă la 1 coloană (vezi §9 Responsive — de implementat în breakpoint-uri).

---

## 5. Borduri

Bordura este **semnătura** stilului. Regula de aur: **3px solid negru** aproape peste tot.

```css
--border: 3px;
```

| Folosire | Bordură |
|---|---|
| Standard (carduri, butoane, câmpuri) | `3px solid var(--ink)` → clasa `.nb-border` |
| Chips / tag-uri mici | `2px solid var(--ink)` |
| Iconițe acordeon | `2px solid var(--ink)` |
| Diviziuni interioare carduri | `2px solid var(--ink)` |
| Pe fundal întunecat (stats) | `3px solid var(--cream)` |
| Diviziuni footer | `2px solid #2c2820` |

- **`border-radius: 0`** universal. Fără colțuri rotunjite.
- Diviziunile între rânduri (ex. lista de servicii) folosesc `border-bottom: 3px solid var(--ink)`, ultima fără bordură.

---

## 6. Umbre (hard shadows)

Umbre **solide, fără blur**, mereu negre (`--ink`), offset jos-dreapta.

```css
--shadow:    6px 6px 0 var(--ink);   /* standard */
--shadow-sm: 4px 4px 0 var(--ink);   /* butoane, elemente mici */
--shadow-lg: 9px 9px 0 var(--ink);   /* carduri mari, CTA, hover */
```

Clase utilitare: `.nb-shadow`, `.nb-shadow-sm`, `.nb-shadow-lg`.

Logo mark folosește o umbră mică custom: `3px 3px 0 var(--ink)`.

---

## 7. Interacțiuni & mișcare

Mișcarea e **rapidă și mecanică** — tranziții scurte (`.08s–.1s`), elementul se „mută" și umbra se modifică.

### Buton — la hover se ridică, la click se apasă

```css
.nb-btn        { box-shadow: 4px 4px 0 var(--ink); transition: transform .08s, box-shadow .08s; }
.nb-btn:hover  { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--ink); }
.nb-btn:active { transform: translate(2px,2px);  box-shadow: 1px 1px 0 var(--ink); }
```

### Card „lift" — la hover urcă și umbra crește

```css
.nb-lift:hover { transform: translate(-3px,-3px); box-shadow: var(--shadow-lg); }
```

### Alte micro-interacțiuni

- **Rânduri servicii**: la hover, întreg rândul devine portocaliu cu text alb (`.svc-row:hover`).
- **Taburi filtru**: stare activă = fundal negru, text alb (`.tab.is-on`).
- **Acordeon**: iconița `+` se rotește 45° (devine `×`) și trece de la galben la portocaliu.
- **Reveal la scroll**: `.reveal` → `opacity 0 → 1` + `translateY(18px) → 0` via IntersectionObserver.
- **Contoare animate**: `[data-count]` numără crescător la intrare în viewport (cubic ease-out).
- **Marquee**: bandă portocalie cu text Anton care derulează infinit (26s liniar).

> Toate respectă `@media (prefers-reduced-motion: reduce)` — animațiile se dezactivează.

---

## 8. Componente

### Buton (`.nb-btn`)

```html
<a class="nb-btn nb-btn--primary nb-btn--lg">Hai să discutăm →</a>
```

Variante: `--primary` (portocaliu/alb), `--ink` (negru/alb), `--yellow` (galben/negru), `--lg` (mare). Default = alb cu bordură. Săgeata `→` apare în CTA-uri.

### Card (`.nb-card`)

```css
border: 3px solid var(--ink);
background: var(--paper);
box-shadow: var(--shadow);
```
Adaugă `.nb-lift` pentru hover interactiv. `overflow: hidden` când conține un placeholder de imagine lipit de bordură.

### Chip / tag (`.nb-chip`)

Etichetă mică mono, uppercase, bordură 2px. Colorabilă cu `.bg-green`, `.bg-blue`, etc. Folosită pentru categorii și status.

### Câmp formular (`.field`)

```css
border: 3px solid var(--ink);
background: var(--paper);
padding: 14px 16px;
```
`:focus` → adaugă umbră `--shadow-sm`. `.field--err` → fundal roșu-pal `#FFE9E2` (validare).
Etichetă: `.label` (mono, uppercase, 12px).

### Acordeon (`.acc__item` / `.acc__head` / `.acc__body`)

Item cu bordură + umbră mică. Cap cu titlu Anton + iconiță pătrată galbenă. Body cu `max-height` animat. JS închide automat celelalte iteme din același `[data-acc-group]`.

### Marquee (`.marquee`)

Bandă portocalie full-width, text Anton 30px, derulare infinită. Conține track-ul dublat pentru loop continuu.

### Placeholder de imagine (`.ph`)

Locul unde intră imagini reale. Dungi diagonale + etichetă mono neagră care descrie ce trebuie pus acolo:

```html
<div class="ph bg-yellow" style="aspect-ratio:16/10;">
  <span class="ph__label">screenshot · nume proiect</span>
</div>
```

> **De înlocuit cu imagini reale.** Eticheta spune exact ce conținut e așteptat și la ce dimensiune.

---

## 9. Navigație & layout global

- **Header** (`.nav`): sticky sus, înălțime `72px`, fundal crem, `border-bottom: 3px`. Logo = pătrat portocaliu cu „O" (Anton) + nume. Link activ = pill negru (`.nav__link.is-active`).
- **Meniu mobil** (`.mobile-menu`): apare sub `920px` via buton burger; linkuri mari Anton, full-width.
- **Footer** (`.footer`): fundal `--ink`, 4 coloane (brand + Meniu + Servicii + Contact), bară de jos cu copyright.

### Breakpoints folosite

| Lățime | Ce se schimbă |
|---|---|
| `≤ 980px` | Grilele de 4 coloane (statistici, proces, echipă) → 2 coloane; footer → 3 coloane |
| `≤ 920px` | Nav desktop → burger + meniu mobil |
| `≤ 900px` | Grilele de 3 coloane (portofoliu, valori, pachete, testimoniale) → 2 coloane |
| `≤ 860px` | Toate layout-urile split (hero, story, contact, articol+cuprins, blocuri servicii, featured blog) → 1 coloană; cuprinsul nu mai e sticky; blob-urile decorative din hero se ascund |
| `≤ 640px` | Padding secțiuni `96px → 64px` |
| `≤ 620px` | Restul grilelor multi-coloană → 1 coloană (carduri, proces, echipă, formular 2-col, footer) |
| `≤ 460px` | Statisticile → 1 coloană |

Regulile responsive trăiesc grupat la finalul `assets/nb.css`. Pentru că `grid-template-columns` e setat inline pe multe containere, media query-urile folosesc `!important` ca să suprascrie — la fel trebuie procedat dacă adaugi grile noi cu stil inline (sau, mai curat, mută grila într-o clasă din `nb.css`).

---

## 10. Structura fișierelor

```
/
├── index.html               # Landing (Acasă)
├── servicii.html            # Servicii + pachete de preț
├── despre.html              # Despre, valori, echipă, cifre
├── blog.html                # Listare blog + filtre categorii
├── contact.html             # Formular contact
├── articol-seo-local.html   # Articol exemplu (SEO)
├── articol-ai-business.html # Articol exemplu (AI)
├── articol-next-js.html     # Articol exemplu (Web)
├── design.md                # Acest ghid
└── assets/
    ├── nb.css               # TOATE stilurile partajate (tokens + componente)
    └── nb.js                # Interacțiuni (meniu, filtre, acordeon, formulare, contoare, reveal)
```

**Regula de aur a mentenanței:** tokeni și componente comune trăiesc în `assets/nb.css`. Stilurile specifice unei pagini (ex. grila hero, `.tab`, tipografia `.article`) stau în `<style>` în `<head>`-ul acelei pagini.

---

## 11. Transpunere în Next.js + Tailwind + shadcn

Site-ul e gândit să se mapeze 1:1 pe stack-ul țintă:

### `tailwind.config.ts` — tokeni

```ts
export default {
  theme: {
    extend: {
      colors: {
        cream: "#FFFDF6", paper: "#FFFFFF", ink: "#141210",
        orange: { DEFAULT: "#FF5C00", deep: "#E04E00" },
        yellow: "#FFD23F", blue: "#2D5BFF", green: "#16A56B",
        lilac: "#C9B8FF", pink: "#FF7DB0",
      },
      fontFamily: {
        display: ["Anton", "Arial Narrow", "sans-serif"],
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["Space Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        nb: "6px 6px 0 #141210",
        "nb-sm": "4px 4px 0 #141210",
        "nb-lg": "9px 9px 0 #141210",
      },
      borderWidth: { 3: "3px" },
      borderRadius: { none: "0" },
    },
  },
}
```

### Mapare componente → shadcn

| Componenta din site | Echivalent shadcn (de personalizat) |
|---|---|
| `.nb-btn` | `Button` — override variant cu bordură 3px + hard shadow |
| `.nb-card` | `Card` — `rounded-none border-[3px] border-ink shadow-nb` |
| `.acc__*` | `Accordion` — re-stilizat cu iconiță pătrată |
| `.field` / `.label` | `Input` / `Textarea` / `Select` / `Label` |
| `.nb-chip` | `Badge` — `rounded-none border-2` |
| Taburi filtru | `Tabs` sau filtrare client-side cu state |

### Exemplu utilitar Tailwind pentru buton primar

```tsx
<button className="inline-flex items-center gap-2 font-sans font-bold
  px-6 py-3.5 border-[3px] border-ink bg-orange text-white rounded-none
  shadow-nb-sm transition-transform
  hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-nb
  active:translate-x-0.5 active:translate-y-0.5">
  Hai să discutăm →
</button>
```

---

## 12. Ce de respectat când adaugi pagini noi

1. **Copiază `<head>`-ul** (fonturi + `nb.css`) și blocurile nav/footer dintr-o pagină existentă.
2. **Folosește tokenii**, nu valori hardcodate. Culoare nouă? Adaug-o în `:root`, nu inline.
3. **Bordură 3px + hard shadow** pe orice container nou. Fără `border-radius`.
4. **Titluri în Anton uppercase**, corp în Space Grotesk, micro-etichete în Space Mono.
5. **Grid + gap** pentru orice grup de elemente, niciodată siblings inline cu margini.
6. **Placeholder `.ph`** pentru imagini lipsă, cu etichetă descriptivă.
7. **Marchează ecranele** cu `data-screen-label="…"` (ajută la review/comentarii).
8. **Ton de copy**: direct, scurt, sincer, în română. *„Construim, nu promitem."* Fără jargon corporatist.
9. **Maximum 1–2 culori de accent** pe o secțiune. Lasă negrul și cremul să respire.
10. **Verifică `prefers-reduced-motion`** pentru orice animație nouă.

---

*Ultima actualizare: iunie 2026 · Bloc design system v1*
