// [IA désactivée] Fichier de l'assistant intelligent mis entièrement en commentaire.
// Pour le réactiver : retirer les « // » en début de ligne (et la ligne « export {} » ci-dessous).
export {};
// import { describe, it, expect } from "vitest";
// import { LIMITS, TOKEN_TTL_SECONDS, checkRateLimits, issueToken, memoryStore, tokenSecret, verifyToken } from "./chatSecurity";
// import { handleChatHttp, handleTokenHttp } from "./chatHttp";
//
// const SECRET = "test-secret";
// const UA = "Mozilla/5.0 Test";
//
// describe("jeton d'accès", () => {
//   it("est valable 1 heure pour le même navigateur", () => {
//     const now = Date.now();
//     const { token, expiresAt } = issueToken(SECRET, UA, now);
//     expect(expiresAt).toBe(Math.floor(now / 1000) * 1000 + TOKEN_TTL_SECONDS * 1000);
//     expect(verifyToken(token, SECRET, UA, now + 59 * 60 * 1000).ok).toBe(true);
//   });
//
//   it("expire après 1 heure", () => {
//     const now = Date.now();
//     const { token } = issueToken(SECRET, UA, now);
//     expect(verifyToken(token, SECRET, UA, now + 61 * 60 * 1000)).toEqual({ ok: false, error: "token_expired" });
//   });
//
//   it("refuse un jeton falsifié, signé avec un autre secret ou utilisé par un autre navigateur", () => {
//     const { token } = issueToken(SECRET, UA);
//     const [body, sig] = token.split(".");
//     const forged = Buffer.from(JSON.stringify({ sid: "x", ua: "y", exp: 9999999999 })).toString("base64url");
//     expect(verifyToken(`${forged}.${sig}`, SECRET, UA).ok).toBe(false);
//     expect(verifyToken(`${body}.${sig}x`, SECRET, UA).ok).toBe(false);
//     expect(verifyToken(token, "autre-secret", UA).ok).toBe(false);
//     expect(verifyToken(token, SECRET, "curl/8.0").ok).toBe(false);
//     expect(verifyToken(null, SECRET, UA).ok).toBe(false);
//   });
//
//   it("dérive un secret de la clé Gemini si CHAT_TOKEN_SECRET n'est pas défini", () => {
//     expect(tokenSecret({ CHAT_TOKEN_SECRET: "s" })).toBe("s");
//     expect(tokenSecret({ geminiKey: "k" })).toMatch(/^[0-9a-f]{64}$/);
//     expect(tokenSecret({ geminiKey: "k" })).not.toContain("k");
//     expect(tokenSecret({})).toBeNull();
//   });
// });
//
// describe("limitation des messages", () => {
//   it("bloque au-delà de la limite et indique le délai d'attente", async () => {
//     const store = memoryStore();
//     const rules = [{ key: "test", limit: 3, windowSeconds: 3600 }];
//     const now = Date.now();
//     for (let i = 0; i < 3; i++) expect((await checkRateLimits(store, rules, now)).allowed).toBe(true);
//     const blocked = await checkRateLimits(store, rules, now);
//     expect(blocked.allowed).toBe(false);
//     if (!blocked.allowed) expect(blocked.retryAfter).toBeGreaterThan(0);
//   });
//
//   it("repart à zéro dans la fenêtre suivante", async () => {
//     const store = memoryStore();
//     const rules = [{ key: "test", limit: 1, windowSeconds: 3600 }];
//     const now = Date.now();
//     await checkRateLimits(store, rules, now);
//     expect((await checkRateLimits(store, rules, now)).allowed).toBe(false);
//     expect((await checkRateLimits(store, rules, now + 3600 * 1000)).allowed).toBe(true);
//   });
// });
//
// describe("routes HTTP", () => {
//   const ctx = () => ({ ip: "1.2.3.4", store: memoryStore(), tokenSecretEnv: SECRET });
//   const post = (url: string, init: { token?: string; origin?: string; body?: unknown } = {}) =>
//     new Request(`https://cpa.ma${url}`, {
//       method: "POST",
//       headers: {
//         Origin: init.origin ?? "https://cpa.ma",
//         "User-Agent": UA,
//         "Content-Type": "application/json",
//         ...(init.token ? { Cookie: `autre=1; cpa_chat=${init.token}` } : {}),
//       },
//       body: JSON.stringify(init.body ?? { messages: [{ role: "user", text: "Bonjour" }], lang: "fr" }),
//     });
//   // Jeton lu dans le cookie posé par /api/chat-token
//   const tokenFrom = (res: Response) => /cpa_chat=([^;]+)/.exec(res.headers.get("set-cookie") ?? "")?.[1] ?? "";
//
//   it("pose le jeton dans un cookie HttpOnly sécurisé, jamais dans le corps de la réponse", async () => {
//     const res = await handleTokenHttp(post("/api/chat-token"), ctx());
//     const cookie = res.headers.get("set-cookie") ?? "";
//     expect(cookie).toMatch(/^cpa_chat=[\w-]+\.[\w-]+;/);
//     for (const attr of ["HttpOnly", "Secure", "SameSite=Strict", "Path=/api", "Max-Age=3600"]) expect(cookie).toContain(attr);
//     const body = await res.json();
//     expect(body.token).toBeUndefined();
//     expect(typeof body.expiresAt).toBe("number");
//   });
//
//   it("refuse un jeton envoyé en en-tête Authorization (seul le cookie est accepté)", async () => {
//     const c = ctx();
//     const token = tokenFrom(await handleTokenHttp(post("/api/chat-token"), c));
//     const req = new Request("https://cpa.ma/api/chat", {
//       method: "POST",
//       headers: { Origin: "https://cpa.ma", "User-Agent": UA, Authorization: `Bearer ${token}` },
//       body: JSON.stringify({ messages: [{ role: "user", text: "Bonjour" }] }),
//     });
//     expect((await handleChatHttp(req, c)).status).toBe(401);
//   });
//
//   it("refuse /api/chat sans jeton", async () => {
//     const res = await handleChatHttp(post("/api/chat"), ctx());
//     expect(res.status).toBe(401);
//   });
//
//   it("refuse les autres sites", async () => {
//     const res = await handleTokenHttp(post("/api/chat-token", { origin: "https://evil.com" }), ctx());
//     expect(res.status).toBe(403);
//   });
//
//   it("délivre un jeton puis l'accepte sur /api/chat (la clé Gemini manque ici : 503)", async () => {
//     const c = ctx();
//     const tokenRes = await handleTokenHttp(post("/api/chat-token"), c);
//     expect(tokenRes.status).toBe(200);
//     const token = tokenFrom(tokenRes);
//     const res = await handleChatHttp(post("/api/chat", { token }), c);
//     expect(res.status).toBe(503);
//     expect(await res.json()).toEqual({ error: "unavailable" });
//   });
//
//   it(`limite à ${LIMITS.messagesPerTokenPerHour} messages par jeton et par heure`, async () => {
//     const c = ctx();
//     const token = tokenFrom(await handleTokenHttp(post("/api/chat-token"), c));
//     for (let i = 0; i < LIMITS.messagesPerTokenPerHour; i++) {
//       expect((await handleChatHttp(post("/api/chat", { token }), c)).status).not.toBe(429);
//     }
//     const res = await handleChatHttp(post("/api/chat", { token }), c);
//     expect(res.status).toBe(429);
//     expect((await res.json()).error).toBe("rate_limited");
//     expect(Number(res.headers.get("Retry-After"))).toBeGreaterThan(0);
//   });
//
//   it(`limite à ${LIMITS.tokensPerIpPerHour} jetons par IP et par heure`, async () => {
//     const c = ctx();
//     for (let i = 0; i < LIMITS.tokensPerIpPerHour; i++) {
//       expect((await handleTokenHttp(post("/api/chat-token"), c)).status).toBe(200);
//     }
//     expect((await handleTokenHttp(post("/api/chat-token"), c)).status).toBe(429);
//   });
// });
