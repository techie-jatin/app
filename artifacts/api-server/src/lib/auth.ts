import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET ?? "tc-dev-secret-change-in-production";

function b64url(data: Buffer | string): string {
  const buf = typeof data === "string" ? Buffer.from(data, "utf8") : data;
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function b64urlDecode(str: string): Buffer {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4;
  return Buffer.from(pad ? padded + "=".repeat(4 - pad) : padded, "base64");
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  name: string;
  avatar: string;
  facultyId?: string | null;
  iat?: number;
  exp?: number;
}

export function signJwt(payload: Omit<JwtPayload, "iat" | "exp">, expiresInSec = 7 * 24 * 3600): string {
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const body = b64url(JSON.stringify({ ...payload, iat: now, exp: now + expiresInSec }));
  const sig = b64url(crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest());
  return `${header}.${body}.${sig}`;
}

export function verifyJwt(token: string): JwtPayload {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Malformed token");
  const [header, body, sig] = parts;
  const expected = b64url(crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest());
  if (sig !== expected) throw new Error("Invalid signature");
  const payload = JSON.parse(b64urlDecode(body).toString("utf8")) as JwtPayload;
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) throw new Error("Token expired");
  return payload;
}

export function hashPassword(password: string): string {
  return crypto.createHmac("sha256", "tc-pw-salt-2024").update(password).digest("hex");
}

export function checkPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}
