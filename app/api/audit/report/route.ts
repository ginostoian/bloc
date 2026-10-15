import { NextRequest, NextResponse } from "next/server";
import { getAudit } from "@/lib/audit/cache";
import { AuditFetchError } from "@/lib/audit/fetch";
import { renderReportPdf } from "@/lib/audit/pdf";
import { categoryCopy } from "@/lib/audit/copy";
import { categories } from "@/lib/audit/types";
import { emailConfigured, escapeHtml, sendEmail, teamInbox } from "@/lib/email";
import { clientIp, rateLimited } from "@/lib/rate-limit";
import { siteUrl } from "@/lib/seo";

export const runtime = "nodejs";
export const maxDuration = 60;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const reply = (status: number, error: string) => NextResponse.json({ error }, { status });

export async function POST(request: NextRequest) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return reply(403, "forbidden");
  let input: Record<string, unknown>;
  try { input = await request.json(); } catch { return reply(400, "invalid_payload"); }
  const field = (k: string) => (typeof input[k] === "string" ? String(input[k]).trim() : "");
  const name = field("name"), email = field("email"), url = field("url"), company = field("company");
  const locale = input.locale === "en" ? "en" : "ro";
  if (field("website")) return NextResponse.json({ ok: true, emailed: true }); // honeypot
  if (!name || name.length > 120 || !emailPattern.test(email) || email.length > 254 || !url || company.length > 160 || input.consent !== true) return reply(400, "invalid_fields");
  if (rateLimited(`report:${clientIp(request)}`, 5, 60 * 60 * 1000) || rateLimited(`report-mail:${email.toLowerCase()}`, 3, 24 * 60 * 60 * 1000)) return reply(429, "rate_limited");

  let result;
  try { result = await getAudit(url); } catch (e) { return reply(e instanceof AuditFetchError && (e.code === "invalid_url" || e.code === "blocked_host") ? 400 : 502, "audit_failed"); }

  const pdf = await renderReportPdf(result, name, locale);
  const filename = `bloc-audit-${result.host.replace(/[^a-z0-9.-]/gi, "")}.pdf`;
  const ro = locale === "ro";
  const first = name.split(" ")[0];

  let emailed = false;
  if (emailConfigured()) {
    const subject = ro ? `Raportul pentru ${result.host}: ${result.scores.overall}/100` : `Your report for ${result.host}: ${result.scores.overall}/100`;
    const lines = ro
      ? [`Salut ${first},`, "", `Raportul complet pentru ${result.host} este atașat. Scorul general: ${result.scores.overall}/100.`, "", "Începe cu pagina 2: acolo sunt primele lucruri de reparat, în ordinea impactului.", "", "Dacă vrei să-ți spunem ce am repara primul și cât ar costa, răspunde la acest email. Îți scriu personal, în maximum o zi lucrătoare.", "", "Gino", "Fondator, Bloc", siteUrl]
      : [`Hi ${first},`, "", `Your full report for ${result.host} is attached. Overall score: ${result.scores.overall}/100.`, "", "Start on page 2: it lists what to fix first, in order of impact.", "", "If you want us to tell you what we would fix first and what it would cost, just reply to this email. I will write back personally within one business day.", "", "Gino", "Founder, Bloc", siteUrl];
    const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1b1916;max-width:560px">${lines.map(l => (l ? `<p style="margin:0 0 4px">${escapeHtml(l)}</p>` : "<br>")).join("")}</div>`;
    emailed = await sendEmail({ to: [email], subject, text: lines.join("\n"), html, replyTo: teamInbox(), attachments: [{ filename, content: pdf }] });
    const scoreLine = categories.map(c => `${categoryCopy[c].en.name}: ${result.scores[c]}`).join(" · ");
    await sendEmail({
      to: [teamInbox()],
      replyTo: email,
      subject: `New audit lead: ${result.host} (${result.scores.overall}/100)`,
      text: [`Name: ${name}`, `Email: ${email}`, `Company: ${company || "-"}`, `Website: ${result.finalUrl}`, `Language: ${locale}`, `Report emailed to lead: ${emailed ? "yes" : "NO, delivery failed"}`, "", `Overall: ${result.scores.overall}/100`, scoreLine, `Platform: ${result.platform || "-"}`, `TTFB ${result.metrics.ttfbMs} ms · weight ${result.metrics.pageWeightKb} KB · est. 4G ${result.metrics.est4gSeconds}s`, `Critical: ${result.checks.filter(c => c.status === "fail").map(c => c.id).join(", ") || "-"}`].join("\n"),
      attachments: [{ filename, content: pdf }]
    });
  }

  return NextResponse.json({ ok: true, emailed, filename, pdf: pdf.toString("base64") });
}
