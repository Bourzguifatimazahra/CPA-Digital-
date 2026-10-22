// Client du chatbot côté navigateur. Il obtient un jeton d'accès (valable 1 heure, renouvelé
// automatiquement) puis envoie uniquement la conversation à /api/chat et reçoit le texte de la réponse
// et le service concerné. Aucune clé, aucun prompt, aucun nom de modèle n'est présent dans le site.
const CHAT_ENDPOINT = "/api/chat";
const TOKEN_ENDPOINT = "/api/chat-token";
const TIMEOUT_MS = 12000;
const TOKEN_KEY = "cpa_chat_token";
const RENEW_MARGIN_MS = 60_000; // renouvelle le jeton 1 minute avant son expiration

export type ChatTurn = { role: "user" | "bot"; text: string };
export type AssistantAnswer = { text: string; departmentId: string | null };

/** Limite de messages atteinte : `retryAfter` en secondes. */
export class RateLimitError extends Error {
  constructor(public readonly retryAfter: number) {
    super("rate_limited");
    this.name = "RateLimitError";
  }
}

type StoredToken = { token: string; expiresAt: number };

const readToken = (): StoredToken | null => {
  try {
    const t = JSON.parse(sessionStorage.getItem(TOKEN_KEY) || "null");
    return t && typeof t.token === "string" && typeof t.expiresAt === "number" ? t : null;
  } catch {
    return null;
  }
};

const saveToken = (t: StoredToken | null) => {
  try {
    if (t) sessionStorage.setItem(TOKEN_KEY, JSON.stringify(t));
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // sessionStorage indisponible : le jeton reste en mémoire pour cet appel
  }
};

const retryAfterOf = async (res: Response) => {
  const data = await res.json().catch(() => null);
  return Number(data?.retryAfter ?? res.headers.get("Retry-After")) || 60;
};

async function fetchToken(): Promise<StoredToken> {
  const res = await fetch(TOKEN_ENDPOINT, { method: "POST", signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (res.status === 429) throw new RateLimitError(await retryAfterOf(res));
  if (!res.ok) throw new Error(`token ${res.status}`);
  const data = await res.json();
  if (typeof data?.token !== "string" || typeof data?.expiresAt !== "number") throw new Error("token invalid");
  const token = { token: data.token, expiresAt: data.expiresAt };
  saveToken(token);
  return token;
}

async function getToken(forceRenew = false): Promise<string> {
  const current = forceRenew ? null : readToken();
  if (current && current.expiresAt - RENEW_MARGIN_MS > Date.now()) return current.token;
  return (await fetchToken()).token;
}

export async function askAssistant(history: ChatTurn[], lang: string): Promise<AssistantAnswer> {
  const body = JSON.stringify({ messages: history.map(({ role, text }) => ({ role, text })), lang });
  const send = async (token: string) =>
    fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

  let res = await send(await getToken());
  if (res.status === 401) {
    // Jeton expiré ou invalide : on en demande un nouveau et on réessaie une fois
    saveToken(null);
    res = await send(await getToken(true));
  }
  if (res.status === 429) throw new RateLimitError(await retryAfterOf(res));
  if (!res.ok) throw new Error(`assistant ${res.status}`);
  const data = await res.json();
  if (typeof data?.answer !== "string" || !data.answer) throw new Error("assistant empty");
  return { text: data.answer, departmentId: typeof data.department === "string" ? data.department : null };
}
