// [IA désactivée] Fichier de l'assistant intelligent mis entièrement en commentaire.
// Pour le réactiver : retirer les « // » en début de ligne (et la ligne « export {} » ci-dessous).
export {};
// // Client du chatbot côté navigateur. Le jeton d'accès (valable 1 heure) est posé par le serveur dans un
// // cookie HttpOnly : ce code ne le voit jamais, le navigateur l'envoie seul à /api/chat. Le client garde
// // seulement l'heure d'expiration pour le renouveler à temps. Aucune clé, aucun prompt, aucun modèle ici.
// // INTERRUPTEUR de l'assistant intelligent. false = le chatbot répond uniquement avec la FAQ statique
// // (aucun appel à /api/chat). Pour le réactiver : true ici ET AI_ENABLED = true dans src/server/chatEngine.ts.
// export const ASSISTANT_ENABLED = false;
//
// const CHAT_ENDPOINT = "/api/chat";
// const TOKEN_ENDPOINT = "/api/chat-token";
// const TIMEOUT_MS = 12000;
// const EXPIRY_KEY = "cpa_chat_token_exp";
// const RENEW_MARGIN_MS = 60_000; // renouvelle le jeton 1 minute avant son expiration
//
// export type ChatTurn = { role: "user" | "bot"; text: string };
// export type AssistantAnswer = { text: string; departmentId: string | null };
//
// /** Limite de messages atteinte : `retryAfter` en secondes. */
// export class RateLimitError extends Error {
//   constructor(public readonly retryAfter: number) {
//     super("rate_limited");
//     this.name = "RateLimitError";
//   }
// }
//
// const readExpiry = (): number => {
//   try {
//     return Number(sessionStorage.getItem(EXPIRY_KEY)) || 0;
//   } catch {
//     return 0;
//   }
// };
//
// const saveExpiry = (expiresAt: number) => {
//   try {
//     sessionStorage.setItem(EXPIRY_KEY, String(expiresAt));
//   } catch {
//     // sessionStorage indisponible : le jeton sera simplement redemandé si besoin
//   }
// };
//
// const retryAfterOf = async (res: Response) => {
//   const data = await res.json().catch(() => null);
//   return Number(data?.retryAfter ?? res.headers.get("Retry-After")) || 60;
// };
//
// /** Demande un nouveau jeton : le serveur le dépose dans le cookie HttpOnly. */
// async function renewToken(): Promise<void> {
//   const res = await fetch(TOKEN_ENDPOINT, {
//     method: "POST",
//     credentials: "same-origin",
//     signal: AbortSignal.timeout(TIMEOUT_MS),
//   });
//   if (res.status === 429) throw new RateLimitError(await retryAfterOf(res));
//   if (!res.ok) throw new Error(`token ${res.status}`);
//   const data = await res.json();
//   saveExpiry(typeof data?.expiresAt === "number" ? data.expiresAt : Date.now() + 55 * 60_000);
// }
//
// export async function askAssistant(history: ChatTurn[], lang: string): Promise<AssistantAnswer> {
//   if (!ASSISTANT_ENABLED) throw new Error("assistant disabled");
//   const body = JSON.stringify({ messages: history.map(({ role, text }) => ({ role, text })), lang });
//   const send = () =>
//     fetch(CHAT_ENDPOINT, {
//       method: "POST",
//       credentials: "same-origin",
//       headers: { "Content-Type": "application/json" },
//       body,
//       signal: AbortSignal.timeout(TIMEOUT_MS),
//     });
//
//   if (readExpiry() - RENEW_MARGIN_MS <= Date.now()) await renewToken();
//   let res = await send();
//   if (res.status === 401) {
//     // Cookie absent, expiré ou invalide : on en demande un nouveau et on réessaie une fois
//     await renewToken();
//     res = await send();
//   }
//   if (res.status === 429) throw new RateLimitError(await retryAfterOf(res));
//   if (!res.ok) throw new Error(`assistant ${res.status}`);
//   const data = await res.json();
//   if (typeof data?.answer !== "string" || !data.answer) throw new Error("assistant empty");
//   return { text: data.answer, departmentId: typeof data.department === "string" ? data.department : null };
// }
