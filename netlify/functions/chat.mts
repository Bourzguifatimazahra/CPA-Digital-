// Fonction Netlify du chatbot CPA, servie sur https://cpa.ma/api/chat.
// La clé Gemini est lue dans la variable d'environnement Netlify GEMINI_API_KEY (jamais envoyée au navigateur).
import { handleChatRequest, isAllowedOrigin } from "../../src/server/chatEngine";

const MAX_BODY_BYTES = 40_000;

// Tolère une valeur collée avec son nom ("GEMINI_API_KEY=..."), des guillemets ou des espaces.
const normalizeKey = (raw: string | undefined) =>
  raw
    ?.trim()
    .replace(/^(VITE_)?GEMINI_API_KEY\s*=\s*/i, "")
    .replace(/^["']|["']$/g, "")
    .trim() || undefined;

export default async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const json = (status: number, payload: unknown) =>
    new Response(JSON.stringify(payload), {
      status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        // Version de la fonction (diagnostic de déploiement ; aucune donnée sensible)
        "X-Chat-Version": "2026-10-22.2",
        ...(origin && isAllowedOrigin(origin) ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {}),
      },
    });

  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });
  if (!isAllowedOrigin(origin)) return json(403, { error: "forbidden" });

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { error: "too_large" });
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: "bad_request" });
  }

  // Les deux noms sont acceptés pour la variable Netlify (côté serveur uniquement : le code du
  // navigateur ne référence aucune de ces variables, elles ne sont donc jamais intégrées au site).
  const apiKey = normalizeKey(process.env.GEMINI_API_KEY) || normalizeKey(process.env.VITE_GEMINI_API_KEY);
  const { status, payload } = await handleChatRequest(body, apiKey);
  return json(status, payload);
};

export const config = { path: "/api/chat" };
