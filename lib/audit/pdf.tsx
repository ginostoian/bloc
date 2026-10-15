import path from "node:path";
import { Document, Font, Link, Page, Path, Rect, StyleSheet, Svg, Text, View, renderToBuffer } from "@react-pdf/renderer";
import type { Locale } from "../i18n";
import { categories, type AuditResult, type Status } from "./types";
import { sortByPriority } from "./priority";
import { categoryCopy, checkCopy, gradeFor, impactCopy, statusCopy, tr, verdict } from "./copy";
import { siteUrl } from "../seo";

const fontDir = path.join(process.cwd(), "assets", "fonts");
let registered = false;
function registerFonts() {
  if (registered) return;
  Font.register({ family: "Archivo", fonts: [
    { src: path.join(fontDir, "Archivo_400Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontDir, "Archivo_600SemiBold.ttf"), fontWeight: 600 },
    { src: path.join(fontDir, "Archivo_800ExtraBold.ttf"), fontWeight: 800 }
  ] });
  Font.register({ family: "Mono", src: path.join(fontDir, "JetBrainsMono_500Medium.ttf") });
  Font.register({ family: "Serif", src: path.join(fontDir, "Newsreader_400Regular_Italic.ttf"), fontStyle: "italic" });
  Font.registerHyphenationCallback(word => [word]);
  registered = true;
}

const C = { accent: "#ff4d1f", bg: "#0b0a09", bg2: "#171513", ink: "#f5f2ed", paper: "#f6f2ec", line: "#ddd5ca", text: "#2a2621", muted: "#7a7369", pass: "#2f9e5b", warn: "#d99a1e", fail: "#e0412a" };
const statusColor: Record<Status, string> = { pass: C.pass, warn: C.warn, fail: C.fail };
const scoreColor = (s: number) => (s >= 80 ? C.pass : s >= 55 ? C.warn : C.fail);

const s = StyleSheet.create({
  page: { backgroundColor: C.paper, color: C.text, fontFamily: "Archivo", fontSize: 10, paddingTop: 54, paddingBottom: 64, paddingHorizontal: 48 },
  dark: { backgroundColor: C.bg, color: C.ink, padding: 48 },
  meta: { fontFamily: "Mono", fontSize: 7.5, letterSpacing: 1.4, textTransform: "uppercase", color: C.muted },
  h1: { fontSize: 46, fontWeight: 800, letterSpacing: -1.8, lineHeight: 0.95 },
  h2: { fontSize: 26, fontWeight: 800, letterSpacing: -0.9, lineHeight: 1.05, marginTop: 8, marginBottom: 14 },
  body: { fontSize: 10, lineHeight: 1.5, color: "#4a443c" },
  footer: { position: "absolute", left: 48, right: 48, bottom: 28, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: C.line, paddingTop: 8 },
  pill: { fontFamily: "Mono", fontSize: 6.5, letterSpacing: 0.8, textTransform: "uppercase", paddingVertical: 2.5, paddingHorizontal: 5, color: "#fff", borderRadius: 2 }
});

function Gauge({ score, size = 150, track = "#2a2724", label }: { score: number; size?: number; track?: string; label?: string }) {
  const r = size / 2 - 10, cx = size / 2, cy = size / 2;
  const a = Math.max(0.001, Math.min(score, 99.9) / 100) * Math.PI * 2;
  const x = cx + r * Math.sin(a), y = cy - r * Math.cos(a);
  const arc = `M ${cx} ${cy - r} A ${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${x} ${y}`;
  const ring = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`;
  return (
    <View style={{ width: size, height: size, position: "relative" }}>
      <Svg width={size} height={size}>
        <Path d={ring} stroke={track} strokeWidth={10} fill="none" />
        <Path d={arc} stroke={scoreColor(score)} strokeWidth={10} fill="none" />
      </Svg>
      <View style={{ position: "absolute", top: 0, left: 0, width: size, height: size, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: size * 0.3, fontWeight: 800, letterSpacing: -2 }}>{score}</Text>
        {label ? <Text style={[s.meta, { marginTop: 2 }]}>{label}</Text> : null}
      </View>
    </View>
  );
}

function Brand({ light }: { light?: boolean }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Svg width={12} height={12}><Rect x={0} y={0} width={12} height={12} fill={C.accent} /></Svg>
      <Text style={{ marginLeft: 7, fontWeight: 800, fontSize: 13, letterSpacing: -0.5, color: light ? C.ink : C.bg }}>BLOC</Text>
    </View>
  );
}

function Footer({ host, locale }: { host: string; locale: Locale }) {
  return (
    <View style={s.footer} fixed>
      <Text style={s.meta}>Bloc · {locale === "ro" ? "Audit" : "Audit"} · {host}</Text>
      <Text style={s.meta} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  );
}

function ReportDocument({ r, name, locale }: { r: AuditResult; name: string; locale: Locale }) {
  const ro = locale === "ro";
  const date = new Intl.DateTimeFormat(ro ? "ro-RO" : "en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(r.fetchedAt));
  const issues = r.checks.filter(c => c.status !== "pass");
  const priorities = sortByPriority(issues).slice(0, 5);
  const failCount = r.checks.filter(c => c.status === "fail").length, warnCount = r.checks.filter(c => c.status === "warn").length, passCount = r.checks.length - failCount - warnCount;
  const firstName = name.split(" ")[0];
  const contactUrl = `${siteUrl}/${locale}/contact?topic=roast&site=${encodeURIComponent(r.host)}`;
  const metrics: [string, string][] = [
    [ro ? "Răspuns server" : "Server response", `${r.metrics.ttfbMs} ms`],
    [ro ? "Încărcare 4G (est.)" : "4G load (est.)", `${r.metrics.est4gSeconds} s`],
    [ro ? "Greutate pagină" : "Page weight", `${(r.metrics.pageWeightKb / 1024).toFixed(2)} MB`],
    [ro ? "Resurse" : "Requests", `${r.metrics.requests}`],
    [ro ? "Cuvinte în HTML" : "Words in HTML", `${r.metrics.wordCount}`],
    [ro ? "Platformă" : "Platform", r.platform || (ro ? "Nedetectată" : "Not detected")]
  ];

  return (
    <Document title={`${ro ? "Audit site" : "Website audit"} · ${r.host}`} author="Bloc" subject={ro ? "Raport de audit website" : "Website audit report"} creator="Bloc" producer="Bloc" language={locale}>
      {/* Cover */}
      <Page size="A4" style={[s.page, s.dark]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Brand light />
          <Text style={s.meta}>{ro ? "Raport de audit" : "Audit report"} · {date}</Text>
        </View>
        <View style={{ marginTop: 90 }}>
          <Text style={[s.meta, { color: C.accent }]}>// {ro ? `Pregătit pentru ${name}` : `Prepared for ${name}`}</Text>
          <Text style={[s.h1, { marginTop: 18 }]}>{ro ? "Cum arată site-ul tău" : "How your website looks"}</Text>
          <Text style={[s.h1]}>{ro ? "pentru clienți, Google" : "to customers, Google"}</Text>
          <Text style={[s.h1]}>{ro ? "și " : "and "}<Text style={{ fontFamily: "Serif", fontStyle: "italic", fontWeight: 400, color: C.accent }}>{ro ? "AI." : "AI."}</Text></Text>
          <Text style={{ fontFamily: "Mono", fontSize: 12, marginTop: 22, color: "#bdb6ab" }}>{r.finalUrl}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 60, gap: 30 }}>
          <Gauge score={r.scores.overall} size={170} label={`${ro ? "Nota" : "Grade"} ${gradeFor(r.scores.overall)}`} />
          <View style={{ flex: 1 }}>
            <Text style={[s.meta, { color: "#a9a297" }]}>{ro ? "Verdictul pe scurt" : "The short verdict"}</Text>
            <Text style={{ fontSize: 17, lineHeight: 1.3, fontWeight: 600, marginTop: 8 }}>{verdict(r.scores.overall, locale)}</Text>
            <Text style={{ fontSize: 10, color: "#a9a297", marginTop: 12 }}>{ro ? `${r.checks.length} verificări · ${failCount} critice · ${warnCount} de îmbunătățit · ${passCount} în regulă` : `${r.checks.length} checks · ${failCount} critical · ${warnCount} to improve · ${passCount} passing`}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 50, borderTopWidth: 1, borderTopColor: "#2e2a26" }}>
          {categories.map(cat => (
            <View key={cat} style={{ flex: 1, paddingTop: 12, paddingRight: 6 }}>
              <Text style={{ fontSize: 22, fontWeight: 800, color: scoreColor(r.scores[cat]) }}>{r.scores[cat]}</Text>
              <Text style={[s.meta, { fontSize: 6.5, marginTop: 3 }]}>{categoryCopy[cat][locale].name}</Text>
            </View>
          ))}
        </View>
        <View style={{ position: "absolute", left: 48, right: 48, bottom: 36, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={s.meta}>bloc.ro</Text>
          <Text style={s.meta}>salut@bloc.ro</Text>
        </View>
      </Page>

      {/* Summary */}
      <Page size="A4" style={s.page}>
        <Brand />
        <Text style={[s.meta, { marginTop: 28 }]}>// 01 · {ro ? "Rezumat" : "Summary"}</Text>
        <Text style={s.h2}>{ro ? `${firstName}, iată unde câștigi cel mai mult.` : `${firstName}, here is where you gain the most.`}</Text>
        <Text style={[s.body, { maxWidth: 440 }]}>{ro ? "Am verificat pagina ta principală așa cum o văd un vizitator pe telefon, Googlebot și crawlerele asistenților AI. Scorurile de mai jos sunt ponderate după impactul asupra cererilor primite." : "We checked your main page the way a visitor on a phone, Googlebot and AI assistant crawlers see it. The scores below are weighted by their impact on the enquiries you receive."}</Text>
        <View style={{ marginTop: 16 }}>
          {categories.map(cat => (
            <View key={cat} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 6, borderTopWidth: 1, borderTopColor: C.line }}>
              <View style={{ width: 200 }}>
                <Text style={{ fontWeight: 600, fontSize: 11 }}>{categoryCopy[cat][locale].name}</Text>
                <Text style={{ fontSize: 8, color: C.muted, marginTop: 2 }}>{categoryCopy[cat][locale].blurb}</Text>
              </View>
              <View style={{ flex: 1, height: 8, backgroundColor: "#e6dfd4", marginHorizontal: 14 }}>
                <View style={{ width: `${r.scores[cat]}%`, height: 8, backgroundColor: scoreColor(r.scores[cat]) }} />
              </View>
              <Text style={{ width: 34, textAlign: "right", fontWeight: 800, fontSize: 14 }}>{r.scores[cat]}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 16, borderTopWidth: 1, borderLeftWidth: 1, borderColor: C.line }}>
          {metrics.map(([k, v]) => (
            <View key={k} style={{ width: "33.33%", padding: 8, borderRightWidth: 1, borderBottomWidth: 1, borderColor: C.line }}>
              <Text style={s.meta}>{k}</Text>
              <Text style={{ fontSize: 15, fontWeight: 800, marginTop: 4 }}>{v}</Text>
            </View>
          ))}
        </View>
        <Text style={[s.meta, { marginTop: 18, color: C.accent }]}>// {ro ? "Primele lucruri de reparat" : "Fix these first"}</Text>
        {priorities.length ? priorities.map((c, i) => {
          const copy = checkCopy[c.id]?.[locale];
          return (
            <View key={c.id} wrap={false} style={{ flexDirection: "row", paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: C.line }}>
              <Text style={{ width: 22, fontFamily: "Mono", fontSize: 9, color: C.accent }}>0{i + 1}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 600, fontSize: 10.5 }}>{copy?.t} <Text style={{ color: C.muted, fontWeight: 400 }}>· {tr(c.value, locale)}</Text></Text>
                <Text style={[s.body, { fontSize: 9 }]}>{copy?.fix}</Text>
              </View>
            </View>
          );
        }) : <Text style={s.body}>{ro ? "Nicio problemă majoră. Rafinările sunt detaliate în paginile următoare." : "No major issues. Refinements are detailed on the next pages."}</Text>}
        <Footer host={r.host} locale={locale} />
      </Page>

      {/* Details per category */}
      <Page size="A4" style={s.page}>
        <Brand />
        <Text style={[s.meta, { marginTop: 28 }]}>// 02 · {ro ? "Toate verificările" : "Every check"}</Text>
        <Text style={s.h2}>{ro ? "Ce am găsit, de ce contează, ce faci." : "What we found, why it matters, what to do."}</Text>
        {categories.map(cat => {
          const list = sortByPriority(r.checks.filter(c => c.category === cat));
          return (
            <View key={cat} style={{ marginTop: 16 }}>
              <View wrap={false} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", borderBottomWidth: 2, borderBottomColor: C.bg, paddingBottom: 6 }}>
                <Text style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.4 }}>{categoryCopy[cat][locale].name}</Text>
                <Text style={{ fontSize: 16, fontWeight: 800, color: scoreColor(r.scores[cat]) }}>{r.scores[cat]}/100</Text>
              </View>
              {list.map(c => {
                const copy = checkCopy[c.id]?.[locale];
                if (!copy) return null;
                return (
                  <View key={c.id} wrap={false} style={{ flexDirection: "row", paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: C.line }}>
                    <View style={{ width: 64 }}><Text style={[s.pill, { backgroundColor: statusColor[c.status], alignSelf: "flex-start" }]}>{statusCopy[c.status][locale]}</Text></View>
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontWeight: 600, fontSize: 10, flex: 1 }}>{copy.t}</Text>
                        <Text style={{ fontFamily: "Mono", fontSize: 8, color: C.muted, maxWidth: 190, textAlign: "right" }}>{tr(c.value, locale)}</Text>
                      </View>
                      {c.status !== "pass" ? <>
                        <Text style={[s.body, { fontSize: 8.5, marginTop: 2 }]}>{copy.why}</Text>
                        <Text style={{ fontSize: 8.5, marginTop: 2, lineHeight: 1.45 }}><Text style={{ color: C.accent, fontWeight: 600 }}>{ro ? "Soluția: " : "Fix: "}</Text>{copy.fix} <Text style={{ color: C.muted }}>({impactCopy[c.impact][locale].toLowerCase()})</Text></Text>
                      </> : null}
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
        <Footer host={r.host} locale={locale} />
      </Page>

      {/* Next step */}
      <Page size="A4" style={[s.page, { backgroundColor: C.accent, color: C.bg }]}>
        <Brand />
        <Text style={[s.meta, { marginTop: 28, color: C.bg }]}>// 03 · {ro ? "Următorul pas" : "Next step"}</Text>
        <Text style={[s.h1, { fontSize: 40, marginTop: 14 }]}>{ro ? "Un raport nu repară nimic." : "A report fixes nothing."}</Text>
        <Text style={[s.h1, { fontSize: 40 }]}>{ro ? "Noi, da." : "We do."}</Text>
        <Text style={{ fontSize: 12.5, lineHeight: 1.5, marginTop: 22, maxWidth: 430 }}>{ro ? `Ai ${failCount + warnCount} lucruri de îmbunătățit. Unele durează zece minute, altele cer o decizie. În 20 de minute la telefon îți spunem ce am repara primul, cât durează și cât costă. Fără prezentări și fără obligații.` : `You have ${failCount + warnCount} things to improve. Some take ten minutes, others need a decision. In a 20-minute call we tell you what we would fix first, how long it takes and what it costs. No pitch deck, no obligation.`}</Text>
        <View style={{ marginTop: 30, borderTopWidth: 1, borderTopColor: C.bg }}>
          {(ro ? [
            ["Răspuns în 1 zi lucrătoare", "Îți scrie direct omul care a citit raportul, nu un robot de vânzări."],
            ["Preț fix, stabilit înainte", "Știi exact ce primești și cât plătești înainte să începem."],
            ["Garanția primei etape", "Dacă după prima etapă nu ești mulțumit, îți returnăm avansul integral."],
            ["Tot ce construim e al tău", "Cod, conturi, conținut și acces rămân pe numele tău."]
          ] : [
            ["Reply within 1 business day", "You hear directly from the person who read your report, not a sales robot."],
            ["Fixed price, agreed upfront", "You know exactly what you get and what you pay before we start."],
            ["First-stage guarantee", "If you are not happy after the first stage, we refund your deposit in full."],
            ["Everything we build is yours", "Code, accounts, content and access stay in your name."]
          ]).map(([t, d]) => (
            <View key={t} style={{ flexDirection: "row", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.bg }}>
              <Text style={{ width: 190, fontWeight: 800, fontSize: 11 }}>{t}</Text>
              <Text style={{ flex: 1, fontSize: 10, lineHeight: 1.45 }}>{d}</Text>
            </View>
          ))}
        </View>
        <Link src={contactUrl} style={{ marginTop: 34, backgroundColor: C.bg, color: C.ink, paddingVertical: 14, paddingHorizontal: 20, alignSelf: "flex-start", textDecoration: "none", fontFamily: "Mono", fontSize: 10, letterSpacing: 1.2 }}>
          {ro ? "PROGRAMEAZĂ DISCUȚIA GRATUITĂ →" : "BOOK THE FREE CALL →"}
        </Link>
        <Text style={{ marginTop: 14, fontSize: 10 }}>{ro ? "Sau răspunde direct la emailul cu acest raport." : "Or simply reply to the email this report came with."}</Text>
        <View style={{ position: "absolute", left: 48, right: 48, bottom: 36, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[s.meta, { color: C.bg }]}>bloc.ro · salut@bloc.ro</Text>
          <Text style={[s.meta, { color: C.bg }]}>Cluj-Napoca · {ro ? "România" : "Romania"}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function renderReportPdf(r: AuditResult, name: string, locale: Locale): Promise<Buffer> {
  registerFonts();
  return renderToBuffer(<ReportDocument r={r} name={name} locale={locale} />);
}
