import { ImageResponse } from "next/og";

export const alt = "Bloc: websites, SEO and AI search that bring customers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#0b0a09", color: "#f5f2ed", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 800 }}><div style={{ width: 34, height: 34, background: "#ff4d1f" }} />BLOC</div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3 }}>
        <span>Get found. Get chosen.</span>
        <span style={{ color: "#ff4d1f" }}>Get the call.</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#a9a49b" }}><span>Websites · SEO · AI search · Automation</span><span>bloc.ro</span></div>
    </div>,
    size
  );
}
