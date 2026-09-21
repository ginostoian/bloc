import { NextRequest, NextResponse } from "next/server";

const allowedTopics = new Set(["roast", "site", "seo", "ai", "brand", "support"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const reply = (status: number, error: string) => NextResponse.json({ error }, { status });

export async function POST(request: NextRequest) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return reply(403, "forbidden");
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415, "unsupported_content_type");
  if (Number(request.headers.get("content-length") || 0) > 10000) return reply(413, "too_large");

  let input: Record<string, unknown>;
  try {
    input = await request.json();
    if (!input || typeof input !== "object" || Array.isArray(input)) return reply(400, "invalid_payload");
  } catch {
    return reply(400, "invalid_payload");
  }

  const field = (key: string) => typeof input[key] === "string" ? String(input[key]).trim() : "";
  const name = field("name"), email = field("email"), site = field("site"), message = field("message"), topic = field("topic"), budget = field("budget");
  if (field("website")) return NextResponse.json({ ok: true }); // Honeypot: do not tell automated senders apart.
  if (!name || name.length > 120 || !emailPattern.test(email) || email.length > 254 || site.length > 300 || message.length > 4000 || budget.length > 100 || !allowedTopics.has(topic) || input.consent !== true) {
    return reply(400, "invalid_fields");
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) return reply(503, "email_not_configured");

  const lines = ["New Bloc website enquiry", "", `Name: ${name}`, `Email: ${email}`, `Website / company: ${site || "-"}`, `Topic: ${topic}`, `Budget: ${budget || "-"}`, "", "Message:", message || "-"];
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Bloc enquiry: ${topic}`, text: lines.join("\n") }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store"
    });
    if (!response.ok) return reply(502, "delivery_failed");
    return NextResponse.json({ ok: true });
  } catch {
    return reply(502, "delivery_failed");
  }
}
