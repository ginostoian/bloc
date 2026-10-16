import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { decodeShare, scoreOf, type ShareSite } from "@/lib/audit/share";
import { categoryCopy, gradeFor } from "@/lib/audit/copy";
import { categories } from "@/lib/audit/types";
import { siteUrl } from "@/lib/seo";

export const runtime = "nodejs";

const C = { bg: "#0b0a09", bg2: "#171513", ink: "#f5f2ed", muted: "#8f8a81", line: "#2a2622", accent: "#ff4d1f", good: "#3fbf73", ok: "#e2a42a" };
const tone = (s: number) => (s >= 80 ? C.good : s >= 55 ? C.ok : C.accent);
const fonts = async () => {
  const dir = path.join(process.cwd(), "assets", "fonts");
  const [r, b, m] = await Promise.all(["Archivo_400Regular.ttf", "Archivo_800ExtraBold.ttf", "JetBrainsMono_500Medium.ttf"].map(f => readFile(path.join(dir, f))));
  return [{ name: "Archivo", data: r, weight: 400 as const }, { name: "Archivo", data: b, weight: 800 as const }, { name: "Mono", data: m, weight: 500 as const }];
};

function Ring({ score, size }: { score: number; size: number }) {
  const r = size / 2 - 12, c = 2 * Math.PI * r;
  return <div style={{ display: "flex", position: "relative", width: size, height: size, alignItems: "center", justifyContent: "center" }}>
    <svg width={size} height={size} style={{ position: "absolute", top: 0, left: 0 }}><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.line} strokeWidth={16} /><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={tone(score)} strokeWidth={16} strokeDasharray={`${(score / 100) * c} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} /></svg>
    <div style={{ display: "flex", fontSize: size * 0.36, fontWeight: 800, letterSpacing: -3 }}>{score}</div>
  </div>;
}

function Header({ label }: { label: string }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 800 }}><div style={{ width: 28, height: 28, background: C.accent }} />BLOC</div>
    <div style={{ display: "flex", fontFamily: "Mono", fontSize: 18, letterSpacing: 3, color: C.muted }}>{label}</div>
  </div>;
}

function Footer({ text }: { text: string }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.line}`, paddingTop: 22, fontSize: 24 }}>
    <div style={{ display: "flex", color: C.ink }}>{text}</div>
    <div style={{ display: "flex", fontFamily: "Mono", color: C.accent, fontSize: 22 }}>{new URL(siteUrl).host}/audit →</div>
  </div>;
}

function Single({ a, ro }: { a: ShareSite; ro: boolean }) {
  return <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%" }}>
    <Header label={ro ? "AUDIT SITE" : "WEBSITE AUDIT"} />
    <div style={{ display: "flex", gap: 56, alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <Ring score={a.o} size={250} />
        <div style={{ display: "flex", fontFamily: "Mono", fontSize: 20, letterSpacing: 3, color: C.muted }}>{ro ? `NOTA ${gradeFor(a.o)}` : `GRADE ${gradeFor(a.o)}`}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: 700 }}>
        <div style={{ display: "flex", fontSize: 52, fontWeight: 800, letterSpacing: -2, marginBottom: 18 }}>{a.h}</div>
        {categories.map(c => <div key={c} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 9 }}>
          <div style={{ display: "flex", width: 260, fontSize: 21, color: "#c9c4bb" }}>{categoryCopy[c][ro ? "ro" : "en"].name}</div>
          <div style={{ display: "flex", width: 340, height: 10, background: C.line }}><div style={{ display: "flex", width: `${scoreOf(a, c)}%`, height: 10, background: tone(scoreOf(a, c)) }} /></div>
          <div style={{ display: "flex", width: 46, justifyContent: "flex-end", fontSize: 22, fontWeight: 800 }}>{scoreOf(a, c)}</div>
        </div>)}
      </div>
    </div>
    <Footer text={ro ? "Cum stă site-ul tău? Află gratuit în 30 de secunde." : "How does your site score? Find out free in 30 seconds."} />
  </div>;
}

function Duel({ a, b, ro }: { a: ShareSite; b: ShareSite; ro: boolean }) {
  const win = a.o === b.o ? null : a.o > b.o ? "a" : "b";
  const side = (s: ShareSite, k: "a" | "b") => <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: 330 }} key={k}>
    <Ring score={s.o} size={190} />
    <div style={{ display: "flex", fontSize: 30, fontWeight: 800, letterSpacing: -1, maxWidth: 330, overflow: "hidden" }}>{s.h}</div>
    <div style={{ display: "flex", fontFamily: "Mono", fontSize: 17, letterSpacing: 3, color: win === k ? C.good : C.muted }}>{win === k ? (ro ? "CÂȘTIGĂ" : "WINS") : win ? (ro ? "PIERDE" : "LOSES") : (ro ? "EGALITATE" : "DRAW")}</div>
  </div>;
  return <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%" }}>
    <Header label={ro ? "DUEL DE SITE-URI" : "HEAD-TO-HEAD AUDIT"} />
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      {side(a, "a")}
      <div style={{ display: "flex", flexDirection: "column", width: 380, padding: "0 12px" }}>
        {categories.map(c => { const x = scoreOf(a, c), y = scoreOf(b, c); return <div key={c} style={{ display: "flex", alignItems: "center", marginBottom: 8, fontSize: 19 }}>
          <div style={{ display: "flex", width: 40, justifyContent: "flex-end", fontWeight: 800, color: x > y ? C.good : C.ink }}>{x}</div>
          <div style={{ display: "flex", flex: 1, justifyContent: "center", color: "#c9c4bb", fontSize: 17 }}>{categoryCopy[c][ro ? "ro" : "en"].name}</div>
          <div style={{ display: "flex", width: 40, fontWeight: 800, color: y > x ? C.good : C.ink }}>{y}</div>
        </div>; })}
      </div>
      {side(b, "b")}
    </div>
    <Footer text={ro ? "Tu vs. concurența. Testează gratuit." : "You vs. the competition. Test free."} />
  </div>;
}

export async function GET(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const payload = decodeShare(token);
  if (!payload) return new Response("Not found", { status: 404 });
  const ro = new URL(request.url).searchParams.get("l") !== "en";
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: C.bg, color: C.ink, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "52px 64px", fontFamily: "Archivo" }}>
      {payload.b ? <Duel a={payload.a} b={payload.b} ro={ro} /> : <Single a={payload.a} ro={ro} />}
    </div>,
    { width: 1200, height: 630, fonts: await fonts(), headers: { "Cache-Control": "public, max-age=31536000, immutable" } }
  );
}
