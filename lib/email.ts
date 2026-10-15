type Attachment = { filename: string; content: Buffer };
type Mail = { to: string[]; subject: string; text: string; html?: string; replyTo?: string; attachments?: Attachment[] };

export const emailConfigured = () => !!(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL);
export const teamInbox = () => process.env.CONTACT_TO_EMAIL || "";

export async function sendEmail(mail: Mail): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY, from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return false;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from, to: mail.to, subject: mail.subject, text: mail.text, html: mail.html,
        ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
        ...(mail.attachments ? { attachments: mail.attachments.map(a => ({ filename: a.filename, content: a.content.toString("base64") })) } : {})
      }),
      signal: AbortSignal.timeout(15000),
      cache: "no-store"
    });
    return response.ok;
  } catch {
    return false;
  }
}

export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
