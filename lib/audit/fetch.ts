import http from "node:http";
import https from "node:https";
import dns from "node:dns";
import net from "node:net";
import zlib from "node:zlib";
import type { LookupFunction } from "node:net";

export type FetchResult = {
  url: string;
  status: number;
  headers: Record<string, string>;
  body: Buffer;
  /** Encoded bytes received over the wire (before decompression). */
  transferBytes: number;
  ttfbMs: number;
  totalMs: number;
  redirects: string[];
};

const UA = "Mozilla/5.0 (compatible; BlocAuditBot/1.0; +https://bloc.ro/ro/audit)";

export class AuditFetchError extends Error {
  constructor(public code: "invalid_url" | "blocked_host" | "timeout" | "too_large" | "network" | "too_many_redirects", message?: string) {
    super(message || code);
  }
}

/** Local testing only: lets the auditor reach localhost. Never honoured in production builds. */
const allowPrivate = process.env.AUDIT_ALLOW_PRIVATE_HOSTS === "1" && process.env.NODE_ENV !== "production";

function isPrivateAddress(ip: string): boolean {
  if (allowPrivate) return false;
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return a === 0 || a === 10 || a === 127 || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 192 && b === 0) || (a === 198 && (b === 18 || b === 19)) || a >= 224;
  }
  const v6 = ip.toLowerCase();
  if (v6.startsWith("::ffff:")) return isPrivateAddress(v6.slice(7));
  return v6 === "::" || v6 === "::1" || v6.startsWith("fc") || v6.startsWith("fd") || v6.startsWith("fe8") || v6.startsWith("fe9") || v6.startsWith("fea") || v6.startsWith("feb") || v6.startsWith("ff") || v6.startsWith("64:ff9b");
}

/** DNS lookup that refuses private, loopback and link-local targets at connect time (no rebinding window). */
const safeLookup: LookupFunction = (hostname, options, callback) => {
  dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err, "", 4);
    const list = addresses as dns.LookupAddress[];
    const bad = list.find(a => isPrivateAddress(a.address));
    if (!list.length || bad) return callback(new AuditFetchError("blocked_host"), "", 4);
    if ((options as dns.LookupOptions).all) return (callback as unknown as (e: null, a: dns.LookupAddress[]) => void)(null, list);
    callback(null, list[0].address, list[0].family);
  });
};

export function normalizeUrl(input: string): URL {
  let raw = input.trim();
  if (!raw || raw.length > 300) throw new AuditFetchError("invalid_url");
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  let url: URL;
  try { url = new URL(raw); } catch { throw new AuditFetchError("invalid_url"); }
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new AuditFetchError("invalid_url");
  if (allowPrivate) { url.hash = ""; return url; }
  if (url.port && !["80", "443"].includes(url.port)) throw new AuditFetchError("blocked_host");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (net.isIP(host) ? isPrivateAddress(host) : !host.includes(".") || /\.(local|internal|localhost|lan|home|corp)$/i.test(host) || host === "localhost") throw new AuditFetchError("blocked_host");
  url.hash = "";
  return url;
}

function requestOnce(url: URL, method: string, maxBytes: number, timeoutMs: number): Promise<Omit<FetchResult, "redirects" | "url"> & { location?: string }> {
  return new Promise((resolve, reject) => {
    const started = performance.now();
    const lib = url.protocol === "https:" ? https : http;
    const req = lib.request(url, {
      method,
      lookup: safeLookup,
      headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,*/*;q=0.8", "Accept-Encoding": "br, gzip, deflate", "Accept-Language": "en,ro;q=0.8" },
      timeout: timeoutMs
    }, res => {
      const ttfbMs = performance.now() - started;
      const headers: Record<string, string> = {};
      for (const [k, v] of Object.entries(res.headers)) if (v !== undefined) headers[k.toLowerCase()] = Array.isArray(v) ? v.join(", ") : String(v);
      const status = res.statusCode || 0;
      if (status >= 300 && status < 400 && headers.location) {
        res.resume();
        return resolve({ status, headers, body: Buffer.alloc(0), transferBytes: 0, ttfbMs, totalMs: performance.now() - started, location: headers.location });
      }
      if (method === "HEAD") {
        res.resume();
        return resolve({ status, headers, body: Buffer.alloc(0), transferBytes: Number(headers["content-length"] || 0), ttfbMs, totalMs: performance.now() - started });
      }
      const chunks: Buffer[] = [];
      let received = 0;
      res.on("data", (c: Buffer) => {
        received += c.length;
        if (received > maxBytes) { req.destroy(new AuditFetchError("too_large")); return; }
        chunks.push(c);
      });
      res.on("end", () => {
        const raw = Buffer.concat(chunks);
        const enc = (headers["content-encoding"] || "").toLowerCase();
        let body = raw;
        try {
          if (enc.includes("br")) body = zlib.brotliDecompressSync(raw);
          else if (enc.includes("gzip")) body = zlib.gunzipSync(raw);
          else if (enc.includes("deflate")) body = zlib.inflateSync(raw);
        } catch { body = raw; }
        resolve({ status, headers, body, transferBytes: received, ttfbMs, totalMs: performance.now() - started });
      });
      res.on("error", reject);
    });
    req.on("timeout", () => req.destroy(new AuditFetchError("timeout")));
    req.on("error", e => reject(e instanceof AuditFetchError ? e : new AuditFetchError("network", (e as Error).message)));
    req.end();
  });
}

export async function safeFetch(input: string | URL, opts: { method?: "GET" | "HEAD"; maxBytes?: number; timeoutMs?: number; maxRedirects?: number } = {}): Promise<FetchResult> {
  let url = typeof input === "string" ? normalizeUrl(input) : input;
  const redirects: string[] = [];
  for (let i = 0; i <= (opts.maxRedirects ?? 5); i++) {
    const res = await requestOnce(url, opts.method || "GET", opts.maxBytes ?? 4_000_000, opts.timeoutMs ?? 12_000);
    if (res.location) {
      redirects.push(url.toString());
      url = normalizeUrl(new URL(res.location, url).toString());
      continue;
    }
    return { url: url.toString(), status: res.status, headers: res.headers, body: res.body, transferBytes: res.transferBytes, ttfbMs: res.ttfbMs, totalMs: res.totalMs, redirects };
  }
  throw new AuditFetchError("too_many_redirects");
}

/** Never throws: returns null for anything that fails. */
export async function tryFetch(input: string | URL, opts: Parameters<typeof safeFetch>[1] = {}) {
  try { return await safeFetch(input, opts); } catch { return null; }
}
