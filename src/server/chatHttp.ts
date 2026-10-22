// Traitement HTTP des routes du chatbot (/api/chat-token et /api/chat), partagé par les fonctions
// Netlify et le serveur de développement Vite. CÔTÉ SERVEUR UNIQUEMENT.
import { handleChatRequest, isAllowedOrigin } from "./chatEngine";
import {
  CounterStore,
  checkRateLimits,
  issueToken,
  messageRules,
  tokenRules,
  tokenSecret,
  verifyToken,
} from "./chatSecurity";

const MAX_BODY_BYTES = 40_000;

export type ChatHttpContext = {
  ip: string;
  store: CounterStore;
  geminiKey?: string;
  tokenSecretEnv?: string;
};

const jsonResponse = (req: Request, status: number, payload: unknown, extraHeaders: Record<string, string> = {}) => {
  const origin = req.headers.get("origin");
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...(origin && isAllowedOrigin(origin) ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {}),
      ...extraHeaders,
    },
  });
};

const rateLimited = (req: Request, retryAfter: number) =>
  jsonResponse(req, 429, { error: "rate_limited", retryAfter }, { "Retry-After": String(retryAfter) });

/** POST /api/chat-token : délivre un jeton d'accès valable 1 heure au navigateur du visiteur. */
export async function handleTokenHttp(req: Request, ctx: ChatHttpContext): Promise<Response> {
  if (req.method !== "POST") return jsonResponse(req, 405, { error: "method_not_allowed" });
  if (!isAllowedOrigin(req.headers.get("origin"))) return jsonResponse(req, 403, { error: "forbidden" });

  const secret = tokenSecret({ CHAT_TOKEN_SECRET: ctx.tokenSecretEnv, geminiKey: ctx.geminiKey });
  if (!secret) return jsonResponse(req, 503, { error: "unavailable" });

  const limit = await checkRateLimits(ctx.store, tokenRules(ctx.ip));
  if (!limit.allowed) return rateLimited(req, limit.retryAfter);

  const { token, expiresAt } = issueToken(secret, req.headers.get("user-agent") ?? "");
  return jsonResponse(req, 200, { token, expiresAt });
}

/** POST /api/chat : exige un jeton valide, applique les limites, puis interroge l'assistant. */
export async function handleChatHttp(req: Request, ctx: ChatHttpContext): Promise<Response> {
  if (req.method !== "POST") return jsonResponse(req, 405, { error: "method_not_allowed" });
  if (!isAllowedOrigin(req.headers.get("origin"))) return jsonResponse(req, 403, { error: "forbidden" });

  const secret = tokenSecret({ CHAT_TOKEN_SECRET: ctx.tokenSecretEnv, geminiKey: ctx.geminiKey });
  if (!secret) return jsonResponse(req, 503, { error: "unavailable" });

  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const check = verifyToken(bearer, secret, req.headers.get("user-agent") ?? "");
  if (!check.ok) return jsonResponse(req, 401, { error: check.error });

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return jsonResponse(req, 413, { error: "too_large" });
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return jsonResponse(req, 400, { error: "bad_request" });
  }

  const limit = await checkRateLimits(ctx.store, messageRules(check.payload.sid, ctx.ip));
  if (!limit.allowed) return rateLimited(req, limit.retryAfter);

  const { status, payload } = await handleChatRequest(body, ctx.geminiKey);
  return jsonResponse(req, status, payload);
}

/** Nettoie une clé collée avec son nom ("GEMINI_API_KEY=..."), des guillemets ou des espaces. */
export const normalizeKey = (raw: string | undefined) =>
  raw
    ?.trim()
    .replace(/^(VITE_)?GEMINI_API_KEY\s*=\s*/i, "")
    .replace(/^["']|["']$/g, "")
    .trim() || undefined;
