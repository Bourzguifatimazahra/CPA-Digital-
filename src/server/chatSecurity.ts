// [IA désactivée] Fichier de l'assistant intelligent mis entièrement en commentaire.
// Pour le réactiver : retirer les « // » en début de ligne (et la ligne « export {} » ci-dessous).
export {};
// // Sécurité du chatbot — CÔTÉ SERVEUR UNIQUEMENT.
// // 1) Jeton d'accès par visiteur : signé (HMAC-SHA256), valable 1 heure, lié au navigateur.
// //    Il ne contient ni ne donne jamais la clé Gemini : il autorise seulement à appeler /api/chat.
// // 2) Limitation du nombre de messages (rate limiting) côté serveur : par jeton, par IP et pour tout le site.
// import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
//
// export const TOKEN_TTL_SECONDS = 60 * 60; // 1 heure
//
// // Règles de limitation (modifiables ici)
// export const LIMITS = {
//   messagesPerTokenPerHour: 20,
//   messagesPerIpPerHour: 60,
//   messagesPerIpPerDay: 200,
//   tokensPerIpPerHour: 10,
//   messagesPerDayGlobal: 800, // sous le quota gratuit quotidien de Gemini
// };
//
// const HOUR = 3600;
// const DAY = 86400;
//
// const b64url = (buf: Buffer) => buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
// const fromB64url = (s: string) => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");
// const shortHash = (value: string) => createHash("sha256").update(value).digest("hex").slice(0, 16);
//
// /**
//  * Secret de signature des jetons : CHAT_TOKEN_SECRET si défini dans Netlify, sinon dérivé de la clé
//  * Gemini (aucune variable supplémentaire à créer). Changer la clé Gemini invalide les jetons (≤ 1 h).
//  */
// export const tokenSecret = (env: { CHAT_TOKEN_SECRET?: string; geminiKey?: string }): string | null => {
//   if (env.CHAT_TOKEN_SECRET) return env.CHAT_TOKEN_SECRET;
//   if (env.geminiKey) return createHash("sha256").update(`cpa-chat-token:${env.geminiKey}`).digest("hex");
//   return null;
// };
//
// export type TokenPayload = { sid: string; ua: string; exp: number };
//
// /** Crée un jeton valable 1 heure, lié au navigateur (empreinte du User-Agent). */
// export const issueToken = (secret: string, userAgent: string, now = Date.now()) => {
//   const payload: TokenPayload = {
//     sid: b64url(randomBytes(12)),
//     ua: shortHash(userAgent || ""),
//     exp: Math.floor(now / 1000) + TOKEN_TTL_SECONDS,
//   };
//   const body = b64url(Buffer.from(JSON.stringify(payload)));
//   const sig = b64url(createHmac("sha256", secret).update(body).digest());
//   return { token: `${body}.${sig}`, expiresAt: payload.exp * 1000 };
// };
//
// /** Vérifie la signature, l'expiration et le navigateur du jeton. */
// export const verifyToken = (
//   token: string | null | undefined,
//   secret: string,
//   userAgent: string,
//   now = Date.now(),
// ): { ok: boolean; payload?: TokenPayload; error?: "token_invalid" | "token_expired" } => {
//   if (!token) return { ok: false, error: "token_invalid" };
//   const [body, sig] = token.split(".");
//   if (!body || !sig) return { ok: false, error: "token_invalid" };
//   const expected = createHmac("sha256", secret).update(body).digest();
//   const given = fromB64url(sig);
//   if (given.length !== expected.length || !timingSafeEqual(given, expected)) return { ok: false, error: "token_invalid" };
//   let payload: TokenPayload;
//   try {
//     payload = JSON.parse(fromB64url(body).toString("utf8"));
//   } catch {
//     return { ok: false, error: "token_invalid" };
//   }
//   if (typeof payload?.sid !== "string" || typeof payload.exp !== "number") return { ok: false, error: "token_invalid" };
//   if (payload.ua !== shortHash(userAgent || "")) return { ok: false, error: "token_invalid" };
//   if (payload.exp * 1000 <= now) return { ok: false, error: "token_expired" };
//   return { ok: true, payload };
// };
//
// /** Stockage des compteurs : Netlify Blobs en production, mémoire en développement et dans les tests. */
// export interface CounterStore {
//   get(key: string): Promise<number>;
//   set(key: string, value: number): Promise<void>;
// }
//
// export const memoryStore = (): CounterStore => {
//   const map = new Map<string, number>();
//   return {
//     get: async (key) => map.get(key) ?? 0,
//     set: async (key, value) => void map.set(key, value),
//   };
// };
//
// type Rule = { key: string; limit: number; windowSeconds: number };
//
// /**
//  * Applique plusieurs règles ; si l'une est dépassée, refuse sans rien compter.
//  * Sinon incrémente tous les compteurs. Renvoie le délai d'attente en secondes en cas de refus.
//  */
// export async function checkRateLimits(
//   store: CounterStore,
//   rules: Rule[],
//   now = Date.now(),
// ): Promise<{ allowed: boolean; retryAfter?: number; rule?: string }> {
//   const nowSec = Math.floor(now / 1000);
//   const buckets = rules.map((r) => {
//     const window = Math.floor(nowSec / r.windowSeconds);
//     return { ...r, bucket: `${r.key}:${r.windowSeconds}:${window}`, resetAt: (window + 1) * r.windowSeconds };
//   });
//   const counts = await Promise.all(buckets.map((b) => store.get(b.bucket)));
//   const blocked = buckets.findIndex((b, i) => counts[i] >= b.limit);
//   if (blocked !== -1) {
//     return { allowed: false, retryAfter: Math.max(1, buckets[blocked].resetAt - nowSec), rule: buckets[blocked].key.split(":")[0] };
//   }
//   await Promise.all(buckets.map((b, i) => store.set(b.bucket, counts[i] + 1)));
//   return { allowed: true };
// }
//
// export const messageRules = (sid: string, ip: string): Rule[] => [
//   { key: `token:${sid}`, limit: LIMITS.messagesPerTokenPerHour, windowSeconds: HOUR },
//   { key: `ip-hour:${shortHash(ip)}`, limit: LIMITS.messagesPerIpPerHour, windowSeconds: HOUR },
//   { key: `ip-day:${shortHash(ip)}`, limit: LIMITS.messagesPerIpPerDay, windowSeconds: DAY },
//   { key: "global-day", limit: LIMITS.messagesPerDayGlobal, windowSeconds: DAY },
// ];
//
// export const tokenRules = (ip: string): Rule[] => [
//   { key: `token-ip:${shortHash(ip)}`, limit: LIMITS.tokensPerIpPerHour, windowSeconds: HOUR },
// ];
